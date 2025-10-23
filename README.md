# 🌍 Code-Planet – Environmental Education Platform

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

## 📱 Product Overview

Code-Planet is a comprehensive environmental education platform designed to revolutionize how people learn about environmental protection and sustainability. The platform seamlessly connects learners, educators, and administrators within a unified digital ecosystem, making environmental education engaging, interactive, and accessible to everyone.

Whether you're an individual looking to expand your environmental knowledge or an educator seeking to create impactful learning content, Code-Planet provides the tools and gamification needed to deliver modern, effective environmental education.

## 🎯 Objectives & Core Purpose

### Primary Mission
To bridge the gap between environmental awareness and practical action through an integrated platform that makes environmental education engaging, accessible, and measurable through gamification and interactive learning.

### Key Goals
- **Educational Impact**: Provide comprehensive environmental education through structured lessons and interactive content
- **Engagement**: Gamify learning with points, rankings, and achievements to motivate continuous learning
- **Accessibility**: Make environmental education available to everyone through mobile-first design
- **Progress Tracking**: Enable users to monitor their learning journey and environmental knowledge growth

## ✨ Key Features

### 🔐 Multi-Role Authentication & Security
- Secure login system for users and administrators
- Role-based access control (RBAC) with different permission levels
- JWT authentication with secure password encryption
- User profile management with avatar customization

### 👤 Comprehensive User Management
- **User Profiles**: Complete learning profiles with progress tracking and achievements
- **Admin Management**: Content creation and user management capabilities
- **Avatar System**: Customizable user avatars and profile pictures
- **Progress Tracking**: Detailed learning analytics and performance metrics

### 📚 Advanced Learning Management System
- **Category Management**: Organized environmental topics (Bảo vệ môi trường, Đa dạng sinh học, etc.)
- **Lesson Creation**: Rich content editor with CKEditor for comprehensive lesson materials
- **Mini Games**: Interactive quizzes and games for lesson reinforcement
- **Content Structure**: Lessons with descriptions, content, and practice games

### 🎮 Gamification & Assessment System
- **Multi-Level Quizzes**: Basic, Intermediate, and Advanced difficulty levels
- **Question Banks**: Comprehensive question management across all categories
- **Scoring System**: Point accumulation for lessons and quiz completions
- **Ranking System**: User leaderboards and personal achievement tracking

### 🏆 Achievement & Ranking System
- **Point System**: Earn points through lesson completion and quiz performance
- **Personal Rankings**: Individual progress tracking and skill assessment
- **Achievement Badges**: Recognition for learning milestones and environmental knowledge
- **Activity Logs**: Green blog activities categorized by environmental topics

### 📊 Analytics & Progress Tracking
- **Learning Analytics**: Track progress across different environmental categories
- **Performance Metrics**: Quiz scores, lesson completion rates, and time spent learning

## 🛠️ Technologies Used

### Mobile Application (React Native + Expo)
- **React Native** with Expo for cross-platform mobile development
- **TypeScript** for type-safe development
- **NativeWind** for utility-first styling with Tailwind CSS
- **Redux Toolkit** for state management
- **React Query** for efficient data fetching and caching
- **React Navigation** for seamless navigation experience

### Web Admin Panel (Next.js)
- **Next.js** with TypeScript for robust web application development
- **Tailwind CSS** for responsive, customizable UI design
- **Ant Design** for professional admin interface components
- **Redux Toolkit** for state management
- **React Query** for API communication and caching
- **CKEditor** for rich content creation and editing

### Development & Build Tools
- **TypeScript** for type safety across the entire stack
- **ESLint & Prettier** for code quality and formatting
- **Jest** for testing framework
- **Metro** for React Native bundling
- **Babel** for JavaScript compilation

## 🚀 Installation Guide

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** or **yarn** package manager
- **Expo CLI** for mobile development
- **Git** for version control

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/JerryTheCoder0310/CodePlanet
cd code-planet
```

#### 2. Mobile App Setup (React Native + Expo)
```bash
cd apps
npm install
# or
yarn install

# Start the development server
npm start
# or
yarn start
```

#### 3. Admin Panel Setup (Next.js)
```bash
cd admin
npm install

# Copy environment file
cp .env.development .env.development.local

# Start development server
npm run dev
# or
yarn dev
```

#### 4. Configuration
```env
# Database Configuration
DATABASE_URL=your_database_connection_string

# API Configuration
API_BASE_URL=your_api_base_url

# Authentication
JWT_SECRET=your_jwt_secret_key

# File Upload
UPLOAD_MAX_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif
```

## 📋 System Architecture

### User Roles & Permissions
- **Admin**: Full system access, content management, user management
- **User**: Access to learning content, quizzes, progress tracking, and rankings

### Content Structure
- **Categories**: Environmental topics (Bảo vệ môi trường, Đa dạng sinh học, Giới thiệu môi trường, etc.)
- **Lessons**: Individual learning units with content, descriptions, and mini-games
- **Quizzes**: Multi-level assessments (Basic, Intermediate, Advanced)
- **Activities**: Green blog activities and environmental engagement

## 🔒 Security Features

- **Data Encryption**: Secure handling of user data and progress information
- **Access Control**: Role-based permissions for different user types
- **Authentication**: Secure login and session management
- **Input Validation**: Protection against malicious input and data corruption
- **Privacy Protection**: User data privacy and GDPR compliance considerations

## 📈 Future Roadmap

### Phase 1 (Current)
- ✅ Core learning management system
- ✅ Basic quiz and assessment functionality
- ✅ User progress tracking and rankings

### Phase 2 (Next 6 months)
- 🔄 Advanced analytics dashboard
- 🔄 Social learning features
- 🔄 Offline learning capabilities

### Phase 3 (Next 12 months)
- 📅 AI-powered personalized learning paths
- 📅 AR/VR environmental simulations
- 📅 Community challenges and competitions

## 🌱 Environmental Impact

Code-Planet is committed to promoting environmental awareness and action through education. By making environmental knowledge accessible and engaging, we aim to:

- **Educate** millions of users about environmental protection
- **Inspire** positive environmental action and lifestyle changes
- **Connect** learners with practical environmental solutions
- **Measure** the impact of environmental education on real-world behavior

## 🤝 Contributing
We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
**Code-Planet** - Empowering environmental education through technology 🌍✨

*"Học hỏi, hành động, bảo vệ hành tinh xanh!"*
