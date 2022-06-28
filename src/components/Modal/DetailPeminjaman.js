import React, {useState, useEffect} from 'react'
import {Modal, Button, Form, Table} from "react-bootstrap";
import axios from "axios";

const DetailPeminjaman = ({show, onHide, data}) => {
    const [dataAlat, setDataAlat] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/peminjamanAlat.php?function=getAlatByNamaPeminjaman',
                data: {
                    nama_peminjaman: data
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
                <Form.Group className="mb-3">
                    <Form.Label>Nama Peminjaman</Form.Label>
                    <Form.Control value={data} readOnly></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Daftar Alat</Form.Label>
                    {
                        loading ? (<span>Loading ... </span>) : (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
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
    )
}

export default DetailPeminjaman