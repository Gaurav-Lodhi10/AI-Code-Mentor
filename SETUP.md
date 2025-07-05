# Setup Guide for CodeMentor AI

## Current Status
✅ **Frontend**: Complete and working  
✅ **Authentication**: Working with Google OAuth  
✅ **AI Analysis**: Implemented with Groq Llama 70B  
⚠️ **Database**: Needs configuration  
⚠️ **Environment Variables**: Need GROQ_API_KEY  

## Quick Fix for Database Connection

### 1. Fix MongoDB Connection String

Your current `.env` file has an invalid MongoDB connection string. Update it with:

```env
# Database - Replace with your actual MongoDB Atlas connection string
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/codementor-ai?retryWrites=true&w=majority"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Groq API (required for AI code analysis)
GROQ_API_KEY=your_groq_api_key
```

### 2. Get MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, `<cluster-url>` with your actual values
6. Add `/codementor-ai` at the end for the database name

### 3. Get Groq API Key

1. Go to [Groq Console](https://console.groq.com/)
2. Sign up or log in
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the key and add it to your `.env` file as `GROQ_API_KEY`

### 4. Push Database Schema

After fixing the connection string, run:

```bash
npx prisma db push
```

### 5. Re-enable Database Features

Once the database is working, you can re-enable the database features by:

1. Uncomment the Prisma imports in API routes
2. Replace mock data with actual database queries
3. Re-enable the Prisma adapter in NextAuth

## Current Features Working

- ✅ **Authentication**: Google OAuth sign-in/sign-out
- ✅ **Dashboard**: Shows mock data for all components
- ✅ **Code Submission**: Form works (returns mock analysis)
- ✅ **Navigation**: All pages accessible
- ✅ **UI Components**: All dashboard components working

## Next Steps

1. **Fix MongoDB connection** (see above)
2. **Get Google OAuth credentials** (if not done)
3. **Get Groq API key** (required - for AI code analysis)
4. **Push database schema**
5. **Re-enable database features**

## Testing the Application

The application is currently running with mock data, so you can:

1. Sign in with Google
2. View the dashboard with mock progress data
3. Submit code and see mock analysis
4. Navigate between different sections

All the UI components are fully functional and will work with real data once the database is configured. 