import React, { useEffect, useRef } from 'react'
import logo from '/img/cropped-logo-Alternova.png'
import styled from 'styled-components'
import { useSelector } from 'react-redux';

const Header = styled.header`
    position: sticky;
    top: 0;
    z-index: 1;

    min-width: 320px;
    height: 10vh;
    max-height: 80px;
    padding: 0 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: var(--color-bg);
    box-shadow: 5px 0 10px black;

    @media screen and (min-width: 600px){
        justify-content: center
    }
`;

const ContainerImg = styled.a`
    width: 100%;
    max-width: 400px;

    img {
        max-width: 100%;
    }
`;

const BtnCart = styled.button`
    position: relative;

    width: 70px;
    aspect-ratio: 1;

    font-size: 3rem;

    background-color: transparent;
    color: var(--color-font);
    border: none;

    cursor: pointer;

    @media screen and (min-width: 600px){
        position: absolute;
        right: 2rem;
    }
`;

const BtnCounter = styled.span`
    position: absolute;
    top: 15%;
    right: 0;

    width: 20px;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.2rem;
    font-weight: bolder;

    background-color: var(--color-primary);
    color: var(--color-font);
    border-radius: 50%;
    border: 2px solid black;

    transition: transform 200ms ease;
`;

const Navbar = ({ setVisibleCart, visibleCart }) => {
    const cart = useSelector(state => state.cart);
    const quantyProducts = cart.reduce((total, prod) => total + prod.quanty, 0);
    const $btnCounter = useRef();

    const onClickCart = e => {
        if (visibleCart) {
            document.getElementById('cart-container').classList.remove('ver-cart');

            setTimeout(() => {
                setVisibleCart(!visibleCart);
            }, 300);
        } else {
            setVisibleCart(!visibleCart);
        }
    }

    useEffect(() => {
        if (quantyProducts) {
            setTimeout(() => {
                $btnCounter.current.classList.add('add-product');
            });

            setTimeout(() => {
                $btnCounter.current.classList.remove('add-product');
            }, 200)
        }
    }, [cart]);

    return (
        <Header>
            <ContainerImg href='/'>
                <img src={logo} alt="Logo Alternova" title='Inicio Alternova-Shop'/>
            </ContainerImg>
            <BtnCart onClick={onClickCart}>
                {!!quantyProducts && <BtnCounter ref={$btnCounter}>{quantyProducts}</BtnCounter>}
                <i className="fa-solid fa-cart-shopping"></i>
            </BtnCart>
        </Header>
    )
}

export default Navbar;