import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome to Phoenix
        </h1>
        
        <p className="text-gray-600 text-center mb-8">
          Your React + Tailwind CSS environment is ready!
        </p>

        <div className="bg-indigo-50 rounded-lg p-6 mb-8">
          <p className="text-center text-3xl font-bold text-indigo-600 mb-4">
            {count}
          </p>
          <button
            onClick={() => setCount(count + 1)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Click Me
          </button>
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          <p className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✓</span>
            React 18 configured
          </p>
          <p className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✓</span>
            Tailwind CSS ready
          </p>
          <p className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✓</span>
            Vite dev server
          </p>
        </div>
      </div>
    </div>
  )
}
