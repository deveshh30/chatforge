import './App.css'
import Navbar from './components/Navbar'
import { Routes , Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SignUpPage from './pages/Signinpage'
import Loginpage from './pages/Loginpage'
import Settingspage from './pages/Settingspage'
import { useAuthStore } from './store/checkUserAuthentication'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Profilepage from './pages/Profilepage'
import { useTheme } from './store/useTheme'


function App() {
  const { authUser, checkAuth , isCheckingAuth } = useAuthStore();
  const { theme } = useTheme();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser) return (
    <span className="loading loading-ring loading-xl"></span>
  );

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={ authUser? <Homepage/> : <Navigate to="/login"/> }  />
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />}  />
        <Route path="/login" element={!authUser ? <Loginpage/> : <Navigate to="/" />}/>
        <Route path="/settings" element={<Settingspage/>}  />
        <Route path="/profile" element={ authUser? <Profilepage/> : <Navigate to="/login"/>}  />
      </Routes>
      <Toaster/> 
    </div>
  )
}

export default App
