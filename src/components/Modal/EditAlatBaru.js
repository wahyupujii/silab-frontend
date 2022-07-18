import React, {useEffect, useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import CurrencyFormat from "react-currency-format"

const EditAlatBaru = ({show, onHide, data}) => {    
    const dataAlat = {...data};

    const updateAlat = () => {
        
    }

    return (
        <Modal show={show} onHide={() => onHide()}>
            <Form onSubmit={updateAlat} encType="multipart/form-data" >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Alat Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Alat</Form.Label>
                        <Form.Control
                            value={dataAlat.NAMA}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Spesifikasi</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={dataAlat.SPESIFIKASI}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Harga Satuan</Form.Label>
                        <Form.Control
                            value={dataAlat.HARGA_SATUAN}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Jumlah</Form.Label>
                        <Form.Control
                            type="number"
                            value={dataAlat.JUMLAH}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estimasi Total Harga</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Estimasi Total Harga"
                            name="total_harga"
                            value={dataAlat.TOTAL_HARGA}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>File Penunjang</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="file" 
                            // onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.files[0]})} 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Edit
                    </Button>
                    <Button>Show</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default EditAlatBaru