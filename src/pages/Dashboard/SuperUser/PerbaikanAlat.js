import React, {useEffect, useState} from 'react'
import {Breadcrumb, Button, Table, Badge} from "react-bootstrap"
import axios from "axios";

// component
import { BuatPerbaikan, DetailPerbaikan } from '../../../components/Modal';

const PerbaikanAlat = ({dataUser}) => {

    // state untuk pengaturan component modal
    const [buatPerbaikan, setBuatPerbaikan] = useState(false);
    const [detailPerbaikan, setDetailPerbaikan] = useState({show: false, data: ""});
    
    const [dataPerbaikan, setDataPerbaikan] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/perbaikanAlat.php?function=getPerbaikanByTeknisiNomor',
            data: { 
                teknisi_nomor: parseInt(dataUser.NOMOR)
             },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataPerbaikan(result.data.data);
            setDataCount(result.data.data.length);
            setLoading(false);
        }).catch(() => {
            setDataPerbaikan(null);
            setLoading(false);
        })
    }, [dataCount])

    return (    
        <>
            <div className="w-100 p-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Pengajuan Perbaikan Alat</Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex justify-content-between">
                        <h2>Riwayat Pengajuan Perbaikan Alat</h2>
                        <Button variant="primary" onClick={() => setBuatPerbaikan(true)}>Buat Pengajuan Perbaikan</Button>
                </div>
                <div className='px-4 py-3 mt-2' style={{maxWidth: '100%', background: 'white'}}>
                    {
                        loading ? (<div>Loading ... </div>) : dataPerbaikan === null ? (<span>Belum ada Pengajuan Perbaikan Alat</span>) : (
                            <div className='mt-2'>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nama Perbaikan</th>
                                            <th>Status</th>
                                            <th>Tanggal Pengajuan</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataPerbaikan.map((data, index) => {
                                                let status = data.STATUS === 'Ditolak KaLab' ? 'danger' : data.STATUS === 'Disetujui KaLab' || data.STATUS === 'Perbaikan Selesai' ? 'success' : 'primary';
                                                return (
                                                    <tr key={data.ID}>
                                                        <td className='align-middle'>{index+1}</td>
                                                        <td className='align-middle'>{data.NAMA}</td>
                                                        <td className='align-middle'>
                                                            <Badge bg={status}>{data.STATUS}</Badge>{' '}
                                                        </td>
                                                        <td className='align-middle'>{data.TANGGAL_PENGAJUAN}</td>
                                                        <td className='align-middle'>
                                                            <Button 
                                                                variant="primary"
                                                                onClick={() => setDetailPerbaikan({...detailPerbaikan, show: true, data: data})}
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
                </div>

                {/* modal buat perbaikan */}
                <BuatPerbaikan 
                    show={buatPerbaikan}
                    onHide={() => setBuatPerbaikan(false)}
                    dataUser={dataUser}
                    count={() => setDataCount(dataCount+1)}
                />

                {/* modal detail perbaikan */}
                <DetailPerbaikan 
                    show={detailPerbaikan.show}
                    onHide={() => setDetailPerbaikan({...detailPerbaikan, show: false})}
                    data={detailPerbaikan.data}
                    count={() => setDataCount(dataCount+1)}
                />
            </div>
        </>
    )
}

export default PerbaikanAlat