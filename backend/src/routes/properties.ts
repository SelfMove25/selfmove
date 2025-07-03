import { Router, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import admin from 'firebase-admin';
import { authenticateToken } from '../middleware/auth';
import { Property, PropertyType, ListingType } from '../../../shared/dist/types';

const router = Router();

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    // Use the service account key file directly
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

// GET /api/properties - Get all properties with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('listingType').optional().isIn(Object.values(ListingType)),
  query('propertyType').optional().isIn(Object.values(PropertyType)),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
  query('city').optional().isString(),
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

    const {
      page = 1,
      limit = 12,
      listingType,
      propertyType,
      minPrice,
      maxPrice,
      city,
      search,
    } = req.query;

    let query = db.collection('properties')
      .where('isActive', '==', true)
      .where('isPaid', '==', true);

    // Apply filters
    if (listingType) {
      query = query.where('listingType', '==', listingType);
    }
    if (propertyType) {
      query = query.where('type', '==', propertyType);
    }
    if (city) {
      query = query.where('address.city', '==', city);
    }

    // Execute query
    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit))
      .get();

    const properties: Property[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      properties.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Property);
    });

    // Apply price filtering (Firestore doesn't support range queries with other filters)
    let filteredProperties = properties;
    if (minPrice || maxPrice) {
      filteredProperties = properties.filter(property => {
        if (minPrice && property.price < Number(minPrice)) return false;
        if (maxPrice && property.price > Number(maxPrice)) return false;
        return true;
      });
    }

    // Get total count for pagination
    const totalSnapshot = await db.collection('properties')
      .where('isActive', '==', true)
      .where('isPaid', '==', true)
      .get();

    res.json({
      success: true,
      data: {
        properties: filteredProperties,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: totalSnapshot.size,
          totalPages: Math.ceil(totalSnapshot.size / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch properties',
    });
  }
});

// GET /api/properties/:id - Get single property
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('properties').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Property not found',
      });
    }

    const data = doc.data()!;
    const property: Property = {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Property;

    // Increment view count
    await doc.ref.update({
      views: admin.firestore.FieldValue.increment(1),
    });

    res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch property',
    });
  }
});

// POST /api/properties - Create new property (authenticated)
router.post('/', authenticateToken, [
  body('title').isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('type').isIn(Object.values(PropertyType)).withMessage('Invalid property type'),
  body('listingType').isIn(Object.values(ListingType)).withMessage('Invalid listing type'),
  body('price').isFloat({ min: 1 }).withMessage('Price must be greater than 0'),
  body('bedrooms').isInt({ min: 0 }).withMessage('Bedrooms must be a non-negative integer'),
  body('bathrooms').isInt({ min: 1 }).withMessage('Bathrooms must be at least 1'),
  body('size').isFloat({ min: 1 }).withMessage('Size must be greater than 0'),
  body('address').isObject().withMessage('Address is required'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.zipCode').notEmpty().withMessage('Zip code is required'),
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

    const userId = (req as any).user.uid;
    const propertyData = {
      ...req.body,
      ownerId: userId,
      isActive: true,
      isPaid: false, // Will be set to true after payment
      views: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection('properties').add(propertyData);

    res.status(201).json({
      success: true,
      data: {
        id: docRef.id,
        message: 'Property created successfully',
      },
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create property',
    });
  }
});

// PUT /api/properties/:id - Update property (authenticated, owner only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.uid;

    const doc = await db.collection('properties').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Property not found',
      });
    }

    const property = doc.data()!;
    
    if (property.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'You can only update your own properties',
      });
    }

    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await doc.ref.update(updateData);

    res.json({
      success: true,
      message: 'Property updated successfully',
    });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update property',
    });
  }
});

// DELETE /api/properties/:id - Delete property (authenticated, owner only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.uid;

    const doc = await db.collection('properties').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Property not found',
      });
    }

    const property = doc.data()!;
    
    if (property.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'You can only delete your own properties',
      });
    }

    // Soft delete - mark as inactive instead of deleting
    await doc.ref.update({
      isActive: false,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete property',
    });
  }
});

export default router; 