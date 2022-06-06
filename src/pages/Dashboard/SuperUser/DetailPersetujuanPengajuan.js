import React, {useEffect, useState} from 'react'
import { Card, Button } from 'react-bootstrap';
import axios from "axios";
import Swal from "sweetalert2";

const DetailPersetujuanPengajuan = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/pengajuanAlat.php?function=detailPengajuan',
            data: {
                pengajuanID: props.data.dataID
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
    },[])

    const setuju = () => {
        const opsiSetuju = ["Menunggu ACC KaProdi", "Menunggu ACC KaDep", "Menunggu ACC AsDir2", "Dilakukan Pengadaan"];
        let setuju;
        let today = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + new Date().getDate();
        if (props.data.dataUser.NAMA_ROLE === "Kepala Laboratorium") { setuju = opsiSetuju[0] }
        else if (props.data.dataUser.NAMA_ROLE === "Kepala Prodi D3" || props.data.dataUser.NAMA_ROLE === "Kepala Prodi D4") { setuju = opsiSetuju[1]}
        else if (props.data.dataUser.NAMA_ROLE === "Kepala Departemen") { setuju = opsiSetuju[2]}
        else if (props.data.dataUser.NAMA_ROLE === "Asisten Direktur 2") { setuju = opsiSetuju[3]}
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
                        pengajuan_id: props.data.dataID,
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
                    }).then(() => window.location.pathname = '/mis105/SILAB/dashboard/pengajuan-alat')
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
                        pengajuan_id: props.data.dataID,
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
                    }).then(() => window.location.pathname = '/mis105/SILAB/dashboard/pengajuan-alat')
                }).catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Menolak Pengajuan'
                    })
                })
            }
        }).catch(err => {console.error(err)})
    }
    
    return (
        <div className='w-100 p-3'>
            <div className="d-flex align-items-center">
                <h2 className="mx-3">{props.data.dataTitle}</h2>
            </div>
            <div className='d-flex align-items-center mt-3'>
                <span className='mx-3'>Setujui : </span>
                <Button variant="outline-success" className='mx-3' onClick={setuju} >Ya</Button>
                <Button variant="outline-danger" className='mx-3' onClick={tidakSetuju} >Tidak</Button>
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
                                            <span className="text-danger">Catatan : {data.CATATAN}</span>
                                        </div>
                                        <Button className="primary mt-3" disabled>Lihat File</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default DetailPersetujuanPengajuan