import React, {useState} from 'react'
import { Modal, Image, Form, Table, Button,  } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const BuatPemindahan = ({show, onHide, data, count}) => {
    const [inputs, setInputs] = useState({
        nama_pemindahan: "",
        tanggal_pemindahan: "",
        alat_lab: [],
        lab_tujuan: ""
    });
    const [alatLab, setAlatLab] = useState([]);
    const [loading, setLoading] = useState(true);

    const labByTeklab = JSON.parse(localStorage.getItem("labByTeklab"));
    const labByJurusan = JSON.parse(localStorage.getItem("labByJurusan"));

    const pilihLabArea = (e) => {
        e.preventDefault();
        if (e.target.value !== "N/A") {
            axios({
                method: 'post',
                url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatReadyPemindahan',
                data: { labID: parseInt(e.target.value) },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(result => {
                setAlatLab(result.data.data.dataAlat);
                setInputs({...inputs, lab_asal: result.data.data.labNama})
                setLoading(false)
            }).catch((err) => {
                setAlatLab(null);
                setLoading(false)
            })
        }
    }

    const pilihAlat = (alat) => {
        let alatTerpilih = inputs.alat_lab;
        if (alatTerpilih.includes(alat.ID)) {
            let filter = alatTerpilih.filter((item) => item !== alat.ID);
            setInputs({...inputs, alat_lab: [...filter]});
        } else {
            setInputs({...inputs, alat_lab: [...inputs.alat_lab, alat.ID]})
        }
    }

    const buatPemindahan = (e) => {
        e.preventDefault();
        if (inputs.lab_tujuan === "" || inputs.alat_lab.length === 0) {
            Swal.fire({
                icon: 'error',
                text: 'Alat lab / lab tujuan belum dipilih'
            });
            return;
        }
        // console.log(inputs);
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pemindahanAlat.php?function=buatPemindahan',
            data: { 
                ...inputs,
                teknisi_lab: data.NOMOR
             },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            count();
            onHide();
        }).catch((err) => console.log(err))
    }

    return (
        <>
            <Modal
                size="lg"
                show={show}
                onHide={() => onHide()}
                backdrop="static"
                keyboard={false}
            >
                <Form onSubmit={buatPemindahan}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Buat Pemindahan
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-between'>
                            <Form.Group className="mb-3 w-50 px-2">
                                <Form.Label>Nama Pemindahan</Form.Label>
                                <Form.Control
                                    autoComplete='off'
                                    type="text"
                                    name='nama_pemindahan'
                                    placeholder='Nama Pemindahan'
                                    onChange={(e) => setInputs({...inputs, nama_pemindahan: e.target.value})}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 w-50 px-2">
                                <Form.Label>Tanggal Pemindahan</Form.Label>
                                <Form.Control
                                    name='tanggal_pemindahan'
                                    type="date"
                                    onChange={(e) => setInputs({...inputs, tanggal_pemindahan: e.target.value})}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <Form.Group className="mb-3 w-50 px-2">
                                <Form.Label>Pilih Area Lab Asal</Form.Label>
                                <Form.Select onChange={pilihLabArea} required>
                                    <option value="N/A">Pilih Lab Area</option>
                                    {
                                        labByTeklab.map(lab => {
                                            return (
                                                <option value={lab.ID} key={lab.ID}>{lab.NAMA}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 w-50 px-2">
                                <Form.Label>Pilih Area Lab Tujuan</Form.Label>
                                <Form.Select onChange={(e) => setInputs({...inputs, lab_tujuan: e.target.value !== "N/A" ? e.target.value : ""})} required>
                                    <option value="N/A">Pilih Lab Area Tujuan</option>
                                    {
                                        labByJurusan.map(lab => {
                                            return (
                                                <option value={lab.NAMA} key={lab.ID}>{lab.NAMA}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="d-flex justify-content-between mt-2 px-2">
                            {
                                loading ? (<div>Loading ... </div>) : (
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Gambar</th>
                                                <th>Nama Alat</th>
                                                <th>Nomor Seri</th>
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
                                                            <td className='align-middle'>{alat.NOMOR_SERI}</td>
                                                            <td className='align-middle'>
                                                                {/* <Button variant="success" onClick={() => pilihAlat(alat)}>Dipilih</Button> */}
                                                                {
                                                                    inputs.alat_lab.includes(alat.ID) ? (
                                                                        <Button variant="success" onClick={() => pilihAlat(alat)}>Dipilih</Button>
                                                                    ) : !inputs.alat_lab.includes(alat.ID) ? (
                                                                        <Button variant="outline-primary" onClick={() => pilihAlat(alat)}>Pilih</Button>
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
                        <Button variant="primary" type="submit">Buat Pemindahan</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default BuatPemindahan