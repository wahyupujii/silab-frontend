import React, {useState, useEffect} from 'react'
import {Modal, Form, Table, Button, Image} from 'react-bootstrap';
import axios from "axios";

const SetujuPemindahan = ({show, onHide, data, count}) => {
    const [alatPemindahan, setAlatPemindahan] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPemindahan.php?function=getAlatByNamaPemindahan',
                data: { 
                    nama_pemindahan: data.dataPemindahan.NAMA_PEMINDAHAN
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(result => {
                setAlatPemindahan(result.data.data);
                setLoading(false)
            }).catch(() => {
                setAlatPemindahan(null);
                setLoading(false)
            })
        }
    }, [show])

    const setujuiPemindahan = () => {
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPemindahan.php?function=setujuiPemindahan',
            data: { 
                kalab_nomor: data.dataUser.NOMOR,
                pemindahan_id: data.dataPemindahan.ID,
                nama_pemindahan: data.dataPemindahan.NAMA_PEMINDAHAN,
                tanggal_persetujuan: today,
                lab_tujuan: data.dataPemindahan.LAB_TUJUAN
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(() => {
            onHide();
            count();
        }).catch(() => {
            
        })
    }

    const tolakPemindahan = () => {
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPemindahan.php?function=tolakPemindahan',
            data: { 
                kalab_nomor: data.dataUser.NOMOR,
                pemindahan_id: data.dataPemindahan.ID,
                nama_pemindahan: data.dataPemindahan.NAMA_PEMINDAHAN,
                tanggal_persetujuan: today,
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(() => {
            onHide();
            count();
        }).catch(() => {
            
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
                    <Modal.Title>Detail Pemindahan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Label>Nama Pemindahan</Form.Label>
                        <Form.Control
                            value={data.dataPemindahan.NAMA_PEMINDAHAN}
                            readOnly
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Daftar Alat</Form.Label>
                        {
                            loading ? (<div>Loading ... </div>) : alatPemindahan === null ? (<span>Belum ada alat yang diperbaiki</span>) : (
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
                                            alatPemindahan.map((alat, index) => {
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
                        data.dataPemindahan.STATUS === 'Disetujui KaLab' || data.dataPemindahan.STATUS === 'Disetujui KaLab' ? (
                            <div></div>
                        ) : (
                            <>
                                <Button variant="danger" onClick={() => tolakPemindahan()}>Tolak Pemindahan</Button>
                                <Button variant="success" onClick={() => setujuiPemindahan()}>Setuju Pemindahan</Button>
                            </>
                        )                    
                    }
                    <Button variant="primary" onClick={() => onHide()}>Close</Button>
                </Modal.Footer>
            </Modal>        
        </>
    )
}

export default SetujuPemindahan