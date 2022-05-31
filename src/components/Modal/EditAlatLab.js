import React, {useEffect, useState} from 'react'
import {Modal, Form, Button} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const EditAlatLab = ({ show, onHide, data }) => {
    const [currentData, setCurrentData] = useState({})
    const [loading, setLoading] = useState(true)

    const [update, setUpdate] = useState({});

    useEffect(() => {
        setCurrentData({
            ...currentData,
            nama: data.dataAlat.NAMA,
            jumlah: data.dataAlat.JUMLAH_TOTAL,
            tahun: data.dataAlat.TAHUN,
            no_seri: data.dataAlat.NOMOR_SERI,
            gambar: data.dataAlat.GAMBAR,
        });
        setLoading(false)
    },[])

    const handleInputState = (event) => {
        setCurrentData((prevState) => (
            {...prevState, [event.target.name]: event.target.value}
        ));
        setUpdate({...update , [event.target.name] : event.target.value})
    }

    const updateAlat = (event) => {
        event.preventDefault();
        console.log("current data : " , currentData);
        console.log("update data : " , update);
    }

    return (
        <Modal show={show} onHide={() => onHide()}>
            <Form onSubmit={updateAlat}>
                {
                    loading ? (<div>Loading ...</div>) : (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Alat</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nama Alat</Form.Label>
                                        <Form.Control
                                            name="name"
                                            value={currentData.nama}
                                            onChange={handleInputState}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Jumlah Total</Form.Label>
                                        <Form.Control
                                            name="jumlah_total"
                                            value={currentData.jumlah}
                                            onChange={handleInputState}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tahun</Form.Label>
                                        <Form.Control
                                            name="tahun"
                                            value={currentData.tahun}
                                            onChange={handleInputState}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>No Seri</Form.Label>
                                        <Form.Control
                                            name="no_seri"
                                            value={currentData.no_seri}
                                            onChange={handleInputState}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Gambar</Form.Label>
                                        <Form.Control
                                            name="gambar"
                                            value={currentData.gambar}
                                            onChange={handleInputState}
                                        />
                                    </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" type="submit">
                                    Edit Data
                                </Button>
                            </Modal.Footer>
                        </>
                    )
                }
            </Form>
        </Modal>
    )
}

export default EditAlatLab