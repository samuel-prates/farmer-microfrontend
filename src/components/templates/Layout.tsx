import React from 'react';
import Header from "./Header";
import { Container } from '../../styles/theme';

function Layout({children}){
    return (
        <Container>
            <Header/>
            <main>{children}</main>
        </Container>
    )
}

export default Layout;