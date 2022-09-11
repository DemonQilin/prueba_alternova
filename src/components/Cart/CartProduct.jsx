import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteArticle } from '../../store/slices/cart.slice';

const CartProductArticle = styled.article`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    font-size: 1.2rem;

    box-shadow: 0 0 5px black;
    border-radius: 10px;

    * {
        width: 20%;
        margin: 0;

        text-align: center;
    }
`;

const TitleArticle = styled.h3`
    margin: 0;
    width: 30%;
`;

const QuantyArticle = styled.p`
    font-size: 1.5em;
    font-weight: bold;
    font-style: italic;
`;

const PriceArticle = styled.p`
    font-size: 1.4em;
`;

const TotalArticle = styled.p`
    width: 25%;

    font-size: 1.4em;
    font-weight: bold;
    color: var(--color-primary);
`;

const BtnDropArticle = styled.button`
    position: absolute;
    /* bottom: 0;
    left: 50%; */
    top: 0;
    right: 0;

    width: 25px;
    aspect-ratio: 1;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    font-size: 2rem;

    color: #f44336;
    background-color: transparent;
    border: none;
    border-radius: 50%;

    transform: translate(20%, -40%);
    cursor: pointer;

    &:hover {
        font-size: 3rem;
        transform: translate(0%, -40%);
    }
`

const CartProduct = ({ product }) => {
    const dispatch = useDispatch();

    const dropProduct = e => {
        dispatch(deleteArticle({ id: product.id }));
    }

  return (
      <CartProductArticle>
          <TitleArticle>{product.name}</TitleArticle>
          <QuantyArticle>{product.quanty}</QuantyArticle>
          <PriceArticle>$ {product.price}</PriceArticle>
          <TotalArticle>$ {product.price * product.quanty}</TotalArticle>
          <BtnDropArticle title='Drop product' onClick={dropProduct}><i className="fa-solid fa-xmark"></i></BtnDropArticle>
      </CartProductArticle>
  )
}

export default CartProduct