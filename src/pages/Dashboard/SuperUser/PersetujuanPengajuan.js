import React, {useEffect, useState} from 'react'
import axios from "axios";
import { Table, Button, Breadcrumb, Badge } from 'react-bootstrap';

import DetailPersetujuanPengajuan from './DetailPersetujuanPengajuan';

const PersetujuanPengajuan = ({dataUser}) => {
    const [dataPengajuan, setDataPengajuan] = useState([]);
    const [loading, setLoading] = useState(true)
    const [showDetail, setShowDetail] = useState({show: false, detail: ""});
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        if (dataUser.NAMA_ROLE === 'Kepala Laboratorium') {
            persetujuanKalab();
        } else if (dataUser.NAMA_ROLE === 'Kepala Prodi D3' || dataUser.NAMA_ROLE === 'Kepala Prodi D4') {
            persetujuanKaprodi();
        } else if (dataUser.NAMA_ROLE === 'Kepala Departemen') {
            persetujuanKadep();
        }
    }, count)

    const persetujuanKadep = () => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=getPengajuanKadep',
            data: { jurusan: dataUser.JURUSAN_NOMOR },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataPengajuan(result.data.data);
            setCount(result.data.data.length);
            setLoading(false);
            // console.log(result);
        }).catch(() => {
            setDataPengajuan(null);
            setLoading(false);
        })
    }

    const persetujuanKaprodi = () => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=getPengajuanKaprodi',
            data: { jurusan: dataUser.JURUSAN_NOMOR },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataPengajuan(result.data.data);
            setCount(result.data.data.length);
            setLoading(false);
        }).catch(() => {
            setDataPengajuan(null);
            setLoading(false);
        })
    }

    const persetujuanKalab = () => {
        // get laboratorium id untuk menentukan user adalah kalab lab mana
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/laboratory.php?function=getLabByKalab',
            data: {
                kalab_nomor: dataUser.NOMOR
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            // setelah mendapat lab id nya, langsung ke axios all pengajuan by lab id
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=getPengajuanByLabID',
                data: {
                    laboratorium_id: result.data.data[0].ID,
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((data) => {
                setDataPengajuan(data.data.data);
                setCount(data.data.data.length);
                setLoading(false);
            }).catch(() => {
                setDataPengajuan(null);
                setLoading(false);
            })
        }).catch();
    }

    return (
        <>
            <div className="w-100 p-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => setShowDetail({...showDetail, show: false})}>Pengajuan Alat Lab</Breadcrumb.Item>
                    {
                        showDetail.show ? (
                            <Breadcrumb.Item>{showDetail.detail.NAMA_PENGAJUAN}</Breadcrumb.Item>
                        ) : (<div></div>)
                    }
                </Breadcrumb>
                
                {!showDetail.show ? <h1>Persetujuan Pengajuan Alat</h1> : <div></div>}
                <div className='px-4 py-3 mt-2' style={{maxWidth: '100%', background: 'white'}}>
                    
                    {
                        loading ? (<div>loading ... </div>) : 
                            dataPengajuan === null ? (
                                <div>Belum ada pengajuan alat</div>
                            ) : showDetail.show === false ? (
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Yang Mengajukan</th>
                                            <th>Nama Pengajuan</th>
                                            <th>Status</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataPengajuan.map((item, index) => {
                                                let status = item.STATUS === 'Pengajuan Ditolak' ? 'danger' : item.STATUS === 'Dilakukan Pengadaan' ? 'success' : 'primary';
                                                return (
                                                    <tr key={item.ID}>
                                                        <td className="align-middle">{++index}</td>
                                                        <td className="align-middle">{item.NAMA_PEGAWAI}</td>
                                                        <td className="align-middle">{item.NAMA_PENGAJUAN}</td>
                                                        <td className='align-middle'>
                                                            <Badge bg={status}>{item.STATUS}</Badge>{' '}
                                                        </td>
                                                        <td md className="align-middle">
                                                            <Button variant="outline-primary" onClick={() => setShowDetail({show: true, detail: item})}>Detail</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>    
                            ) : (
                            <DetailPersetujuanPengajuan 
                                handleBack={() => setShowDetail({...showDetail, show: false})} 
                                data={{detail: showDetail.detail, dataUser: dataUser}} 
                                count={() => setCount(count-1)} 
                            />
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default PersetujuanPengajuan