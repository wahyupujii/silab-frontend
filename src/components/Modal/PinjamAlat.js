import React, {useEffect, useState} from 'react'
import {Modal, Form, Button, Table, Image} from "react-bootstrap";
import axios from "axios";

const PinjamAlat = ({show, onHide, count, dataUser}) => {
    const [inputs, setInputs] = useState({
        nama: "",
        tanggal_pinjam: "",
        tanggal_kembali: "",
        alat_lab : []
    });

    const [alatLab, setAlatLab] = useState([]);
    const [loading, setLoading] = useState(true);

    let dataLab;
    if (dataUser.NAMA_ROLE === "Dosen") {
        dataLab = JSON.parse(localStorage.getItem("labByDosen"));
    } else if (dataUser.NAMA_ROLE === "Kepala Laboratorium") {
        dataLab = JSON.parse(localStorage.getItem("labByKalab"));
    } else if (dataUser.NAMA_ROLE === "Teknisi Laboratorium") {
        dataLab = JSON.parse(localStorage.getItem("labByTeklab"));
    }
    
    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatStatusAda',
            data: { laboratorium_id: parseInt(dataLab[0].ID) },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setAlatLab(result.data.data);
            setLoading(false)
        }).catch(() => {
            setAlatLab(null);
            setLoading(false)
        })
    }, [show])

    const pilihLabArea = (e) => {
        e.preventDefault();
        if (e.target.value !== "N/A") {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatStatusAda',
                data: { laboratorium_id: parseInt(e.target.value) },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(result => {
                // let temp = [];
                // result.data.data.map(obj => {
                //     temp.push({...obj, jumlahDipinjam: 0})
                // })
                setAlatLab(result.data.data);
                setLoading(false)
            }).catch((err) => {
                setAlatLab(null);
                setLoading(false)
            })
        }
    }

    // memilih alat yang dipinjam
    const pinjamAlat = (alat) => {
        let alatTerpilih = inputs.alat_lab;
        if (alatTerpilih.includes(alat.ID)) {
            inputs.alat_lab.pop(alat.ID);
        } else {
            setInputs({...inputs, alat_lab: [...inputs.alat_lab, alat.ID]})
        }
    }

    const buatPeminjaman = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/peminjamanAlat.php?function=buatPeminjaman',
            data: {
                ...inputs, 
                nomor_pegawai: dataUser.NOMOR,
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            count();
            onHide();
        }).catch(() => {
            // swal gagal meminjam alat
        })

    }

    return (
        <Modal show={show} onHide={() => onHide()} size='lg'>
            <Form encType="multipart/form-data" onSubmit={buatPeminjaman} >
                <Modal.Header closeButton>
                    <Modal.Title>Form Peminjaman Alat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-between'>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Peminjaman</Form.Label>
                            <Form.Control
                                type="text"
                                name='nama_peminjaman'
                                placeholder='Nama Peminjaman'
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal Pinjam</Form.Label>
                            <Form.Control
                                name='tanggal_pinjam'
                                type="date"
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal Kembali</Form.Label>
                            <Form.Control
                                name='tanggal_kembali'
                                type="date"
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                                required
                            />
                        </Form.Group>
                    </div>
                    
                    {
                        dataLab.length < 2 ? (
                            <Form.Group>
                                <Form.Label>Area Lab</Form.Label>
                                <Form.Control
                                    value={dataLab[0].NAMA}
                                    readOnly
                                ></Form.Control>
                            </Form.Group>
                        ) : (
                            <Form.Group>
                                <Form.Label>Pilih Area Lab</Form.Label>
                                <Form.Select onChange={pilihLabArea} required>
                                    <option value="N/A">Pilih Lab Area</option>
                                    {
                                        dataLab.map(lab => {
                                            return (
                                                <option value={lab.ID} key={lab.ID}>{lab.NAMA}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        )
                    }

                    <div className="d-flex justify-content-between mt-2">
                        {
                            loading ? (<div>Loading ... </div>) : (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Gambar</th>
                                            <th>Nama Alat</th>
                                            <th>Detail Alat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            alatLab === null ? (
                                                <span>Tidak ada alat di lab ini</span>
                                            ) : 
                                            alatLab.map((alat, index) => {
                                                return (
                                                    <tr key={alat.ID}>
                                                        <td className='align-middle'>{index+1}</td>
                                                        <td className='align-middle'>
                                                            <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${alat.GAMBAR}`} fluid={true} thumbnail={true} width={100} height={100} />
                                                        </td>
                                                        <td className='align-middle'>{alat.NAMA}</td>
                                                        <td className='align-middle'>
                                                            <Button variant="primary">Detail</Button>
                                                        </td>
                                                        <td className='align-middle'>
                                                            <Button variant="outline-primary" onClick={() => pinjamAlat(alat)}>Pinjam</Button>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Buat Peminjaman
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>      
    )
}

export default PinjamAlat