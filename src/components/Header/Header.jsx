// import React from 'react'
import { useSelector } from 'react-redux'
import {LogoutBtn,Logo,Container} from '../index';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // TODO : Change it to Navlink so current page can be highlighted in nav bar


function Header() {
  
  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate();

  const navItems = [
    {
      name:'Home',
      slug:'/',  // slug or url
      active:true
    },
    {
      name:'Login',
      slug:'/login',
      active:!authStatus
    },
    {
      name:'SignUp',
      slug:'/signup',
      active:!authStatus
    },
    {
      name:'All Posts',
      slug:'/all-posts',
      active:authStatus
    },
    {
      name:'Add Post',
      slug:'/add-post',
      active:authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
    <Container>
     <nav className='flex'>
      <div className='mr-4'>
        <Link to='/'>
        <Logo width='70px'/>
        </Link>
      </div>
      <ul  className='flex ml-auto'>
        {
         navItems.map((item) => item.active? 
         (
          <li key={item.name}>
            <button
            onClick={() => navigate(item.slug)}
             className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            >
              {item.name}
            </button>
          </li>
         )
         :null 
        )}
        { // if authstatus is true then only display the following as (inside it the content is consider true)
          authStatus && (
            <li>
              <LogoutBtn/>
            </li>
          )}
      </ul>
     </nav>
    </Container>
    </header>
  )
}

export default Header