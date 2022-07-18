import React, {useState} from 'react'
import {Form, Modal, Button} from "react-bootstrap"
import axios from "axios";
import Swal from "sweetalert2";

const TambahAlatBaru = ({ show, onHide, count, data }) => {
    let formDataAlat = new FormData();
    const [inputs, setInputs] = useState({
        harga_satuan: 0,  // 1000000
        jumlah: 0,
        total_harga: 0,
    })

    const [harga, setHarga] = useState({
        hargaSatuan: "",  // Rp. 1.000.000
        totalHarga: ""
    })

    const uploadFile = (e) => {
        let allowExtensi = ['png', 'jpg', 'pdf'];
        let extension = e.name.split(".")[1];
        if (allowExtensi.includes(extension)) {
            formDataAlat.append('FILE', e);
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ekstensi file tidak diperbolehkan'
            })
            formDataAlat.delete("FILE");
        }
    }

    const tambahAlat = (e) => {
        e.preventDefault();
        formDataAlat.append('NAMA', inputs.nama);
        formDataAlat.append('SPESIFIKASI', inputs.spesifikasi);
        formDataAlat.append('HARGA_SATUAN', inputs.harga_satuan);
        formDataAlat.append('JUMLAH', inputs.jumlah);
        formDataAlat.append('TOTAL_HARGA', inputs.total_harga);
        formDataAlat.append('PENGAJUAN_ID', data.pengajuanID)

        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatBaru.php?function=tambahAlatBaru',
            data: formDataAlat,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(() => {
            onHide(false);
            count();
            setHarga({...harga, hargaSatuan: "", totalHarga: ""});
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: "Gagal menambahkan alat baru",
                text: 'Terdapat kesalahan inputan / isian belum valid'
            })
            console.log("err", err)
            formDataAlat.delete("FILE");
        })        
    }

    const formatRupiah = (angka, prefix, target) => {
        let separator;
        let number_string = angka.replace(/[^,\d]/g, '').toString(),
        split   		= number_string.split(','),
        sisa     		= split[0].length % 3,
        rupiah     		= split[0].substr(0, sisa),
        ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if(ribuan){
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        if (target === "harga_satuan") {
            setHarga({...harga, hargaSatuan: prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '')});
            setInputs({...inputs, harga_satuan: parseInt(number_string)})
        } else if (target === "total_harga") {
            setHarga({...harga, totalHarga: prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '')})
        }
    }

    const setHargaTotal = (e) => {
        // pakai variabel baru karena saat di setInputs ke total_harga, ada delay,
        // sehingga meskipun sudah di setInput, tapi saat ditampilkan masih kosong
        let totalHarga = parseInt(e.target.value) * inputs.harga_satuan
        setInputs({
            ...inputs, 
            jumlah: parseInt(e.target.value),
            total_harga: totalHarga
        });
        formatRupiah(totalHarga.toString(), "Rp. ", "total_harga");
    }

    return (
        <Modal show={show} onHide={() => onHide()}>
            <Form onSubmit={tambahAlat} encType="multipart/form-data" >
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alat yang Diajukan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Alat</Form.Label>
                        <Form.Control
                            type="text"
                            name="nama"
                            placeholder="Nama Alat"
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Spesifikasi</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Spesifikasi" 
                            name="spesifikasi" 
                            onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})} 
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Harga Satuan</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Harga Satuan"
                            name="harga_satuan"
                            value={harga.hargaSatuan === "" ? "" : harga.hargaSatuan}
                            onChange={(e) => formatRupiah(e.target.value, "Rp. ", "harga_satuan")}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Jumlah</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Jumlah"
                            name="jumlah"
                            onChange={(e) => setHargaTotal(e)}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estimasi Total Harga</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Estimasi Total Harga"
                            name="total_harga"
                            value={harga.totalHarga === "" ? "" : harga.totalHarga}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>File Penunjang</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="file" 
                            // onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.files[0]})} 
                            onChange={(e) => uploadFile(e.target.files[0])}
                            required={true}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Tambah
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default TambahAlatBaru