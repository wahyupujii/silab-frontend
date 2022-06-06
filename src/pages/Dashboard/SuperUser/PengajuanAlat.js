import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Table} from "react-bootstrap";
import axios from "axios";

import DetailPengajuan from './DetailPengajuan';
import PersetujuanPengajuan from './PersetujuanPengajuan';

// component
import {BuatPengajuan} from "../../../components/";

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
                    {
                        dataUser.NAMA_ROLE !== "Teknisi Laboratorium" ? (
                            <>
                                <Button variant="outline-secondary mx-2" active={content === "persetujuan" ? true : false} onClick={() => setContent("persetujuan")}>Persetujuan Pengajuan</Button>
                                <Button variant="outline-secondary mx-2" active={content === "pengajuan" ? true : false} onClick={() => setContent("pengajuan")}>Pengajuan Alat</Button>
                            </>
                        ) : (<div></div>)
                    }
                </div>
                <div className='px-4 py-3 mt-2' style={{maxWidth: '100%', background: 'white'}}>
                    {
                        dataUser.NAMA_ROLE !== "Teknisi Laboratorium" ? (
                            content === "pengajuan" ? (
                                <RiwayatPengajuan pegawaiNomor={dataUser.NOMOR} />
                            ) : content === "persetujuan" ? (
                                <PersetujuanPengajuan dataUser={dataUser} />
                            ) : <div>Silahkan Pilih Menu Diatas</div>
                        ) : (
                            <RiwayatPengajuan pegawaiNomor={dataUser.NOMOR} />
                        )
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
    }, [dataCount, pegawaiNomor])

    return (
        <>
            {
                detailPengajuan.show === false  ? (
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h1>Riwayat Pengajuan Alat</h1>
                            <Button onClick={() => setModal(true)}>Tambah Pengajuan</Button>
                        </div>
                        <div>
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
                                        loading ? (<div>Loading</div>) : dataPengajuan == null ? (<span>Belum Ada Pengajuan ALat</span>) : 
                                        dataPengajuan.map((data, index) => {
                                            let status = data.STATUS === 'Pengajuan Ditolak' ? 'text-danger' : data.STATUS === 'Dilakukan Pengadaan' ? 'text-success' : 'text-primary';
                                            return (
                                                <tr>
                                                    <td className='align-middle'>{index+1}</td>
                                                    <td className='align-middle'>{data.NAMA}</td>
                                                    <td className='align-middle'>{data.TANGGAL_PENGAJUAN}</td>
                                                    <td className={`${status} align-middle`}>{data.STATUS}</td>
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

                        <BuatPengajuan 
                            show={modal}
                            onHide={() => setModal(false)}
                            data={{pegawaiNomor}}
                            count={() => setDataCount(dataCount+1)}
                        />
                    </div>

                ) : (
                    <DetailPengajuan handleBack={(value) => setDetailPengajuan({...detailPengajuan, show: false})} data={{dataID: detailPengajuan.dataID, dataTitle: detailPengajuan.dataTitle}} />
                )
            }
        </>
    );
}

export default PengajuanAlat