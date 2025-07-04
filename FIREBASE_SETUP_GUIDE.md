# Firebase Setup Guide for Media Uploads

## Overview
The property listing form now includes full Firebase Storage integration for uploading property photos and floor plans. To use this functionality, you need to configure Firebase properly.

## Setup Steps

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication and Firestore Database
4. **Enable Storage** (this is crucial for media uploads)

### 2. Configure Firebase Storage
1. In Firebase Console, go to **Storage**
2. Click "Get started"
3. Choose **Start in test mode** for development
4. Select a location for your storage bucket

### 3. Set up Storage Rules (Optional - for production)
```javascript
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null; // Only authenticated users
    }
  }
}
```

### 4. Frontend Environment Variables
Create a `.env.local` file in the `frontend/` directory:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 5. Get Firebase Config Values
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click on your web app or create one
4. Copy the config values to your `.env.local` file

## Media Upload Features

### Property Photos
- **Formats**: PNG, JPG, JPEG
- **Max size**: 10MB per file
- **Max count**: 20 photos
- **Features**: Drag & drop, preview, remove individual photos

### Floor Plans
- **Formats**: PNG, JPG, JPEG, PDF
- **Max size**: 10MB per file
- **Max count**: 5 floor plans
- **Features**: Drag & drop, preview, remove individual plans

## File Upload Process
1. Files are uploaded to Firebase Storage in organized folders:
   - `images/timestamp_index_filename.ext`
   - `floorplans/timestamp_index_filename.ext`
2. Download URLs are generated and stored in form data
3. Form submission includes both file names and Firebase Storage URLs

## Validation
- File type validation
- File size validation (10MB limit)
- Maximum file count validation
- Required field validation (at least 1 property photo)

## Error Handling
- Upload progress indicators
- Error messages for invalid files
- Retry functionality
- Graceful failure handling

## Testing
1. Start the development server: `npm run dev`
2. Navigate to `/list-property`
3. Go to Step 5 (Valuation & Media)
4. Test uploading images and floor plans
5. Check Firebase Storage console to verify uploads

## Troubleshooting

### Common Issues
1. **"Upload failed"** - Check Firebase Storage rules and authentication
2. **"Invalid file type"** - Ensure files are in supported formats
3. **"File too large"** - Reduce file size to under 10MB
4. **Environment variables not loaded** - Restart development server after adding `.env.local`

### Debug Steps
1. Check browser console for errors
2. Verify Firebase config in console
3. Check Firebase Storage rules
4. Ensure Storage is enabled in Firebase Console

## Production Deployment
1. Update Storage rules for production security
2. Set up proper authentication
3. Configure environment variables in your hosting platform
4. Test upload functionality in production environment 