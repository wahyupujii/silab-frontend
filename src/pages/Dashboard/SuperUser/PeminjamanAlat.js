import React, {useState, useEffect} from 'react'
import {Breadcrumb, Button, Table, Badge} from "react-bootstrap"
import axios from "axios"

// component
import { PinjamAlat, SetujuPeminjaman, DetailPeminjaman } from '../../../components'

const PeminjamanAlat = ({dataUser}) => {    
    const [content, setContent] = useState("");
    const dataLab = JSON.parse(localStorage.getItem("labByKalab"));
    return (
        <>
            <div className='w-100 p-3'>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Peminjaman Alat Lab</Breadcrumb.Item>
                </Breadcrumb>

                <div className='d-flex'>
                    {
                        dataUser.NAMA_ROLE === "Kepala Laboratorium" ? (
                            <>
                                <Button variant="outline-secondary" onClick={() => setContent("persetujuan")}>Persetujuan Peminjaman</Button>
                                <Button variant="outline-secondary mx-2" onClick={() => setContent("peminjaman")}>Riwayat Peminjaman</Button>
                            </>
                        ) : (<div></div>)
                    }
                </div>
                <div className='px-4 py-3 mt-2' style={{maxWidth: '100%', background: 'white'}}>
                    {
                        dataUser.NAMA_ROLE === "Kepala Laboratorium" ? (
                            content === "peminjaman" ? (
                                <RiwayatPeminjaman dataUser={dataUser} />
                            ) : content === "persetujuan" ? (
                                <PersetujuanPeminjaman dataUser={dataUser} labID={dataLab[0].ID} />
                            ) : <div>Silahkan Pilih Menu Diatas</div>
                        ) : (
                            <RiwayatPeminjaman dataUser={dataUser} />
                        )
                    }
                </div>
            </div>
        </>
    )
}

const RiwayatPeminjaman = ({dataUser}) => {
    // modal pinjam alat
    const [modal, setModal] = useState(false);
    
    // modal detail peminjaman
    const [detailPeminjaman, setDetailPeminjaman] = useState({show: false, data: ""})

    const [dataPeminjaman, setDataPeminjaman] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);

    useEffect (() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/peminjamanAlat.php?function=getPeminjamanByNomorPegawai',
            data: {nomorPegawai: parseInt(dataUser.NOMOR)},
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
    }, [dataCount])

    return (
        <>
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Riwayat Peminjaman Alat</h1>
                    <Button onClick={() => setModal(true)}>Buat Peminjaman</Button>
                </div>
                <div>
                    {
                        loading ? (<div>Loading ... </div>) : (
                            dataPeminjaman === null ? (<span>Belum ada Peminjaman Alat</span>) : (
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
                                                        <td className={`${status} align-middle`}>
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
                            )
                        )
                    }
                </div>

                {/* modal Pinjam Alat */}
                <PinjamAlat 
                    show={modal}
                    onHide={() => setModal(false)}
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

const PersetujuanPeminjaman = ({dataUser, labID}) => {
    const [modalDetail, setModalDetail] = useState({show: false, data: {}});
    const [dataPersetujuan, setDataPersetujuan] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPeminjaman.php?function=getPersetujuanByLab',
            data: {
                kalab_nomor: parseInt(dataUser.NOMOR),
                laboratorium_id: parseInt(labID)
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataPersetujuan(result.data.data);
            setDataCount(result.data.data.length);
            setLoading(false);
        }).catch(() => {
            setDataPersetujuan(null);
            setLoading(false);
        })
    }, [dataCount])

    return (
        <>
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Persetujuan Peminjaman Alat</h1>
                </div>
                <div>
                    {
                        loading ? (<div>Loading ... </div>) : (
                            dataPersetujuan === null ? (<span>Belum ada Pengajuan Peminjaman Alat</span>) : (
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nama Peminjaman</th>
                                            <th>Peminjam</th>
                                            <th>Status</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataPersetujuan.map((data, index) => {
                                                let status = data.STATUS === 'Disetujui KaLab' ? 'success' : data.STATUS === 'Ditolak KaLab' ? 'danger' : 'primary'
                                                return (
                                                    <tr>
                                                        <td className='align-middle'>{index+1}</td>
                                                        <td className='align-middle'>{data.NAMA_PEMINJAMAN}</td>
                                                        <td className='align-middle'>{data.PEMINJAM}</td>
                                                        <td className='align-middle'>
                                                            <Badge bg={status}>{data.STATUS}</Badge>{' '}    
                                                        </td>
                                                        <td className='align-middle'>
                                                            <Button 
                                                                variant="primary"
                                                                onClick={() => setModalDetail({...modalDetail, show: true, data: data})}
                                                            >Detail</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            )
                        )
                    }
                </div>

                <SetujuPeminjaman 
                    show={modalDetail.show}
                    onHide={() => setModalDetail({...modalDetail, show: false})}
                    data={modalDetail.data}
                    count={() => setDataCount(dataCount-1)}
                />

            </div>
        </>
    )
}

export default PeminjamanAlat