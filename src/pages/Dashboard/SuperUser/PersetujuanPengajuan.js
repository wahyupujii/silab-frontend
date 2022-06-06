import React, {useEffect, useState} from 'react'
import axios from "axios";
import { Table, Button } from 'react-bootstrap';

import DetailPersetujuanPengajuan from './DetailPersetujuanPengajuan';

const PersetujuanPengajuan = ({dataUser}) => {
    const [dataPengajuan, setDataPengajuan] = useState([]);
    const [loading, setLoading] = useState(true)
    const [showDetail, setShowDetail] = useState({show: false, dataID: "", dataTitle: ""});
    
    useEffect(() => {
        if (dataUser.NAMA_ROLE === 'Kepala Laboratorium') {
            persetujuanKalab();
        } else if (dataUser.NAMA_ROLE === 'Kepala Prodi D3' || dataUser.NAMA_ROLE === 'Kepala Prodi D4') {
            persetujuanKaprodi();
        } else if (dataUser.NAMA_ROLE === 'Kepala Departemen') {
            persetujuanKadep();
        }
    }, [])

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
                setLoading(false);
            }).catch(() => {
                setDataPengajuan(null);
                setLoading(false);
            })
        }).catch();
    }

    return (
        <>
            {!showDetail.show ? <h1>Persetujuan Pengajuan Alat</h1> : <div></div>}
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
                                        return (
                                            <tr key={item.ID}>
                                                <td>{++index}</td>
                                                <td>{item.NAMA_PEGAWAI}</td>
                                                <td>{item.NAMA_PENGAJUAN}</td>
                                                <td className='text-primary'>{item.STATUS}</td>
                                                <td>
                                                    <Button variant="outline-primary" onClick={() => setShowDetail({show: true, dataID: item.ID, dataTitle: item.NAMA_PENGAJUAN})}>Detail</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>    
                    ) : (
                    <DetailPersetujuanPengajuan handleBack={(value) => setShowDetail({...showDetail, show: false})} data={{dataID: showDetail.dataID, dataTitle: showDetail.dataTitle, dataUser: dataUser}} />
                )
            }
        </>
    );
}

export default PersetujuanPengajuan