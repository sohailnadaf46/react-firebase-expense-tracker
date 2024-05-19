import  {auth,  provider } from "../../config/firebase-config.js"
import { signInWithPopup } from "firebase/auth"
import { useNavigate} from "react-router-dom"
  import "../auth/Auth.css";

const Auth = () => {
  const navigate = useNavigate();

const signInGoogle =async () =>{
  const result  = await signInWithPopup(auth, provider);
  const authInfo = {
    userId : result.user.uid,
    name : result.user.displayName,
    profilePhoto : result.user.photoURL,
    isAuth : true,
  }
  localStorage.setItem("auth",JSON.stringify(authInfo))
  navigate("/expense-tracker")
}

  return (
    <div className="login-page">
      <h1>Sign in to continue</h1>
      <button onClick={signInGoogle}>Sign in with google</button>
    </div>
  )
}

export default Auth
