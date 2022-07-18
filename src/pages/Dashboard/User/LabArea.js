import React, { useState, useEffect } from 'react'
import {Card, Button, Breadcrumb} from "react-bootstrap"
import AlatLab from './AlatLab'
import axios from 'axios'

const LabArea = ({dataUser}) => {
    const [loading,setLoading] = useState(true);
    const [alatLab, setAlatLab] = useState({show: false, labData: ""});
    
    useEffect(() => {
        getLabByJurusan();
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/laboratory.php?function=getLabByDosen',
            data: {pegawai_nomor: dataUser.NOMOR},
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {           
            setAlatLab({...alatLab, labData: result.data.data[0]});
            localStorage.setItem("labByDosen", JSON.stringify(result.data.data));
            setLoading(false)
        }).catch(() => {
            setAlatLab(null);
            setLoading(false)
        })
    }, [])

    const getLabByJurusan = () => {
        axios({
            method: 'post',
            url: 'https://project.mis.pens.ac.id/mis105/SILAB/admin/api/laboratory.php?function=getLabByJurusan',
            data: {
                jurusan: dataUser.JURUSAN_NOMOR
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(result => {            
            localStorage.setItem("labByJurusan", JSON.stringify(result.data.data))
        }).catch()
    }

    return (
        <>
            {
                loading ? (<div>Loading ... </div>) : (
                    <AlatLab handleBack={() => setAlatLab({...alatLab, show: false})} data={{labData: alatLab.labData}} />
                )
            }
        </>
    )
}

export default LabArea