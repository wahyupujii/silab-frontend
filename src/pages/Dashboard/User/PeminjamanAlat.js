import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Modal, Form, Table, Image} from "react-bootstrap"
import DetailPeminjaman from './DetailPeminjaman'
import axios from "axios"
// import Swal from "sweetalert2";

// component 
import { PinjamAlat } from '../../../components/Modal'

const PeminjamanAlat = ({nomorPegawai}) => {
    // state untuk pengaturan component modal
    const [showPinjam, setShowPinjam] = useState(false)
    // const [showDetail, setShowDetail] = useState(false)
    
    const [detailPeminjaman, setDetailPeminjaman] = useState(false)
    const [dataPeminjaman, setDataPeminjaman] = useState(null);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // const [inputs, setInputs] = useState({
    //     nama: "",
    //     tanggal_pinjam: "",
    //     tanggal_kembali: "",
    //     alat_lab : []
    // });

    // const [select, setSelect] = useState(null);

    // get all lab from localstorage
    // const dataLab = JSON.parse(localStorage.getItem("labByJurusan"));
    // const [getAlatLab, setAlatLab] = useState({loading: true, dataAlat: []});

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
            setDataCount(result.data.data.length);
            setLoading(false);
        }).catch(() => {
            setDataPeminjaman(null);
            setLoading(false);
        })
    }, [nomorPegawai, dataCount]);

    // const buatPeminjaman = (e) => {
    //     e.preventDefault();
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
    // }

    // const pilihLabArea = (e) => {
    //     e.preventDefault();
    //     if (e.target.value !== "N/A") {
    //         axios({
    //             method: 'post',
    //             url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatLabTersedia',
    //             data: { labID: parseInt(e.target.value) },
    //             headers: {
    //                 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         }).then(result => {
    //             // let temp = result.data.data;
    //             // temp.map(obj => {
    //             //     setAlatLab({...getAlatLab, dataAlat: [...getAlatLab.dataAlat, {...obj, jumlahDipinjam: 0}]})
    //             // })
    //             let temp = [];
    //             result.data.data.map(obj => {
    //                 temp.push({...obj, jumlahDipinjam: 0})
    //             })
    //             setAlatLab({...getAlatLab, loading: false, dataAlat: temp});
    //         }).catch((err) => {
    //             setAlatLab({...getAlatLab, loading: false, dataAlat: null});
    //         })
    //     }
    // }

    // const plusAlatPinjam = (id, jumlah_tersedia) => {
    //     // check di dalam state apakah sudah ada alat lab dengan id tersebut dengan fungsi filter
    //     const result = inputs.alat_lab.filter((obj) => {
    //         // if (obj.hasOwnProperty(id)) {
    //             return obj.id = id
    //         // }
    //     })

    //     const selectedAlatLab = getAlatLab.dataAlat.filter((obj) => {return obj.ID = id});

    //     // jika ada,
        
    //     if (selectedAlatLab) {
            
    //     }
        
    //     if (result.length !== 0) {
    //         if ((result[0].jumlah + 1) < jumlah_tersedia) {
    //             result[0].jumlah += 1
    //             let index = getAlatLab.dataAlat.indexOf(selectedAlatLab)
    //             setAlatLab({...getAlatLab, dataAlat})
    //         } else {
    //             alert("jumlah melebihi batas")
    //         }
    //     } else {
    //         let obj = {
    //             id: id,
    //             jumlah: 1
    //         }
    //         inputs.alat_lab.push(obj)
    //         selectedAlatLab.jumlahDipinjam = 1;

    //     }

    //     // jika belum, buat objek

    //     // masukkan / push ke state array



    // }

    // const minusAlatPinjam = (id, jumlah_tersedia) => {

    // }

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

                        {/* modal pinjam alat */}
                        <PinjamAlat 
                            show={showPinjam}
                            onHide={() => setShowPinjam(false)}
                        />

                        {/* modal detail peminjaman */}
                        {/* <Modal show={showDetail} onHide={() => setShowDetail(false)}>
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
                            <Modal.Footer>
                                <Button variant="primary">
                                    Buat Peminjaman
                                </Button>
                            </Modal.Footer>
                        </Modal> */}
                    </div>      
                ) : (
                    <DetailPeminjaman handleBack={(value) => setDetailPeminjaman(value)} />
                )
            }
        </>
    )
}

export default PeminjamanAlat