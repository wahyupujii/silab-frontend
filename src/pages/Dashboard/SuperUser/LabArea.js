import React, { useState, useEffect } from 'react'
import {Card, Button, Breadcrumb} from "react-bootstrap"
import axios from 'axios'

// content component
import AlatLabTersedia from "./AlatLabTersedia";
import AlatLabDiputihkan from "./AlatLabDiputihkan";

const LabArea = ({dataUser}) => {
    const [dataLab, setDataLab] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alatLabArea, setAlatLabArea] = useState({show: false, labID: "", labTitle: ""});
    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/laboratory.php?function=getLabByJurusan',
            data: {jurusan: dataUser.JURUSAN_NOMOR},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataLab(result.data.data);
            localStorage.setItem("labByJurusan", JSON.stringify(result.data.data));
            setLoading(false);
        }).catch()
    }, [])

    return (
        <>
            {
                loading ? (<div>loading ...</div>) : alatLabArea.show === false ? (
                    <div className="w-100 p-3">
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item>Pilih Area Lab</Breadcrumb.Item>
                        </Breadcrumb>
                        <h2>Pilih Area Lab</h2>
                        <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                            {
                                dataLab.map(data => {
                                    return (
                                        <Card className="my-3" key={data.ID}>
                                            <Card.Header className="fw-bold">{data.JURUSAN}</Card.Header>
                                            <Card.Body>
                                                <Card.Title className="mb-3">Laboratorium {data.NAMA}</Card.Title>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <span>Ruang {data.KODE_RUANG}</span>
                                                    <Button variant="primary" onClick={() => setAlatLabArea({show: true, labID: data.ID, labTitle: data.NAMA})}>Pilih ...</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : window.location.pathname === "/mis105/SILAB/dashboard" ? (
                    <AlatLabTersedia handleBack={() => setAlatLabArea({...alatLabArea, show: false,})} data={{labID: alatLabArea.labID, labTitle: alatLabArea.labTitle}} dataUser={dataUser} />
                ) : window.location.pathname === "/mis105/SILAB/dashboard/alat-diputihkan" ? (
                    <AlatLabDiputihkan handleBack={() => setAlatLabArea({...alatLabArea, show: false})} data={{labID: alatLabArea.labID, labTitle: alatLabArea.labTitle}} dataUser={dataUser} />
                ) : (<div></div>)
            }
            
        </>
    )
}

export default LabArea