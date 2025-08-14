import React from 'react'
import { IconoirProvider } from 'iconoir-react'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <div>
      <IconoirProvider
      iconProps={{
        color: '#0a009cff',
        strokeWidth: 1.5,
        width: '1em',
        height: '1em',
      }}>

        <Navbar />
    
      </IconoirProvider>
    </div>
  )
}

export default App