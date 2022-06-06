import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Table, Image} from "react-bootstrap";
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
            data: {labID: props.data.labID},
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
                <Breadcrumb.Item onClick={() => props.handleBack(false)} >Pilih Area Lab</Breadcrumb.Item>
                <Breadcrumb.Item>{props.data.labTitle}</Breadcrumb.Item>
            </Breadcrumb>
            <h2>Alat Lab</h2>

            <div className="mt-2">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Gambar</th>
                            <th>Nama Alat</th>
                            <th>Jumlah Tersedia</th>
                            <th>Status</th>
                            <th>No Seri</th>
                            <th>Detail Alat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? (<div>Loading</div>) : dataAlat == null ? (<span>Belum Ada ALat Di Lab Ini</span>) : 
                            dataAlat.map((data, index) => {
                                return (
                                    <tr>
                                        <td className='align-middle'>{index+1}</td>
                                        <td className='align-middle'>
                                            <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${data.GAMBAR}`} thumbnail={true} width={150} />
                                        </td>
                                        <td className='align-middle'>{data.NAMA}</td>
                                        <td className='align-middle'>{data.JUMLAH_TERSEDIA}</td>
                                        <td className='align-middle'>{data.STATUS_ALAT}</td>
                                        <td className='align-middle'>{data.NOMOR_SERI}</td>
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