import React, {useState, useEffect} from 'react'
import {Breadcrumb, Table, Badge, Button} from "react-bootstrap"
import axios from "axios";

// component modal
import { SetujuPemindahan } from '../../../components';

const PersetujuanPemindahan = ({dataUser}) => {
    const [dataPemindahan, setDataPemindahan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);

    // modal setuju pemindahan
    const [modal, setModal] = useState({show: false, dataPemindahan: ""})

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPemindahan.php?function=getPemindahanByLab',
            data: {
                kalab_nomor: dataUser.NOMOR,
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((result) => {
            setDataPemindahan(result.data.data);
            setDataCount(result.data.data.length);
            setLoading(false);
        }).catch(() => {
            setDataPemindahan(null);
            setLoading(false);
        })
    }, [modal])
    return (
        <>
            <div className="w-100 p-3">
                <Breadcrumb>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Persetujuan Pemindahan</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Persetujuan Pemindahan Alat</h1>
                <div className='px-4 py-3 mt-2' style={{maxWidth: '100%', background: 'white'}}>
                    {
                        loading ? (<div>Loading ...</div>) : dataPemindahan === null ? (<span>Belum ada Pemindahan Alat</span>) : (
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Pemindahan</th>
                                        <th>Tanggal Pemindahan</th>
                                        <th>Laboratorium Tujuan</th>
                                        <th>Status</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataPemindahan.map((data, index) => {
                                            let status = data.STATUS === 'Ditolak KaLab' ? 'danger' : data.STATUS === 'Disetujui KaLab' ? 'success' : 'primary';
                                            return (
                                                <tr key={data.ID}>
                                                    <td className="align-middle">{++index}</td>
                                                    <td className="align-middle">{data.NAMA_PEMINDAHAN}</td>
                                                    <td className="align-middle">{data.TANGGAL_PEMINDAHAN}</td>
                                                    <td className="align-middle">{data.LAB_TUJUAN}</td>
                                                    <td className='align-middle'>
                                                        <Badge bg={status}>{data.STATUS}</Badge>{' '}
                                                    </td>
                                                    <td md className="align-middle">
                                                        {/* <Button variant="primary" onClick={() => setDetailPerbaikan({...detailPerbaikan, show: true, data: data})}>Detail</Button> */}
                                                        <Button variant='primary' onClick={() => setModal({...modal, show: true, dataPemindahan: data})}>Detail</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>  
                        )
                    }
                </div>

                {/* modal setujui pemindahan */}
                <SetujuPemindahan 
                    show={modal.show}
                    onHide={() => setModal({...modal, show: false})}
                    data={{dataPemindahan: modal.dataPemindahan, dataUser}}
                    count={() => setDataCount(dataCount-1)}
                />

            </div>
        </>
    )
}

export default PersetujuanPemindahan