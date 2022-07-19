import React, {useEffect, useState, useRef} from 'react'
import {Modal, Form, Button} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

import { Editor } from '@tinymce/tinymce-react';

const EditAlatLab = ({ show, onHide, data }) => {
    const [dataAlat, setDataAlat] = useState({...data.dataAlat})
    const editorRef = useRef(null);
    
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
                        SPEC: editorRef.current.getContent(),
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
                    <Form>
                        <div className='d-flex justify-content-between'>
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
                        </div>
                        <Form.Group className="mb-3 w-100 px-2">
                            <Form.Label>Spesifikasi</Form.Label><br/>
                            <Form.Text className="text-danger">
                                Penulisan spesifikasi menggunakan bullet list <br/>
                                Contoh : <ul><li>Spesifikasi 1</li></ul>
                            </Form.Text>
                            <Editor
                                initialValue={dataAlat.SPEC}
                                onInit={(evt, editor) => editorRef.current = editor}
                                init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                    'lists'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help ' + 
                                'bullist',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </Form.Group>
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