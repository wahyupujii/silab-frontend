import React, {useState, useEffect} from 'react'
import { Breadcrumb, Card, Button, Modal, Form } from 'react-bootstrap'
import axios from "axios";
import Swal from 'sweetalert2';

const AlatLabDiputihkan = (props) => {
    const [dataAlat, setDataAlat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [modal, setModal] = useState({show: false, detailAlat: ""});

    useEffect (() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAllAlatLab',
            data: {labID: props.data.labID},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataAlat(result.data.data);
            setDataCount(result.data.data.length);
            setLoading(false)
        }).catch(() => {
            setDataAlat(null);
            setLoading(false);
        })
    }, [dataCount])

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
                    data: {alatLabID: id, teknisiKelolaNomor: parseInt(props.dataUser.NOMOR), labID: parseInt(props.data.labID)},
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(() => {
                    setDataCount(dataCount-1);
                    setModal({...modal, show: false});
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

    return (
        <div className='w-100 p-3'>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => props.handleBack(false)} >Pilih Area Lab</Breadcrumb.Item>
                <Breadcrumb.Item>{props.data.labTitle}</Breadcrumb.Item>
            </Breadcrumb>
            <h2>Informasi Semua Alat Lab</h2>
            <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                {
                    loading ? (<span>loading ... </span>) : dataAlat === null ? (<span>Belum ada alat di lab ini</span>) : (
                        dataAlat.map(data => {
                            return (
                                <Card style={{ width: '13rem' }} className="my-2" key={data.ID}>
                                    <Card.Img variant="top" src={data.GAMBAR} />
                                    <Card.Body>
                                        <Card.Title>{data.NAMA}</Card.Title>
                                        <Card.Text>Jumlah Tersedia : {data.JUMLAH_TERSEDIA}</Card.Text>
                                        <Card.Text>Status : <span className={data.STATUS_ALAT === "TERSEDIA" ? "text-success" : "text-danger"} >{data.STATUS_ALAT}</span></Card.Text>
                                        <Card.Text>No Seri : <span>{data.NOMOR_SERI}</span></Card.Text>
                                        <Button variant="primary" onClick={() => setModal({show:true, detailAlat: data})}>Detail</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>

            <Modal show={modal.show} onHide={() => setModal({...modal, show: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Alat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Alat</Form.Label>
                            <Form.Control
                                type="name"
                                value={modal.detailAlat.NAMA}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Tersedia</Form.Label>
                            <Form.Control
                                type="jumlah"
                                value={modal.detailAlat.JUMLAH_TERSEDIA}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control
                                type="tahun"
                                value={modal.detailAlat.TAHUN}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>No Seri</Form.Label>
                            <Form.Control
                                type="seri"
                                value={modal.detailAlat.NOMOR_SERI}
                                readOnly
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => hapusAlatLab(modal.detailAlat.ID)}>
                        Hapus
                    </Button>
                    <Button variant="secondary" onClick={() => setModal({...modal, show: false})}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AlatLabDiputihkan