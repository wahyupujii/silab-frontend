import React, {useState, useEffect} from 'react'
import {Breadcrumb, Badge, Button, Table} from "react-bootstrap";
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
                            <RiwayatPengajuan dataUser={dataUser} />
                        )
                    }
                </div>
            </div>
        </>
    )
}

const RiwayatPengajuan = ({dataUser}) => {
    const [modal, setModal] = useState(false); // modal buat pengajuan
    const [loading, setLoading] = useState(true);
    const [dataPengajuan, setDataPengajuan] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [detailPengajuan, setDetailPengajuan] = useState({show: false, detail: ""});
    
    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=getPengajuanByNomorPegawai',
            data: {pegawai_nomor: parseInt(dataUser.NOMOR)},
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
    }, [dataCount, dataUser])

    return (
        <>  
            {
                detailPengajuan.show === false ? (
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h1>Riwayat Pengajuan Alat</h1>
                            <Button onClick={() => setModal(true)}>Tambah Pengajuan</Button>
                        </div>

                        {
                            loading ? (<div>Loading ... </div>) : dataPengajuan === null ? (<span>Belum Ada Pengajuan Alat</span>) : (
                                <div>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nama Pengajuan</th>
                                                <th>Tanggal Pengajuan</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataPengajuan.map((data, index) => {
                                                    let status = data.STATUS === 'Pengajuan Ditolak' ? 'danger' : data.STATUS === 'Dilakukan Pengadaan' ? 'success' : 'primary';
                                                    return (
                                                        <tr>
                                                            <td className='align-middle'>{index+1}</td>
                                                            <td className='align-middle'>{data.NAMA}</td>
                                                            <td className='align-middle'>{data.TANGGAL_PENGAJUAN}</td>
                                                            <td className="align-middle">
                                                                <Badge bg={status}>{data.STATUS}</Badge>{' '}
                                                            </td>
                                                            <td className='align-middle'>
                                                                {
                                                                    data.JUMLAH_ALAT == 0 ? (
                                                                        <Button 
                                                                            variant="outline-primary"
                                                                            onClick={() => setDetailPengajuan({show: true, detail: data})}
                                                                        >Tambah</Button>        
                                                                    ) : (
                                                                        <Button 
                                                                            variant="primary"
                                                                            onClick={() => setDetailPengajuan({show: true, detail: data})}
                                                                        >Detail</Button>
                                                                    )
                                                                }
                                                                 <Button 
                                                                    variant="danger"
                                                                    className="mx-2"
                                                                >Hapus</Button>
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
                        <BuatPengajuan 
                            show={modal}
                            onHide={() => setModal(false)}
                            dataUser={dataUser}
                            count={() => setDataCount(dataCount+1)}
                        />
                    </div>
                ) : (
                    <DetailPengajuan 
                        handleBack={() => setDetailPengajuan({...detailPengajuan, show: false})} 
                        dataPengajuan={detailPengajuan.detail} 
                    />
                )
            }

        </>
    );
}

export default PengajuanAlat