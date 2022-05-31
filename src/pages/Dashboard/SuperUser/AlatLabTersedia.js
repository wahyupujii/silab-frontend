import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button} from "react-bootstrap"
import axios from "axios";
import Swal from 'sweetalert2';
import { DetailAlatLab, EditAlatLab, TambahAlatLab } from '../../../components/Modal';

const AlatLabTersedia = (props) => {
    const [modalDetail, setModalDetail] = useState({show: false, detailAlat: ""});
    const [modalTambahAlat, setModalTambah] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [dataAlat, setDataAlat] = useState(null);
    const [loading, setLoading] = useState(null);
    const [dataCount, setDataCount] = useState(0);
    
    const putihkanAlat = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin MEMUTIHKAN ALAT ini ? ',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(response => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=putihkanAlat',
                    data: {alatLabID: id, teknisiKelolaNomor: parseInt(props.dataUser.NOMOR), labID: parseInt(props.data.labID)},
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then((result) => {
                    console.log(result);
                    setDataCount(dataCount-1);
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Memutihkan Alat Lab',
                    })
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: "Gagal memutihkan alat lab",
                        text: 'Terdapat kesalahan / anda bukan teknisi dari lab ini'
                    })
                })
            }
        })
    }

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
            <div className='d-flex justify-content-between align-items-center'>
                <h2>Alat Lab</h2>
                { 
                    props.dataUser.NAMA_ROLE !== 'Teknisi Laboratorium' ? <div></div> : 
                    <Button className="primary" onClick={() => setModalTambah(true)} >Tambah Alat</Button>
                }
            </div>
            <div className={`d-flex flex-wrap ${dataCount > 4 && dataCount !== 0 ? 'justify-content-between' : 'justify-content-evenly'} px-4 py-3`} style={{maxWidth: '100%', background: 'white'}}>
                {
                    loading ? (<span>loading ... </span>) : dataAlat === null ? (<span>Belum ada alat di lab ini</span>) : (
                        dataAlat.map(data => {
                            return (
                                <Card style={{ width: '15rem' }} className="my-2" key={data.ID}>
                                    <Card.Img variant="top" src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${data.GAMBAR}`} />
                                    <Card.Body>
                                        <Card.Title>{data.NAMA}</Card.Title>
                                        <Card.Text>Jumlah Tersedia : {data.JUMLAH_TERSEDIA}</Card.Text>
                                        <Card.Text>No Seri : {data.NOMOR_SERI}</Card.Text>
                                        <div className="w-100 d-flex justify-content-between" >
                                            {
                                                props.dataUser.NAMA_ROLE !== 'Teknisi Laboratorium' ? <div></div> : 
                                                <Button variant="outline-primary" onClick={() => putihkanAlat(data.ID)}>Putihkan</Button>
                                            }
                                            <Button variant="primary" onClick={() => setModalDetail({show:true, detailAlat: data})}>Detail</Button>                                            
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>

            {/* modal detail alat */}
            <DetailAlatLab 
                type="primary"
                show={modalDetail.show} 
                onHide={() => setModalDetail({...modalDetail, show: false})} 
                data={{dataAlat: modalDetail.detailAlat, dataUser: props.dataUser, labID: props.data.labID}} 
                count={() => setDataCount(dataCount-1)}
                editAlatLab={() => setModalEdit(true)}
            />

            {/* modal tambah alat */}
            <TambahAlatLab 
                show={modalTambahAlat} 
                onHide={() => setModalTambah(false)} 
                data={{dataUser: props.dataUser, dataLab: props.data.labID}} 
                count={() => setDataCount(dataCount+1)} 
            />

            {/* modal edit alat */}
            <EditAlatLab 
                show={modalEdit}
                onHide={() => setModalEdit(false)}
                data={{dataUser: props.dataUser.NOMOR, dataLab: props.data.labID, dataAlat: modalDetail.detailAlat}}
            />
        </div>
    )
}

export default AlatLabTersedia
