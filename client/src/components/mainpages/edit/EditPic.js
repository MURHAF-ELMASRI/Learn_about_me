import styled from 'styled-components';
import Cropper from './cropper/cropper';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const PanalBack = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: rgba(0, 0, 0, 0.7);
`;
const Panal = styled(motion.div)`
    position: relative;
    overflow: hidden;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    border-radius: 20px;
    width: 400px;
    height: 500px;
    top: 40%;
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.7);
    -webkit-transform: translateY(-45%);
    -ms-transform: translateY(-45%);
    transform: translateY(-45%);
    background-color: whitesmoke;
`;
const Button = styled.button`
    background-color: #9c1de7;
    color: white;
    padding: 1rem;
    font-family: inherit;
    right: 0;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    border: none;
    margin: 1rem;
    &:hover {
        background-color: #f3558e;
    }
`;
 
export default function EditPic({ setInfo, setEditPanal }) {
    const [croppedCnvx, setCnvx] = useState('');
    const panalRef = useRef();
    const handelAdd = () => {
        if (croppedCnvx) {
            croppedCnvx.toBlob((blob) => {
                console.log(blob);
                blob.lastModifiedDate = new Date();
                blob.name = 'now and every time.png';
                
                setInfo((prev) => ({
                    ...prev,
                    avatar:blob,
                }));
                setEditPanal(false);

            });
        }
    };

    const showPanal = (e) => {
        const {
            top,
            right,
            bottom,
            left,
        } = panalRef.current.getBoundingClientRect();
        const cursor = { x: e.clientX, y: e.clientY };
        if (
            cursor.x < left ||
            cursor.x > right ||
            cursor.y < top ||
            cursor.y > bottom
        )
            setEditPanal((prev) => !prev);
    };

    return (
        <PanalBack onClick={(e) => showPanal(e)}>
            <Panal
                ref={panalRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Cropper croppedCnvx={croppedCnvx} setCnvx={setCnvx} />
                <Button onClick={() => handelAdd()}>Add</Button>
            </Panal>
        </PanalBack>
    );
}
