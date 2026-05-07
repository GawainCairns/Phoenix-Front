import { useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <><Header />
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Welcome to My React App!</h2>
      <p className="mb-4">This is a simple React application using Vite and Tailwind CSS.</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button>
    </div>
    <Footer /></>
  )
}
