
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'

function App() {


  return (
    <>
     <Header/>
      <h1>Hello World</h1>
      <Outlet />
     
    </>
  )
}

export default App
