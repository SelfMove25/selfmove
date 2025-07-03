import { Router, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import admin from 'firebase-admin';
import { authenticateToken, AuthenticatedRequest, requireAdmin } from '../middleware/auth';

const router = Router();

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    const serviceAccount = require('../../firebase-admin-key.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id,
    });
    console.log(`🔥 Firebase Admin initialized for project: ${serviceAccount.project_id}`);
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin:', error);
    throw error;
  }
}

const db = admin.firestore();

// @route   GET /api/users/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    
    const userDoc = await db.collection('users').doc(user.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const userData = userDoc.data();

    res.json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile',
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update current user's profile
// @access  Private
router.put('/profile', [
  authenticateToken,
  body('displayName').optional().isLength({ min: 1, max: 100 }).trim(),
  body('phoneNumber').optional().matches(/^\+?[\d\s\-\(\)]+$/),
  body('firstName').optional().isLength({ min: 1, max: 50 }).trim(),
  body('lastName').optional().isLength({ min: 1, max: 50 }).trim(),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array(),
      });
    }

    const user = (req as AuthenticatedRequest).user;
    const { displayName, phoneNumber, firstName, lastName } = req.body;

    const updateData: any = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (displayName) updateData.displayName = displayName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;

    await db.collection('users').doc(user.uid).update(updateData);

    res.json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
    });
  }
});

// @route   GET /api/users/:userId
// @desc    Get user profile by ID (public info only)
// @access  Public
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const userData = userDoc.data();

    // Return only public information
    const publicUserData = {
      id: userData?.id,
      displayName: userData?.displayName,
      photoURL: userData?.photoURL,
      isVerified: userData?.isVerified,
      createdAt: userData?.createdAt,
    };

    res.json({
      success: true,
      data: publicUserData,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user',
    });
  }
});

// @route   GET /api/users/:userId/properties
// @desc    Get user's properties
// @access  Public
router.get('/:userId/properties', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array(),
      });
    }

    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const offset = (page - 1) * limit;

    // Get properties owned by this user (only active and paid ones for public view)
    const propertiesQuery = db.collection('properties')
      .where('ownerId', '==', userId)
      .where('isActive', '==', true)
      .where('isPaid', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .offset(offset);

    const snapshot = await propertiesQuery.get();
    const properties = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      data: properties,
      pagination: {
        page,
        limit,
        total: snapshot.size,
        hasMore: snapshot.size === limit,
      },
    });
  } catch (error) {
    console.error('Error fetching user properties:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user properties',
    });
  }
});

// @route   GET /api/users (Admin only)
// @desc    Get all users with pagination
// @access  Private (Admin)
router.get('/', [
  authenticateToken,
  requireAdmin,
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('search').optional().isString(),
  query('role').optional().isIn(['user', 'admin']),
  query('kycStatus').optional().isIn(['pending', 'approved', 'rejected', 'under_review']),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array(),
      });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const search = req.query.search as string;
    const role = req.query.role as string;
    const kycStatus = req.query.kycStatus as string;

    let query = db.collection('users').orderBy('createdAt', 'desc');

    // Apply filters
    if (role) {
      query = query.where('role', '==', role);
    }
    if (kycStatus) {
      query = query.where('kycStatus', '==', kycStatus);
    }

    // Apply pagination
    query = query.limit(limit).offset(offset);

    const snapshot = await query.get();
    let users = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });

    // Apply search filter (client-side for simplicity)
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter((user: any) => 
        user.displayName?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total: snapshot.size,
        hasMore: snapshot.size === limit,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
    });
  }
});

// @route   PUT /api/users/:userId/role (Admin only)
// @desc    Update user role
// @access  Private (Admin)
router.put('/:userId/role', [
  authenticateToken,
  requireAdmin,
  body('role').isIn(['user', 'admin']),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array(),
      });
    }

    const { userId } = req.params;
    const { role } = req.body;

    await db.collection('users').doc(userId).update({
      role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
      success: true,
      message: 'User role updated successfully',
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user role',
    });
  }
});

// @route   PUT /api/users/:userId/verify (Admin only)
// @desc    Verify/unverify user
// @access  Private (Admin)
router.put('/:userId/verify', [
  authenticateToken,
  requireAdmin,
  body('isVerified').isBoolean(),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array(),
      });
    }

    const { userId } = req.params;
    const { isVerified } = req.body;

    await db.collection('users').doc(userId).update({
      isVerified,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
      success: true,
      message: `User ${isVerified ? 'verified' : 'unverified'} successfully`,
    });
  } catch (error) {
    console.error('Error updating user verification:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user verification',
    });
  }
});

// @route   DELETE /api/users/:userId (Admin only)
// @desc    Delete user account (soft delete)
// @access  Private (Admin)
router.delete('/:userId', [
  authenticateToken,
  requireAdmin,
], async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Soft delete - mark user as deleted
    await db.collection('users').doc(userId).update({
      isDeleted: true,
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Also disable the user in Firebase Auth
    await admin.auth().updateUser(userId, {
      disabled: true,
    });

    res.json({
      success: true,
      message: 'User account deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user',
    });
  }
});

export default router; 