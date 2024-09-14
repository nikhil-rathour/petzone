import React,{memo} from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn({setisHighlighted}) {
  const navigate = useNavigate();
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/login");
            setisHighlighted("/login")
        })
        
    }
  return (
    <button
    className='w-full px-6 py-2 font-semibold bg-[#e63579] text-white
    hover:bg-[#d62d6b] rounded-md transition duration-300 ease-in-out'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default memo(LogoutBtn)