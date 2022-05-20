import React, {useState} from 'react'
import {Breadcrumb, Card, Button, Modal, Form} from "react-bootstrap"

const PerbaikanAlat = () => {

    // state untuk pengaturan component modal
    const [showPengajuan, setShowPengajuan] = useState(false)
    const [showTambahAlat, setShowTambahAlat] = useState(false)

    const [toolItems, setToolItems] = useState([]);
    const [chooseTool, setChooseTool] = useState();
    const addItems = (e) => {
        e.preventDefault();
        // console.log(chooseTool)
        setToolItems([...toolItems, chooseTool])
    }
 
    return (
        <div className='w-100 p-3'>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Perbaikan Alat Lab</Breadcrumb.Item>
            </Breadcrumb>
            <div className="d-flex justify-content-between">
                <h2>Riwayat Perbaikan Alat</h2>
                <Button variant="primary" onClick={() => setShowPengajuan(true)}>Buat Pengajuan</Button>
            </div>
            <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                <Card className="my-3" style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title className="mb-3">Perbaikan Laptop Macbook</Card.Title>
                        <div className="d-flex flex-column">
                            <span>Tanggal :  </span>
                            <span>30/5/2022</span>
                            <Button variant="outline-primary" className="my-3" onClick={() => setShowTambahAlat(true)}>Tambah Alat</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/* modal membuat pengajuan */}
            <Modal show={showPengajuan} onHide={() => setShowPengajuan(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Pengajuan Perbaikan Alat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Pengajuan</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder='nama pengajuan'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">
                        Buat Pengajuan
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* modal tambah alat */}
            <Modal show={showTambahAlat} onHide={() => setShowTambahAlat(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah ALat Yang Akan Diperbaiki</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Pilih Dari Semua Alat Yang Dipinjam</Form.Label>
                        <Form.Group className="mb-3 d-flex justify-content-between">
                            <div className="w-75">
                                <Form.Select aria-label="Default select example" onChange={(e) => setChooseTool(e.target.value)}>
                                    <option className="text-muted">PILIH ALAT</option>
                                    <option value="Macbook">Macbook</option>
                                    <option value="Lenovo">Lenovo</option>
                                </Form.Select>
                            </div>
                            {/* {console.log(toolItems)} */}
                            <button className='px-3' onClick={addItems}>+</button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success">
                        Selesai
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>      
    )
}

export default PerbaikanAlat