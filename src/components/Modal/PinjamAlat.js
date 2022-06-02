import React, {useEffect, useState} from 'react'
import {Modal, Form, Button, Table, Image} from "react-bootstrap";
import axios from "axios";

const PinjamAlat = ({show, onHide}) => {
    const [inputs, setInputs] = useState({
        nama: "",
        tanggal_pinjam: "",
        tanggal_kembali: "",
        alat_lab : []
    });
    const [alatLab, setAlatLab] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dataLab = JSON.parse(localStorage.getItem("labByJurusan"))

    const pilihLabArea = (e) => {
        e.preventDefault();
        if (e.target.value !== "N/A") {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatLabTersedia',
                data: { labID: parseInt(e.target.value) },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(result => {
                let temp = [];
                result.data.data.map(obj => {
                    temp.push({...obj, jumlahDipinjam: 0})
                })
                setAlatLab(temp);
                setIsLoading(false)
            }).catch((err) => {
                setAlatLab(null);
                setIsLoading(false)
            })
        }
    }

    const plusAlatPinjam = (id, jumlahTersedia) => {
        console.log(inputs)
        const result = inputs.alat_lab.filter((obj) => {
            return obj.id = id
        })

        if (result.length !== 0) {
            if ((result[0].jumlah + 1) < jumlahTersedia) {
                result[0].jumlah += 1
            } else {
                alert("jumlah melebihi alat yang tersedia")
            }
        } else {
            let obj = {
                id: id,
                jumlah: 1
            }
            setInputs({...inputs, alat_lab: [...inputs.alat_lab, obj]})
            // inputs.alat_lab.push(obj)
        }
        console.log(inputs)
    }

    const minusAlatPinjam = () => {

    }

    return (
        <Modal show={show} onHide={() => onHide()} size='lg'>
            <Form encType="multipart/form-data" >
                <Modal.Header closeButton>
                    <Modal.Title>Form Peminjaman Alat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-between'>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Peminjaman</Form.Label>
                            <Form.Control
                                type="name"
                                name='nama'
                                placeholder='nama peminjaman'
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal Pinjam</Form.Label>
                            <Form.Control
                                name='tanggal_pinjam'
                                type="date"
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal Kembali</Form.Label>
                            <Form.Control
                                name='tanggal_kembali'
                                type="date"
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            />
                        </Form.Group>
                    </div>
                    
                    <Form.Group>
                        <Form.Label>Pilih Area Lab</Form.Label>
                        <Form.Select onChange={pilihLabArea}>
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
                            isLoading ? (<div>Silahkan memilih lab area diatas terlebih dahulu</div>) : (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Gambar</th>
                                            <th>Nama Alat</th>
                                            <th>Jumlah Tersedia</th>
                                            <th>Jumlah Dipinjam</th>
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
                                                        <td>{index+1}</td>
                                                        <td>
                                                            <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${alat.GAMBAR}`} fluid={true} thumbnail={true} width={100} height={100} />
                                                        </td>
                                                        <td>{alat.NAMA}</td>
                                                        <td>{alat.JUMLAH_TERSEDIA}</td>
                                                        <td>
                                                            <Button variant="primary" onClick={() => minusAlatPinjam(alat.ID, alat.JUMLAH_TERSEDIA)} >-</Button>
                                                            <span className='mx-4'>0</span>
                                                            <Button variant="primary" onClick={() => plusAlatPinjam(alat.ID, alat.JUMLAH_TERSEDIA)} >+</Button>
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