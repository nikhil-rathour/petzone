import { useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'

function App() {

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.error("Error checking user status:", error);
        dispatch(logout())
      })
      .finally(() => {
        setLoading(false)
        navigate("/")
      })
  }, [dispatch, navigate])

  return  !loading ? (
      <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
    ): null
  

}
export default App
