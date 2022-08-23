import React, {useState, useEffect} from 'react'
import {Modal, Button, Form, Table, Image} from "react-bootstrap";
import axios from 'axios';
import Swal from "sweetalert2";

const SetujuPeminjaman = ({show, onHide, data, count}) => {
    const [alatDipinjam, setAlatDipinjam] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (show) {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPeminjaman.php?function=getAlatByKeperluanPinjam',
                data: { 
                    keperluan_pinjam: data.KEPERLUAN_PINJAM
                 },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(result => {
                setAlatDipinjam(result.data.data);
                setLoading(false)
            }).catch(() => {
                // swal
                setAlatDipinjam(null);
                setLoading(false)
            })
        }
    }, [show])

    const setujuiPeminjaman = () => {
        Swal.fire({
            icon: 'question',
            title: 'Setujui Peminjaman',
            text: 'Apa anda yakin ingin menyetujui peminjaman ini ?',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(response => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPeminjaman.php?function=setujuiPeminjaman',
                    data: { 
                        keperluan_pinjam: data.KEPERLUAN_PINJAM
                     },
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(() => {
                    count();
                    onHide();
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Menyetujui Peminjaman'
                    })
                })
            }
        })
    }

    const tolakPeminjaman = () => {
        Swal.fire({
            icon: 'question',
            title: 'Tolak Peminjaman',
            text: 'Apa anda yakin ingin menolak peminjaman ini ?',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(response => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPeminjaman.php?function=tolakPeminjaman',
                    data: { 
                        keperluan_pinjam: data.KEPERLUAN_PINJAM
                     },
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(() => {
                    count();
                    onHide();
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Menolak Peminjaman'
                    })
                })
            }
        })
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Detail Peminjaman</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Label>Keperluan Pinjam</Form.Label>
                        <Form.Control
                            value={data.KEPERLUAN_PINJAM}
                            readOnly
                        ></Form.Control>
                    </Form.Group>
                    <div className="mb-3 d-flex">
                        <Form.Group>
                            <Form.Label>Tanggal Pinjam</Form.Label>
                            <Form.Control value={data.TANGGAL_PINJAM} readOnly></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tanggal Kembali</Form.Label>
                            <Form.Control value={data.TANGGAL_KEMBALI} readOnly></Form.Control>
                        </Form.Group>
                    </div>
                    <Form.Group className='mb-3'>
                        <Form.Label>Daftar Alat</Form.Label>
                        {
                            loading ? (<div>Loading ... </div>) : alatDipinjam === null ? (<span>Belum ada alat yang dipinjam</span>) : (
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
                                            alatDipinjam.map((alat, index) => {
                                                return (
                                                    <tr>
                                                        <td className="align-middle">{index+1}</td>
                                                        <td className="align-middle">
                                                            <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${alat.GAMBAR}`} fluid={true} thumbnail={true} width={100} height={100} />
                                                        </td>
                                                        <td className="align-middle">{alat.NAMA}</td>
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
                        data.STATUS_PINJAM === "Menunggu ACC KaLab" ? (
                            <>
                                <Button variant="danger" onClick={() => tolakPeminjaman()}>Tolak Peminjaman</Button>
                                <Button variant="success" onClick={() => setujuiPeminjaman()}>Setuju Peminjaman</Button>
                            </>
                        ) : (<div></div>)
                    }
                    <Button variant="primary" onClick={() => onHide()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SetujuPeminjaman