import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Table, Image, Badge} from "react-bootstrap";
import axios from 'axios';

// component
import { DetailAlatLab } from '../../../components/Modal';

const AlatLab = (props) => {
    const [show, setShow] = useState({show: false, detailAlat: ""});
    const [dataAlat, setDataAlat] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatKondisiBaik',
            data: {labID: props.data.labData.ID},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataAlat(result.data.data);
            setLoading(false)
        }).catch(() => {
            setDataAlat(null);
            setLoading(false);
        })
    }, [props.data.labID])

    return (
        <div className='w-100 p-3'>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Informasi Alat Lab Tersedia</Breadcrumb.Item>
            </Breadcrumb>

            <h2>Alat Tersedia Lab {props.data.labData.NAMA}</h2>
            {
                loading ? <div>Loading ... </div> : dataAlat === null ? (<div>Belum Ada Alat Di Lab Ini</div>) : (
                    <div className="mt-2">
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Gambar</th>
                                    <th>Nama Alat</th>
                                    <th>Jumlah</th>
                                    <th>Status</th>
                                    <th>Kondisi</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataAlat.map((data, index) => {
                                        let status = data.STATUS_ALAT === 'ADA' ? 'success' : data.STATUS_ALAT === 'Menunggu ACC Pinjam' || data.STATUS_ALAT === 'Menunggu ACC Perbaikan' ? 'warning' : data.STATUS_ALAT === 'Dipinjam' ? 'primary' : 'info';
                                        let kondisi = data.KONDISI_ALAT === 'BAIK' ? 'success' : data.KONDISI_ALAT === 'RUSAK' ? 'danger' : 'primary';
                                        
                                        return (
                                            <tr key={data.ID} >
                                                <td className='align-middle'>{index+1}</td>
                                                <td className='align-middle'>
                                                    <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${data.GAMBAR}`} thumbnail={true} width={150} />
                                                </td>
                                                <td className='align-middle'>{data.NAMA}</td>
                                                <td className='align-middle'>{data.JUMLAH}</td>
                                                <td className='align-middle'>
                                                    <Badge bg={status}>{data.STATUS_ALAT}</Badge>{' '}
                                                </td>
                                                <td className='align-middle'>
                                                    <Badge bg={kondisi}>{data.KONDISI_ALAT}</Badge>{' '}
                                                </td>
                                                <td className='align-middle'>
                                                    <Button variant="primary" onClick={() => setShow({show:true, detailAlat: data})}>Detail</Button>
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

            {/* modal detail alat yang diputihkan */}
            <DetailAlatLab 
                type="tertiary"
                show={show.show}
                onHide={() => setShow({...show, show: false})}
                data={{dataAlat: show.detailAlat}} 
            />
        </div>
    )
}

export default AlatLab