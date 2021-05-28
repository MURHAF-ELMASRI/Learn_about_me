import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import 'cropperjs/dist/cropper.min.css';
import Cropper from 'cropperjs';
import DragDrop from './DragDrop'
const CroperContainer = styled.div`
    position:relative;
    padding: 5rem;
    margin-bottom: auto;
    height: 100%;
    width: 100%a;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    row-gap: 2rem;
`;
const ImgContainer = styled.div`
    /* position:relative; */
    /* overflow:hidden */
    width:100%;
    height:100%;
`;

const Img = styled.img`
    max-width: 100%;
    width:100%;
    height:100%;
    display: block;
    border-radius: 50%;
    box-shadow: 3px 2px 14px 3px rgba(0, 0, 0, 0.3);
    overflow:hidden;
`;

const RM = styled.button`
    position:absolute;
    background-color: crimson;
    color: white;
    font-size:1rem;
    text-align: center;
    border-radius: 50%;
    border: none;
    width: 3rem;
    top:1rem;
    height: 3rem;
    &:hover{
        background-color:darkred;
    }

`;
const Button = styled.button`
    background-color: #9c1de7;
    color: white;
    position:relative;
    padding: 1rem;
    font-family: inherit;
    right: 0;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    border: none;
    width:5rem;
    &:hover {
        background-color: #f3558e;
        border: none;
    }
`;

const DragContainer = styled.div`
`

export default function CropperPage({croppedCnvx,setCnvx}) {
    const imgRef = useRef();
    const croper = useRef();
    const [inImage,setInImage]=useState('')
    const [controlCrop ,setControl] =useState(false)
    
    useEffect(() => {
        if(imgRef.current)
         croper.current = new Cropper(
            imgRef.current ,{
                aspectRatio: 1,
            }
            );
        
    },[inImage])
    
    
    const handleClick = () => {
        if (inImage) {
            setCnvx(croper.current.getCroppedCanvas());
            croper.current.destroy();
        }
    };
    return (
        <CroperContainer>
            {!controlCrop ? (
                <DragContainer>
                    <DragDrop setInImage={setInImage} setControl={setControl} />
                </DragContainer>
            ) : (
                <ImgContainer>
                    {!croppedCnvx && (
                        <Img ref={imgRef} src={inImage} alt="bird" />
                    )}

                    {croppedCnvx && (
                        <>
                            <Img
                                src={croppedCnvx.toDataURL()}
                                alt="cropped img"
                            />
                            <RM
                                onClick={() => {
                                    setControl(false)
                                }}
                            >
                                x
                            </RM>
                        </>
                    )}
                </ImgContainer>
            )}
            <Button onClick={() => handleClick()}>crop image</Button>
        </CroperContainer>
    );
}
