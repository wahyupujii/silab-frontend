import React, {useState, useEffect} from 'react'
import { Card, Button, Breadcrumb } from 'react-bootstrap';
import axios from "axios";

import SetPenghuniLab from './SetPenghuniLab';

const Laboratorium = ({dataUser}) => {
    // redirect if role !== "Teknisi Laboratorium"
    if (dataUser.NAMA_ROLE !== "Teknisi Laboratorium") {
        window.location.pathname = "/mis105/SILAB/dashboard"
    }

    const [getLab, setLab] = useState([]);
    const [loading, setLoading] = useState(true);

    const [penghuniLab, setPenghuniLab] = useState({show: false, dataLab: ""})

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/laboratory.php?function=getLabByTekLab',
            data: {teknisi_nomor: parseInt(dataUser.NOMOR)},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setLab(result.data.data);
            if (result.data.data.length < 2) {
                setLab(result.data.data[0]);
                setPenghuniLab({...penghuniLab, show: true, dataLab: result.data.data[0]})
            }
            setLoading(false);
        }).catch()
    } , [])

    return (
        <>
            {/* {
                penghuniLab.show === false  ? (
                    loading ? (<div>Loading ... </div>) : (
                        <div className="w-100 p-3">
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                {
                                    getLab.length > 1 ? (
                                        <Breadcrumb.Item>Pilih Area Lab</Breadcrumb.Item>
                                    ) : (<Breadcrumb.Item>{getLab[0].NAMA}</Breadcrumb.Item>)
                                }
                            </Breadcrumb>
                            {
                                getLab.length > 1 ? (
                                    <>
                                        <h2>Pilih Area Lab</h2>
                                        <div className="d-flex flex-wrap justify-content-evenly px-4 py-3" style={{maxWidth: '100%', background: 'white'}}>
                                            {
                                                getLab.map(lab => {
                                                    return (
                                                        <CardLab data={lab} onOpen={() => setPenghuniLab({...penghuniLab, show: true, dataLab: lab})} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                ) : <SetPenghuniLab handleBack={() => setPenghuniLab({...penghuniLab, show: false})} data={penghuniLab} />
                            }
                        </div>
                    )

                ) : (
                    <SetPenghuniLab handleBack={() => setPenghuniLab({...penghuniLab, show: false})} data={penghuniLab} />
                )
            } */}

            {
                loading ? (<div>Loading ... </div>) : (
                    penghuniLab.show === false ? (
                        getLab.length > 1 ? (
                            <div className='w-100 p-3'>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                    <Breadcrumb.Item>Pilih Area Lab</Breadcrumb.Item>
                                </Breadcrumb>
                                <h2>Pilih Area Lab</h2>
                                <div className="d-flex flex-wrap justify-content-evenly px-4 py-3" style={{maxWidth: '100%', background: 'white'}}>
                                    {
                                        getLab.map(lab => {
                                            return (
                                                <CardLab data={lab} onOpen={() => setPenghuniLab({...penghuniLab, show: true, dataLab: lab})} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ) : (
                            <SetPenghuniLab handleBack={() => setPenghuniLab({...penghuniLab, show: false})} data={penghuniLab} />
                        )
                    ) : (
                        <SetPenghuniLab handleBack={() => setPenghuniLab({...penghuniLab, show: false})} data={penghuniLab} />
                    )
                )
            }

        </>
    )
}

const CardLab = ({data, onOpen}) => {
    return (
        <>
            <Card className="my-3" key={data.ID}>
                <Card.Header className="fw-bold">{data.JURUSAN}</Card.Header>
                <Card.Body>
                    <Card.Title className="mb-3">Laboratorium {data.NAMA}</Card.Title>
                    <div className="d-flex align-items-center justify-content-between">
                        <span>Ruang {data.KODE_RUANG}</span>
                        <Button variant="primary" onClick={() => onOpen()}>Pilih ...</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Laboratorium