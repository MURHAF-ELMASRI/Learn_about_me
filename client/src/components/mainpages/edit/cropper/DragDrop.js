import DropZone from 'react-dropzone';
import styled from 'styled-components'



const InputBox = styled.div`
        padding:3rem;
        height:15rem;
        width:15rem;
        border-radius:50%;
        text-align:center;
        border:dashed 4px ${props => props.state === 'accept' ? 'green' : props.state === 'reject' ? 'red' : 'gray'};
        p{
            color:#404040;
            font-size:20px;
            font-weight:bold;
        }
    `;

export default function DragDrop({setInImage,setControl}) {
    
    const handleDrop = (acceptedFile) => {
        const file = acceptedFile[0]
        console.log(file)
        const reader = new FileReader()
        reader.onabort= ()=>console.log('file has been aboreted');
        reader.onerror = () => console.log('file Error')
        reader.onload = () => {
            console.log('filed accepted');
            setInImage(reader.result)
            
        }
        if (file) {
            reader.readAsDataURL(file)
            setControl(true)
        }
    }

    return (
        <DropZone
            onDrop={handleDrop}
            accept="image/*"
            minSize={1024}
            maxSize={1024 * 1000 * 3}
            multiple={false}
        >
            {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragAccept,
                isDragReject,
            }) => {
                const state = isDragAccept
                    ? 'accept'
                    : isDragReject
                    ? 'reject'
                    : '';
                return (
                    <InputBox
                        {...getRootProps({ refkey: 'innerRef', state: state })}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <img
                                src="https://img.icons8.com/pastel-glyph/64/000000/plus--v1.png"
                                alt="plus icon"
                            />
                        ):<p>Drag and drop your photo here</p>}
                        
                    </InputBox>
                );
            }}
        </DropZone>
    );
};
