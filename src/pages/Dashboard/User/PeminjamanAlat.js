import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Modal, Form, Table} from "react-bootstrap"
import DetailPeminjaman from './DetailPeminjaman'
import axios from "axios"
// import Swal from "sweetalert2";

const PeminjamanAlat = ({nomorPegawai}) => {
    // state untuk pengaturan component modal
    const [showPinjam, setShowPinjam] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    
    const [detailPeminjaman, setDetailPeminjaman] = useState(false)
    const [dataPeminjaman, setDataPeminjaman] = useState(null);
    // const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/peminjamanAlat.php?function=getAllPeminjaman',
            data: {nomorPegawai: nomorPegawai},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataPeminjaman(result.data.data);
            // setDataCount(result.data.data.length);
            setLoading(false);
        }).catch(() => {
            setDataPeminjaman(null);
            setLoading(false);
        })
    }, [nomorPegawai]);

    return (
        <>
            {
                detailPeminjaman === false ? (
                    <div className='w-100 p-3'>
                        <Breadcrumb>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item>Peminjaman Alat Lab</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="d-flex justify-content-between">
                            <h2>Riwayat Peminjaman Alat</h2>
                            <Button variant="primary" onClick={() => setShowPinjam(true)}>Buat Peminjaman</Button>
                        </div>
                        <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                            {
                                loading ? (<div>loading...</div>) : dataPeminjaman == null ? (<div>Belum ada Peminjaman Alat</div>) : 
                                dataPeminjaman.map((data) => {
                                    return (
                                        <Card className="my-3" style={{width: '18rem'}} key={data.ID}>
                                            <Card.Body>
                                                <Card.Title className="mb-3">{data.NAMA_PEMINJAMAN}</Card.Title>
                                                <div className="d-flex flex-column">
                                                    <span style={{fontSize: '12px'}}>Tanggal Pinjam :  {data.TANGGAL_PINJAM}</span>
                                                    <span style={{fontSize: '12px'}}>Tanggal Kembali : {data.TANGGAL_KEMBALI}</span>
                                                    <Button variant="outline-primary" className="my-3" onClick={() => setDetailPeminjaman(!detailPeminjaman)}>Tambah Alat</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            }
                            
                            {/* contoh button detail peminjaman */}
                            {/* <Card className="my-3" style={{width: '18rem'}}>
                                <Card.Body>
                                    <Card.Title className="mb-3">Peminjaman Laptop Lenovo</Card.Title>
                                    <div className="d-flex flex-column">
                                        <span>Tanggal :  </span>
                                        <span>30/5/2022</span>
                                        <Button variant="outline-primary" className="my-3" onClick={() => setShowDetail(true)}>Detail</Button>
                                    </div>
                                </Card.Body>
                            </Card> */}
                        </div>

                        {/* modal tambah pinjam alat */}
                        <Modal show={showPinjam} onHide={() => setShowPinjam(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Form Peminjaman Alat</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nama Peminjaman</Form.Label>
                                        <Form.Control
                                            type="name"
                                            placeholder='nama peminjaman'
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tanggal Pinjam</Form.Label>
                                        <Form.Control
                                            type="date"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tanggal Kembali</Form.Label>
                                        <Form.Control
                                            type="date"
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary">
                                    Buat Peminjaman
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* modal detail peminjaman */}
                        <Modal show={showDetail} onHide={() => setShowDetail(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Detail Peminjaman Alat</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nama Peminjaman</Form.Label>
                                        <Form.Control
                                            type="name"
                                            value='Peminjaman Laptop Lenovo'
                                            readOnly
                                        />
                                        <Table striped bordered hover variant="dark" className='mt-4'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nama Alat</th>
                                                    <th>Jumlah</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Alat 1</td>
                                                    <td>1</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Alat 2</td>
                                                    <td>2</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Alat 3</td>
                                                    <td>3</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            {/* <Modal.Footer>
                                <Button variant="primary">
                                    Buat Peminjaman
                                </Button>
                            </Modal.Footer> */}
                        </Modal>
                    </div>      
                ) : (
                    <DetailPeminjaman handleBack={(value) => setDetailPeminjaman(value)} />
                )
            }
        </>
    )
}

export default PeminjamanAlat