import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addArticle, updateArticle } from '../../store/slices/cart.slice';
import styled from 'styled-components'

const Article = styled.article`
    width: 100%;
    max-width: 350px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;

    background-color: var(--color-title);
    color: var(--color-bg);
    border-radius: 20px;
    box-shadow: 5px 5px 10px black;
    transition: transform 300ms ease;

    overflow: hidden;

    header {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
`;

const ContainerImg = styled.div`
    img {
        width: 100%;
        max-width: inherit;
        max-height: 200px;

        object-fit: cover;
    }
`;

const TitleArticle = styled.div`
    flex-grow: 1;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        margin: 0;
        font-size: 2rem;

        color: var(--color-primary);
    }
    
    h2 {
        max-width: 75%;
        margin: 0;

        font-weight: bold;
        letter-spacing: 0.5rem;
        font-size: ${props => props.name.length >= 13 ? 1.7 : 2.2}rem;

        text-shadow: 0 0 10px var(--color-primary);
    }
`;

const BodyArticle = styled.div`
    padding: 0 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    p {
        margin: 0 0 1rem;
        font-size: 1.5rem;
    }

    &>div{
        display: flex;
        justify-content: space-between;
    }
`;

const QuantyControl = styled.div`
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
        font-size: 2.5rem;
        font-weight: bold;
    }
`;

const QuantyBtn = styled.button`
    width: 35px;
    aspect-ratio: 1;
    padding: 0;

    font-size: 3rem;
    
    border: none;
    border-radius: 50%;
    color: var(--color-primary);
    background-color: var(--color-title);
    
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 0 0 2px var(--color-primary);
    }
    `;

const AddCartBtn = styled.button`
    width: 60px;
    aspect-ratio: 1;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 2.5rem;
    text-align: center;

    border: thin solid black;
    border-radius: 50%;
    background-color: var(--color-primary);

    ${props => props.stock <= 0 ? '' : 'cursor: pointer'};

    i {
        opacity: ${props => props.stock <= 0 ? 0.4 : 1};
    }
`;

const ProductCard = ({ product, setMsg}) => {
    const name = product.name[0].toUpperCase() + product.name.slice(1);
    const [quanty, setQuanty] = useState(product.stock > 0 ? 1 : 0);
    const $quanty = useRef();
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const plusOne = e => {
        if (quanty + 1 > product.stock) {
            $quanty.current.classList.add('sacudir');
            setMsg('Alcanzaste el máximo');
            setTimeout(() => {
                $quanty.current.classList.remove('sacudir');
            }, 300);
            setTimeout(() => {
                setMsg(null);
            }, 1600);
            return
        };
        setQuanty(quanty + 1);
    };

    const substractOne = e => {
        if (quanty - 1 <= 0) {
            $quanty.current.classList.add('sacudir');
            setMsg('La cantidad mínima es 1');
            setTimeout(() => {
                $quanty.current.classList.remove('sacudir');
            }, 300);
            setTimeout(() => {
                setMsg(null);
            }, 1600);
            return
        };
        setQuanty(quanty - 1);
    };

    const addCart = e => {
        if (product.stock <= 0) {
            setMsg('No hay stock disponible');
            setTimeout(() => {
                setMsg(null);
            }, 1600);
            return
        };

        const article = cart.some(productInCart => productInCart.id === product.id);

        if (!article) {
            dispatch(addArticle({
                id: product.id,
                name: product.name,
                price: product.unit_price,
                quanty
            }));
        } else {
            dispatch(updateArticle({
                id: product.id,
                quanty
            }));
        };
    };

    return (
        <Article>
            <header>
                <ContainerImg>
                    <img src="https://picsum.photos/400/400?random" alt={product.name} />
                </ContainerImg>
                <TitleArticle name={name}>
                    <h2>{name}</h2>
                    <p><strong>$ {product.unit_price}</strong></p>
                </TitleArticle>
            </header>
            <BodyArticle>
                <p>
                    Lorem, ipsum dolor sit amet elit. Vero voluptas placeat, optio tempore hic consequuntur. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <div>
                    <QuantyControl>
                        <QuantyBtn title='Restar' onClick={substractOne}>-</QuantyBtn>
                        <span ref={$quanty}>{quanty}</span>
                        <QuantyBtn title='Sumar' onClick={plusOne}>+</QuantyBtn>
                    </QuantyControl>
                    <AddCartBtn
                        title='Agregar al carrito'
                        onClick={addCart}
                        stock={product.stock}
                    >
                        <i className="fa-solid fa-cart-plus"></i>
                    </AddCartBtn>
                </div>
            </BodyArticle>
        </Article>
    )
}

export default ProductCard