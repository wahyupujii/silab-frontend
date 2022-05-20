import React from 'react'
import {Container} from "react-bootstrap"

const Footer = () => {
    return (
        <>
            <div>
                <Container>
                    <footer className="d-flex justify-content-center align-items-center" style={{height: "200px"}}>
                        <div className="d-flex flex-column">
                            <h3>SILAB PENS</h3>
                            <p className="text-muted">Sistem Informasi Monitoring Peralatan Laboratorium</p>
                        </div>
                    </footer>
                </Container>
            </div>
        </>
    )
}

export default Footer