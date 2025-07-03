import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import admin from 'firebase-admin';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

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

// @route   POST /api/auth/verify
// @desc    Verify Firebase ID token and get user data
// @access  Public
router.post('/verify', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        error: 'ID token is required',
      });
    }

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Get user data from Firestore
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'User not found in database',
      });
    }

    const userData = userDoc.data();

    res.json({
      success: true,
      data: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        user: userData,
      },
    });
  } catch (error: any) {
    console.error('Token verification error:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        error: 'Token expired',
      });
    }

    res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
  }
});

// @route   POST /api/auth/refresh
// @desc    Refresh user data from Firestore
// @access  Private
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    
    // Get updated user data from Firestore
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
    console.error('Error refreshing user data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh user data',
    });
  }
});

// @route   POST /api/auth/update-profile
// @desc    Update user profile information
// @access  Private
router.post('/update-profile', [
  authenticateToken,
  body('displayName').optional().isLength({ min: 1, max: 100 }).trim(),
  body('phoneNumber').optional().matches(/^\+?[\d\s\-\(\)]+$/),
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
    const { displayName, phoneNumber } = req.body;

    const updateData: any = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (displayName) {
      updateData.displayName = displayName;
    }

    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    }

    // Update user document in Firestore
    await db.collection('users').doc(user.uid).update(updateData);

    res.json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
    });
  }
});

// @route   POST /api/auth/update-kyc-status
// @desc    Update user KYC status (Admin only)
// @access  Private (Admin)
router.post('/update-kyc-status', [
  authenticateToken,
  body('userId').isString().notEmpty(),
  body('kycStatus').isIn(['pending', 'approved', 'rejected', 'under_review']),
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
    const { userId, kycStatus } = req.body;

    // Check if current user is admin
    const currentUserDoc = await db.collection('users').doc(user.uid).get();
    if (!currentUserDoc.exists || currentUserDoc.data()?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required',
      });
    }

    // Update target user's KYC status
    await db.collection('users').doc(userId).update({
      kycStatus,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
      success: true,
      message: 'KYC status updated successfully',
    });
  } catch (error) {
    console.error('Error updating KYC status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update KYC status',
    });
  }
});

// @route   DELETE /api/auth/delete-account
// @desc    Delete user account (soft delete)
// @access  Private
router.delete('/delete-account', authenticateToken, async (req, res) => {
  try {
    const user = (req as AuthenticatedRequest).user;

    // Soft delete - mark user as deleted instead of actually deleting
    await db.collection('users').doc(user.uid).update({
      isDeleted: true,
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Also disable the user in Firebase Auth
    await admin.auth().updateUser(user.uid, {
      disabled: true,
    });

    res.json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete account',
    });
  }
});

export default router; 