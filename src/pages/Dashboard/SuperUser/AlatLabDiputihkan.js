import React, {useState, useEffect} from 'react'
import { Breadcrumb, Card, Button } from 'react-bootstrap'
import axios from "axios";

// component
import { DetailAlatLab } from '../../../components/Modal';

const AlatLabDiputihkan = (props) => {
    const [dataAlat, setDataAlat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [modal, setModal] = useState({show: false, detailAlat: ""});

    useEffect (() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAllAlatLab',
            data: {labID: props.data.labID},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataAlat(result.data.data);
            setDataCount(result.data.data.length);
            setLoading(false)
        }).catch(() => {
            setDataAlat(null);
            setLoading(false);
        })
    }, [dataCount, props.data.labID])

    return (
        <div className='w-100 p-3'>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => props.handleBack(false)} >Pilih Area Lab</Breadcrumb.Item>
                <Breadcrumb.Item>{props.data.labTitle}</Breadcrumb.Item>
            </Breadcrumb>
            <h2>Informasi Semua Alat Lab</h2>
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
                                        <Card.Text>Status : <span className={data.STATUS_ALAT === "TERSEDIA" ? "text-success" : "text-danger"} >{data.STATUS_ALAT}</span></Card.Text>
                                        <Card.Text>No Seri : <span>{data.NOMOR_SERI}</span></Card.Text>
                                        <Button variant="primary" onClick={() => setModal({show:true, detailAlat: data})}>Detail</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>

            {/* modal detail alat yang diputihkan */}
            <DetailAlatLab 
                type="secondary"
                show={modal.show}
                onHide={() => setModal({...modal, show: false})}
                data={{dataAlat: modal.detailAlat, dataUser: props.dataUser, labID: props.data.labID}} 
                count={() => setDataCount(dataCount-1)}
            />
        </div>
    )
}

export default AlatLabDiputihkan