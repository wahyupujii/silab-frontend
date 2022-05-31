import React, {useState} from 'react'
import {Form, Modal, Button} from "react-bootstrap"
import axios from "axios";

const TambahAlatBaru = ({ show, onHide, count, data }) => {
    const [inputs, setInputs] = useState({})
    
    const tambahAlat = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatBaru.php?function=tambahAlatBaru',
            data: {
                ...inputs,
                pengajuanID: data.pengajuanID
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(() => {
            onHide();
            count();
        }).catch(err => {
            console.log("err", err)
        })
    }

    return (
        <Modal show={show} onHide={() => onHide()}>
            <Form onSubmit={tambahAlat} >
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alat yang Diajukan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Alat</Form.Label>
                        <Form.Control
                            type="text"
                            name="nama"
                            placeholder="Nama Alat"
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Jumlah</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Jumlah"
                            name="jumlah"
                            onChange={(e) => setInputs({...inputs, [e.target.name]: parseInt(e.target.value)})}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Catatan</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Catatan" name="catatan" onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Simpan
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default TambahAlatBaru