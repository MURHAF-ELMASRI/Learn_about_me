import styled from 'styled-components';

const Img = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.4);
`; 

export default function ImageHolder({ imgUrl }) {
    console.log(imgUrl);
    return <Img src={imgUrl} alt="userImage" />;
}
