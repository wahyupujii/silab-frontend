import React, {useState, useEffect} from 'react'
import { Breadcrumb, Card, Button, Dropdown, Table, Image, Badge} from 'react-bootstrap'
import axios from "axios";

// component
import { DetailAlatLab } from '../../../components/Modal';

const SemuaAlatDiLab = (props) => {
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
                {
                    props.dataUser.NAMA_ROLE === "Teknisi Laboratorium" ? (
                        <>
                            <Breadcrumb.Item onClick={() => props.handleBack(false)} >Pilih Area Lab</Breadcrumb.Item>
                            <Breadcrumb.Item>{props.data.labTitle}</Breadcrumb.Item>
                        </>
                    ) : (
                        <Breadcrumb.Item>Informasi Semua Alat Lab</Breadcrumb.Item>
                    )
                }
            </Breadcrumb>
            <div className="d-flex justify-content-between">
                <h2>Informasi Semua Alat Lab</h2>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Pilih Alat Sesuai Status
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="mt-2">
                {
                    loading ? (<div>Loading</div>) : dataAlat == null ? (<span>Belum Ada ALat Di Lab Ini</span>) : (
                        <Table striped>
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
                                        let status = data.STATUS_ALAT === 'ADA' ? 'success' : data.STATUS_ALAT === 'Menunggu ACC Pinjam' || data.STATUS_ALAT === 'Menunggu ACC Perbaikan' ? 'info' : 'primary';
                                        let kondisi = data.KONDISI_ALAT === 'BAIK' ? 'success' : data.KONDISI_ALAT === 'RUSAK' ? 'danger' : 'primary';
                                        return (
                                            <tr key={data.ID}>
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
                                                    <Button variant="primary" onClick={() => setModal({show:true, detailAlat: data})}>Detail</Button>
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

export default SemuaAlatDiLab