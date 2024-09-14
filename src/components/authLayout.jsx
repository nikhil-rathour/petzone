import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

 function Protected({
    children,
    authentication = true
}) {
    const navigate = useNavigate()
    const [loader,SetLoader] = useState(true);
    const authstatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if(authentication && authstatus !== authentication)
        {
            navigate("/login")
        }

        else if( !authentication && authstatus !== authentication)
        {
            navigate("/")
        }
        SetLoader(false);
    } , [navigate,authentication,authstatus])

    return loader ? <h1>loading...</h1> : <>{children}</>
}
export default Protected;

