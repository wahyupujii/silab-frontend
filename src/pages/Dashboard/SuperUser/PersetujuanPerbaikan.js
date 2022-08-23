import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Table, Button, Badge, Breadcrumb } from 'react-bootstrap';
import { SetujuPerbaikan } from '../../../components';

const PersetujuanPerbaikan = ({dataUser}) => {
    const [dataPerbaikan, setDataPerbaikan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [detailPerbaikan, setDetailPerbaikan] = useState({show: false, data: ""})
    const dataLab = JSON.parse(localStorage.getItem("labByKalab"));

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPerbaikan.php?function=getPerbaikanByLab',
            data: {
                kalab_nomor: dataUser.NOMOR,
                laboratorium_id: dataLab[0].ID,
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((data) => {
            console.log(data);
            setDataPerbaikan(data.data.data);
            setDataCount(data.data.data.length);
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
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Persetujuan Perbaikan</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Persetujuan Perbaikan Alat</h1>
                <div className='px-4 py-3 mt-2' style={{maxWidth: '100%', background: 'white'}}>
                    {
                        loading ? (<div>Loaidng ...</div>) : dataPerbaikan === null ? (<span>Belum ada Pengajuan Perbaikan Alat</span>) : (
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Perbaikan</th>
                                        <th>Tanggal Pengajuan</th>
                                        <th>Status</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataPerbaikan.map((data, index) => {
                                            let status = data.STATUS === 'Ditolak KaLab' ? 'danger' : data.STATUS === 'Disetujui KaLab' ? 'success' : 'primary';
                                            return (
                                                <tr key={data.ID}>
                                                    <td className="align-middle">{++index}</td>
                                                    <td className="align-middle">{data.NAMA}</td>
                                                    <td className="align-middle">{data.TANGGAL_PENGAJUAN}</td>
                                                    <td className='align-middle'>
                                                        <Badge bg={status}>{data.STATUS}</Badge>{' '}
                                                    </td>
                                                    <td md className="align-middle">
                                                        <Button variant="primary" onClick={() => setDetailPerbaikan({...detailPerbaikan, show: true, data: data})}>Detail</Button>
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
            </div>

            <SetujuPerbaikan 
                show={detailPerbaikan.show}
                onHide={() => setDetailPerbaikan({...detailPerbaikan, show: false})}
                data={{dataPerbaikan: detailPerbaikan.data, dataUser}}
                count={() => setDataCount(dataCount-1)}
            />
        </>
    )
}

export default PersetujuanPerbaikan