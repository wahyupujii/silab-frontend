import React, {useState, useEffect} from 'react'
import {Breadcrumb, Button, Table, Badge} from "react-bootstrap"
import axios from "axios"
// import Swal from "sweetalert2";

// component 
import { PinjamAlat, DetailPeminjaman } from '../../../components/Modal'

const PeminjamanAlat = ({dataUser}) => {
    // state untuk pengaturan component modal
    const [showPinjam, setShowPinjam] = useState(false)
    
    const [detailPeminjaman, setDetailPeminjaman] = useState({show: false, data: ""})
    const [dataPeminjaman, setDataPeminjaman] = useState(null);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/peminjamanAlat.php?function=getPeminjamanByNomorPegawai',
            data: {nomorPegawai: dataUser.NOMOR},
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
    }, [dataCount]);

    return (
        <>
            <div className="w-100 p-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Pengajuan Alat Lab</Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex justify-content-between">
                        <h2>Riwayat Peminjaman Alat</h2>
                        <Button variant="primary" onClick={() => setShowPinjam(true)}>Buat Peminjaman</Button>
                </div>
                <div className='px-4 py-3 mt-2' style={{maxWidth: '100%', background: 'white'}}>
                    {
                        loading ? (<div>Loading ... </div>) : dataPeminjaman === null ? (<span>Belum ada Peminjaman Alat</span>) : (
                            <div className='mt-2'>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nama Peminjaman</th>
                                            <th>Tanggal Pinjam</th>
                                            <th>Tanggal Kembali</th>
                                            <th>Status</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataPeminjaman.map((data, index) => {
                                                let status = data.STATUS === 'Ditolak KaLab' ? 'danger' : data.STATUS === 'Disetujui KaLab' ? 'success' : 'primary';
                                                return (
                                                    <tr key={data.ID}>
                                                        <td className='align-middle'>{index+1}</td>
                                                        <td className='align-middle'>{data.NAMA_PEMINJAMAN}</td>
                                                        <td className='align-middle'>{data.TANGGAL_PINJAM}</td>
                                                        <td className='align-middle'>{data.TANGGAL_KEMBALI}</td>
                                                        <td className='align-middle'>
                                                            <Badge bg={status}>{data.STATUS}</Badge>{' '}    
                                                        </td>
                                                        <td className='align-middle'>
                                                            <Button 
                                                                variant="primary"
                                                                onClick={() => setDetailPeminjaman({show: true, data: data.NAMA_PEMINJAMAN})}
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

                {/* modal Pinjam Alat */}
                <PinjamAlat 
                    show={showPinjam}
                    onHide={() => setShowPinjam(false)}
                    count={() => setDataCount(dataCount+1)}
                    dataUser={dataUser}
                />

                {/* modal detail peminjaman */}
                <DetailPeminjaman 
                    show={detailPeminjaman.show}
                    onHide={() => setDetailPeminjaman({...detailPeminjaman, show: false})}
                    data={detailPeminjaman.data}
                />

            </div>
        </>
    )
}

export default PeminjamanAlat