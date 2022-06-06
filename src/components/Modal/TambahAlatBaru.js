import React, {useState} from 'react'
import {Form, Modal, Button} from "react-bootstrap"
import axios from "axios";
import Swal from "sweetalert2";

const TambahAlatBaru = ({ show, onHide, count, data }) => {
    const [inputs, setInputs] = useState({})

    const tambahAlat = (e) => {
        e.preventDefault();

        let formDataAlat = new FormData();
        formDataAlat.append('NAMA', inputs.nama);
        formDataAlat.append('JUMLAH', inputs.jumlah);
        formDataAlat.append('CATATAN', inputs.catatan);
        formDataAlat.append('HARGA', inputs.harga);
        formDataAlat.append('FILE', inputs.file);
        formDataAlat.append('PENGAJUAN_ID', data.pengajuanID)

        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatBaru.php?function=tambahAlatBaru',
            data: formDataAlat,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(() => {
            onHide(false);
            count();
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: "Gagal menambahkan alat baru",
                text: 'Terdapat kesalahan inputan / isian belum valid'
            })
            formDataAlat.delete("FILE");
        })        
    }

    return (
        <Modal show={show} onHide={() => onHide()}>
            <Form onSubmit={tambahAlat} encType="multipart/form-data" >
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
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Jumlah</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Jumlah"
                            name="jumlah"
                            onChange={(e) => setInputs({...inputs, [e.target.name]: parseInt(e.target.value)})}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Catatan</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Catatan" 
                            name="catatan" 
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})} 
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estimasi Harga</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Harga"
                            name="harga"
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>File Penunjang</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="file" 
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.files[0]})} 
                            required={true}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Tambah
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default TambahAlatBaru