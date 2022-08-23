import React, {useState, useEffect} from 'react'
import {Button, Table, Badge, Breadcrumb} from "react-bootstrap"
import axios from "axios"

// component modal
import { BuatPemindahan, DetailPemindahan } from '../../../components'

const PemindahanAlat = ({dataUser}) => {
    const [dataPemindahan, setDataPemindahan] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // modal buat pemindahan
    const [modal, setModal] = useState(false);

    const [detailPemindahan, setDetailPemindahan] = useState({show: false, data: ""})

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pemindahanAlat.php?function=getPemindahanByTeklab',
            data: {
                teknisi_lab: parseInt(dataUser.NOMOR)
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataPemindahan(result.data.data);
            setDataCount(result.data.data.length);
            setLoading(false);
        }).catch(() => {
            setDataPemindahan(null);
            setLoading(false)
        });
    }, [dataCount])

    const deletePemindahan = (id) => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pemindahanAlat.php?function=deletePemindahan',
            data: {
                pemindahan_id: id
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataCount(dataCount-1);
        }).catch();
    }

    return (
		<>
            <div className="w-100 p-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Pemindahan Alat Lab</Breadcrumb.Item>
                </Breadcrumb>
            </div>
			<div className='px-4 py-3 mt-2' style={{maxWidth: '100%', background: 'white'}}>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Riwayat Pemindahan Alat</h1>
                    <Button onClick={() => setModal(true)}>Buat Pemindahan</Button>
                </div>

                {
                    loading ? (<div>Loading ... </div>) : dataPemindahan === null ? (<span>Belum Ada Pemindahan Alat Yang Dilakukan</span>) : (
                        <div>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama Pemindahan</th>
                                        <th>Tanggal Pemindahan</th>
                                        <th>Status</th>
                                        {/* <th>Aksi</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataPemindahan.map((data, index) => {
                                            let status = data.STATUS === 'Ditolak KaLab' ? 'danger' : data.STATUS === 'Disetujui KaLab' ? 'success' : 'primary';
                                            return (
                                                <tr key={data.ID}>
                                                    <td className='align-middle'>{index+1}</td>
                                                    <td className='align-middle'>{data.NAMA_PEMINDAHAN}</td>
                                                    <td className='align-middle'>{data.TANGGAL_PEMINDAHAN}</td>
                                                    <td className="align-middle">
                                                        <Badge bg={status}>{data.STATUS}</Badge>{' '}
                                                    </td>
                                                    <td className='align-middle'>
                                                        <Button 
                                                            variant="primary"
                                                            onClick={() => setDetailPemindahan({show: true, data: data})}
                                                        >Detail</Button>
                                                        {/* <Button 
                                                            variant="danger"
                                                            className="mx-2"
                                                            onClick={() => deletePemindahan(data.ID)}
                                                        >Hapus</Button> */}
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
                
                {/* modal pemindahan */}
                <BuatPemindahan 
                    show={modal}
                    onHide={() => setModal(false)}
                    data={dataUser}
                    count={() => setDataCount(dataCount+1)}
                />

                {/* modal detail pemindahan */}
                <DetailPemindahan 
                    show={detailPemindahan.show}
                    onHide={() => setDetailPemindahan({...detailPemindahan, show: false})}
                    data={detailPemindahan.data}
                />
            </div>
		</>
    )
}

export default PemindahanAlat