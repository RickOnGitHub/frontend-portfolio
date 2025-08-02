# Portfolio Vite + Vue.js frontend

A simple portfolio frontend built with Vite + Vue.js that connects to a headless Laravel backend via Axios.

## 🚀 Quick Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/RickOnGitHub/frontend-portfolio.git
cd frontend-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

The development server will start on `http://localhost:5173` by default.

## 🛠️ Tech Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite 6.3.5
- **Styling**: Scoped CSS with custom animations
- **HTTP Client**: Axios for API communication
- **Development**: Hot reload, modern JavaScript features

### Font Integration

- **Tomorrow**: Modern, tech-focused typography for headings
- **Quicksand**: Clean, readable font for body text
- Full weight support (100-900) with italic variants

## 📜 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code (if configured)
npm run lint
```

## 🔧 Configuration

### Vite Configuration

The project uses Vite for fast development and optimized builds. Configuration can be found in `vite.config.js`.

### API Integration

API calls are configured in `src/axios.js`. Update the base URL to connect to your Laravel backend:

```javascript
// src/axios.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://your-laravel-backend-url/api'
  // ... other configurations
})
```

## 📜 License

This project is open-source and available under the MIT License.

```
Copyright (c) 2025 Rick van Oirschot

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 💬 About the Author

Rick van Oirschot – Full-stack developer focused on performance-first, cleanly structured web experiences.
