import React, {useState, useEffect} from 'react'
import { Breadcrumb, Card, Button } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';

// component 
import { TambahAlatBaru } from '../../../components/Modal';

const DetailPengajuan = (props) => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
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
    },[dataCount, props.data.dataID])

    const deleteAlat = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin MENGHAPUS ALAT ini ? ',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then((result) => {
            if (result.isConfirmed) {
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
            <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => props.handleBack(false)}>Pengajuan Alat Lab</Breadcrumb.Item>
                <Breadcrumb.Item>{props.data.dataTitle}</Breadcrumb.Item>
            </Breadcrumb>
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
                                <Card className="shadow bg-white rounded my-3" style={{width: '18rem'}} key={data.ID} >
                                    <Card.Body>
                                        <Card.Title className="mb-3">{data.NAMA}</Card.Title>
                                        <div className="d-flex flex-column">
                                            <span>Jumlah : {data.JUMLAH}</span>
                                            <span className="text-danger">Catatan : {data.CATATAN}</span>
                                            <div className="d-flex justify-content-between">
                                                <Button variant="primary" className="my-3">Lihat File</Button>
                                                <Button variant="secondary" className="my-3" disabled>Edit</Button>
                                                <Button variant="danger" className="my-3" onClick={() => deleteAlat(data.ID)}>Hapus</Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>

            <TambahAlatBaru 
                show={show}
                onHide={() => setShow(false)}
                count={() => setDataCount(dataCount+1)}
                data={{pengajuanID: props.data.dataID}}
            />

        </div>
    )
}

export default DetailPengajuan