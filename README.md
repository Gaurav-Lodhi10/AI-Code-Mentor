# CodeMentor AI - Personalized Learning Recommender

An AI-powered coding mentor that analyzes your programming solutions and provides personalized learning recommendations for interview preparation.

## 🚀 Features

- 🔐 **Google Authentication** - Secure sign-in with Google
- 🤖 **AI Code Analysis** - Powered by Groq Llama 70B model
- 📊 **Personalized Feedback** - Strengths, improvements, and recommendations
- 📈 **Progress Tracking** - Monitor your learning journey with detailed statistics
- 🎯 **Interview Focus** - Tailored for LeetCode, HackerRank, and competitive programming
- 📋 **Recommendations Engine** - AI-generated personalized learning paths
- 🏆 **Performance Metrics** - Time/space complexity analysis and scoring
- 📚 **Resource Management** - Curated learning resources and milestones

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **AI**: Groq Llama 70B API
- **Styling**: Tailwind CSS

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Google OAuth credentials
- Groq API key

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd project
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Groq API
GROQ_API_KEY=your_groq_api_key
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔑 Getting API Keys

### MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string from Database Access
4. Replace `<username>`, `<password>`, `<cluster-url>`, and `<dbname>` in the DATABASE_URL

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

### Groq API
1. Go to [Groq Console](https://console.groq.com/)
2. Sign up and get your API key
3. The API is free for reasonable usage

## 📊 Database Schema

The application uses a comprehensive MongoDB schema with the following collections:

- **users** - User profiles and authentication
- **submissions** - Code submissions and solutions
- **code_analyses** - AI-generated code analysis results
- **learning_paths** - Personalized learning paths
- **milestones** - Learning milestones and progress tracking
- **problems** - Problem definitions and metadata
- **progress** - User progress tracking
- **recommendations** - AI-generated recommendations
- **resources** - Learning resources and materials
- **sessions** - User study sessions

## 🎯 Usage

1. **Sign In**: Use Google authentication to create your account
2. **Submit Code**: Paste your LeetCode/HackerRank solution
3. **Get Analysis**: Receive AI-powered feedback on your code
4. **Track Progress**: Monitor your improvement with detailed statistics
5. **Follow Recommendations**: Use personalized learning resources
6. **View Dashboard**: See your progress, recent submissions, and recommendations

## 🏗 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # Authentication
│   │   ├── analyze/route.ts             # Code analysis API
│   │   ├── progress/route.ts            # Progress tracking API
│   │   └── recommendations/route.ts     # Recommendations API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                         # Main dashboard
├── components/
│   ├── AuthProvider.tsx                 # NextAuth provider
│   ├── CodeSubmissionForm.tsx          # Code input form
│   ├── AnalysisDisplay.tsx             # Results display
│   └── ProgressDashboard.tsx           # Progress tracking
└── types/
    └── next-auth.d.ts                  # TypeScript declarations
```

## 🔧 API Endpoints

- `POST /api/analyze` - Analyze submitted code
- `GET /api/progress` - Get user progress and statistics
- `GET /api/recommendations` - Get personalized recommendations

## 🎨 Features in Detail

### Code Analysis
- **Strengths Identification**: AI identifies what you did well
- **Improvement Areas**: Specific areas for enhancement
- **Performance Metrics**: Time and space complexity analysis
- **Scoring System**: 0-100 score based on code quality

### Progress Tracking
- **Problem Count**: Total problems solved
- **Average Score**: Performance over time
- **Level Assessment**: Beginner/Intermediate/Advanced
- **Recent Activity**: Latest submissions and scores

### Recommendations
- **Priority-based**: High/Medium/Low priority recommendations
- **Type-specific**: Problems, resources, or concepts
- **Personalized**: Based on your analysis results
- **Actionable**: Clear next steps for improvement

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Similar to Vercel deployment
- **Railway**: Good for full-stack applications
- **Heroku**: Traditional deployment option

---

**Happy Coding! 🎉**
