# Todo + Fetch App

React application built for intern developer test with todo management and data fetching capabilities.

## Features

### Core Requirements ✅
- Add, complete, delete todos with strikethrough styling
- LocalStorage persistence 
- Display 5 blog posts with bold titles
- Truncate post body to 100 characters with "View More" toggle

### Bonus Features ✅
- Search/filter todos
- Loading states and error handling
- Task statistics
- Responsive design with TailwindCSS

## Tech Stack

- React 18 + Vite
- TailwindCSS
- JavaScript ES6+
- LocalStorage

## Setup

```bash
# Clone and install
git clone https://github.com/bre3k/todo-fetch-app.git
cd todo-fetch-app
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── App.jsx       # Main component with todo and posts logic
├── index.css     # TailwindCSS imports
└── main.jsx      # React entry point
```

## Components

- **TodoItem** - Individual todo with toggle/delete
- **PostItem** - Blog post with expand/collapse
- **LoadingState** - Spinner animation
- **ErrorState** - Error display with retry

## Requirements Met

✅ React + Vite setup  
✅ TailwindCSS styling  
✅ Clean, modular code  
✅ Todo CRUD operations  
✅ Post fetching simulation  
✅ Proper React hooks usage  
✅ Responsive design  
✅ Error handling  

Built with ❤️ for React Intern Developer Test
