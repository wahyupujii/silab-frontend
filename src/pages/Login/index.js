import React, {useState} from 'react'
import {Container, Form, InputGroup, Button} from "react-bootstrap";
import image from "../../assets/pens.png"
import Swal from 'sweetalert2';
import axios from "axios"

import { EyeClose, EyeOpen } from '../../components/icons';

const Login = () => {
    const [inputs, setInputs] = useState({});
    const [showPassword, setShowPassword] = useState(false)

    const login = () => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/account.php?function=login',
            data: inputs,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(result => {
            if (result.data === "auth error") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Periksa NetID / Password anda lagi',
                })
            } else {
                getDetailAccount(result.data.NIP);
            }
        })
    }

    const getDetailAccount = (NIP) => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/account.php?function=getDetailAccount',
            data: {nip: NIP},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(result => {
            let roleExist = localStorage.key("");
            localStorage.removeItem(roleExist);

            // kondisi role superUser
            const condition = ["Teknisi Laboratorium", "Kepala Laboratorium", "Kepala Prodi D3", "Kepala Prodi D4", "Kepala Departemen", "Asisten Direktur 2"];
            if (result.data.length > 1 || result.data[0].NAMA_ROLE === condition[0]) {
                result.data.map((data) => {
                    let test = condition.some(el => JSON.stringify(data).includes(el));
                    if (test) {   // jika true, maka superuser
                        // set pengaturan superuser
                        localStorage.setItem("superUser", JSON.stringify(data));
                        return;
                    }
                })
            } else {
                localStorage.setItem("user", JSON.stringify(result.data[0]));
            }
            window.location.pathname = "/mis105/SILAB/dashboard";
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Data Anda belum terdaftar di sistem, silahkan hubungi pengembang website ini',
            })
        })
    }

    return (
        <section style={{ position: 'absolute', top: '0', bottom: '0', right: '0', left: '0' }} className="d-flex">
            <section 
            style={{ 
                width: '50%', 
                height: '100%', 
                backgroundImage: `url(${image})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
            ></section>

            <section style={{ width: '50%', height: '100%' }}>
                <Container className="w-75 h-100 d-flex justify-content-center align-items-center">
                    <Form className="d-flex flex-column justify-content-between">
                        <div className="text">
                            <h1 style={{ fontSize: '32px' }} className="mb-3">Login</h1>
                            <div className="noted" style={{lineHeight: "7px"}}>
                                <p style={{ fontSize: '14px' }} className="text-muted font-weight normal">Silahkan Mengisi NetID dan Password di bawah untuk Login</p>
                            </div>
                        </div>
                        <div className="inpt-group">
                            <Form.Group className="mb-3" controlId="formBasicNetID">
                                <Form.Label style={{ fontSize: '14px' }}>NetID</Form.Label>
                                <Form.Control type="netid" placeholder="NetID" onChange={(e) => setInputs({...inputs, netid: e.target.value})} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label style={{ fontSize: '14px' }}>Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        aria-label="Example text with button addon"
                                        aria-describedby="basic-addon1"
                                        type={showPassword === false ? "password" : "text"}
                                        placeholder="Password"
                                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                                    />
                                    <button id="button-addon1" className='px-2' style={{ border: 'none' }} type="button" onClick={() => setShowPassword(!showPassword)}>
                                        { showPassword === false ? <EyeClose /> : <EyeOpen /> }
                                    </button>
                                </InputGroup>
                            </Form.Group>
                        </div>
                            <Button className="mt-3 w-100" style={{ height: '48px', backgroundColor: '#4A47D6'}} onClick={login} >
                                Masuk
                            </Button>
                    </Form>
                </Container>
            </section>
        </section>
    )
}

export default Login