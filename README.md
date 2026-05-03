# Academic Outlier 🎓

A comprehensive MERN stack application designed to streamline the university discovery and student onboarding process. **Academic Outlier** provides a premium, interactive experience for students to explore global academic opportunities, manage their profiles, and navigate the journey from discovery to enrollment.

## 🚀 Live Demo
- **Frontend (Vercel):** [https://academic-outlier.vercel.app](https://academic-outlier.vercel.app)
- **Backend (Render):** [https://academic-outlier.onrender.com](https://academic-outlier.onrender.com)

## ✨ Key Features

- **Personalized Student Profiles**: Custom dashboard with dynamic avatar uploads and profile management.
- **Global University Discovery**: Search and filter through thousands of universities worldwide with real-time data integration.
- **Secure Authentication**: Multi-step authentication including OTP verification and Google OAuth integration.
- **Onboarding Workflow**: Streamlined multi-step onboarding to collect student preferences and academic goals.
- **Interactive UI**: Premium glassmorphic design built with custom styling and modern UI components.
- **Document Management**: Integrated middleware for handling student document and image uploads.

## 🛠️ Tech Stack

### Frontend
- **React.js**: Modern UI library for a responsive user experience.
- **Vite**: Ultra-fast frontend build tool.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **React Router**: For seamless client-side navigation.
- **Recharts**: For data visualization on the student dashboard.

### Backend
- **Node.js & Express**: Robust server-side architecture.
- **MongoDB & Mongoose**: Flexible NoSQL database for student and university data.
- **Passport.js**: Comprehensive authentication middleware for Google OAuth and local strategies.
- **Multer**: Middleware for handling `multipart/form-data` for file uploads.
- **Nodemailer**: Secure email delivery service for OTP verification.
- **JWT**: Secure token-based authentication.

## 📦 Project Structure

```text
├── Backend/          # Node/Express server, models, and controllers
├── frontend/         # React/Vite application
│   └── academic_outlier/
├── .env              # Environment variables (local only)
└── README.md         # Project documentation
```

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kunalmore373/Academic_Outlier.git
   cd Hackathon
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory and add your configurations:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your_id
   GOOGLE_CLIENT_SECRET=your_secret
   FRONTEND_URL=https://academic-outlier.vercel.app
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend/academic_outlier
   npm install
   ```
   Create a `.env` file in the `frontend/academic_outlier` directory:
   ```env
   VITE_API_BASE_URL=https://academic-outlier.onrender.com/api
   ```
   Start the client:
   ```bash
   npm run dev
   ```

## 📧 Email Service Setup (OTP)

To enable OTP verification via email, you need to configure an SMTP service (like Gmail):

1.  Enable **2-Step Verification** on your Google Account.
2.  Go to **App Passwords** in your Google Security settings.
3.  Generate a new password for "Mail".
4.  Add it to your `Backend/.env`:
    ```env
    EMAIL_SERVICE=gmail
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-16-char-app-password
    ```

## 🔑 Google OAuth Setup

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project and configure the **OAuth consent screen**.
3.  Create **OAuth 2.0 Client IDs**.
4.  Add the following **Authorized redirect URIs**:
    - `http://localhost:3000/api/auth/google/callback` (for local development)
    - `https://academic-outlier.onrender.com/api/auth/google/callback` (for production)

---
Developed with ❤️ by Kunal More
