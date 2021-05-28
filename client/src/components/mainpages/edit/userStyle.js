import styled from 'styled-components'
import {motion} from 'framer-motion'

export const UserContainer = styled(motion.div)`
    justify-self:start;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    margin:3rem 4rem;
`;
export const ProfileImg = styled(motion.img)`
    position: absolute;
    width: 400px;
    top: 6rem;
    right: 2rem;
    margin: 2rem 0;
    ${props=>props.foundImg?'box-shadow: rgba(0, 0, 0, 0.35) 5px 10px 20px 0px;':""} ;
`;
export const UserPage = styled(motion.div)`
    display: flex;
    justify-content: flex-start;
    flex-direction:column;
    overflow:hidden;
`;
export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 200px;
`;


export const StyleButton = styled.button`
    background-color: #9c1de7;
    color: white;
    padding: 1rem;
    font-family: inherit;
    right: 0;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    border: none;
    &:hover {
        background-color: #f3558e;
        border:none
    }
`;
