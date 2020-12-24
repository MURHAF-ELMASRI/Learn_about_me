import styled from "styled-components"

export default function user({info}) {

    const Container = styled.div`
    
    `
    const Name = styled.h1`
    
    `
    const Date = styled.h2`
    
    `
    return (
        <Container>
            <Name>
            info.name
            </Name>
            <Date>
                info.date
            </Date>
            
        </Container>
    )
};
