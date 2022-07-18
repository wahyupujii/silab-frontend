import React, {useState, useEffect} from 'react'
import { Modal, Form, Table, Button } from 'react-bootstrap';
import axios from "axios";

const DetailPemindahan = ({show, onHide, data}) => {
    const [dataAlat, setDataAlat] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pemindahanAlat.php?function=getAlatByNamaPemindahan',
                data: {
                    nama_pemindahan: data.NAMA_PEMINDAHAN
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
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Pemindahan</Form.Label>
                        <Form.Control value={data.NAMA_PEMINDAHAN} readOnly></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Daftar Alat</Form.Label>
                        {
                            loading ? (<span>Loading ... </span>) : dataAlat === null ? (
                                <div className="text-secondary">Alat yang dipindah sebelumnya sudah tidak ada kaitan dengan pemindahan ini, karena sudah Disetujui / Ditolak Kalab</div>
                            ) : (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nama Alat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataAlat.map((alat, index) => {
                                                return (
                                                    <tr key={alat.ID}>
                                                        <td className='align-middle'>{index+1}</td>
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
                    <Button variant="secondary" onClick={() => onHide()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DetailPemindahan