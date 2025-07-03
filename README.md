# 🏠 SelfMove - Commission-Free Property Marketplace

A production-ready, full-stack property marketplace where users can buy, rent, sell, or let properties directly with no agent fees.

![SelfMove Banner](https://via.placeholder.com/1200x400/ee8447/ffffff?text=SelfMove+🏠)

## ✨ Features

### 🔥 Core Functionality
- **Commission-Free Marketplace**: Buy, sell, rent, or let properties without agent fees
- **Direct Property Listings**: Property owners list directly with step-by-step guidance
- **Smart Search & Filtering**: Advanced property search with location, price, and feature filters
- **In-App Offer System**: Submit, accept, and reject offers instantly within the platform
- **KYC Verification**: Stripe Identity integration for secure user verification
- **Solicitor Referrals**: Connect with verified solicitors after offer acceptance
- **Secure Payments**: Stripe integration for listing fees and offer deposits

### 🛡️ Security & Trust
- **Firebase Authentication**: Email/password and social login options
- **KYC Required**: Identity verification before making or accepting offers
- **Secure File Upload**: Property images stored securely in Firebase Storage
- **Protected Routes**: Authentication required for sensitive actions
- **Data Validation**: Comprehensive input validation on frontend and backend

### 📱 User Experience
- **Responsive Design**: Mobile-first approach with beautiful Tailwind CSS styling
- **Progressive Web App**: PWA-ready for mobile app-like experience
- **Modern UI/UX**: Inspired by Airbnb and AutoTrader with peach/spring color palette
- **Real-time Updates**: Live notifications for offers and messages
- **Dashboard Management**: Comprehensive user and admin dashboards

### 🏗️ Technical Excellence
- **TypeScript Everywhere**: Full type safety across frontend, backend, and shared code
- **Modular Architecture**: Clean separation of concerns with reusable components
- **Production Ready**: Error handling, logging, rate limiting, and security best practices
- **Vercel Optimized**: Ready for one-click deployment to Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project
- Stripe account

### 1. Clone and Install

```bash
git clone <repository-url>
cd SelfMove

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install

# Install shared dependencies
cd ../shared && npm install
```

### 2. Environment Setup

**Frontend** (`frontend/.env.local`):
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Backend** (`backend/.env`):
```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Firebase Admin Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Run Development Servers

```bash
# Terminal 1 - Frontend (http://localhost:3000)
cd frontend && npm run dev

# Terminal 2 - Backend API (http://localhost:8000)
cd backend && npm run dev
```

### 4. Build Shared Types

```bash
cd shared && npm run build
```

## 📦 Project Structure

```
SelfMove/
├── 📁 frontend/                 # Next.js frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable React components
│   │   │   ├── 📁 Layout/       # Navigation, footer, layout wrapper
│   │   │   └── 📁 Property/     # Property-specific components
│   │   ├── 📁 hooks/            # Custom React hooks (auth, etc.)
│   │   ├── 📁 lib/              # Utilities (Firebase, Stripe, API)
│   │   ├── 📁 pages/            # Next.js pages and API routes
│   │   └── 📁 styles/           # Global styles and Tailwind CSS
│   ├── next.config.js           # Next.js configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── package.json             # Frontend dependencies
├── 📁 backend/                  # Express.js API server
│   ├── 📁 src/
│   │   ├── 📁 routes/           # API route handlers
│   │   ├── 📁 middleware/       # Authentication & validation
│   │   └── server.ts            # Main server file
│   └── package.json             # Backend dependencies
├── 📁 shared/                   # Shared TypeScript types & utilities
│   ├── 📁 src/
│   │   ├── types/               # TypeScript interfaces
│   │   ├── constants/           # App constants
│   │   └── index.ts             # Utility functions
│   └── package.json             # Shared dependencies
├── vercel.json                  # Vercel deployment configuration
└── README.md                    # This file
```

## 🌐 API Endpoints

### Properties
- `GET /api/properties` - Get properties with filtering & pagination
- `GET /api/properties/:id` - Get single property details
- `POST /api/properties` - Create new property (auth required)
- `PUT /api/properties/:id` - Update property (owner only)
- `DELETE /api/properties/:id` - Delete property (owner only)

### Authentication & Users
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update user profile (auth required)

### Offers
- `GET /api/offers` - Get user's offers (auth required)
- `POST /api/offers` - Create new offer (auth + KYC required)
- `PUT /api/offers/:id/accept` - Accept offer (owner + KYC required)
- `PUT /api/offers/:id/reject` - Reject offer (owner only)

### Payments & KYC
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/kyc/start` - Start KYC verification process
- `GET /api/kyc/status` - Get KYC verification status

## 🎨 Design System

### Color Palette
- **Primary**: Peach tones (`#ee8447` to `#412015`)
- **Secondary**: Spring green (`#22c55e` to `#052e16`)
- **Accent**: Orange highlights (`#ff7b19` to `#3d1600`)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Medium weight for readability

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Clean inputs with proper validation states
- **Navigation**: Responsive with mobile-first approach

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link your Git repository to Vercel
2. **Configure Environment Variables**: Add all environment variables in Vercel dashboard
3. **Deploy**: Vercel will automatically build and deploy both frontend and backend

```bash
# Using Vercel CLI
npm i -g vercel
vercel --prod
```

### Environment Variables for Production

Add these in your Vercel dashboard:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=prod_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=prod_project_id
FIREBASE_PROJECT_ID=prod_project_id
FIREBASE_PRIVATE_KEY=prod_private_key
FIREBASE_CLIENT_EMAIL=prod_client_email

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_live_xxx

# URLs
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
FRONTEND_URL=https://your-app.vercel.app
```

### Firebase Setup

1. **Create Firebase Project**
2. **Enable Authentication**: Email/password and Google providers
3. **Setup Firestore**: Create database with proper security rules
4. **Configure Storage**: Enable Firebase Storage for image uploads
5. **Generate Service Account**: Download service account key for backend

### Stripe Setup

1. **Create Stripe Account**
2. **Enable Stripe Identity**: For KYC verification
3. **Configure Webhooks**: Point to your API endpoint
4. **Test Payment Flow**: Use test cards in development

## 🔧 Development

### Code Quality
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build
```

### Testing
- Frontend: React Testing Library + Jest
- Backend: Supertest + Jest
- E2E: Playwright (recommended)

### Database Schema

The application uses Firestore with the following collections:

- **users**: User profiles and authentication data
- **properties**: Property listings and details
- **offers**: Property offers and negotiations
- **solicitors**: Solicitor directory and ratings
- **payments**: Payment records and transactions
- **notifications**: User notifications and alerts

## 🎯 Key Features Deep Dive

### 🏠 Property Listings
- **Multi-step Form**: Guided property listing with validation
- **Image Upload**: Drag & drop with preview and compression
- **Feature Selection**: Comprehensive property features list
- **Pricing**: £29.99 listing fee with Stripe integration

### 💼 Offer Management
- **Smart Offers**: Calculated deposits and validation
- **KYC Integration**: Required verification before offers
- **Real-time Updates**: Instant notifications for offer changes
- **Solicitor Matching**: Automatic solicitor recommendations

### 🛡️ Security Features
- **Firebase Auth**: Secure user authentication
- **Token Validation**: JWT tokens with expiration
- **Input Sanitization**: SQL injection and XSS protection
- **Rate Limiting**: API abuse prevention

### 📊 Admin Dashboard
- **User Management**: View and manage user accounts
- **Property Oversight**: Monitor and moderate listings
- **Payment Tracking**: View transactions and fees
- **Analytics**: Platform usage and revenue metrics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline comments
- **Issues**: Use GitHub Issues for bug reports
- **Discussions**: Use GitHub Discussions for questions

---

**Built with ❤️ by the SelfMove team**

*Ready to revolutionize the property market? Let's build the future of real estate together! 🚀* 