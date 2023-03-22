import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "../form-input/form-input.style.scss";
import "./sign-up-form.styles.scss"
import Button from "../../components/button/button.component"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password does not match");
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log("response", response);
      if (response) {
        const { user } = response;
        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user as email already used ");
      }
      console.log("User creation encountered an error", error);
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
        <h2>Don't have an account ? </h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            required: true,
            onChange: onChangeHanlder,
            name: "displayName",
            value: displayName,
          }}
        />

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

        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: onChangeHanlder,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        
        />
        <Button  type="Submit"> Sign up </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
