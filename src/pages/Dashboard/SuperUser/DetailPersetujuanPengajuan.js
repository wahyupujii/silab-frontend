import React, {useEffect, useState} from 'react'
import { Card, Button, Modal, Image } from 'react-bootstrap';
import axios from "axios";
import Swal from "sweetalert2";

// component modal
import { DetailAlatPengajuan } from '../../../components';

const DetailPersetujuanPengajuan = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rincianAlat, setRincianAlat] = useState({show: false, data: ""})

    const [modalFile, setModalFile] = useState({show: "", data: ""});
    const allowExtension = ["jpg", "png"];

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=detailPengajuan',
            data: {
                pengajuanID: props.data.detail.ID
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((result) => {
            setData(result.data.data);
            setLoading(false);
        }).catch((err) => {
            console.error(err)
        })
    }, [])

    const setuju = () => {
        const opsiSetuju = ["Menunggu ACC KaProdi", "Menunggu ACC KaDep", "Menunggu ACC AsDir2", "Dilakukan Pengadaan"];
        let setuju;
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
        if (props.data.dataUser.NAMA_ROLE === "Kepala Laboratorium") { setuju = opsiSetuju[0] }
        else if (props.data.dataUser.NAMA_ROLE === "Kepala Prodi D3" || props.data.dataUser.NAMA_ROLE === "Kepala Prodi D4") { setuju = opsiSetuju[1]}
        else if (props.data.dataUser.NAMA_ROLE === "Kepala Departemen") { setuju = opsiSetuju[2]}
        else if (props.data.dataUser.NAMA_ROLE === "Bagian Administrasi Umum dan Keuangan") { setuju = opsiSetuju[3]}
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin MENYETUJUI pengajuan ini ? ',
            text: 'Pengajuan ini akan langsung hilang dan akan dilanjutkan ke proses selanjutnya setelah anda setujui',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(result => {
            if (result.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPengajuan.php?function=setujuiPengajuan',
                    data: {
                        pegawai_nomor: props.data.dataUser.NOMOR,
                        pengajuan_id: props.data.detail.ID,
                        tanggal_persetujuan: today,
                        set_status: setuju
                    },
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then((result)=> {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Menyetujui Pengajuan',
                        text: 'Pengajuan Akan Diteruskan ke Proses Selanjutnya',
                    }).then(() => {
                        // window.location.pathname = '/mis105/SILAB/dashboard/persetujuan-pengajuan';
                        props.count();
                        props.handleBack();
                    })
                }).catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Menyetujui Pengajuan'
                    })
                })
            }
        }).catch(err => {console.error(err)})
    } 

    const tidakSetuju = () => {
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin TIDAK MENYETUJUI pengajuan ini ? ',
            text: 'Pengajuan ini akan langsung hilang dan akan dikembalikan kepada yang mengajukan pengajuan ini',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(result => {
            if (result.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPengajuan.php?function=tidakSetujuiPengajuan',
                    data: {
                        pegawai_nomor: props.data.dataUser.NOMOR,
                        pengajuan_id: props.data.detail.ID,
                        tanggal_persetujuan: today
                    },
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then((result)=> {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Tidak Menyetujui Pengajuan',
                        text: 'Pengajuan Akan Dikembalikan ke Yang Mengajukan',
                    }).then(() => {
                        props.count();
                        props.handleBack();
                    })
                }).catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Menolak Pengajuan'
                    })
                })
            }
        }).catch(err => {console.error(err)})
    }

    const pengadaanSelesai = () => {
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
        Swal.fire({
            icon: 'question',
            title: 'Anda yakin ingin MENYELESAIKAN PROSES PENGAJUAN ini ? ',
            showDenyButton: true,
            confirmButtonText: 'Ya saya yakin',
            denyButtonText: 'Tidak jadi'
        }).then(response => {
            if (response.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/persetujuanPengajuan.php?function=pengadaanSelesai',
                    data: {
                        pegawai_nomor: props.data.dataUser.NOMOR,
                        pengajuan_id: props.data.detail.ID,
                        tanggal_persetujuan: today
                    },
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(() => {
                    Swal.fire({
                        icon: "success",
                        text: "Berhasil mengakhiri pengadaan"
                    })
                    props.handleBack();
                    props.count();
                }).catch(() => {
                    Swal.fire({
                        icon: "error",
                        text: "Gagal mengakhiri pengadaan"
                    })
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
    
    return (
        <div className='w-100'>
            <div className="d-flex align-items-center justify-content-between">
                <h2 className="mx-3">{props.data.detail.NAMA_PENGAJUAN}</h2>
                {
                    props.data.detail.STATUS === "Dilakukan Pengadaan" ? (
                        <div className="d-flex justify-content-end">
                            <Button variant="success mx-2" onClick={() => pengadaanSelesai()}>Konfirmasi Pengadaan Selesai</Button>
                            <Button variant="secondary" onClick={() => setRincianAlat({...rincianAlat, show: true, data: props.data.detail.NAMA_PENGAJUAN})}>Lihat Rincian Semua Alat</Button>
                        </div>
                ) : <Button variant="secondary" onClick={() => setRincianAlat({...rincianAlat, show: true, data: props.data.detail.NAMA_PENGAJUAN})}>Lihat Rincian Semua Alat</Button>
                }
            </div>
            <div className='d-flex align-items-center mt-3'>
                {
                    props.data.detail.STATUS !== "Dilakukan Pengadaan" ? (
                        <>
                            <span className='mx-3'>Setujui : </span>
                            <Button variant="outline-success" className='mx-3' onClick={setuju} >Ya</Button>
                            <Button variant="outline-danger" className='mx-3' onClick={tidakSetuju} >Tidak</Button>
                        </>
                    ) : (<div></div>)
                }
            </div>
            <div className='d-flex flex-wrap justify-content-between px-4 py-3' style={{maxWidth: '100%', background: 'white'}}>
                {
                    loading ? (<span>loading ... </span>) : 
                    (
                        data.map(data => {
                            return (
                                <Card className="my-3" style={{width: '18rem'}} key={data.ID} >
                                    <Card.Body>
                                        <Card.Title className="mb-3">{data.NAMA}</Card.Title>
                                        <div className="d-flex flex-column">
                                            <span>Jumlah : {data.JUMLAH}</span>
                                            <span className="text-secondary">Spesifikasi : {data.SPESIFIKASI}</span>
                                        </div>
                                        <Button className="primary mt-3" onClick={() => showFileUpload(data.UPLOAD_FILE)}>Lihat File</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>

            {/* modal show file jpg */}
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

            {/* modal detail alat pengajuan */}
            <DetailAlatPengajuan 
                show={rincianAlat.show}
                onHide={() => setRincianAlat({...rincianAlat, show: false})}
                data={rincianAlat.data}
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
        </div>
    )
}

export default DetailPersetujuanPengajuan