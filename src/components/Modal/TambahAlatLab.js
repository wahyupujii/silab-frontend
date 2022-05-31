import React, { useState } from 'react';
import {Modal, Form, Button} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const TambahAlatLab = ({show, onHide, data, count}) => {
    const [inputs, setInputs] = useState({});

    const tambahAlatLab = (e) => {
        e.preventDefault();
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();

        let formDataAlat = new FormData();
        formDataAlat.append('NAMA', inputs.nama);
        formDataAlat.append('JUMLAH', inputs.jumlah);
        formDataAlat.append('TAHUN', inputs.tahun);
        formDataAlat.append('NOMOR_SERI', inputs.no_seri);
        formDataAlat.append('GAMBAR', inputs.gambar);
        formDataAlat.append('TEKNISINOMOR', parseInt(data.dataUser.NOMOR));
        formDataAlat.append('DATEKELOLA', today)
        formDataAlat.append('LABID', parseInt(data.dataLab));

        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=addAlatLab',
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
                title: "Gagal menambahkan data alat lab",
                text: 'Terdapat kesalahan inputan / anda bukan teknisi dari lab ini'
            })
        })        
    }

    return (
        <Modal show={show} onHide={() => onHide(false)}>
            <Form onSubmit={tambahAlatLab} encType="multipart/form-data" >
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alat Lab Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Alat</Form.Label>
                        <Form.Control
                            name="nama"
                            type="text"
                            placeholder='Nama Alat'
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Jumlah Total</Form.Label>
                        <Form.Control
                            name="jumlah"
                            type="text"
                            placeholder='Jumlah Total'
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tahun</Form.Label>
                        <Form.Control
                            name="tahun"
                            type="text"
                            placeholder='Tahun'
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>No Seri</Form.Label>
                        <Form.Control
                            name="no_seri"
                            type="text"
                            placeholder='No Seri'
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload Gambar</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="gambar" 
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.files[0]})} 
                            required={true}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">
                        Simpan
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default TambahAlatLab