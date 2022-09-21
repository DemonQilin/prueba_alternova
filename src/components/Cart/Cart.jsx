import React, { useEffect, useRef } from 'react'
import CartProduct from './CartProduct';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../../store/slices/cart.slice';
import { genJson } from '../../utils/gen-json';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'

const Wrapper = styled.div`
    position: fixed;
    top: min(10vh,80px);
    bottom: 0;
    right:0;
    left: 0;

    background-color: rgba(0,0,0,0.3);
`;

const CartSection = styled.section`
    position: fixed;
    top: min(10vh,80px);
    bottom: 0;
    right:0;

    width: 100%;
    min-width: 320px;
    max-width: 700px;
    padding: 2rem;

    background-color: var(--color-title);
    box-shadow: -5px 0 10px black;

    transform: translateX(100%);
    transition: transform 300ms ease;
`;

const CartContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 1rem 0.5rem;
    display: flex;
    flex-direction: column;

    background-color: var(--color-bg);
`;

const CartHeader = styled.header`
    padding-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    color: var(--color-primary);
    border-bottom: 2px solid var(--color-font);

    h2 {
        margin: 0;
        font-size: 2rem;
        font-weight: bold;
    }
`;

const BtnComeBack = styled.button`
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    
    background-color: transparent;
    border: thin solid var(--color-font);
    border-radius: 5px;

    cursor: pointer;
`;

const BtnDropCart = styled.button`
    margin-left: auto;
    width: 40px;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    font-size: 2rem;

    background-color: #f44336;
    border: 2px solid black;
    border-radius: 7px;

    cursor: pointer;
`;

const ProductsCartContainer = styled.div`
    position: relative;

    flex-grow: 1;
    padding: 3rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    overflow-y: auto;
    overflow-x: hidden;
`;

const MessageEmptyCart = styled.div`
    position: absolute;
    top: 50%;
    
    font-size: 3rem;
    text-align: center;

    opacity: 0.6;
    transform: translateY(-50%);

    span {
        display: block;
        font-size: 5rem;
        font-weight: bold;
    }
`;

const ActionsCart = styled.div`
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;

    align-items: center;
    font-size: 2rem;

    border-top: 2px solid var(--color-font);
`;

const TotalOrder = styled.p`
    margin: 0;
    width: 55%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;

    span {
        color: var(--color-primary)
    }
`;

const BtnCreateOrder = styled.button`
    width: 40%;
    max-width: 150px;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bolder;
    font-size: 1.6rem;

    border-radius: 8px;
    background-color: var(--color-primary);
    border: thin solid black;

    cursor: pointer;
`

const Cart = ({ visibleCart, setVisibleCart, setMsg }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const totalProducts = cart.reduce((total, prod) => total + prod.quanty, 0);
    const total = cart.reduce((total, prod) => total + prod.quanty * prod.price, 0);
    const $btnCreateOrder = useRef();

    const dropCart = e => {
        if (totalProducts === 0) {
            setMsg('El carro ya está vacio');
            setTimeout(() => {
                setMsg(null);
            }, 1600);
            return
        };
        dispatch(resetCart());
    };

    const closeCart = e => {
        document.getElementById('cart-container').classList.remove('ver-cart');
        setTimeout(() => {
            setVisibleCart(false);
        }, 300);
    };

    const createOrder = e => {
        if (totalProducts <= 0) {
            $btnCreateOrder.current.classList.add('sacudir');
            setMsg('Your cart is empty');
            setTimeout(() => {
                $btnCreateOrder.current.classList.remove('sacudir');
            }, 300);
            setTimeout(() => {
                setMsg(null);
            }, 1600);
        } else {
            genJson(JSON.stringify({
                total_cost: total,
                total_products: totalProducts,
                products: cart.map(({ id, ...product }) => product),
                time_stamp: new Date().toJSON()
            }), `order_${uuidv4()}.json`);

            dispatch(resetCart());

            closeCart();
        }
    }

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('cart-container').classList.add('ver-cart');
        });
    }, []);

    return (
        <>
            {visibleCart && <Wrapper/>}
            <CartSection id='cart-container'>
                <CartContainer>
                    <CartHeader>
                        <BtnComeBack
                            title='Regresar'
                            onClick={closeCart}
                        >
                            <i className="fa-solid fa-arrow-right"></i>
                        </BtnComeBack>
                        <h2>Cart ({totalProducts})</h2>
                        <BtnDropCart
                            title='Vaciar Carrito'
                            onClick={dropCart}
                        >
                            <i className="fa-regular fa-trash-can"></i>
                        </BtnDropCart>
                    </CartHeader>
                    <ProductsCartContainer>
                        {!totalProducts &&
                            <MessageEmptyCart>
                                <span>Your cart is empty</span>
                                Thousands of products are waiting for you!
                            </MessageEmptyCart>
                        }
                        {
                            !!totalProducts &&
                            cart.map(product => <CartProduct key={product.id} product={product} />)
                        }
                    </ProductsCartContainer>
                    <ActionsCart>
                        <TotalOrder>Total: <span>$ {total}</span></TotalOrder>
                        <BtnCreateOrder
                            ref={$btnCreateOrder}
                            onClick={createOrder}
                        >
                            Create Order
                        </BtnCreateOrder>
                    </ActionsCart>
                </CartContainer>
            </CartSection>
        </>
    )
}

export default Cart