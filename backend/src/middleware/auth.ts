import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export interface AuthenticatedRequest extends Request {
  user: admin.auth.DecodedIdToken;
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required',
      });
    }

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Add user info to request object
    (req as AuthenticatedRequest).user = decodedToken;
    
    next();
  } catch (error: any) {
    console.error('Authentication error:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        error: 'Token expired',
        message: 'Please refresh your session',
      });
    }
    
    if (error.code === 'auth/id-token-revoked') {
      return res.status(401).json({
        success: false,
        error: 'Token revoked',
        message: 'Please sign in again',
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid token',
      message: 'Authentication failed',
    });
  }
};

// Middleware to check if user has admin role
export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    
    // Get user data from Firestore to check role
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(user.uid)
      .get();
    
    if (!userDoc.exists) {
      return res.status(403).json({
        success: false,
        error: 'User not found',
      });
    }
    
    const userData = userDoc.data()!;
    
    if (userData.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required',
      });
    }
    
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify admin status',
    });
  }
};

// Middleware to check KYC status
export const requireKYC = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    
    // Get user data from Firestore to check KYC status
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(user.uid)
      .get();
    
    if (!userDoc.exists) {
      return res.status(403).json({
        success: false,
        error: 'User not found',
      });
    }
    
    const userData = userDoc.data()!;
    
    if (userData.kycStatus !== 'approved') {
      return res.status(403).json({
        success: false,
        error: 'KYC verification required',
        message: 'You must complete identity verification to perform this action',
      });
    }
    
    next();
  } catch (error) {
    console.error('KYC check error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify KYC status',
    });
  }
}; 