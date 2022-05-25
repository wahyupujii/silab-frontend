import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Modal, Form} from "react-bootstrap"
import axios from "axios";
import Swal from 'sweetalert2';

const AlatLabTersedia = (props) => {
    const [modal, setModal] = useState({show: false, detailAlat: ""});
    const [dataAlat, setDataAlat] = useState(null);
    const [loading, setLoading] = useState(null);
    const [modalTambahAlat, setModalTambah] = useState(false)
    const [dataCount, setDataCount] = useState(0);
    
    const [inputs, setInputs] = useState({})

    const tambahAlatLab = () => {
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();

        let formDataAlat = new FormData();
        formDataAlat.append('NAMA', inputs.nama);
        formDataAlat.append('JUMLAH', inputs.jumlah);
        formDataAlat.append('TAHUN', inputs.tahun);
        formDataAlat.append('NOMOR_SERI', inputs.no_seri);
        formDataAlat.append('GAMBAR', inputs.gambar);
        formDataAlat.append('TEKNISINOMOR', parseInt(props.dataUser.NOMOR));
        formDataAlat.append('DATEKELOLA', today)
        formDataAlat.append('LABID', parseInt(props.data.labID));

        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=addAlatLab',
            data: formDataAlat,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((result) => {
            setModalTambah(false);
            setDataCount(dataCount+1);
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: "Gagal menambahkan data alat lab",
                text: 'Terdapat kesalahan inputan / anda bukan teknisi dari lab ini'
            })
        })        

    }

    const hapusAlatLab = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin MENGHAPUS ALAT ini ? ',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then((response) => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=deleteAlatLab',
                    data: {alatLabID: id, teknisiKelolaNomor: parseInt(props.dataUser.NOMOR), labID: parseInt(props.data.labID)},
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(() => {
                    setDataCount(dataCount-1);
                    setModal({...modal, show: false});
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Menghapus Alat Lab',
                    })
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: "Gagal menghapus data alat lab",
                        text: 'Terdapat kesalahan / anda bukan teknisi dari lab ini'
                    })
                })
            }
        }).catch();
    }
    
    const putihkanAlat = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin MEMUTIHKAN ALAT ini ? ',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(response => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=putihkanAlat',
                    data: {alatLabID: id, teknisiKelolaNomor: parseInt(props.dataUser.NOMOR), labID: parseInt(props.data.labID)},
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then((result) => {
                    console.log(result);
                    setDataCount(dataCount-1);
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Memutihkan Alat Lab',
                    })
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: "Gagal memutihkan alat lab",
                        text: 'Terdapat kesalahan / anda bukan teknisi dari lab ini'
                    })
                })
            }
        })
    }

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatLabTersedia',
            data: {labID: props.data.labID},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataAlat(result.data.data);
            setDataCount(result.data.data.length);
            setLoading(false)
        }).catch(() => {
            setDataAlat(null);
            setLoading(false);
        })
    }, [dataCount])
    return (
        <div className='w-100 p-3'>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => props.handleBack(false)} >Pilih Area Lab</Breadcrumb.Item>
                <Breadcrumb.Item>{props.data.labTitle}</Breadcrumb.Item>
            </Breadcrumb>
            <div className='d-flex justify-content-between align-items-center'>
                <h2>Alat Lab</h2>
                { 
                    props.dataUser.NAMA_ROLE !== 'Teknisi Laboratorium' ? <div></div> : 
                    <Button className="primary" onClick={() => setModalTambah(true)} >Tambah Alat</Button>
                }
            </div>
            <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                {
                    loading ? (<span>loading ... </span>) : dataAlat === null ? (<span>Belum ada alat di lab ini</span>) : (
                        dataAlat.map(data => {
                            return (
                                <Card style={{ width: '15rem' }} className="my-2" key={data.ID}>
                                    <Card.Img variant="top" src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${data.GAMBAR}`} />
                                    <Card.Body>
                                        <Card.Title>{data.NAMA}</Card.Title>
                                        <Card.Text>Jumlah Tersedia : {data.JUMLAH_TERSEDIA}</Card.Text>
                                        <Card.Text>No Seri : {data.NOMOR_SERI}</Card.Text>
                                        <div className="w-100 d-flex justify-content-between" >
                                            {
                                                props.dataUser.NAMA_ROLE !== 'Teknisi Laboratorium' ? <div></div> : 
                                                <Button variant="outline-primary" onClick={() => putihkanAlat(data.ID)}>Putihkan</Button>
                                            }
                                            <Button variant="primary" onClick={() => setModal({show:true, detailAlat: data})}>Detail</Button>                                            
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>

            {/* modal detail alat */}
            <Modal show={modal.show} onHide={() => setModal({...modal, show: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Alat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Alat</Form.Label>
                            <Form.Control
                                type="name"
                                value={modal.detailAlat.NAMA}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Total</Form.Label>
                            <Form.Control
                                type="jumlah_total"
                                value={modal.detailAlat.JUMLAH_TOTAL}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Tersedia</Form.Label>
                            <Form.Control
                                type="jumlah_tersedia"
                                value={modal.detailAlat.JUMLAH_TERSEDIA}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control
                                type="tahun"
                                value={modal.detailAlat.TAHUN}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>No Seri</Form.Label>
                            <Form.Control
                                type="seri"
                                value={modal.detailAlat.NOMOR_SERI}
                                readOnly
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Edit Data
                    </Button>
                    <Button variant="danger" onClick={() => hapusAlatLab(modal.detailAlat.ID)} >
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* modal tambah alat */}
            <Modal show={modalTambahAlat} onHide={() => setModalTambah(false) }>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alat Lab Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Alat</Form.Label>
                            <Form.Control
                                name="nama"
                                type="text"
                                placeholder='Nama Alat'
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Total</Form.Label>
                            <Form.Control
                                name="jumlah"
                                type="text"
                                placeholder='Jumlah Total'
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control
                                name="tahun"
                                type="text"
                                placeholder='Tahun'
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>No Seri</Form.Label>
                            <Form.Control
                                name="no_seri"
                                type="text"
                                placeholder='No Seri'
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Gambar</Form.Label>
                            <Form.Control type="file" name="gambar" onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.files[0]})} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={tambahAlatLab} >
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AlatLabTersedia
