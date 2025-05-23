# Scholiast

## 📑 Table of Contents

1. [Project Description](#project-description)
2. [Technologies Used](#technologies-used)
3. [File Structure](#file-structure)
4. [Installation](#how-to-install-or-run-the-project)
5. [Usage](#how-to-use-the-product-features)
6. [Credits & References](#credits-references-and-licenses)
7. [Contact](#contact-information)
8. [Testing Plan](#testing-plan)
9. [Known Issues](#known-issues)
10. [Future Enhancements](#future-enhancements)

## Project Description

Scholiast is an AI-powered web application that transforms your study materials into interactive quizzes, flashcards, and concise summaries, enhancing your learning experience and tracking your progress.

## Technologies Used

### Frontend

- **Next.js 15** - React framework for production
- **React 18** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **shadcn/ui** - Re-usable components built on Radix UI
- **Lucide React** - Icon library

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Passport.js** - Authentication middleware (Google OAuth2)
- **Express Session** - Session management
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Database

- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling for Node.js

### AI & APIs

- **Google Generative AI (Gemini 2.0 Flash)** - Content generation
- **YouTube Transcript API** - Video transcript extraction
- **OpenWeatherMap API** - Weather data for Pomodoro timer

### Additional Tools

- **PDFKit** - PDF processing
- **React Hot Toast** - Notification system
- **JSON Web Tokens** - Secure token-based authentication

## File Structure

```
├── client/                    # Next.js frontend application
│   ├── app/
│   │   ├── about/
│   │   │   └── page.jsx
│   │   ├── community/
│   │   │   └── page.jsx
│   │   ├── create/
│   │   │   └── page.jsx
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   ├── pomodoro/
│   │   │   └── page.jsx
│   │   ├── profile/
│   │   │   └── page.jsx
│   │   ├── resource/
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   ├── test/
│   │   │   └── page.jsx
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── components/
│   │   ├── Community/
│   │   ├── Landing/
│   │   ├── Pomodoro/
│   │   ├── ProfileCard/
│   │   ├── Resources/
│   │   ├── aboutUs/
│   │   ├── badge/
│   │   ├── dashboard/
│   │   ├── flashcards/
│   │   ├── layout/
│   │   ├── profile/
│   │   ├── quizzes/
│   │   ├── summaries/
│   │   └── ui/
│   ├── hooks/
│   │   ├── use-auth.js
│   │   └── use-mobile.js
│   ├── lib/
│   │   ├── addToDashboard.js
│   │   ├── clientAuth.js
│   │   ├── mongodb.js
│   │   ├── progress.js
│   │   ├── prompts.js
│   │   ├── updateResource.js
│   │   ├── urls.js
│   │   ├── userLocation.js
│   │   └── utils.js
│   ├── public/
│   ├── components.json
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   └── tailwind.config.js
├── server/                    # Express.js backend application
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── authMiddleware.js
│   │   ├── expMiddleware.js
│   │   ├── progressController.js
│   │   ├── resourceController.js
│   │   ├── shareController.js
│   │   ├── sharedResourceMiddleware.js
│   │   └── userController.js
│   ├── data/
│   │   └── lowercased-schools.json
│   ├── models/
│   │   ├── flashcardModel.js
│   │   ├── progressModel.js
│   │   ├── quizModel.js
│   │   ├── resourceModel.js
│   │   ├── summaryModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── progressRoutes.js
│   │   ├── resourceRoutes.js
│   │   ├── schoolRoutes.js
│   │   └── user.js
│   ├── utils/
│   │   ├── GetYoutubeTranscript.js
│   │   ├── addFlashcardEntry.js
│   │   ├── addQuizEntry.js
│   │   ├── addSummaryEntry.js
│   │   ├── db.js
│   │   ├── fileHandler.js
│   │   ├── geminiClient.js
│   │   ├── google_auth.js
│   │   └── mongodb.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── vercel.json
├── .gitignore
└── readme.md
```

## How to Install or Run the Project

### Prerequisites

#### Required Software (Both Windows & macOS)

1. **Node.js** (v18 or higher)

   - Windows: Download from [nodejs.org](https://nodejs.org/)
   - macOS: `brew install node` or download from [nodejs.org](https://nodejs.org/)

2. **Git**

   - Windows: Download from [git-scm.com](https://git-scm.com/)
   - macOS: `brew install git` or use Xcode Command Line Tools

3. **MongoDB** (Choose one option):

   - **Option A (Recommended)**: Use MongoDB Atlas (cloud database)
     - Create free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - **Option B**: Install MongoDB locally
     - Windows: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
     - macOS: `brew install mongodb-community`

4. **Code Editor** (Recommended: VS Code)
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

#### Required API Keys

1. **Google Cloud Console** (for Gemini AI and OAuth):

   - Visit [console.cloud.google.com](https://console.cloud.google.com/)
   - Create new project or select existing one
   - Enable Google Generative AI API
   - Enable Google+ API for OAuth
   - Create credentials (OAuth 2.0 client ID and API key)

2. **OpenWeatherMap API** (for Pomodoro weather feature):
   - Sign up at [openweathermap.org](https://openweathermap.org/api)
   - Get free API key

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/tushitgrg/2800-202510-DTC07.git
cd scholiast
```

#### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in the `server/` directory:

```env
JWT_SECRET=your_JWT_secret_key
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
SESSION_SECRET=your_random_session_secret
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
VERCEL=0
```

#### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `.env.local` file in the `client/` directory:

```env
JWT_SECRET=your_JWT_secret_key
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_WEATHER_API=your_openweathermap_api_key
```

#### 4. Google OAuth Configuration

1. In Google Cloud Console, go to "Credentials"
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - `http://localhost:3001/auth/google/callback` (development)
4. Add authorized JavaScript origins:
   - `http://localhost:3000` (frontend)
   - `http://localhost:3001` (backend)

#### 5. Running the Application

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

Server runs on http://localhost:3001

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

Frontend runs on http://localhost:3000

**Note:** A `passwords.txt` file containing admin and user credentials has been submitted to the D2L Dropbox.  
This file is **not included in the repository** for security reasons and is intended for instructor access only.

#### 6. Verification

1. Open http://localhost:3000 in your browser
2. Click "Get Started" to test Google OAuth
3. Try uploading a PDF and generating content

### Common Installation Issues

#### Windows-Specific

- If you encounter "execution policy" errors with npm, run PowerShell as administrator and execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Ensure Windows Defender isn't blocking Node.js

#### macOS-Specific

- If using Homebrew, update it first: `brew update`
- For permission issues, avoid using `sudo` with npm

#### General Issues

- **Port conflicts**: Change ports in environment variables if 3000/3001 are in use
- **MongoDB connection**: Ensure your MongoDB instance is running and connection string is correct
- **API key issues**: Verify all API keys are active and have proper permissions

## How to Use the Product (Features)

### Core Features

#### 1. **AI Content Generation**

- Upload PDF documents or provide YouTube video URLs
- Generate interactive quizzes with customizable difficulty and question types
- Create flashcards in multiple formats (standard, reversed, Q&A, cloze deletion)
- Produce summaries in various lengths (short, medium, comprehensive)

#### 2. **Dashboard Management**

- View all your generated resources in an organized grid
- Edit resource titles and add tags for organization
- Filter resources by tags, search by title, and sort by date or name
- Delete unwanted resources
- Share resources publicly with the community

#### 3. **Interactive Learning Tools**

- **Quizzes**: Take timed quizzes with immediate feedback and scoring
- **Flashcards**: Flip through cards with self-assessment tracking
- **Summaries**: Read AI-generated summaries with progress tracking

#### 4. **Community Features**

- Browse public resources shared by other users
- Filter by school, course, or search terms
- Add community resources to your personal dashboard
- Like and share resources

#### 5. **Pomodoro Timer with Weather Integration**

- Focus timer with work/break cycles (25min work, 5min break)
- Real-time weather integration that changes background themes
- Background music that matches weather conditions
- Location-based weather data

#### 6. **Progress Tracking**

- Track quiz scores and flashcard performance
- Visual progress indicators on dashboard
- Achievement system with badges
- Experience points and leveling system

#### 7. **User Profile Management**

- Google OAuth authentication
- Editable profile with school information
- Achievement display and statistics

### Usage Workflow

1. **Sign In**: Use Google account to authenticate
2. **Create Content**: Upload PDF or YouTube URL → Select content types → Configure settings → Generate
3. **Study**: Access generated materials from dashboard, take quizzes, review flashcards,and go over study summaries
4. **Track Progress**: Monitor performance through dashboard metrics
5. **Focus**: Use Pomodoro timer for structured study sessions
6. **Share**: Make resources public for community access

## Credits, References, and Licenses

### AI Usage Transparency

We used Google Generative AI (Gemini 2.0 Flash) **only** for educational content generation — including summaries, quizzes, and flashcards.  
AI was **not** used to generate or assist with the project's codebase, documentation, or testing.

### AI Services Used

- **Google Generative AI (Gemini 2.0 Flash)**: Used for generating quiz questions, flashcard content, and summaries from uploaded PDFs and YouTube transcripts. Specific usage includes:
  - Content analysis and extraction of key concepts
  - Question generation with multiple choice and true/false formats
  - Flashcard creation in various styles
  - Text summarization with configurable length and focus areas

### APIs and Third-Party Services

- **Google OAuth 2.0**: User authentication and authorization
- **OpenWeatherMap API**: Real-time weather data for Pomodoro timer theming
- **YouTube Transcript API**: Extracting transcripts from YouTube videos for content generation

### Open Source Libraries

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion, shadcn/ui, Lucide React
- **Backend**: Express.js, Passport.js, Mongoose, Multer, PDFKit
- **Database**: MongoDB with Mongoose ODM

### Fonts and Assets

- **Geist Sans & Geist Mono**: Typography fonts from Vercel
- **Weather Videos**: Custom background videos for different weather conditions
- **Icons**: Lucide React icon library

### License

This project is licensed under the MIT License. See individual package licenses for third-party dependencies.

## Contact Information

### Development Team

- **Tushit Garg** - Project Captain
- **Woojin Song** - Scrum Master & Documentation Lead
- **Emanuel Molla** - Backend Developer
- **Jimmy Cho** - Frontend Developer
- **Tracy Chung** - Project Support

### Faculty Supervisor

**Name**: Alireza Davoodi
**Email**: [adavoodi@bcit.ca](mailto:adavoodi@bcit.ca)

### Repository

https://github.com/tushitgrg/2800-202510-DTC07

## Additional Information

### Project Status

**Current Version**: 1.0.0 (Development)
**Status**: Active Development
**Last Updated**: January 2025

### Testing Plan

A comprehensive testing plan has been implemented covering:

- Unit tests for utility functions
- Integration tests for API endpoints
- End-to-end tests for user workflows
- Performance testing for AI content generation
- Cross-browser compatibility testing

https://docs.google.com/spreadsheets/d/1jbRCz3RR-g_bMH03ywu868D6p3ZVEAZiktL9yjrz9oE/edit?usp=sharing

### Known Issues

- Large PDF files (>50MB) may cause upload timeouts
- YouTube transcript extraction occasionally fails for private videos
- Weather API rate limiting during peak usage

### Future Enhancements

- Mobile app development
- Additional file format support (DOCX, PPT)
- Collaborative study groups
- Advanced analytics and insights
- Offline mode capabilities

### Development Notes

- Environment variables must be properly configured for all features to work
- Google Cloud APIs require billing account for production usage
- MongoDB Atlas free tier supports up to 512MB storage
- Weather videos are stored locally and require adequate server storage
