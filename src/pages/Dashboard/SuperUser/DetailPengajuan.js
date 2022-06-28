import React, {useState, useEffect} from 'react'
import { Card, Button, Modal, Image } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';

// import { Document, Page } from 'react-pdf';

// component
import { TambahAlatBaru } from '../../../components';
import { Link } from 'react-router-dom';

const DetailPengajuan = ({handleBack, dataPengajuan}) => {

    const [show, setShow] = useState(false);
    const [detailPengajuan, setDetailPengajuan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);

    const [modalFile, setModalFile] = useState({show: "", data: ""});

    // // react-pdf
    // const [numPages, setNumPages] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);
    // const onDocumentLoadSuccess = ({ numPages }) => {
    //     setNumPages(numPages);
    // }

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=detailPengajuan',
            data: {pengajuanID: dataPengajuan.ID},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            // const str = result.data.data[0].UPLOAD_FILE
            // setEkstensi(str.split(".")[1]);
            setDetailPengajuan(result.data.data);
            setDataCount(result.data.data.length);
            setLoading(false);
        }).catch(err => {
            setDetailPengajuan(null);
            setLoading(false);
        })
    },[dataCount, dataPengajuan])

    const deleteAlat = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Hapus Alat',
            text: 'Apa anda yakin akan menghapus alat ini ?',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(response => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatBaru.php?function=deleteAlatBaru',
                    data: {alatBaruID: id},
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(() => {
                    setDataCount(dataCount - 1)
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Alat Baru berhasil dihapus',
                    })
                }).catch(err => {
                    console.log("err", err)
                })
            }
        })
    }

    const showFileUpload = (file) => {
        let ekstensi = file.split(".")[1];
        if (ekstensi === "jpg") { 
            setModalFile({...modalFile, show: "jpg", data: file})
        }
    }

    return (
        <div className='w-100 p-3'>
            <div>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <Link className="mx-3" onClick={() => handleBack()}>Kembali</Link>
                        <h2>{dataPengajuan.NAMA}</h2>
                    </div>
                    <Button variant="primary" onClick={() => setShow(true)}>Tambah Alat</Button>
                </div>
            </div>
            <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                {
                    loading ? (<span>loading ... </span>) : 
                        loading === false && detailPengajuan === null ? (
                            <span className='text-secondary'>Masih belum ada alat yang diajukan, silahkan tambah alat</span>
                        ) : (
                        detailPengajuan.map(data => {
                            return (
                                <Card className="shadow bg-white rounded my-3" style={{width: '18rem'}} key={data.ID} >
                                    <Card.Body>
                                        <Card.Title className="mb-3">{data.NAMA}</Card.Title>
                                        <div className="d-flex flex-column">
                                            <span>Jumlah : {data.JUMLAH}</span>
                                            <span className="text-secondary">Spesifikasi : {data.SPESIFIKASI}</span>
                                            <div className="d-flex justify-content-between">
                                                <Button variant="primary" className="mt-2" onClick={() => showFileUpload(data.UPLOAD_FILE)}>Lihat File</Button>
                                                <Button variant="secondary" className="mt-2" disabled>Edit</Button>
                                                <Button variant="danger" className="mt-2" onClick={() => deleteAlat(data.ID)}>Hapus</Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>

            <TambahAlatBaru 
                show={show }
                onHide={() => setShow(false)}
                count={() => setDataCount(dataCount+1)}
                data={{pengajuanID: dataPengajuan.ID}}
            />

            {/* modal show file jpg*/}
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                show={modalFile.show === "jpg" ? true : false} onHide={() => setModalFile({...modalFile, show: ""})}
                centered
            >
                <Modal.Body>
                    <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${modalFile.data}`} fluid />
                </Modal.Body>
            </Modal>

            {/* <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                show={modalFile.show === "pdf" ? true : false} onHide={() => setModalFile({...modalFile, show: ""})}
                centered
            >
                <Modal.Body>
                    <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${modalFile.data}`} fluid />
                    <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </Modal.Body>
            </Modal> */}

        </div>
    )
}

export default DetailPengajuan