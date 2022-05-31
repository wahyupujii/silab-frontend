import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Modal, Form, Table, Image} from "react-bootstrap"
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
    const [inputs, setInputs] = useState({});

    // const [select, setSelect] = useState(null);

    // get all lab from localstorage
    const dataLab = JSON.parse(localStorage.getItem("labByJurusan"));
    const [getAlatLab, setAlatLab] = useState({loading: true, dataAlat: []});

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

    const buatPeminjaman = (e) => {
        e.preventDefault();
        // axios({
        //     method: 'post',
        //     url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/peminjamanAlat.php?function=buatPeminjaman',
        //     data: {
        //         ...inputs,
        //         pegawai_nomor: parseInt(nomorPegawai)
        //     },
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        //     }
        // }).then(result => {
        //     // setDataPeminjaman(result.data.data);
        //     // // setDataCount(result.data.data.length);
        //     // setLoading(false);
        //     console.log(result);
        // }).catch((err) => {
        //     // setDataPeminjaman(null);
        //     // setLoading(false);
        //     console.error("err", err)
        // })

        // console.log("select",select);
        // console.log("inputs",inputs);
    }

    const pilihLabArea = (e) => {
        e.preventDefault();
        if (e.target.value !== "N/A") {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatLabTersedia',
                data: { labID: parseInt(e.target.value) },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(result => {
                setAlatLab({...getAlatLab, loading: false, dataAlat: result.data.data});
            }).catch((err) => {
                setAlatLab({...getAlatLab, loading: false, dataAlat: null});
            })
        }
    }

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
                        <Modal show={showPinjam} onHide={() => setShowPinjam(false)} size='lg'>
                            <Form onSubmit={buatPeminjaman} encType="multipart/form-data" >
                                <Modal.Header closeButton>
                                    <Modal.Title>Form Peminjaman Alat</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className='d-flex justify-content-between'>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nama Peminjaman</Form.Label>
                                            <Form.Control
                                                type="name"
                                                name='nama'
                                                placeholder='nama peminjaman'
                                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tanggal Pinjam</Form.Label>
                                            <Form.Control
                                                name='tanggal_pinjam'
                                                type="date"
                                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tanggal Kembali</Form.Label>
                                            <Form.Control
                                                name='tanggal_kembali'
                                                type="date"
                                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                                            />
                                        </Form.Group>
                                    </div>
                                    
                                    <Form.Group>
                                        <Form.Label>Pilih Area Lab</Form.Label>
                                        <Form.Select onChange={pilihLabArea}>
                                            <option value="N/A">Pilih Lab Area</option>
                                            {
                                                dataLab.map(lab => {
                                                    return (
                                                        <option value={lab.ID}>{lab.NAMA}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>

                                    <div className="d-flex justify-content-between mt-2">
                                        {
                                            getAlatLab.loading ? (<div>Silahkan memilih lab area diatas terlebih dahulu</div>) : (
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Gambar</th>
                                                            <th>Nama Alat</th>
                                                            <th>Jumlah Tersedia</th>
                                                            <th>Jumlah Dipinjam</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            getAlatLab.dataAlat === null ? (
                                                                <span>Tidak ada alat di lab ini</span>
                                                            ) : 
                                                            getAlatLab.dataAlat.map((alat, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{index+1}</td>
                                                                        <td>
                                                                            <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${alat.GAMBAR}`} fluid={true} thumbnail={true} width={100} height={100} />
                                                                        </td>
                                                                        <td>{alat.NAMA}</td>
                                                                        <td>{alat.JUMLAH_TERSEDIA}</td>
                                                                        <td>
                                                                            <Button>-</Button>
                                                                            <span className='mx-4'>0</span>
                                                                            <Button>+</Button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                            )
                                        }
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" type="submit">
                                        Buat Peminjaman
                                    </Button>
                                </Modal.Footer>
                            </Form>
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