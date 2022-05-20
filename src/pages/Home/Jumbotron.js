import React from 'react'
import image from "../../assets/jumbotron.png";
import {Container} from "react-bootstrap"

const Jumbotron = () => {
    return (
        <Container>
            <div style={{ height: "500px" }} className="d-flex align-items-center">
                <div className="w-75 h-50 d-flex flex-column justify-content-evenly">
                    <h1 className="p-2" style={{color: "white", backgroundColor: "#3D8CDB"}} >SISTEM INFORMASI PERALATAN LABORATORIUM</h1>
                    <p className="" style={{ color: '#575757', fontSize: '20px' }}>Website Pengelolaan Peralatan Laboratorium di PENS</p>
                    <div className="w-50 mb-3 dot d-flex justify-content-between align-items-center">
                        <div style={{ backgroundColor: "#3D8CDB", width: "15px", height: "15px", borderRadius: '50%'}}></div>
                        <div style={{ backgroundColor: "#3D8CDB", width: "15px", height: "15px", borderRadius: '50%'}}></div>
                        <div style={{ backgroundColor: "#3D8CDB", width: "15px", height: "15px", borderRadius: '50%'}}></div>
                        <div style={{ backgroundColor: "#3D8CDB", width: "15px", height: "15px", borderRadius: '50%'}}></div>
                        <div style={{ backgroundColor: "#3D8CDB", width: "15px", height: "15px", borderRadius: '50%'}}></div>
                    </div>
                    <button style={{ width: '142px', height: '50px', backgroundColor: '#3D8CDB', color: '#fff', borderRadius: '8px', border: 'none' }} type="button">Lihat Fitur ...</button>
                </div>
                <div className="w-100 d-flex justify-content-end align-items-center">
                    <img src={image} alt="imageJumbotron" style={{ width: "492px", height: "auto" }} />
                </div>
            </div>
        </Container>
    )
}

export default Jumbotron