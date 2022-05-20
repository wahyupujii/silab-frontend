import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Modal, Form} from "react-bootstrap"
import axios from "axios";

const AlatLabTersedia = (props) => {
    const [modal, setModal] = useState({show: false, detailAlat: ""});
    const [dataAlat, setDataAlat] = useState(null);
    const [loading, setLoading] = useState(null);
    const [modalTambahAlat, setModalTambah] = useState(false)
    
    const [inputs, setInputs] = useState({})
    
    console.log(props)

    const tambahAlatLab = () => {
        // axios({
        //     method: 'post',
        //     url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=addAlatLab',
        //     data: {
        //         ...inputs,
        //         jumlah: parseInt(inputs.jumlah),
        //         status_alat: "TERSEDIA",
        //         labID: props.data.labID,
        //         perbaikanID: NULL,
        //         statusPerbaikan: "Tidak Diperbaiki",
        //         teknisiKelolaNomor: 
        //     },
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        //     }
        // }).then(result => {
        //     setLabArea(result.data.data);
        //     setLoading(false)
        // }).catch()
    }

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatLabTersedia',
            data: {labID: props.data.labID},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataAlat(result.data.data);
            setLoading(false)
        }).catch(() => {
            setDataAlat(null);
            setLoading(false);
        })
    }, [])
    return (
        <div className='w-100 p-3'>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => props.handleBack(false)} >Pilih Area Lab</Breadcrumb.Item>
                <Breadcrumb.Item>{props.data.labTitle}</Breadcrumb.Item>
            </Breadcrumb>
            <div className='d-flex justify-content-between align-items-center'>
                <h2>Alat Lab</h2>
                <Button className="primary" onClick={() => setModalTambah(true)} >Tambah Alat</Button>
            </div>
            <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                {
                    loading ? (<span>loading ... </span>) : dataAlat === null ? (<span>Belum ada alat di lab ini</span>) : (
                        dataAlat.map(data => {
                            return (
                                <Card style={{ width: '15rem' }} className="my-2" key={data.ID}>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>{data.NAMA}</Card.Title>
                                        <Card.Text>Tersedia : {data.JUMLAH}</Card.Text>
                                        <Card.Text>No Seri : {data.NO_SERI}</Card.Text>
                                        <div className="w-100 d-flex justify-content-between" >
                                            <Button variant="outline-primary">Putihkan</Button>
                                            <Button variant="primary" onClick={() => setModal({show:true, detailAlat: data})}>Detail</Button>                                            
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>

            <Modal show={modal.show} onHide={() => setModal({...modal, show: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Alat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Alat</Form.Label>
                            <Form.Control
                                type="name"
                                value={modal.detailAlat.NAMA}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Tersedia</Form.Label>
                            <Form.Control
                                type="jumlah"
                                value={modal.detailAlat.JUMLAH}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control
                                type="tahun"
                                value={modal.detailAlat.TAHUN}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>No Seri</Form.Label>
                            <Form.Control
                                type="seri"
                                value={modal.detailAlat.NO_SERI}
                                readOnly
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Edit Data
                    </Button>
                    <Button variant="danger">
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalTambahAlat} onHide={() => setModalTambah(false) }>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alat Lab Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Alat</Form.Label>
                            <Form.Control
                                name="nama"
                                type="text"
                                placeholder='Nama Alat'
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Tersedia</Form.Label>
                            <Form.Control
                                name="jumlah"
                                type="text"
                                placeholder='Jumlah Tersedia'
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control
                                name="tahun"
                                type="text"
                                placeholder='Tahun'
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>No Seri</Form.Label>
                            <Form.Control
                                name="no_seri"
                                type="text"
                                placeholder='No Seri'
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => console.log(inputs)}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AlatLabTersedia