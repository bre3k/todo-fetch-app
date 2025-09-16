import { useState, useEffect } from 'react'

// TodoItem Component
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

// PostItem Component
const PostItem = ({ post }) => {
  const [showFull, setShowFull] = useState(false);
  
  const truncatedBody = post.body.length > 100 
    ? post.body.substring(0, 100) + '...' 
    : post.body;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="font-bold text-lg text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-3 leading-relaxed">
        {showFull ? post.body : truncatedBody}
      </p>
      {post.body.length > 100 && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
        >
          {showFull ? 'Show Less' : 'View More'}
        </button>
      )}
    </div>
  );
};

// LoadingState Component
const LoadingState = () => (
  <div className="flex items-center justify-center py-8">
    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    <span className="ml-2 text-gray-600">Loading posts...</span>
  </div>
);

// ErrorState Component
const ErrorState = ({ onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <div className="text-red-600 mb-2">
      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <p className="text-red-700 mb-3">Failed to load posts</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Real posts data
const realPosts = [
  {
    id: 1,
    title: "10 Tips for Better React Development",
    body: "React has become one of the most popular JavaScript libraries for building user interfaces. Here are some essential tips to improve your React development skills: Use functional components with hooks instead of class components, implement proper state management with useState and useReducer, leverage useEffect for side effects, and always remember to clean up subscriptions to prevent memory leaks. Additionally, consider using React.memo for performance optimization and keep your components small and focused on a single responsibility."
  },
  {
    id: 2,
    title: "The Future of Web Development in 2024",
    body: "Web development continues to evolve rapidly with new technologies and frameworks emerging constantly. In 2024, we're seeing increased adoption of TypeScript for better code reliability, the rise of server-side rendering with Next.js and similar frameworks, and growing interest in WebAssembly for performance-critical applications. Progressive Web Apps (PWAs) are becoming more sophisticated, and the focus on web accessibility and performance optimization remains stronger than ever."
  },
  {
    id: 3,
    title: "Building Responsive Designs with TailwindCSS",
    body: "TailwindCSS has revolutionized how developers approach styling in web applications. Unlike traditional CSS frameworks, Tailwind provides utility-first classes that allow for rapid prototyping and consistent design systems. The framework includes responsive design utilities, dark mode support, and extensive customization options. By using classes like 'md:grid-cols-2' and 'hover:bg-blue-700', developers can create beautiful, responsive interfaces without writing custom CSS."
  },
  {
    id: 4,
    title: "JavaScript ES2024: New Features You Should Know",
    body: "JavaScript continues to evolve with ES2024 bringing several exciting new features to the language. The new Array.prototype.with() method allows for immutable array updates, while the Object.groupBy() method simplifies data transformation tasks. Additionally, improvements to async/await error handling and new built-in decorators make JavaScript development more powerful and expressive. These features help developers write cleaner, more maintainable code while improving application performance."
  },
  {
    id: 5,
    title: "API Design Best Practices for Modern Applications",
    body: "Designing robust APIs is crucial for modern web applications. Follow RESTful principles with proper HTTP methods and status codes, implement comprehensive error handling with meaningful error messages, and always include proper authentication and authorization mechanisms. Use consistent naming conventions for endpoints, implement pagination for large datasets, and provide clear API documentation. Consider using GraphQL for complex data fetching requirements and always version your APIs to maintain backward compatibility."
  }
];

function App() {
  // Todo state
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Posts state - using custom posts instead of API
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (err) {
        console.error('Error loading todos from localStorage:', err);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Load posts on mount - using custom posts instead of API
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    try {
      setLoading(true);
      setError(false);
      
      // Simulate loading time like a real API call
      setTimeout(() => {
        setPosts(realPosts);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error loading posts:', err);
      setError(true);
      setLoading(false);
    }
  };

  // If you want to keep the JSONPlaceholder API, uncomment this function
  // and replace loadPosts() with fetchPosts() in useEffect
  /*
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.slice(0, 5)); // First 5 posts only
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  */

  // Todo functions
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      };
      setTodos(prevTodos => [...prevTodos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Filter todos based on search term
  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Task statistics
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const remainingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Todo + Fetch App
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Todo Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Todo List
            </h2>
            
            {/* Add Todo */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addTodo}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add
              </button>
            </div>

            {/* Search/Filter */}
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Todo List */}
            <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? 'No tasks found' : 'No tasks yet. Add one above!'}
                </div>
              ) : (
                filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              )}
            </div>

            {/* Task Summary */}
            {totalTasks > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 text-center">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                    Total: {totalTasks}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                    Completed: {completedTasks}
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Remaining: {remainingTasks}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Posts Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Tech Blog Posts
            </h2>

            {loading && <LoadingState />}
            
            {error && <ErrorState onRetry={loadPosts} />}

            {!loading && !error && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {posts.map(post => (
                  <PostItem key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;