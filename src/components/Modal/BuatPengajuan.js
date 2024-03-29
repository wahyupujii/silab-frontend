import React, {useState} from 'react'
import {Modal, Form, Button} from "react-bootstrap"
import axios from "axios";

const BuatPengajuan = ({ show, onHide, data, count }) => {
    const [inputs, setInputs] = useState({});

    const dataLab = JSON.parse(localStorage.getItem("labByJurusan"));

    const createPengajuan = (e) => { 
        e.preventDefault();

        if (inputs.laboratorium_id !== "Pilih Lab Tujuan") {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=buatPengajuan',
                data: {
                    ...inputs,
                    status: "Menunggu ACC KaLab",
                    pegawai_nomor: data.pegawaiNomor,
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(result => {
                if (result.data.status) {
                    onHide();
                    count();
                }
            })
            .catch(err => console.log("err", err))
        }
    }

    return (
        <Modal show={show} onHide={() => onHide()}>
            <Form onSubmit={createPengajuan}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Pengajuan Alat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Pengajuan</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Nama Pengajuan'
                            name="nama"
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tanggal</Form.Label>
                        <Form.Control
                            type="date"
                            name="tanggal_pengajuan"
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pilih Lab Tujuan</Form.Label>
                        <Form.Select name="laboratorium_id" onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value})}>
                            <option>Pilih Lab Tujuan</option>
                            {
                                dataLab.map(lab => {
                                    return (
                                        <option value={lab.ID} key={lab.ID}>{lab.NAMA}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Buat Pengajuan
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default BuatPengajuan