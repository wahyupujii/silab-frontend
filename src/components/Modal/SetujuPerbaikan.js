import React, {useState, useEffect} from 'react'
import {Modal, Button, Form, Table, Image} from "react-bootstrap";
import axios from 'axios';
import Swal from "sweetalert2";

const SetujuPerbaikan = ({show, onHide, data, count}) => {
    const [alatPerbaikan, setAlatPerbaikan] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (show) {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPerbaikan.php?function=getAlatByNamaPerbaikan',
                data: { 
                    nama_perbaikan: data.dataPerbaikan.NAMA
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(result => {
                setAlatPerbaikan(result.data.data);
                setLoading(false)
            }).catch(() => {
                // swal
                setAlatPerbaikan(null);
                setLoading(false)
            })
        }
    }, [show])

    const setujuiPerbaikan = () => {
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPerbaikan.php?function=setujuiPerbaikan',
            data: { 
                perbaikan_id: data.dataPerbaikan.ID,
                kalab_nomor: data.dataUser.NOMOR,
                tanggal_persetujuan: today
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
                title: 'Gagal Menyetujui Pengajuan Perbaikan'
            })
        })
    }

    const tolakPerbaikan = () => {
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPerbaikan.php?function=tolakPerbaikan',
            data: { 
                perbaikan_id: data.dataPerbaikan.ID,
                kalab_nomor: data.dataUser.NOMOR,
                tanggal_persetujuan: today
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
                title: 'Gagal Menolak Pengajuan Perbaikan'
            })
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
                    <Modal.Title>Detail Perbaikan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Label>Nama Perbaikan</Form.Label>
                        <Form.Control
                            value={data.dataPerbaikan.NAMA}
                            readOnly
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Daftar Alat</Form.Label>
                        {
                            loading ? (<div>Loading ... </div>) : alatPerbaikan === null ? (<span>Belum ada alat yang diperbaiki</span>) : (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            
                                            <th>Nama Alat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            alatPerbaikan.map((alat, index) => {
                                                return (
                                                    <tr key={alat.ID}>
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
                        data.dataPerbaikan.STATUS === "Disetujui KaLab" || data.dataPerbaikan.STATUS === "Ditolak KaLab" ? (
                            <div></div>
                        ) : (
                            <>
                                <Button variant="danger" onClick={() => tolakPerbaikan()}>Tolak Perbaikan</Button>
                                <Button variant="success" onClick={() => setujuiPerbaikan()}>Setuju Perbaikan</Button>
                            </>
                        )
                    }
                    <Button variant="primary" onClick={() => onHide()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SetujuPerbaikan