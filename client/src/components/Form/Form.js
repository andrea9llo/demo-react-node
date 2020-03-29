import React, {
    useState,
    useCallback
} from 'react';
import './Form.css';
import axios from 'axios'

function ShowError() {
    return (
        <div className="ErrorContainer">
            <div className="Error">
                <p>Username or password are not valid. Please try again.</p>
            </div>
        </div>
    )
}

function Form() {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const url = 'http://localhost:3001/login';
            const payload = {
                username: name,
                password: password
            }
            const response = await axios.post(url, payload)
            if (response) {
                setError(false)
                alert('Successful Login')
            }
        } catch (errors) {
            setError(true)
        }
    }, [name, password])

    const onNameChange = useCallback((e) => {
        setName(e.target.value);
    }, [])

    const onPasswordChange = useCallback((e) => {
        setPassword(e.target.value)
    }, [])

    const inputs = [{
            placeholder: 'Username',
            type: 'text',
            onChange: onNameChange
        },
        {
            placeholder: 'Password',
            type: 'password',
            onChange: onPasswordChange
        }]

    return ( 
        <>
            <h1 className = "Title"> LOGIN </h1> 
            { error &&
                 <ShowError />
            }
            <div className = "FormContainer">
                <form className = "LoginForm" onSubmit = {onSubmitHandler}> 
                {inputs.map((input, key) =>
                    <input key = {key}
                        className = "Input"
                        placeholder = {input.placeholder}
                        type = {input.type}
                        onChange = {input.onChange}
                    />
                )} 
                <button className = "SubmitButton" onClick = {onSubmitHandler}> Submit</button>  
                </form >
            </div> 
        </>
    )
}

export default Form;