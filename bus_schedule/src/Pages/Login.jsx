import React from 'react';
import styled from 'styled-components';

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.accessToken);

            window.location.href = '/';
        }
        catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container>
            <FormContainer>
                <h2>Login</h2>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <InputField type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                <InputField type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
            </FormContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);

    h2{
        margin-bottom: 1rem;
        margin-top: 0;
        font-size: 2rem;
    }
`;

const InputField = styled.input`
    padding: 1rem;
    margin-bottom: 1rem;
    width: 20rem;
    border: 0.1rem solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    padding: 1rem 2rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 1rem;
    font-size: 1rem;

    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 1rem;
`;

export default Login;
