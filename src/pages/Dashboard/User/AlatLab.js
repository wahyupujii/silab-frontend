import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Modal, Form} from "react-bootstrap";
import axios from 'axios';

const AlatLab = (props) => {
    const [show, setShow] = useState({show: false, detailAlat: ""});
    const [dataAlat, setDataAlat] = useState(null);
    const [loading, setLoading] = useState(true);
    
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
            console.log(result);
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
            <h2>Alat Lab</h2>
            <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                {
                    loading ? (<span>loading ... </span>) : dataAlat === null ? (<span>Belum ada alat di lab ini</span>) : (
                        dataAlat.map(data => {
                            return (
                                <Card style={{ width: '13rem' }} className="my-2" key={data.ID}>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>{data.NAMA}</Card.Title>
                                        <Card.Text>Jumlah Tersedia : {data.JUMLAH_TERSEDIA}</Card.Text>
                                        <Card.Text>No Seri : {data.NOMOR_SERI}</Card.Text>
                                        <Button variant="primary" onClick={() => setShow({show:true, detailAlat: data})}>Detail</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>

            <Modal show={show.show} onHide={() => setShow({...show, show: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Alat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Alat</Form.Label>
                            <Form.Control
                                type="name"
                                value={show.detailAlat.NAMA}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Tersedia</Form.Label>
                            <Form.Control
                                type="jumlah"
                                value={show.detailAlat.JUMLAH_TERSEDIA}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control
                                type="tahun"
                                value={show.detailAlat.TAHUN}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>No Seri</Form.Label>
                            <Form.Control
                                type="seri"
                                value={show.detailAlat.NOMOR_SERI}
                                readOnly
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow({...show, show: false})}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AlatLab