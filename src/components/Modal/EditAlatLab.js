import React, {useEffect, useState} from 'react'
import {Modal, Form, Button} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const EditAlatLab = ({ show, onHide, data }) => {
    const [dataAlat, setDataAlat] = useState({...data.dataAlat})

    const updateAlat = (event) => {
        event.preventDefault();
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin MENGUBAH DATA alat ini ? ',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(response => {
            let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=updateAlatLab',
                    data: {
                        ...dataAlat,
                        date_kelola: today,
                        teknisi_nomor: data.dataUser.NOMOR
                    },
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: "Berhasil mengubah data alat lab",
                    });
                    onHide();
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: "Gagal mengubah data alat lab",
                    })
                })
            }
        }).catch()
    }

    return (
        <Modal show={show} onHide={() => onHide()} size="lg">
            <Form onSubmit={updateAlat}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Alat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex justify-content-between">
                        <div className="w-50 px-2">
                            <Form.Group className="mb-3">
                                <Form.Label>Nama Alat</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={dataAlat.NAMA}
                                    onChange={(e) => setDataAlat({...dataAlat, NAMA: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Merk Alat</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={dataAlat.MERK}
                                    onChange={(e) => setDataAlat({...dataAlat, MERK: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type Alat</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={dataAlat.TYPE}
                                    onChange={(e) => setDataAlat({...dataAlat, TYPE: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Spesifikasi Alat</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    value={dataAlat.SPEC}
                                    onChange={(e) => setDataAlat({...dataAlat, SPEC: e.target.value})}
                                    style={{height: "100px"}}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Jumlah</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={dataAlat.JUMLAH}
                                    onChange={(e) => setDataAlat({...dataAlat, JUMLAH: e.target.value})}
                                />
                            </Form.Group>
                        </div>
                        <div className="w-50 px-2">
                            <Form.Group className="mb-3">
                                <Form.Label>Status Alat</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={dataAlat.STATUS_ALAT}
                                    onChange={(e) => setDataAlat({...dataAlat, STATUS_ALAT: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Kondisi Alat</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={dataAlat.KONDISI_ALAT}
                                    onChange={(e) => setDataAlat({...dataAlat, KONDISI_ALAT: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tahun</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={dataAlat.TAHUN}
                                    onChange={(e) => setDataAlat({...dataAlat, TAHUN: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>No Seri</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={dataAlat.NOMOR_SERI === null ? "-" : dataAlat.NOMOR_SERI}
                                    onChange={(e) => setDataAlat({...dataAlat, NOMOR_SERI: e.target.value})}
                                />
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="submit">Edit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default EditAlatLab