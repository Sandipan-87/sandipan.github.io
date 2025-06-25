import React, { useState } from 'react'
import Navbar from './components/Navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import { WatchLaterProvider } from './context/WatchLaterContext'
import WatchLaterPage from './Pages/WatchLaterPage/WatchLaterPage'

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <WatchLaterProvider>
      <div>
        <Navbar setSidebar={setSidebar}/>
        <Routes>
          <Route path='/' element={<Home sidebar={sidebar} />} />
          <Route path='/video/:categoryId/:videoId' element={<Video />} />
          <Route path="/watch-later" element={<WatchLaterPage />} />
        </Routes>
      </div>
    </WatchLaterProvider>
  )
}

export default App


