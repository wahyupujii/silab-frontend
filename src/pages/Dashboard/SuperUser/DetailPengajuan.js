import React, {useState, useEffect} from 'react'
import { Breadcrumb, Card, Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';

const DetailPengajuan = (props) => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState({});
    const [dataCount, setDataCount] = useState(0);
    
    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=detailPengajuan',
            data: {pengajuanID: props.data.dataID},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setData(result.data.data);
            setDataCount(result.data.data.length);
            setLoading(false);
        }).catch(err => {
            setData(null);
            setLoading(false);
        })
    },[dataCount])

    const tambahAlat = () => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatBaru.php?function=tambahAlatBaru',
            data: {
                ...inputs,
                pengajuanID: props.data.dataID
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setShow(false);
            setDataCount(dataCount + 1);
        }).catch(err => {
            console.log("err", err)
        })
    }

    const deleteAlat = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Hapus Alat',
            text: 'Apa anda yakin akan menghapus alat ini ?',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(response => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatBaru.php?function=deleteAlatBaru',
                    data: {alatBaruID: id},
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(result => {
                    setDataCount(dataCount - 1)
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Alat Baru berhasil dihapus',
                    })
                }).catch(err => {
                    console.log("err", err)
                })
            }
        })
    }

    return (
        <div className='w-100 p-3'>
            <div className="d-flex justify-content-between">
                <h2>{props.data.dataTitle}</h2>
                <Button variant="primary" onClick={() => setShow(true)}>Tambah Alat</Button>
            </div>
            <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                {
                    loading ? (<span>loading ... </span>) : 
                        loading === false && data === null ? (
                            <span className='text-secondary'>Masih belum ada alat yang diajukan, silahkan tambah alat</span>
                        ) : (
                        data.map(data => {
                            return (
                                <Card className="my-3" style={{width: '18rem'}} key={data.ID} >
                                    <Card.Body>
                                        <Card.Title className="mb-3">{data.NAMA}</Card.Title>
                                        <div className="d-flex flex-column">
                                            <span>Jumlah : {data.JUMLAH}</span>
                                            <span className="text-danger">Catatan : {data.CATATAN}</span>
                                            <Button variant="danger" className="my-3" onClick={() => deleteAlat(data.ID)}>Hapus</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alat yang Diajukan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Alat</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Nama Alat"
                                onChange={(e) => setInputs({...inputs, nama: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah</Form.Label>
                            <Form.Control
                                type="jumlah"
                                placeholder="Jumlah"
                                onChange={(e) => setInputs({...inputs, jumlah: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Catatan</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Catatan" onChange={(e) => setInputs({...inputs, catatan: e.target.value})} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={tambahAlat}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DetailPengajuan