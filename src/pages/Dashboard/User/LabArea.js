import React, { useState, useEffect } from 'react'
import {Card, Button, Breadcrumb} from "react-bootstrap"
import AlatLab from './AlatLab'
import axios from 'axios'

const LabArea = ({dataUser}) => {
    const [loading,setLoading] = useState(true);
    const [alatLab, setAlatLab] = useState({show: false, labID: ""});
    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/laboratory.php?function=getLabByDosen',
            data: {pegawai_nomor: dataUser.NOMOR},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setAlatLab({...alatLab, show: true, labID: result.data.data.LABORATORIUM_ID});
            setLoading(false)
        }).catch(() => {
            setAlatLab({...alatLab, show: true, labID: null});
            setLoading(false)
        })
    }, [])
    return (
        <>
            {/* {
                loading ? (<div>loading...</div>) : (
                    alatLab.show === false ? (
                        <div className='w-100 p-3'>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item>Pilih Area Lab</Breadcrumb.Item>
                            </Breadcrumb>
                            <h2>Pilih Area Lab</h2>
                            <div className={`d-flex flex-wrap ${LabArea.length > 4 ? 'justify-content-between' : 'justify-content-evenly'} px-4 py-3`} style={{maxWidth: '100%', background: 'white'}}>
                                {
                                    labArea.map(data => {
                                        return (
                                            <Card className="my-3" key={data.ID}>
                                                <Card.Header className="fw-bold">{data.JURUSAN}</Card.Header>
                                                <Card.Body>
                                                    <Card.Title className="mb-3">Laboratorium {data.NAMA}</Card.Title>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <span>Ruang {data.KODE_RUANG}</span>
                                                        <Button variant="primary" onClick={() => setAlatLab({show: true, labID: data.ID, labTitle: data.NAMA})}>Pilih ...</Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : ( <AlatLab handleBack={(value) => setAlatLab({...alatLab, show: value})} data={{labID: alatLab.labID, labTitle: alatLab.labTitle}} /> )
                )
            } */}
            {
                loading ? (<div>loading ... </div>) : (
                    <AlatLab handleBack={(value) => setAlatLab({...alatLab, show: value})} data={{labID: alatLab.labID}} />
                )
            }
        </>
    )
}

export default LabArea