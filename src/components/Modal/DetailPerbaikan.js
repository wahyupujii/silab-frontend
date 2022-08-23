import React, {useState, useEffect} from 'react'
import { Modal, Button, Form, Table, Image } from 'react-bootstrap'
import axios from "axios";
import Swal from 'sweetalert2';

const DetailPerbaikan = ({show, onHide, count, data}) => {
    const [dataAlat, setDataAlat] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/perbaikanAlat.php?function=getAlatRusakByNamaPerbaikan',
                data: { 
                    nama_perbaikan: data.NAMA
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

    const perbaikanSelesai = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin MENYELESAIKAN PERBAIKAN ALAT ini ? ',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(response => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/perbaikanAlat.php?function=perbaikanSelesai',
                    data: {
                        perbaikan_id: id
                    },
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil MENYELESAIKAN PERBAIKAN ALAT',
                    })
                    onHide();
                    count();
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal MENYELESAIKAN PERBAIKAN ALAT',
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
                <Modal.Title>Detail Pengajuan Perbaikan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Nama Perbaikan</Form.Label>
                    <Form.Control value={data.NAMA} readOnly></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Catatan Kerusakan</Form.Label>
                    <Form.Control as="textarea" rows={3} value={data.CATATAN_KERUSAKAN} readOnly></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    {dataAlat !== null ? (<Form.Label>Daftar Alat</Form.Label>) : (<div></div>)}
                    {
                        loading ? (<span>Loading ... </span>) : dataAlat === null ? 
                        (<div className="text-danger">Alat yang rusak sebelumnya sudah tidak ada kaitan dengan perbaikan ini, karena perbaikan ini telah ditoklak KaLab / selesai</div>) : 
                        (
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
                    data.STATUS === "Disetujui KaLab" ? (
                        <Button variant="info" onClick={() => perbaikanSelesai(data.ID)}>Perbaikan Selesai</Button>
                    ) : (<div></div>)
                }
                <Button variant="secondary" onClick={() => onHide()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailPerbaikan