import { Fragment } from "react";
import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"; 


const SignIn = () => {


    
  const logGoogleUser = async () => {
    // alert("dsd")
    const {user} = await signInWithGooglePopup();
   const userDocRef = await createUserDocumentFromAuth(user)
   console.log(userDocRef)
    
  };

  return (
    <Fragment>
      <h1>Signin component</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
    </Fragment>
  );
};

export default SignIn;
