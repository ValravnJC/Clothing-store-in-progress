import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import FormInput from "../components/form-input/form-input.component";
import Button from "../components/button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName,email,password,confirmPassword } = formFields;

    console.log(formFields);

    const handleSubit = async (e) => {
        e.preventDefault();
        const { user } = await createAuthUserWithEmailAndPassword(email,password);
        await createUserDocumentFromAuth (user, {displayName})
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubit}>
                <FormInput label="Display Name" onChange={handleChange} name="displayName" value={displayName} required type="text"/>
                <FormInput label="Email" onChange={handleChange} name="email" value={email} required type="email"/>
                <FormInput label="Password" onChange={handleChange} name="password" value={password} required type="password"/>
                <FormInput label="Confirm Password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required type="password" />

                <Button buttonType="google" type="submit">Sign up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;