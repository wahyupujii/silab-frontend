import React, {useState, useEffect} from 'react'
import { Modal, Table, Button } from 'react-bootstrap'
import axios from "axios";
import CurrencyFormat from 'react-currency-format';

const DetailAlatPengajuan = ({show, onHide, data}) => {
    const [dataAlat, setDataAlat] = useState([]);
    const [totalHarga, setTotalHarga] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/alatBaru.php?function=getRincianAlat',
            data: {
                nama_pengajuan: data
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {
            setDataAlat(result.data.data.dataAlat);
            setTotalHarga(parseInt(result.data.data.totalHarga.JUMLAH))
            setLoading(false)
        }).catch((err) => console.log("err", err))
    }, [show])

    return (
        <>
            <Modal show={show} size="lg" centered onHide={() => onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Rincian Alat Baru
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Daftar Alat</h4>
                    {
                        loading ? (<div>Loading ... </div>) : (
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama</th>
                                        <th>Harga Satuan</th>
                                        <th>Jumlah</th>
                                        <th>Total Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataAlat.map((data, index) => {
                                            return (
                                                <tr key={data.ID}>
                                                    <td>{index+1}</td>
                                                    <td>{data.NAMA}</td>
                                                    <CurrencyFormat 
                                                        value={data.HARGA_SATUAN} 
                                                        displayType={'text'} 
                                                        thousandSeparator={true} 
                                                        prefix={'Rp. '} 
                                                        renderText={value => <td>{value}</td>} 
                                                    />
                                                    <td>{data.JUMLAH}</td>
                                                    <CurrencyFormat 
                                                        value={data.TOTAL_HARGA} 
                                                        displayType={'text'} 
                                                        thousandSeparator={true} 
                                                        prefix={'Rp. '} 
                                                        renderText={value => <td>{value}</td>} 
                                                    />
                                                </tr>                                                
                                            )
                                        })
                                    }
                                    <tr>
                                        <CurrencyFormat 
                                            value={totalHarga} 
                                            displayType={'text'} 
                                            thousandSeparator={true} 
                                            prefix={'Rp. '} 
                                            renderText={value => <td colSpan={5}>Total Harga : <span className='mx-2 text-primary'>{value}</span></td>} 
                                        />
                                    </tr>
                                </tbody>
                            </Table>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onHide()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}

export default DetailAlatPengajuan