import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button} from "react-bootstrap";
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
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatLabTersedia',
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
            <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                {
                    loading ? (<span>loading ... </span>) : dataAlat === null ? (<span>Belum ada alat di lab ini</span>) : (
                        dataAlat.map(data => {
                            return (
                                <Card style={{ width: '13rem' }} className="my-2" key={data.ID}>
                                    <Card.Img variant="top" src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${data.GAMBAR}`} />
                                    <Card.Body>
                                        <Card.Title>{data.NAMA}</Card.Title>
                                        <Card.Text>Jumlah Tersedia : {data.JUMLAH_TERSEDIA}</Card.Text>
                                        <Card.Text>No Seri : {data.NOMOR_SERI}</Card.Text>
                                        <Button variant="primary" onClick={() => setShow({show:true, detailAlat: data})}>Detail</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
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