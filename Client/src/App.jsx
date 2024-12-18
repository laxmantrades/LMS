import { useState } from 'react'
import { Route, Routes } from 'react-router'
import AuthPage from './pages/auth'



function App() {
 

  return (
    <Routes>
      <Route path={"/auth"} element={<AuthPage/>}/>
    </Routes>
  )
}

export default App
