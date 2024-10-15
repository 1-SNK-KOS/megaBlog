
import { useState } from 'react';
import './App.css'
import { Footer,Header } from './components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';

function App() {
  //  console.log(process.env.REACT_APP_APPWRITE_URL);// in different framework and lib to import env method are different
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading,setLoading] = useState(true);
  
  const dispatch = useDispatch();


  useEffect(() => {
     authService.getCurrentUserStatus()
                .then((userData) =>{
                  if(userData){
                    console.log(userData);
                    dispatch(login({userData}))  // TODO : try sending without crly bracket of login fn parameter
                  }
                  else{
                       dispatch(logout())
                  }
                })
                .catch((error) => {
                  console.log('Error in fetching currentUSerStatus :: App.js :: ',error);
                })
                .finally(() => {
                  setLoading(false)
                })
  },[])

  // return (
  //   <>
  //     <h1>Lets Start with Appwrite</h1>
  //     <Header/>
  //     {/* <Outlet/> // when we configure react router */}
  //     <Footer/>
  //   </>
  // )

  return !loading? <div>
    <Header/>
     <main>
      {/* <Outlet/> TODO : make reat routeer */}
     </main>
    <Footer/>  
  </div> : <div>Please LoGIN!!!</div>
}

export default App
