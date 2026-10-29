import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Searchform from './components/SearchForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Searchform />
    </>
  )
}

export default App
