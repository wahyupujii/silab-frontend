import React, {useState, useEffect} from 'react'
import {Form, Modal, Button, Table, Image} from "react-bootstrap"
import axios from "axios";
import Swal from 'sweetalert2';

const BuatPerbaikan = ({show, onHide, dataUser, count}) => {
    
    const [labID, setLabID] = useState(null);
    const [inputs, setInputs] = useState({
        alatID: []
    });
    
    const [dataAlatLab, setDataAlatLab] = useState([]);
    const [loading, setLoading] = useState(true);
    
    let dataLab = JSON.parse(localStorage.getItem("labByTeklab"));

    useEffect(() => {
        let lab_id = null;
        if (dataLab.length < 2) {
            lab_id = dataLab[0].ID;
        } else if (labID !== null && dataLab.length > 1) {
            lab_id = labID;
        } else if (lab_id === null) {
            return;
        }
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatLab.php?function=getAlatRusak',
            data: { 
                laboratorium_id: parseInt(lab_id)
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataAlatLab(result.data.data);
            setLabID(lab_id)
            setLoading(false)
        }).catch(() => {
            setDataAlatLab(null);
            setLoading(false)
        })
    }, [show, labID])

    const buatPerbaikan = (e) => {
        e.preventDefault();
        if (inputs.alatID.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Anda belum memilih alat rusak sama sekali"
            });
            return;
        }
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/perbaikanAlat.php?function=buatPerbaikan',
            data: { 
                ...inputs,
                alat_lab: inputs.alatID,
                tanggal_pengajuan: today,
                teknisi_nomor: dataUser.NOMOR,
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(() => {
            count();
            onHide();
        }).catch(() => {
            
        })
    }

    const selectAlat = (alat) => {
        let alatTerpilih = inputs.alatID;
        if (alatTerpilih.includes(alat.ID)) {
            let filter = alatTerpilih.filter((item) => item !== alat.ID);
            setInputs({...inputs, alatID: [...filter]});
        } else {
            setInputs({...inputs, alatID: [...inputs.alatID, alat.ID]})
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                backdrop="static"
                keyboard={false}
            >
                <Form onSubmit={buatPerbaikan} >
                    <Modal.Header closeButton>
                        <Modal.Title>Form Pengajuan Perbaikan Alat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-between'>
                            <Form.Group className="mb-3">
                                <Form.Label>Nama Perbaikan</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='nama_perbaikan'
                                    placeholder='Nama Perbaikan'
                                    onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                                    required
                                />
                            </Form.Group>
                            {
                                dataLab.length < 2 ? (
                                    <Form.Group>
                                        <Form.Label>Laboratorium</Form.Label>
                                        <Form.Control
                                            value={dataLab[0].NAMA}
                                            readOnly
                                        ></Form.Control>
                                    </Form.Group>
                                ) : (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Pilih Lab</Form.Label>
                                        <Form.Select name="laboratorium_id" onChange={(e) => e.target.value !== 'Pilih Lab' ? setLabID(e.target.value) : ''} required >
                                            <option>Pilih Lab</option>
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
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label>Catatan Kerusakan</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Catatan Kerusakan" 
                                name="catatan_kerusakan" 
                                onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})} 
                                required
                            />
                        </Form.Group>

                        {
                            loading ? ( <div>Loading ... </div> ) : labID === null ? <div>Silahkan Pilih Lab</div> :  
                            dataAlatLab === null || dataAlatLab.length === 0 ? (<span>Tidak Ada Alat Rusak Di Lab Ini</span>) : (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Gambar</th>
                                            <th>Nama Alat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataAlatLab.map((alat, index) => {
                                                return (
                                                    <tr key={alat.ID}>
                                                        <td className='align-middle'>{index+1}</td>
                                                        <td className='align-middle'>
                                                            <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${alat.GAMBAR}`} fluid={true} thumbnail={true} width={100} height={100} />
                                                        </td>
                                                        <td className='align-middle'>{alat.NAMA}</td>
                                                        <td className='align-middle text-center'>
                                                            {/* <Button onClick={() => selectAlat(alat)}>Pilih</Button> */}
                                                            {
                                                                inputs.alatID.includes(alat.ID) ? (
                                                                    <Button variant="success" onClick={() => selectAlat(alat)}>Dipilih</Button>
                                                                ) : !inputs.alatID.includes(alat.ID) ? (
                                                                    <Button variant="outline-primary" onClick={() => selectAlat(alat)}>Pilih</Button>
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

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => onHide()}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">Ajukan</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default BuatPerbaikan