import { useState } from "react";
import { signInUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils.js"
import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component.jsx";
import "./sign-in-form.styles.scss";

    const defaultFormFields = {
        email: "",
        password: ""
    }


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email,password } = formFields;
    const handleSubit = async (e) => {
        e.preventDefault();
        try{
        const { user } = await signInUserWithEmailAndPassword(email,password);
        console.log(user.displayName);
        } catch (error) {
            switch (error.code){
                case "auth/wrong-password":
                    alert("incorrect password or email");
                break
                case "auth/user-not-found":
                    alert("no user associated with this email");
                break
            default:
                console.log(error);
            }
        }
    }

    const signInWithGoogle = async () => {
        const {user}  = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }
    
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }
    return (
        <div className="sign-up-container">
            <h2>Sign in with your email and password</h2>
            <form onSubmit={handleSubit}>
                <FormInput label="Email" onChange={handleChange} name="email" value={email} required type="email"/>
                <FormInput label="Password" onChange={handleChange} name="password" value={password} required type="password"/>
                <div className="buttons-container">
                    <Button buttonType="" type="submit">Sign in</Button>
                    <Button buttonType="google" type="button" onClick={signInWithGoogle}>
                    Google Sign in
                    </Button>
                </div>
            </form>
        </div>
    );
}
    
export default SignInForm;
