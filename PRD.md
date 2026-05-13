# Product Requirements Document (PRD) - Academic Outlier 🎓

## 1. Introduction
**Academic Outlier** is a premium MERN stack application designed to revolutionize the university discovery and student onboarding journey. It aims to bridge the gap between aspiring students and global academic opportunities through an intuitive, data-driven, and visually stunning interface.

## 2. Product Vision
To empower students worldwide by providing a seamless, secure, and personalized platform for academic exploration, ensuring that every "outlier" finds their perfect academic fit.

## 3. Target Audience
*   **High School Students**: Searching for undergraduate programs.
*   **Graduate Seekers**: Looking for specialized Master's or PhD opportunities.
*   **International Students**: Navigating the complexities of global education.
*   **Counselors/Advisors**: Assisting students in their academic journey.

## 4. Problem Statement
The current university discovery process is often fragmented, overwhelming, and lacks a personalized touch. Students struggle with:
*   Inconsistent information across various platforms.
*   Complex and insecure onboarding/application processes.
*   Lack of a centralized dashboard to manage their academic goals.

## 5. Core Features & Functional Requirements

### 5.1. Authentication & Security
*   **Local Auth**: Traditional email/password registration and login.
*   **Google OAuth**: One-click secure login for improved user friction.
*   **OTP Verification**: Multi-factor authentication via email (Nodemailer) for account verification.
*   **JWT Session Management**: Secure, stateless authentication for API requests.

### 5.2. Student Profile & Onboarding
*   **Multi-step Onboarding**: A guided workflow to collect academic interests, location preferences, and career goals.
*   **Dynamic Profiles**: User dashboard with editable profile details.
*   **Avatar Management**: Ability to upload and crop profile pictures (Multer + middleware).
*   **Document Vault**: A secure space for students to upload and manage academic transcripts and certificates.

### 5.3. University Discovery Engine
*   **Global Search**: Search through a comprehensive database of universities (supported by a seeder with 20k+ entries).
*   **Advanced Filtering**: Filter by location, domain, and academic ranking.
*   **Real-time Data**: Integrated data fetching for up-to-date university information.

### 5.4. Interactive UI/UX
*   **Glassmorphic Design**: A premium, modern aesthetic using semi-transparent elements and vibrant colors.
*   **Responsive Layout**: Fully optimized for mobile, tablet, and desktop viewing.
*   **Data Visualization**: Recharts integration for visualizing student progress or university statistics.

## 6. Non-Functional Requirements
*   **Performance**: Frontend built with Vite for ultra-fast load times.
*   **Scalability**: MongoDB for flexible data modeling and easy scaling.
*   **SEO**: Descriptive title tags and semantic HTML for better search engine visibility.
*   **Reliability**: Error handling middleware in the backend and robust API validation.

## 7. User Journeys

### 7.1. New User Onboarding
1.  User lands on the interactive landing page.
2.  Signs up via Google or Email + OTP.
3.  Completes the multi-step onboarding wizard.
4.  Redirected to their personalized dashboard.

### 7.2. University Search
1.  User navigates to the Discovery page.
2.  Uses the search bar and filters to find specific universities.
3.  Views detailed university profiles.
4.  Saves or "stars" universities of interest.

## 8. Success Metrics (KPIs)
*   **User Conversion**: Percentage of visitors who complete the onboarding flow.
*   **Engagement**: Average time spent on the Discovery page.
*   **Retention**: Frequency of dashboard logins.
*   **Performance**: Page load speed (aiming for < 2 seconds).

## 9. Future Roadmap
*   **AI Counselor**: An integrated AI chatbot to provide personalized university recommendations.
*   **Application Tracking**: Real-time status updates for university applications.
*   **Community Forum**: A space for students to connect and share experiences.
*   **Direct Messaging**: Secure communication between students and university representatives.

---
**Version:** 1.0.0  
**Author:** Antigravity (AI Assistant)  
**Status:** Draft
