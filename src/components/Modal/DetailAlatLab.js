import React, {useState} from 'react'
import {Modal, Form, Button} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

// modal component 
import EditAlatLab from './EditAlatLab';

const DetailAlatLab = ({ type, show, onHide, data, count }) => {
    const [modalEditAlat, setModalEdit] = useState(false);

    const hapusAlatLab = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin MENGHAPUS ALAT ini ? ',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then((response) => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=deleteAlatLab',
                    data: {alatLabID: id, teknisiKelolaNomor: parseInt(data.dataUser.NOMOR), labID: parseInt(data.labID)},
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(() => {
                    count();
                    onHide();
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Menghapus Alat Lab',
                    })
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: "Gagal menghapus data alat lab",
                        text: 'Terdapat kesalahan / anda bukan teknisi dari lab ini'
                    })
                })
            }
        }).catch();
    }

    const returnSpesifikasi = (e) => {
        return (
            <div dangerouslySetInnerHTML={{ __html: e }} />
        )
    }

    return (
        <>
            {
                modalEditAlat === false ? (
                    <Modal show={show} onHide={() => onHide()} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Detail Alat</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div className="d-flex justify-content-between">
                                    <div className="w-50 px-2">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nama Alat</Form.Label>
                                            <Form.Control
                                                type="name"
                                                value={data.dataAlat.NAMA}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Merk Alat</Form.Label>
                                            <Form.Control
                                                type="name"
                                                value={data.dataAlat.MERK}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Type Alat</Form.Label>
                                            <Form.Control
                                                type="name"
                                                value={data.dataAlat.TYPE}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Jumlah</Form.Label>
                                            <Form.Control
                                                type="jumlah"
                                                value={data.dataAlat.JUMLAH}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="w-50 px-2">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Status Alat</Form.Label>
                                            <Form.Control
                                                type="status_alat"
                                                value={data.dataAlat.STATUS_ALAT}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Kondisi Alat</Form.Label>
                                            <Form.Control
                                                type="kondisi_alat"
                                                value={data.dataAlat.KONDISI_ALAT}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Status Pindah</Form.Label>
                                            <Form.Control
                                                type="status_pindah"
                                                value={data.dataAlat.STATUS_PINDAH}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tahun</Form.Label>
                                            <Form.Control
                                                type="tahun"
                                                value={data.dataAlat.TAHUN}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>No Seri</Form.Label>
                                            <Form.Control
                                                type="seri"
                                                value={data.dataAlat.NOMOR_SERI === null ? "-" : data.dataAlat.NOMOR_SERI}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <Form.Group className="mb-3 px-2">
                                    <Form.Label>Spesifikasi Alat</Form.Label>
                                    <br/>
                                    {returnSpesifikasi(data.dataAlat.SPEC)}
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            {
                                type === "primary" ? (
                                    <>
                                        <Button 
                                            variant="secondary" 
                                            onClick={() => {
                                                setModalEdit(true);
                                                onHide();
                                            }}
                                        >
                                            Edit Data
                                        </Button>        
                                        <Button variant="danger" onClick={() => hapusAlatLab(data.dataAlat.ID)} >
                                            Hapus
                                        </Button>
                                    </>
                                ) : type === "secondary" ? (
                                    <Button variant="secondary" onClick={() => onHide()} >
                                        Close
                                    </Button>
                                ) : <div></div>
                            }
                        </Modal.Footer>
                    </Modal>
                ) : (
                    // modal edit alat
                    <EditAlatLab 
                        show={modalEditAlat}
                        onHide={() => setModalEdit(false)}
                        data={{dataUser: data.dataUser, dataAlat: data.dataAlat}}
                    />
                )
            }
        </>
    )
}

export default DetailAlatLab