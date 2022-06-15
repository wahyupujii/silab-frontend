import React, {useState, useEffect} from 'react'
import {Breadcrumb, Form, Button, Table} from "react-bootstrap";
import axios from "axios";

// component 
import { UbahKalab } from '../../../components/Modal';

const SetPenghuniLab = ({handleBack, data}) => {
    const [allPegawai, setAllPegawai] = useState([]);
    const [pegawaiPenghuni, setPegawaiPenghuni] = useState([]);
    const [loading, setLoading] = useState(true);

    const [ubahKalab, setUbahKalab] = useState(false)

    useEffect(() => {
        getPegawaiByJurusan();
        getPegawaiPenghuni();
    }, [])

    const getPegawaiByJurusan = () => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pegawai.php?function=getPegawaiByJurusan',
            data: {
                jurusan: parseInt(data.dataLab.JURUSAN_NOMOR)
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setAllPegawai(result.data.data);
        }).catch(() => {
            setAllPegawai(null)
        })
    }

    const getPegawaiPenghuni = () => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/laboratory.php?function=getPenghuniLab',
            data: {
                laboratoriumID: parseInt(data.dataLab.ID)
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setPegawaiPenghuni(result.data.data);
            setAllPegawai(filterPegawaiPenghuni(result.data.data));
            // setTimeout(() => {
                setLoading(false)
            // }, 2000);
        }).catch(() => {
            setPegawaiPenghuni(null)
            setLoading(false)
        })
    }

    const filterPegawaiPenghuni = (dataPenghuni) => {
        let arrayBaru = [];

        for(const elemArr of allPegawai) {
            let isDuplicate = false;

            for(const elemArr2 of dataPenghuni) {
                if  (elemArr.NOMOR === elemArr2.NOMOR && elemArr.NAMA === elemArr2.NAMA) {
                    isDuplicate = true;
                }
            }

            if(!isDuplicate) {
                arrayBaru.push(elemArr);
            }
        }

        return arrayBaru
    }
    
    return (
        <>
            <div className="w-100 p-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => handleBack()}>Pilih Area Lab</Breadcrumb.Item>
                    <Breadcrumb.Item>{data.dataLab.NAMA}</Breadcrumb.Item>
                </Breadcrumb>
                <div className='d-flex justify-content-between'>
                    <h2>Informasi Penghuni Laboratorium</h2>
                    <Button variant="secondary" onClick={() => setUbahKalab(true)}>Ubah Kepala Lab</Button>
                </div>
                
                <h6>Kepala Laboratorium : {data.dataLab.KALAB}</h6>

                {
                    loading ? (<div>Loading ...</div>) : (
                        <div className="d-flex flex-wrap justify-content-between px-2 py-3" style={{maxWidth: '100%', background: 'white'}}>
                            <div className="w-50 p-2" style={{height: '60vh'}}> 
                                <h5>Tambah Dosen untuk Jadi Penghuni</h5>    
                                <Form>
                                    <div style={{height: '53vh',  overflow: 'auto'}}>
                                        {
                                            allPegawai.map(pegawai => {
                                                return (
                                                    <Form.Group key={pegawai.NOMOR}>
                                                        <input type="checkbox" id={pegawai.NAMA} name={pegawai.NAMA} value={pegawai.NOMOR} />
                                                        <Form.Label for={pegawai.NAMA} className="mx-2">{pegawai.NAMA}</Form.Label>
                                                    </Form.Group>
                                                )
                                            })
                                        }
                                    </div>
                                    <Button variant="success" className='mt-2'>Simpan</Button>
                                </Form>
                            </div>

                            <div className="w-50 p-2" style={{height: '60vh'}}> 
                                <h5>Dosen Penghuni Saat Ini</h5>
                                <div style={{height: '53vh',  overflow: 'auto'}}>
                                    {
                                        pegawaiPenghuni === null ? (<div>Belum ada penghuni di lab ini</div>) : (
                                            <Table striped>
                                                <tbody>
                                                    {
                                                        pegawaiPenghuni.map(pegawai => {
                                                            return (
                                                                <tr key={pegawai.NOMOR}>
                                                                    <td>{pegawai.NAMA}</td>
                                                                    <td className="text-danger">Hapus</td>
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
                        </div>
                    )
                }

            </div>

            {/* modal UbahKalab */}
            <UbahKalab show={ubahKalab} onHide={() => setUbahKalab(false)} />
        </>
    )
}

export default SetPenghuniLab