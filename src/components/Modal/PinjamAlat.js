import React, {useEffect, useState} from 'react'
import {Modal, Form, Button, Table, Image} from "react-bootstrap";
import axios from "axios";

const PinjamAlat = ({show, onHide, count, dataUser}) => {
    const [inputs, setInputs] = useState({
        keperluan_pinjam: "",
        tanggal_pinjam: "",
        tanggal_kembali: "",
        alat_lab : []
    });

    const [alatLab, setAlatLab] = useState([]);
    const [loading, setLoading] = useState(true);

    let dataLab = JSON.parse(localStorage.getItem("labByJurusan"));

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
        if (alatTerpilih.includes(alat.NAMA)) {
            let filter = alatTerpilih.filter((item) => item !== alat.NAMA);
            setInputs({...inputs, alat_lab: [...filter]});
        } else {
            setInputs({...inputs, alat_lab: [...inputs.alat_lab, alat.NAMA]})
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
        // console.log(inputs)
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
                            <Form.Label>Keperluan Pinjam</Form.Label>
                            <Form.Control
                                autoComplete='off'
                                type="text"
                                name='keperluan_pinjam'
                                placeholder='Keperluan Pinjam'
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
                    <div className="d-flex justify-content-between mt-2">
                        {
                            loading ? (<div>Loading ... </div>) : (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Gambar</th>
                                            <th>Nama Alat</th>
                                            <th>Jumlah Tersedia</th>
                                            <th>Pilih Alat</th>
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
                                                        <td className='align-middle'>{alat.JUMLAH}</td>
                                                        <td className='align-middle'>
                                                            {
                                                                inputs.alat_lab.includes(alat.NAMA) ? (
                                                                    <Button variant="success" onClick={() => pinjamAlat(alat)}>Dipilih</Button>
                                                                ) : !inputs.alat_lab.includes(alat.NAMA) ? (
                                                                    <Button variant="outline-primary" onClick={() => pinjamAlat(alat)}>Pinjam</Button>
                                                                ) : (<span></span>)
                                                            }
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