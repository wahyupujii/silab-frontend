import React, {useState, useEffect} from 'react'
import {Breadcrumb, Button, Table, Badge} from "react-bootstrap";
import axios from "axios";

import DetailPengajuan from './DetailPengajuan';

// component
import { BuatPengajuan } from '../../../components/Modal';

const PengajuanAlat = ({dataUser}) => {
    const [show, setShow] = useState(false);
    const [detailPengajuan, setDetailPengajuan] = useState({show: false, dataID: "", dataTitle: ""})
    const [dataPengajuan, setDataPengajuan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=getPengajuanByNomorPegawai',
            data: {pegawai_nomor: dataUser.NOMOR},
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
    }, [dataCount, dataUser])

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

                        {
                            loading ? (<div>Loading ... </div>) : dataPengajuan === null ? (<span className="mt-3">Belum Ada Pengajuan Alat</span>) : (
                                <div className='mt-2'>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nama Pengajuan</th>
                                                <th>Tanggal Pengajuan</th>
                                                <th>Status</th>
                                                <th>Detail Pengajuan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataPengajuan.map((data, index) => {
                                                    let status = data.STATUS === 'Pengajuan Ditolak' ? 'danger' : data.STATUS === 'Dilakukan Pengadaan' ? 'success' : 'primary';
                                                    return (
                                                        <tr key={data.ID}>
                                                            <td className='align-middle'>{index+1}</td>
                                                            <td className='align-middle'>{data.NAMA}</td>
                                                            <td className='align-middle'>{data.TANGGAL_PENGAJUAN}</td>
                                                            <td className='align-middle'>
                                                                <Badge bg={status}>{data.STATUS}</Badge>{' '}
                                                            </td>
                                                            <td className='align-middle'>
                                                                <Button 
                                                                    variant="primary"
                                                                    onClick={() => setDetailPengajuan({show: true, dataID: data.ID, dataTitle: data.NAMA})}
                                                                >Detail</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            )
                        }

                        {/* modal buat pengajuan */}
                        <BuatPengajuan 
                            show={show}
                            onHide={() => setShow(false)}
                            dataUser={dataUser}
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