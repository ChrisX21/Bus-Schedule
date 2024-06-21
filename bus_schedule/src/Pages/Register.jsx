import React from 'react';
import styled from 'styled-components';

function Register() {
    return (
        <Container>
            <FormContainer>
                <h2>Register</h2>
                <InputField type="email" placeholder="Email" />
                <InputField type="password" placeholder="Password" />
                <InputField type="password" placeholder="Repeat Password" />
                <SubmitButton>Register</SubmitButton>
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

    h2 {
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

export default Register;
