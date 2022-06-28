import React, {useState, useEffect} from 'react'
import {Card, Button} from "react-bootstrap"
import axios from "axios"

const PemindahanAlat = () => {
	const dataLab = JSON.parse(localStorage.getItem("labByTeklab"));
	const [labSelected, setLabSelected] = useState(null);
    return (
		<>
			{/* {
				dataLab.length > 1 || labSelected === null ? (
					<>
						<div className="w-100 p-3">
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item>Pilih Area Lab</Breadcrumb.Item>
							</Breadcrumb>
							<h2>Pemindahan Alat Lab</h2>
						</div>
						<div className="d-flex flex-wrap justify-content-evenly px-4 py-3" style={{maxWidth: '100%', background: 'white'}}>
						{
							dataLab.map(lab => {
								return (
									<CardLab data={lab} onOpen={() => setPenghuniLab({...penghuniLab, show: true, dataLab: lab})} />
								)
							})
						}
						</div>
					</>
				) : (

				)
			}
			
			{
                loading ? (<div>Loading ... </div>) : (
                    penghuniLab.show === false ? (
                        getLab.length > 1 ? (
                            <div className='w-100 p-3'>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                    <Breadcrumb.Item>Pilih Area Lab</Breadcrumb.Item>
                                </Breadcrumb>
                                <h2>Pilih Area Lab</h2>
                                <div className="d-flex flex-wrap justify-content-evenly px-4 py-3" style={{maxWidth: '100%', background: 'white'}}>
                                    {
                                        getLab.map(lab => {
                                            return (
                                                <CardLab data={lab} onOpen={() => setPenghuniLab({...penghuniLab, show: true, dataLab: lab})} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ) : (
                            <SetPenghuniLab handleBack={() => setPenghuniLab({...penghuniLab, show: false})} data={penghuniLab} />
                        )
                    ) : (
                        <SetPenghuniLab handleBack={() => setPenghuniLab({...penghuniLab, show: false})} data={penghuniLab} />
                    )
                )
            } */}
		</>
    )
}

const CardLab = ({data, onOpen}) => {
    return (
        <>
            <Card className="my-3" key={data.ID}>
                <Card.Header className="fw-bold">{data.JURUSAN}</Card.Header>
                <Card.Body>
                    <Card.Title className="mb-3">Laboratorium {data.NAMA}</Card.Title>
                    <div className="d-flex align-items-center justify-content-between">
                        <span>Ruang {data.KODE_RUANG}</span>
                        <Button variant="primary" onClick={() => onOpen()}>Pilih ...</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default PemindahanAlat