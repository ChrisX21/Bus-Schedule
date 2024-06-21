import styled from 'styled-components'
import { TbError404 } from "react-icons/tb";
import React from 'react'

function NotFound() {
    return (
        <>
            <Wrapper>
                <Icon color="black" />
                <Title>Not Found</Title>
                <Paragraph>The page you're trying to reach does not exist!</Paragraph>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.h1`
    font-size: 3rem;
    color: black;
    text-align: center;
    margin-top: 2rem;
`

const Paragraph = styled.p`
    font-size: 1.2rem;
    color: black;
    text-align: center;
    margin-bottom: 1rem;
`

const Icon = styled(TbError404)`
    font-size: 10rem;
    color: black;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
`

export default NotFound