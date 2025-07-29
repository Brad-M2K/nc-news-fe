# NC News Frontend

A modern, responsive news application built with React as part of the Northcoders Full Stack Development bootcamp. This frontend connects to a custom-built REST API to deliver a seamless news browsing and discussion experience.

## 🚀 Live Demo

**[View Live Application](https://nc-news-fe-wmuy.onrender.com)**

## 📋 Project Overview

NC News is a social news aggregation and discussion platform that allows users to:

- **Browse Articles**: View articles across different topics with sorting and filtering options
- **Read Full Articles**: Detailed article view with images, content, and metadata
- **Engage with Content**: Vote on articles and participate in comment discussions
- **Topic Navigation**: Filter content by specific topics like cooking, coding, and football
- **Responsive Design**: Optimized for both desktop and mobile experiences

## 🛠 Technologies Used

- **React 19** - Frontend framework with hooks and context
- **React Router DOM** - Client-side routing and navigation
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with responsive design
- **React Spinners** - Loading indicators
- **SVG Icons** - Custom icon set with SVGR integration

## ⚡ Features

### Core Functionality
- **Article Listing**: Browse all articles with topic filtering
- **Article Sorting**: Sort by date, votes, or comment count (ascending/descending)
- **Individual Article View**: Full article content with voting and comments
- **Comment System**: View, add, and delete comments (authenticated users)
- **Voting System**: Upvote/downvote articles and see real-time vote counts
- **Topic Pages**: Dedicated pages for each topic category

### User Experience
- **Responsive Navigation**: Fixed header with floating nav on scroll
- **Loading States**: Smooth loading spinners throughout the app
- **Error Handling**: Comprehensive error pages for 404s and network issues
- **Back to Top**: Floating button for easy navigation
- **Active Card Highlighting**: Visual feedback for currently viewed content

## 🏗 Architecture

### Component Structure
```
App
├── UserProvider (Context)
│   └── BrowserRouter
│       ├── Header
│       ├── FloatingNavOnHeaderHide
│       │   └── NavBar
│       ├── Routes
│       │   ├── HomePage → ArticleList → ArticleCard
│       │   ├── ArticleView → CommentList → CommentCard
│       │   ├── TopicPage → TopicsList/ArticleList
│       │   └── ErrorPage
│       ├── Footer
│       └── BackToTopButton
```

### API Integration
- **Base URL**: `https://nc-news-api-b3sf.onrender.com/api`
- **Endpoints**: Articles, Topics, Comments, Users, Votes
- **Error Handling**: Network errors, 404s, and validation errors
- **Loading States**: Consistent loading patterns across all data fetching

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nc-news-fe.git
   cd nc-news-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ArticleView.jsx  # Individual article page
│   ├── ArticleList.jsx  # Article listing with sorting
│   ├── ArticleCard.jsx  # Article preview cards
│   ├── CommentList.jsx  # Comments section
│   ├── TopicPage.jsx    # Topic-specific pages
│   └── ...              # Other UI components
├── contexts/            # React Context providers
│   └── UserContext.jsx  # User authentication state
├── utils/               # API utilities
│   ├── fetchArticles.js # Article data fetching
│   ├── fetchTopics.js   # Topic data fetching
│   └── ...              # Other API functions
├── assets/              # Images and SVG icons
└── planning/            # Project documentation
    ├── component-tree.md
    └── Longterm-Plan.md
```

## 🎯 Key Learning Outcomes

This project demonstrates proficiency in:

- **React Ecosystem**: Hooks, Context API, Router, and modern patterns
- **State Management**: Complex state with multiple data sources
- **API Integration**: RESTful API consumption with error handling
- **Responsive Design**: Mobile-first CSS with modern layouts
- **User Experience**: Loading states, error boundaries, and accessibility
- **Performance**: Optimized renders and efficient data fetching

## 🔮 Future Enhancements

See the [Long-term Plan](planning/Longterm-Plan.md) for detailed roadmap including:

- User authentication and profiles
- Advanced content filtering and search
- Real-time notifications
- Dark mode toggle
- Admin dashboard for content curation

## 🤝 Northcoders Sprint Project

This project was built as part of the Northcoders Full Stack Development bootcamp frontend phase. It connects to a custom REST API (also built during the bootcamp) and demonstrates the culmination of React learning objectives.

**Backend Repository**: *[Link to be added when backend README is complete]*

## 📝 License

This project is open source and available under the MIT License.

---

*Built with ❤️ during the Northcoders bootcamp*
