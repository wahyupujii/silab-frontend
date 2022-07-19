import React, {useState, useEffect} from 'react'
import { Card, Button, Modal, Image } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';

// component
import { TambahAlatBaru, DetailAlatPengajuan, EditAlatBaru } from '../../../components';
import { Link } from 'react-router-dom';

const DetailPengajuan = ({handleBack, dataPengajuan}) => {

    const [show, setShow] = useState(false);
    const [detailPengajuan, setDetailPengajuan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);

    const [rincianAlat, setRincianAlat] = useState({show: false, data: ""})

    const [modalFile, setModalFile] = useState({show: "", data: ""});

    const [modalEdit, setModalEdit] = useState({show: false, data: ""});

    const allowExtension = ["jpg", "png"];

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=detailPengajuan',
            data: {pengajuanID: dataPengajuan.ID},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
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
        if (ekstensi == "pdf") {
            setModalFile({...modalFile, show: "pdf", data: file});
        } else if (allowExtension.includes(ekstensi)) {
            setModalFile({...modalFile, show: ekstensi, data: file})
        }
    }

    const ajukanPengajuan = () => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=ajukanPengajuan',
            data: {
                pengajuanID: dataPengajuan.ID
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(() => {
            window.location.pathname = '/mis105/SILAB/dashboard/pengajuan-alat'
        }).catch(err => {
            console.log("err", err)
        })
    }

    const tambahKeAlatLab = () => {
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
        let teknisi_nomor = JSON.parse(sessionStorage.getItem("superUser"));
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=ubahAlatBaruKeAlatLab',
            data: {
                pengajuanID: dataPengajuan.ID,
                teknisi_nomor: teknisi_nomor.NOMOR,
                tahun: new Date().getFullYear(),
                today: today
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(() => {
            Swal.fire({
                icon: 'success',
                title: "Berhasil mengubah menjadi alat lab",
            })
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: "Gagal mengubah menjadi alat lab",
            })
        })
    }

    return (
        <div className='w-100 p-3'>
            <div>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <Link className="mx-3" onClick={() => handleBack()}>Kembali</Link>
                        <h2>{dataPengajuan.NAMA}</h2>
                    </div>
                    <div className="d-flex">
                        {
                            dataPengajuan.STATUS === '-' || dataPengajuan.STATUS === 'Pengajuan Ditolak' ? (
                                <>
                                    <Button variant="success" onClick={() => ajukanPengajuan()}>Ajukan Pengajuan</Button>
                                    <Button variant="primary" className="mx-2" onClick={() => setShow(true)}>Tambah Alat</Button>
                                </>
                            ) : dataPengajuan.STATUS === "Pengadaan Selesai" ? (
                                <Button variant="info" className="mx-2" onClick={() => tambahKeAlatLab()}>Tambahkan Ke Alat Lab</Button>
                            ) : (<div></div>)
                        }
                        <Button variant="secondary" onClick={() => setRincianAlat({...rincianAlat, show: true, data: dataPengajuan.NAMA})}>Lihat Rincian Semua Alat</Button>
                    </div>
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
                                                {
                                                    dataPengajuan.STATUS === '-' || dataPengajuan.STATUS === 'Pengajuan Ditolak' ? (
                                                        <>
                                                            <Button variant="secondary" className="mt-2" onClick={() => setModalEdit({show: true, data: data})}>Edit</Button>
                                                            <Button variant="danger" className="mt-2" onClick={() => deleteAlat(data.ID)}>Hapus</Button>
                                                        </>
                                                    ) : (<div></div>)
                                                }
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
                aria-labelledby="contained-modal-title-vcenter"
                show={allowExtension.includes(modalFile.show) ? true : false} onHide={() => setModalFile({...modalFile, show: ""})}
                centered
            >
                <Modal.Body>
                    <Image src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${modalFile.data}`} className="w-100 h-100" />
                </Modal.Body>
            </Modal>

            {/* modal show file pdf */}
            <Modal
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                show={modalFile.show === "pdf" ? true : false} onHide={() => setModalFile({...modalFile, show: ""})}
                centered
            >
                <Modal.Body style={{height: "500px"}}>
                    <embed 
                        src={`https://project.mis.pens.ac.id/mis105/SILAB/admin/${modalFile.data}`} 
                        className="w-100 h-100"
                        type="application/pdf" />
                </Modal.Body>
            </Modal>

            {/* modal detail alat pengajuan */}
            <DetailAlatPengajuan 
                show={rincianAlat.show}
                onHide={() => setRincianAlat({...rincianAlat, show: false})}
                data={rincianAlat.data}
            />

            {/* modal edit alat baru */}
            <EditAlatBaru 
                show={modalEdit.show}
                onHide={() => setModalEdit({...modalEdit, show: false})}
                data={modalEdit.data}
            />

        </div>
    )
}

export default DetailPengajuan