import React, { useEffect } from 'react'
import styled from 'styled-components'

const ContainerMsg = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;

    width: 320px;
    padding: 2rem;

    font-size: 2rem;
    text-align: center;
    font-weight: bold;

    background-color: var(--color-font);
    color: var(--color-primary);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    transform: translate(-50%, 100%);

    transition: transform 300ms ease-in;
`

const ModalMsg = ({ msg }) => {
    useEffect(() => {
        setTimeout(() => {
            document.getElementById('msg-container').classList.add('ver-msg');
        }, 1);

        setTimeout(() => {
            document.getElementById('msg-container').classList.remove('ver-msg')
        }, 1300);
    }, []);

    return (
        <ContainerMsg id='msg-container'>
            {msg}
        </ContainerMsg>
    )
}

export default ModalMsg;