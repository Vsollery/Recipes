import { useEffect, useState } from "react";
import styled from "styled-components";
import { SplideSlide, Splide } from "@splidejs/react-splide";
// Default theme
import '@splidejs/react-splide/css';



function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    },[]); // empty array for only the compents is mounted


    //get data first before running other functions 
    const getPopular = async() =>{

        
        const api = await fetch(`https://api.spoonacular.com/recipes/random/?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        const data = await api.json();
        setPopular(data.recipes); // set popular to recipes
    }


  return (
    <div>   
        <Wrapper>
            <h3>Popular Recipes</h3>
            <Splide options={{ 
                perPage: 4,
                arrows: false,
                pagination: false,
                drag:'free',
                gap: '5rem',
             }}>
                {popular.map((recipe)=>{
                    return(
                        <SplideSlide key={recipe.id}>
                            <Card> 
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                                <Gradient />
                            </Card>


                        </SplideSlide>
                    );
                })}
 
            </Splide>
        </Wrapper>     
    </div>
  )
}


const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 15rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img{
        border-radius: 2rem;
        position: absolute;
        left:0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 20%;
        display: flex;
        justify-content: center;
        align-item: center;

    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`



export default Popular