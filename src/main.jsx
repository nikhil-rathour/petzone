import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import Adopt from './pages/Adopt.jsx'
import Home from './pages/Home.jsx'
import PetCare from './pages/PetCare.jsx'
import PetFood from './pages/Petfood.jsx'
import ProfilePage from './pages/Profile.jsx'
import SellPet from './pages/SellPet.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import {Provider} from "react-redux"
import store from './store/store.js'
import Help from './pages/Help.jsx'
import Protected from './components/authLayout.jsx'
import Post from './pages/Post.jsx'
import AboutUs from './pages/Aboutus.jsx'
import EditPost from './pages/EditPost.jsx'
import MyPost from './pages/MyPost.jsx'
import Story from './pages/Story.jsx'
import StoryForm from './pages/storyform.jsx'
import StoryPost from './pages/StoryPost.jsx'
import TermsAndConditions from './pages/TermsAndConditions.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
          path: "/story",
          element: <Story/>,
        },
        {
          path: "/terms",
          element: <TermsAndConditions/>,
        },
        {
          path: "/storyform",
          element: <StoryForm/>,
        },
        {
          path: "/storypost/:id",
          element: <StoryPost/>,
        },
        {
          path: "/sell",
          element: (
            <Protected authentication = {true}>
              <SellPet/>
            </Protected>
          ),
      },
      {
        path : "/post/:slug",
        element : (
          <Protected authentication = {true} >
            <Post/>
          </Protected>
        )

      },
      {
        path : "/petfood",
          element: (
          <Protected >
            <PetFood/>
          </Protected>
        )
      },
      {
        path : "/mypost",
        element : (
          <Protected authentication = {true}>
            <MyPost/>
          </Protected>
        )

      },
      {
        path :"/edit-post/:slug",
        element : <EditPost/>

      },
      {
        path : "/aboutus",
        element : (
            <AboutUs/>
        )

      },

      {
        path : "/help",
        element: (
          
            <Help/>
        
        ),
      },
      {
        path : "/adopt",
        element: (
          <Protected authentication = {true}>
            <Adopt/>
          </Protected>
        ),
      },
      {
        path : "/profile",
        element: (
          <Protected authentication  = {true}>
            <ProfilePage/>
          </Protected>
        ),
      },
      {
        path : "/petcare",
        element: (
          <Protected authentication = {true}>
            <PetCare/>
          </Protected>
        ),
      },{
        
          path : "/login",
          element: (
            <Protected authentication = {false}>
              <Login/>
            </Protected>
          ),
      },{
        path : "/signup",
        element: (
          <Protected authentication = {false}>
            <Signup/>
          </Protected>
        ),
      }
      
        
    ],
},
])


createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  
)
