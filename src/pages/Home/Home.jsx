import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import ProductCard from './ProductCard';

const SectionProducts = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    grid-auto-rows: auto;
    gap: 2rem;
`;

const ContainerHome = styled.div`
    padding: 0 1.5rem;
    margin-bottom: 2rem;

    h1 {
        margin: 0;
        margin-bottom: 2rem;

        font-size: 2.5rem;
    }
`;

const Home = ({ setMsg }) => {
    const products = useSelector(state => state.products);

    return (
        <ContainerHome>
            <h1>¡Welcome to Alternova Shop!</h1>
            <SectionProducts>
                {products &&
                    products.map(product => {
                        return (
                            <ProductCard key={product.id} product={product} setMsg={setMsg}/>
                        )
                    })
                }
            </SectionProducts>
        </ContainerHome>
    )
}

export default Home;