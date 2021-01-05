import styled from 'styled-components'
import {motion} from 'framer-motion'

export const UserCont = styled(motion.div)`
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
    align-items: center;
`;
export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 200px;
`;
