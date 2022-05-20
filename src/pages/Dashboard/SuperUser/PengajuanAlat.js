import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Modal, Form} from "react-bootstrap";
import axios from "axios";

import DetailPengajuan from './DetailPengajuan';
import PersetujuanPengajuan from './PersetujuanPengajuan';

const PengajuanAlat = ({dataUser}) => {    
    const [content, setContent] = useState("");

    return (
        <>
            <div className='w-100 p-3'>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Pengajuan Alat Lab</Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex">
                    <Button variant="outline-secondary mx-2" active={content === "persetujuan" ? true : false} onClick={() => setContent("persetujuan")}>Persetujuan Pengajuan</Button>
                    <Button variant="outline-secondary mx-2" active={content === "pengajuan" ? true : false} onClick={() => setContent("pengajuan")}>Pengajuan Alat</Button>
                </div>
                <div className='px-4 py-3 mt-2' style={{maxWidth: '100%', background: 'white'}}>
                    {
                        content === "persetujuan" ? (
                            <PersetujuanPengajuan dataUser={dataUser} />
                        ) : content === "pengajuan" ? (
                            <RiwayatPengajuan pegawaiNomor={dataUser.NOMOR} />
                        ) : <div>Silahkan pilih menu diatas</div>
                    }
                </div>
            </div>
        </>
    )
}

const RiwayatPengajuan = ({pegawaiNomor}) => {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dataPengajuan, setDataPengajuan] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [inputs, setInputs] = useState({});
    const [dataLab, setDataLab] = useState([]);
    const [detailPengajuan, setDetailPengajuan] = useState({show: false, dataID: "", dataTitle: ""});

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=getPengajuanByNomorPegawai',
            data: {pegawai_nomor: pegawaiNomor},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataPengajuan(result.data.data);
            setDataCount(result.data.data.length);
            setLoading(false);
        }).catch(() => {
            setDataPengajuan(null);
            setLoading(false)
        });

        setDataLab(JSON.parse(localStorage.getItem("labByJurusan")))
    }, [dataCount])

    const buatPengajuan = () => {
        if (inputs.laboratorium_id !== "Pilih Lab Tujuan") {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=buatPengajuan',
                data: {
                    ...inputs,
                    status: "Menunggu ACC KaLab",
                    pegawai_nomor: pegawaiNomor,
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(result => {
                if (result.data.status) {
                    setModal(false);
                    setDataCount(dataCount+1);
                }
            })
            .catch(err => console.log("err", err))
        } 
    }

    return (
        <>
            {
                detailPengajuan.show === false  ? (
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h1>Riwayat Pengajuan Alat</h1>
                            <Button onClick={() => setModal(true)}>Tambah Pengajuan</Button>
                        </div>
                        <div className='d-flex flex-wrap justify-content-between'>
                            {
                                loading ? (<div>loading ...</div>) : dataPengajuan == null ? (<span>Belum Ada Pengajuan ALat</span>) : 
                                dataPengajuan.map(data => {
                                    let dataStatus = data.STATUS === 'Pengajuan Ditolak' ? 'text-danger' : data.STATUS === 'Dilakukan Pengadaan' ? 'text-success' : 'text-primary';
                                    return (
                                        <Card className="my-3" style={{width: '18rem'}} key={data.ID}>
                                            <Card.Body>
                                                <Card.Title className="mb-3">{data.NAMA}</Card.Title>
                                                <div className="d-flex flex-column">
                                                    <span className='my-2'>Tanggal : {data.TANGGAL_PENGAJUAN}</span>
                                                    <span>Status : <span className={dataStatus}>{data.STATUS}</span> </span>
                                                    <Button variant="outline-primary" className="my-3" onClick={() => setDetailPengajuan({show: true, dataID: data.ID, dataTitle: data.NAMA})} >Detail</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            }
                        </div>

                        <Modal show={modal} onHide={() => setModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Form Pengajuan Alat</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nama Pengajuan</Form.Label>
                                        <Form.Control
                                            type="name"
                                            placeholder='nama pengajuan'
                                            onChange={(e) => setInputs({...inputs, nama: e.target.value})}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tanggal</Form.Label>
                                        <Form.Control
                                            type="date"
                                            onChange={(e) => setInputs({...inputs, tanggal_pengajuan: e.target.value})}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Pilih Lab Tujuan</Form.Label>
                                        <Form.Select aria-label="lab tujuan" onChange={(e) => setInputs({ ...inputs, laboratorium_id: e.target.value})}>
                                            <option>Pilih Lab Tujuan</option>
                                            {
                                                dataLab.map(lab => {
                                                    return (
                                                        <option value={lab.ID} key={lab.ID}>{lab.NAMA}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={buatPengajuan}>
                                    Buat Pengajuan
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                ) : (
                    <DetailPengajuan handleBack={(value) => setDetailPengajuan({...detailPengajuan, show: false})} data={{dataID: detailPengajuan.dataID, dataTitle: detailPengajuan.dataTitle}} />
                )
            }
        </>
    );
}

export default PengajuanAlat