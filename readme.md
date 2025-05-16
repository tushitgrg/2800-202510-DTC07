# Scholiast

Scholiast is a web application that leverages AI to transform your study materials into interactive quizzes, flashcards, and concise summaries, enhancing your learning experience and tracking your progress.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)

  - [Server](#server)
  - [Client](#client)

- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **AI-Generated Quizzes**: Create custom quizzes with multiple-choice and true/false questions.
- **AI-Generated Flashcards**: Generate flashcards in various styles (standard, reversed, question & answer, cloze).
- **AI-Generated Summaries**: Produce concise summaries in short, medium, or comprehensive formats.
- **Dashboard**: View, edit, delete, and tag your generated resources.
- **Pomodoro Timer with Weather Integration**: Stay focused with a Pomodoro timer that adapts its theme based on local weather.
- **Authentication**: Google OAuth2 for secure user login and session management.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **AI Integration**: Google Generative AI (Gemini)
- **Authentication**: Passport.js (Google OAuth2)
- **State Management**: React hooks
- **Styling & UI**: Tailwind CSS, shadcn/ui components

## Prerequisites

- Node.js v14 or higher
- npm, yarn, or pnpm
- MongoDB instance (local or cloud)
- Google Cloud credentials for Gemini API
- Google OAuth2 credentials
- (Optional) Vercel account for deployment

## Environment Variables

Create a `.env` file in the `server/` directory with:

```bash
MONGO_URI=<your_mongodb_connection_string>
GEMINI_API_KEY=<your_gemini_api_key>
GOOGLE_CLIENT_ID=<your_google_oauth_client_id>
GOOGLE_CLIENT_SECRET=<your_google_oauth_client_secret>
SESSION_SECRET=<your_session_secret>
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
VERCEL=0
```

Create a `.env.local` file in the `client/` directory with:

```bash
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_WEATHER_API=<your_openweathermap_api_key>
```

## Installation

### Server

1. Navigate to the `server/` folder.
2. Install dependencies:

   ```bash
   cd server
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

### Client

1. Navigate to the `client/` folder.
2. Install dependencies:

   ```bash
   cd client
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Sign in with Google.
2. Upload a PDF (or other supported formats) of your study material.
3. Select which content types to generate (quiz, flashcards, summary).
4. Configure settings (number of questions, flashcard style, summary length).
5. View and interact with generated resources on the dashboard.
6. Use the Pomodoro timer to study, with real-time weather updates.

## Project Structure

```
├── client/            # Next.js application (frontend)
│   ├── app/           # Pages and layouts
│   ├── components/    # Reusable UI components
│   ├── lib/           # Utility modules (prompts, URLs)
│   └── public/        # Static assets
└── server/            # Express.js server (backend)
    ├── controllers/   # Request handlers
    ├── models/        # Mongoose schemas
    ├── routes/        # API routes
    └── utils/         # Helpers (AI client, file processing, authentication)
```

## API Endpoints

- `GET /resources/info` - List user’s resources.
- `POST /resources` - Upload PDF and generate content.
- `GET /resources/:id` - Retrieve full resource (quiz, flashcards, summary).
- `PUT /resources/:id` - Update resource title and tags.
- `DELETE /resources/:id` - Delete a resource.
- `GET /auth/google` - Initiate Google OAuth2.
- `GET /auth/google/callback` - Google OAuth2 callback.
- `GET /logout` - Log out the current user.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request.

## License

## Team Members

- **Tushit Garg** – Our Captain
- **Woojin Song** – Our Best Scrum Master & Spokesman
- **Emanuel Molla** – Our Backend Developer
- **Jimmy Cho** – Our Frontend Developer
- **Tracy Chung** – Our Placeholder (The 5th group mate)

## License

This project is licensed under the MIT License.
