import React,{memo} from 'react'

function LogoutBtn() {
    const logoutHandler = () => {
        console.log('logout')
        
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