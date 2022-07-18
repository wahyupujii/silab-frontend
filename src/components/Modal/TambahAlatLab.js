import React, { useState, useRef } from 'react';
import {Modal, Form, Button} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

import { Editor } from '@tinymce/tinymce-react';

const TambahAlatLab = ({show, onHide, data, count}) => {
    const [inputs, setInputs] = useState({});
    const editorRef = useRef(null);

    const tambahAlatLab = (e) => {
        e.preventDefault();
        
        // cek tinymce is empty
        if (editorRef.current.getContent() === "") {
            Swal.fire({
                icon: "error",
                text: "Spesifikasi harus diisi"
            })
            return;
        }
    
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();

        let formDataAlat = new FormData();
        formDataAlat.append('NAMA', inputs.nama);
        formDataAlat.append('MERK', inputs.merk);
        formDataAlat.append('TYPE', inputs.type);
        formDataAlat.append('SPESIFIKASI', editorRef.current.getContent());

        formDataAlat.append('JUMLAH', parseInt(inputs.jumlah));
        formDataAlat.append('TAHUN', inputs.tahun);

        if (inputs.hasOwnProperty("no_seri")) {
            formDataAlat.append('NOMOR_SERI', inputs.no_seri);
        } else {
            formDataAlat.append('NOMOR_SERI', "");
        }

        formDataAlat.append('GAMBAR', inputs.gambar);
        formDataAlat.append('TEKNISI_NOMOR', parseInt(data.dataUser.NOMOR));
        formDataAlat.append('DATE_KELOLA', today)
        formDataAlat.append('LAB_ID', parseInt(data.dataLab));

        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=addAlatLab',
            data: formDataAlat,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((result) => {
            onHide(false);
            count();
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: "Gagal menambahkan data alat lab",
                text: 'Terdapat kesalahan inputan / anda bukan teknisi dari lab ini'
            })
            formDataAlat.delete('GAMBAR');
        })        
    }

    return (
        <Modal show={show} onHide={() => onHide(false)} size="lg">
            <Form onSubmit={tambahAlatLab} encType="multipart/form-data" >
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alat Lab Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between">
                        <div className="w-50 px-2">
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
                                <Form.Label>Merk Alat</Form.Label>
                                <Form.Control
                                    name="merk"
                                    type="text"
                                    placeholder='Merk Alat'
                                    onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                                    required={true}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type Alat</Form.Label>
                                <Form.Control
                                    name="type"
                                    type="text"
                                    placeholder='Type Alat'
                                    onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                                    required={true}
                                />
                            </Form.Group>
                        </div>
                        <div className="w-50 px-2">
                            <Form.Group className="mb-3">
                                <Form.Label>Jumlah</Form.Label>
                                <Form.Control
                                    name="jumlah"
                                    type="number"
                                    placeholder='Jumlah'
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
                        </div>
                    </div>
                    <Form.Group className="mb-3 w-100">
                        <Form.Label>Spesifikasi</Form.Label><br/>
                        <Form.Text className="text-danger">
                            Penulisan spesifikasi menggunakan bullet list <br/>
                            Contoh : <ul><li>Spesifikasi 1</li></ul>
                        </Form.Text>
                        <Editor
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