import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button} from "react-bootstrap";
import axios from "axios";

import DetailPengajuan from './DetailPengajuan';

// component
import { BuatPengajuan } from '../../../components/Modal';

const PengajuanAlat = ({pegawaiNomor}) => {
    const [show, setShow] = useState(false);
    const [detailPengajuan, setDetailPengajuan] = useState({show: false, dataID: "", dataTitle: ""})
    const [dataPengajuan, setDataPengajuan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);

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
        })
    }, [dataCount, pegawaiNomor])

    return (
        <>
            {
                detailPengajuan.show === false ? (
                    <div className='w-100 p-3'>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item>Pengajuan Alat Lab</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="d-flex justify-content-between">
                            <h2>Riwayat Pengajuan Alat</h2>
                            <Button variant="primary" onClick={() => setShow(true)}>Buat Pengajuan</Button>
                        </div>
                        <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
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
                                                    <span>Status : <span className={dataStatus} >{data.STATUS}</span> </span>
                                                    <Button variant="outline-primary" className="my-3" onClick={() => setDetailPengajuan({show: true, dataID: data.ID, dataTitle: data.NAMA})} >Detail</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            }
                        </div>
        

                        {/* modal buat pengajuan */}
                        <BuatPengajuan 
                            show={show}
                            onHide={() => setShow(false)}
                            data={{pegawaiNomor}}
                            count={() => setDataCount(dataCount+1)}
                        />
                    </div>
                ) : (
                    <DetailPengajuan handleBack={(value) => setDetailPengajuan({...detailPengajuan, show: false})} data={{dataID: detailPengajuan.dataID, dataTitle: detailPengajuan.dataTitle}} />
                )
            }
        </>
    )
}

export default PengajuanAlat