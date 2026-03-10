import './App.css'
import Navbar from './components/Navbar'
import { Routes , Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Signinpage from './pages/Signinpage'
import Loginpage from './pages/Loginpage'
import Settingspage from './pages/Settingspage'
import Profilepage from './pages/Profilepage'
import { checkUserAuthenticated } from './store/checkUserAuthentication'
import { useEffect } from 'react'


function App() {
  const { authUser, checkAuth , isCheckingAuth } = checkUserAuthenticated()

  useEffect(() => {
      checkAuth()
  }, [checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser) return (
    <span className="loading loading-ring loading-xl"></span>
  );

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={ authUser? <Homepage/> : <Navigate to="/login"/> }  />
        <Route path="/signup" element={!authUser ? <Signinpage/> : <Navigate to="/" />}  />
        <Route path="/login" element={!authUser ? <Loginpage/> : <Navigate to="/" />}/>
        <Route path="/settings" element={<Settingspage/>}  />
        <Route path="/proile" element={ authUser? <Profilepage/> : <Navigate to="/login"/>}  />
      </Routes>
    </>
  )
}

export default App
