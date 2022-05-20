import React from 'react'
import { Breadcrumb, Card, Button, Dropdown, DropdownButton } from 'react-bootstrap'

// tambah pinjam alat
const DetailPeminjaman = (props) => {
    return (
        <div className='w-100 p-3'>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => props.handleBack(false)} >Peminjaman Alat Lab</Breadcrumb.Item>
                <Breadcrumb.Item>Peminjaman Laptop untuk Dosen A</Breadcrumb.Item>
            </Breadcrumb>
            <div className="d-flex justify-content-between">
                <h2>Peminjaman Laptop untuk Dosen A</h2>
                <Button variant="success">Selesai</Button>
            </div>
            <div className='px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                <DropdownButton id="dropdown-basic-button" variant="outline-secondary" title="Pilih Lab">
                    <Dropdown.Item>Lab Sistem Informasi - C102</Dropdown.Item>
                </DropdownButton>
                <div className='card-area d-flex flex-wrap justify-content-between w-100'>
                    <Card style={{ width: '13rem' }} className="my-2">
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>Tersedia : 10</Card.Text>
                            <div></div>
                            {/* <Button variant="primary">Detail</Button> */}
                            {/* operator */}
                            <div className="w-50 d-flex justify-content-evenly align-items-center">
                                <button className="px-2">-</button>
                                <span>0</span>
                                <button className="px-2">+</button>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }} className="my-2">
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>Tersedia : 10</Card.Text>
                            {/* <Button variant="primary">Detail</Button> */}
                            {/* operator */}
                            <div className="w-50 d-flex justify-content-evenly align-items-center">
                                <button className="px-2">-</button>
                                <span>0</span>
                                <button className="px-2">+</button>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }} className="my-2">
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>Tersedia : 10</Card.Text>
                            {/* <Button variant="primary">Detail</Button> */}
                            {/* operator */}
                            <div className="w-50 d-flex justify-content-evenly align-items-center">
                                <button className="px-2">-</button>
                                <span>0</span>
                                <button className="px-2">+</button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DetailPeminjaman