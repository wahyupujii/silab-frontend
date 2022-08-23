import React, {useState, useEffect} from 'react'
import {Breadcrumb, Card, Button, Form, Table, Image, Badge} from "react-bootstrap"
import axios from "axios";
import Swal from 'sweetalert2';
import { DetailAlatLab, EditAlatLab, TambahAlatLab } from '../../../components/Modal';

const AlatLabTersedia = (props) => {
    const [modalDetail, setModalDetail] = useState({show: false, detailAlat: ""});
    const [modalTambahAlat, setModalTambah] = useState(false)
    const [dataAlat, setDataAlat] = useState(null);
    const [loading, setLoading] = useState(null);
    const [dataCount, setDataCount] = useState(0);

    useEffect(() => {
        let url = ""
        props.dataUser.NAMA_ROLE === "Teknisi Laboratorium" ? (
            url = "https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getTiapAlat"
        ) : (
            url = "https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatAkumulasi"
        )
        axios({
            method: 'post',
            url: url,
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
                {
                    props.dataUser.NAMA_ROLE === "Teknisi Laboratorium" ? (
                        <>
                            <Breadcrumb.Item onClick={() => props.handleBack(false)} >Pilih Area Lab</Breadcrumb.Item>
                            <Breadcrumb.Item>{props.data.labTitle}</Breadcrumb.Item>
                        </>
                    ) : (
                        <Breadcrumb.Item>Informasi Alat Lab Tersedia</Breadcrumb.Item>
                    )
                }
            </Breadcrumb>
            <div className='d-flex justify-content-between align-items-center'>
                <h2>Informasi Alat Lab Tersedia</h2>
                { 
                    props.dataUser.NAMA_ROLE !== 'Teknisi Laboratorium' ? <div></div> : 
                    <Button className="primary" onClick={() => setModalTambah(true)} >Tambah Alat</Button>
                }
            </div>
            <div className="mt-2">
                {
                    loading ? (<div>Loading ...</div>) : dataAlat === null ? (<span>Belum Ada Alat Di Lab Ini</span>) : (
                        props.dataUser.NAMA_ROLE === "Teknisi Laboratorium" ? (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Gambar</th>
                                        <th>Nama Alat</th>
                                        <th>Nomor Seri</th>
                                        <th>Status Alat</th>
                                        <th>Kondisi Alat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataAlat.map((data, index) => {
                                            let status = data.STATUS_ALAT === 'ADA' ? 'success' : data.STATUS_ALAT === 'Menunggu ACC Pinjam' || data.STATUS_ALAT === 'Menunggu ACC Perbaikan' ? 'warning' : data.STATUS_ALAT === 'Dipinjam' ? 'primary' : 'info';
                                            let kondisi = data.KONDISI_ALAT === 'BAIK' ? 'success' : data.KONDISI_ALAT === 'RUSAK' ? 'danger' : 'primary';
                                            return (
                                                <tr key={data.ID}>
                                                    <td className='align-middle'>{index+1}</td>
                                                    <td className='align-middle'>
                                                        <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${data.GAMBAR}`} thumbnail={true} width={150} />
                                                    </td>
                                                    <td className='align-middle'>{data.NAMA}</td>
                                                    <td className='align-middle'>{data.NOMOR_SERI}</td>
                                                    <td className='align-middle'>
                                                        <h5>
                                                            <Badge bg={status}>
                                                                {data.STATUS_ALAT}
                                                            </Badge>
                                                        </h5>                                                    
                                                    </td>
                                                    <td className='align-middle'>
                                                        <h5>
                                                            <Badge bg={kondisi}>
                                                                {data.KONDISI_ALAT}
                                                            </Badge>
                                                        </h5>
                                                    </td>
                                                    <td className='align-middle'>
                                                        <Button variant="primary" onClick={() => setModalDetail({show:true, detailAlat: data})}>Detail</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        ) : (
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Gambar</th>
                                        <th>Nama Alat</th>
                                        <th>Merk Alat</th>
                                        <th>Type Alat</th>
                                        <th>Jumlah Total</th>
                                        <th>Detail Alat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataAlat.map((data, index) => {
                                            return (
                                                <tr key={data.ID}>
                                                    <td className='align-middle'>{index+1}</td>
                                                    <td className='align-middle'>
                                                        <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${data.GAMBAR}`} thumbnail={true} width={150} />
                                                    </td>
                                                    <td className='align-middle'>{data.NAMA}</td>
                                                    <td className='align-middle'>{data.MERK}</td>
                                                    <td className='align-middle'>{data.TYPE}</td>
                                                    <td className='align-middle'>{data.JUMLAH}</td>
                                                    
                                                    <td className='align-middle'>
                                                        <Button variant="primary" onClick={() => setModalDetail({show:true, detailAlat: data})}>Detail</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        )
                    )
                }
            </div>

            {/* modal detail alat */}
            <DetailAlatLab 
                type={props.dataUser.NAMA_ROLE === "Teknisi Laboratorium" ? "primary" : "secondary"}
                show={modalDetail.show} 
                onHide={() => setModalDetail({...modalDetail, show: false})} 
                data={{dataAlat: modalDetail.detailAlat, dataUser: props.dataUser, labID: props.data.labID}} 
                count={() => setDataCount(dataCount-1)}
            />

            {/* modal tambah alat */}
            <TambahAlatLab 
                show={modalTambahAlat} 
                onHide={() => setModalTambah(false)} 
                data={{dataUser: props.dataUser, dataLab: props.data.labID}} 
                count={() => setDataCount(dataCount+1)} 
            />            
        </div>
    )
}

export default AlatLabTersedia
