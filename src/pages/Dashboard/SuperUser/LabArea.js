import React, { useState, useEffect } from 'react'
import {Card, Button, Breadcrumb} from "react-bootstrap"
import axios from 'axios'

// content component
import AlatLabTersedia from "./AlatLabTersedia";
import SemuaAlatDiLab from "./SemuaAlatDiLab";

const LabArea = ({dataUser}) => {
    const [dataLab, setDataLab] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alatLabArea, setAlatLabArea] = useState({show: false, labID: "", labTitle: ""});
    
    const [getLabID, setLabID] = useState("");
    
    useEffect(() => {
        if (dataUser.NAMA_ROLE === "Teknisi Laboratorium") {
            getLabByTekLab();
        } else if (dataUser.NAMA_ROLE === "Kepala Laboratorium") {
            getLabByKalab();
        }

    }, [])

    const getLabByTekLab = () => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/laboratory.php?function=getLabByTekLab',
            data: {teknisi_nomor: parseInt(dataUser.NOMOR)},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            if (result.data.data.length < 2) {
                localStorage.setItem("labByTeklab", JSON.stringify(result.data.data[0]));
                setLabID(result.data.data[0].ID);
                setDataLab(result.data.data[0]);
            }
            setDataLab(result.data.data);
            // check localStorage not empty
            let key = localStorage.key("");
            localStorage.removeItem(key);
            localStorage.setItem("labByTeklab", JSON.stringify(result.data.data));
            setLoading(false);
        }).catch()
    }

    const getLabByKalab = () => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/laboratory.php?function=getLabByKalab',
            data: {kalab_nomor: parseInt(dataUser.NOMOR)},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            // check localStorage not empty
            let key = localStorage.key("");
            localStorage.removeItem(key);
            localStorage.setItem("labByKalab", JSON.stringify(result.data.data));
            setLabID(result.data.data[0].ID);
            setLoading(false);
        }).catch()
    }

    return (
        <>
            {
                loading ? (
                    <div>loading...</div>
                ) : alatLabArea.show === false ? (
                    dataUser.NAMA_ROLE === "Teknisi Laboratorium" ? ( 
                        dataLab.length > 1 ? (
                            <div className='w-100 p-3'> 
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                    {
                                        dataLab.length > 1 ? (
                                            <Breadcrumb.Item>Pilih Area Lab</Breadcrumb.Item>
                                        ) : (<div></div>)
                                    }
                                </Breadcrumb>
                                <h2>Pilih Area Lab</h2>
                                <div className={`d-flex flex-wrap ${dataLab.length > 4 ? 'justify-content-between' : 'justify-content-evenly'} px-4 py-3`} style={{maxWidth: '100%', background: 'white'}}>
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
                        ) : (
                            window.location.pathname === "/mis105/SILAB/dashboard" ? (
                                <AlatLabTersedia handleBack={() => setAlatLabArea({...alatLabArea, show: false,})} data={{labID: getLabID}} dataUser={dataUser} />            
                            ) : window.location.pathname === "/mis105/SILAB/dashboard/semua-alat" ? (
                                <SemuaAlatDiLab handleBack={() => setAlatLabArea({...alatLabArea, show: false})} data={{labID: getLabID}} dataUser={dataUser} />
                            ) : (<div></div>)
                        )
                    ) : dataUser.NAMA_ROLE === "Kepala Laboratorium" ? (
                        window.location.pathname === "/mis105/SILAB/dashboard" ? (
                            <AlatLabTersedia handleBack={() => setAlatLabArea({...alatLabArea, show: false,})} data={{labID: getLabID}} dataUser={dataUser} />
                        ) : window.location.pathname === "/mis105/SILAB/dashboard/semua-alat" ? (
                            <SemuaAlatDiLab handleBack={() => setAlatLabArea({...alatLabArea, show: false})} data={{labID: getLabID}} dataUser={dataUser} />
                        ) : <div>Page Not Found</div>
                    ) : (<div></div>)
                ) : window.location.pathname === "/mis105/SILAB/dashboard" ? (
                    <AlatLabTersedia handleBack={() => setAlatLabArea({...alatLabArea, show: false,})} data={{labID: alatLabArea.labID, labTitle: alatLabArea.labTitle}} dataUser={dataUser} />
                ) : window.location.pathname === "/mis105/SILAB/dashboard/semua-alat" ? (
                    <SemuaAlatDiLab handleBack={() => setAlatLabArea({...alatLabArea, show: false})} data={{labID: alatLabArea.labID, labTitle: alatLabArea.labTitle}} dataUser={dataUser} />
                ) : <div>Page Not Found</div>
            }
        </>
    )
}

const MultipleLab = () => {
    return
}

const SingleLab = () => {
    return
}

export default LabArea