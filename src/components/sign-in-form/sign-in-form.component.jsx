import { useState,useContext } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "../form-input/form-input.style.scss";
import "./sign-in-form.styles.scss";
import Button from "../../components/button/button.component";
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const {setCurrentUser} = useContext(UserContext)


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    // alert("dsd")
     await signInWithGooglePopup();
    
   
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthWithEmailAndPassword(email, password);
      setCurrentUser(user)
      resetFormFields();
    } catch (error) {
      console.log("error", error);

      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;

        case "auth/user-not-found":
          alert("No user associated with this email");
          break;

          default:
            console.log(error)
      }
    }
  };

  const onChangeHanlder = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account ? </h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            required: true,
            onChange: onChangeHanlder,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: onChangeHanlder,
            name: "password",
            value: password,
          }}
        />
        <div className="buttons-container">
          <Button type="Submit"> Sign In </Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            {" "}
            Google Sign In{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
