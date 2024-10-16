import { useSelector } from "react-redux"
import { useState , useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'

function Protected({authentication,children}) {
    console.log("Protected :: ")

    const [loader,setLoader] = useState(true);
    const authStatus = useSelector(state => state.status)
    console.log(authStatus)
    const navigate = useNavigate()

    useEffect(() => {
            
        //TODO : make it more easy to understand
        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }


        if(authentication && authStatus!==authentication)navigate('/login')
            else if(!authentication && authStatus!==authentication)navigate('/')

        setLoader(false)
    },[authStatus,navigate,authentication])

      console.log(children)
    return loader?<h1>Loading...</h1>: <>{children}</>
    

}

Protected.propTypes = {
    // children : PropTypes.element, // REVIEW : check types of Proptyauthentication : PropTypes.bool
 
}

export default Protected