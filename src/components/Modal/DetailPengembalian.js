import React, {useState, useEffect} from 'react'
import {Modal, Form, Button, Table, Image} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const DetailPengembalian = ({show, onHide, count, data}) => {
    const [dataAlat, setDataAlat] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (show) {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengembalianAlat.php?function=getAlatByKeperluanPinjam',
                data: {
                    keperluan_pinjam: data.KEPERLUAN_PINJAM
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(result => {
                setDataAlat(result.data.data);
                setLoading(false);
            }).catch(() => {
                setDataAlat(null);
                setLoading(false);
            })
        }
    }, [show])

    const setujuPengembalian = () => {
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin MENYETUJUI PENGEMBALIAN ALAT ini ? ',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(response => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengembalianAlat.php?function=setujuPengembalian',
                    data: {
                        keperluan_pinjam: data.KEPERLUAN_PINJAM
                    },
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil MENYETUJUI PENGEMBALIAN ALAT',
                    })
                    onHide();
                    count();
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal MENYETUJUI PENGEMBALIAN ALAT',
                    })
                })
            }
        })
    }

    return (
        <Modal
            show={show}
            onHide={() => onHide()}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Detail Pengembalian Alat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Keperluan Pinjam</Form.Label>
                    <Form.Control value={data.KEPERLUAN_PINJAM} readOnly></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3 d-flex w-100">
                    <div className='w-50'>
                        <Form.Label>Tanggal Pinjam</Form.Label>
                        <Form.Control value={data.TANGGAL_PINJAM} readOnly></Form.Control>
                    </div>
                    <div className='w-50'>
                        <Form.Label>TANGGAL_KEMBALI</Form.Label>
                        <Form.Control value={data.TANGGAL_KEMBALI} readOnly></Form.Control>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Daftar Alat</Form.Label>
                    {
                        loading ? (<span>Loading ... </span>) : (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Gambar</th>
                                        <th>Nama Alat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataAlat === null ? (<div></div>) : 
                                        dataAlat.map((alat, index) => {
                                            return (
                                                <tr key={alat.ID}>
                                                    <td className='align-middle'>{index+1}</td>
                                                    <td className='align-middle'>
                                                        <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${alat.GAMBAR}`} fluid={true} thumbnail={true} width={100} height={100} />
                                                    </td>
                                                    <td className='align-middle'>{alat.NAMA}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        )
                    }
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                {
                    data.STATUS_PINJAM === "Disetujui KaLab" && data.STATUS_KEMBALI === "Menunggu ACC KaLab"? (
                        <Button variant="success" onClick={() => setujuPengembalian()}>
                            Setuju Pengembalian
                        </Button>
                    ) : (<div></div>)
                }
                <Button variant="secondary" onClick={() => onHide()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailPengembalian