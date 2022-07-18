import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import style from "../Dashboard.module.css";
import Logo from "../../../assets/logo pens.png";
import { Dropdown, DropdownButton } from 'react-bootstrap';

import {useRouteMatch} from "react-router-dom"

import { InformasiAlatIcon, PengajuanAlatIcon, PeminjamanAlatIcon } from '../../../components';

// content component SuperUser
import LabArea from './LabArea';
import PengajuanAlat from './PengajuanAlat';
import PeminjamanAlat from "./PeminjamanAlat";
import PerbaikanAlat from "./PerbaikanAlat";
import Laboratorium from './Laboratorium';
import PersetujuanPengajuan from './PersetujuanPengajuan';
import PemindahanAlat from './PemindahanAlat';
import PersetujuanPerbaikan from "./PersetujuanPerbaikan";
import PersetujuanPemindahan from './PersetujuanPemindahan';

const SuperUser = ({dataUser}) => {
	const [linkActive, setLinkActive] = useState(window.location.pathname);

    const logout = () => {
        sessionStorage.removeItem("superUser");
        localStorage.clear();
    }

	return (
		<div style={{
			backgroundColor: '#F8F8F8',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            overflow: 'auto',
		}}>
			
			{/* sidebar */}
			<div className={`d-flex ${style.side_menu}`}>
                <ul className={style.side_menu_items}>
                    <li className="d-flex align-items-center" style={{marginBottom: '20px' , height: '80px' , padding: '0 0 0 10px'}}>
                        <span className={`${style.text} ${style.text_logo}`}>
                            <h5 className=''>SILAB PENS</h5>
                            <img src={Logo} alt="imageLogo" style={{ width: "60px", height: "auto" }} className="mx-2 " />
                        </span>
                    </li>
                    {
                        dataUser.NAMA_ROLE === "Teknisi Laboratorium" ? (
                            <>
                                <List icon={InformasiAlatIcon} title="Alat Lab Tersedia" path="/mis105/SILAB/dashboard" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard")} />
                                <List icon={PengajuanAlatIcon} title="Semua Alat Lab" path="/mis105/SILAB/dashboard/semua-alat" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/semua-alat")} />
                                <List icon={PengajuanAlatIcon} title="Laboratorium" path="/mis105/SILAB/dashboard/laboratorium" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/laboratorium")} />
                                <List icon={PengajuanAlatIcon} title="Pengajuan Alat" path="/mis105/SILAB/dashboard/pengajuan-alat" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/pengajuan-alat")} />
                                <List icon={PeminjamanAlatIcon} title="Peminjaman Alat" path="/mis105/SILAB/dashboard/peminjaman-alat" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/peminjaman-alat")} />
                                <List icon={PeminjamanAlatIcon} title="Pengajuan Perbaikan Alat" path="/mis105/SILAB/dashboard/perbaikan-alat" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/perbaikan-alat")} />
                                <List icon={PeminjamanAlatIcon} title="Pemindahan Alat" path="/mis105/SILAB/dashboard/pemindahan-alat" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/pemindahan-alat")} />
                            </>
                        ) : dataUser.NAMA_ROLE === "Kepala Laboratorium" ? (
                            <>
                                <List icon={InformasiAlatIcon} title="Alat Lab Tersedia" path="/mis105/SILAB/dashboard" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard")} />
                                <List icon={PengajuanAlatIcon} title="Semua Alat Lab" path="/mis105/SILAB/dashboard/semua-alat" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/semua-alat")} />
                                <List icon={PengajuanAlatIcon} title="Persetujuan Pengajuan Alat" path="/mis105/SILAB/dashboard/persetujuan-pengajuan" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/persetujuan-pengajuan")} />
                                <List icon={PeminjamanAlatIcon} title="Peminjaman Alat" path="/mis105/SILAB/dashboard/peminjaman-alat" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/peminjaman-alat")} />
                                <List icon={PeminjamanAlatIcon} title="Persetujuan Pengajuan Perbaikan Alat" path="/mis105/SILAB/dashboard/persetujuan-perbaikan" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/persetujuan-perbaikan")} />
                                <List icon={PeminjamanAlatIcon} title="Persetujuan Pemindahan Alat" path="/mis105/SILAB/dashboard/persetujuan-pemindahan" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/persetujuan-pemindahan")} />
                            </>
                        ) : (
                            <>  
                            {/* kaprodi, kadep, asdir */}
                                <List icon={PengajuanAlatIcon} title="Persetujuan Pengajuan Alat" path="/mis105/SILAB/dashboard/persetujuan-pengajuan" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/persetujuan-pengajuan")} />
                                <List icon={PeminjamanAlatIcon} title="Peminjaman Alat" path="/mis105/SILAB/dashboard/peminjaman-alat" isActive={linkActive} onClick={() => setLinkActive("/mis105/SILAB/dashboard/peminjaman-alat")} />
                            </>
                        )
                    }
                </ul>
            </div>

			{/* right side */}
			<div className="h-100" style={{marginLeft: '13rem', width: 'calc(100% - 13rem)'}} >

				{/* nav */}
				<div className={`${style.nav} ${style.content_position}`} style={{border: '2px solid #DADCE0'}}>
                    <div className={`d-flex h-100 ${style.custom_container}`}>
                        <div className="account d-flex align-items-center w-100 justify-content-end">
                        <DropdownButton id="dropdown-basic-button" title={dataUser.NAMA}>
                            <Dropdown.Item href="/mis105/SILAB" onClick={() => logout()}>Log Out</Dropdown.Item>
                        </DropdownButton>
                        </div>
                    </div>
                </div>

				{/* content */}
                <div className={`${style.custom_container} ${style.content_position}`}>
                    <div>
                        {
                            window.location.pathname === "/mis105/SILAB/dashboard" ? (
                                <LabArea dataUser={dataUser} />
                            ) : window.location.pathname === "/mis105/SILAB/dashboard/semua-alat" ? (
								<LabArea dataUser={dataUser} />
							) : window.location.pathname === "/mis105/SILAB/dashboard/laboratorium" ? (
                                <Laboratorium dataUser={dataUser} />
                            ) : window.location.pathname === "/mis105/SILAB/dashboard/pengajuan-alat" ? (
                                <PengajuanAlat dataUser={dataUser} />
                            ) : window.location.pathname === "/mis105/SILAB/dashboard/persetujuan-pengajuan" ? (
                                <PersetujuanPengajuan dataUser={dataUser} />
                            ) : window.location.pathname === "/mis105/SILAB/dashboard/peminjaman-alat" ? (
                                <PeminjamanAlat dataUser={dataUser} />
                            ) : window.location.pathname === "/mis105/SILAB/dashboard/perbaikan-alat" ? (
                                <PerbaikanAlat dataUser={dataUser} />
                            ) : window.location.pathname === "/mis105/SILAB/dashboard/pemindahan-alat" ? (
                                <PemindahanAlat dataUser={dataUser} />
                            ) : window.location.pathname === "/mis105/SILAB/dashboard/persetujuan-perbaikan" ? (
                                <PersetujuanPerbaikan dataUser={dataUser} />
                            ) : window.location.pathname === "/mis105/SILAB/dashboard/persetujuan-pemindahan" ? (
                                <PersetujuanPemindahan dataUser={dataUser} />
                            ) : <div className="d-flex justify-content-center align-items-center">404 Not Found</div>
                        }
                    </div>
                </div>

			</div>
		</div>
	)
}

const List = ({icon, title, path, isActive, ...rest}) => {
    const Icon = icon;
    return (
        <>
            <li className={`${style.list} my-2`} style={{backgroundColor: `${isActive !== "" ? isActive === path ? "#EAE9FA" : "" : ""}`}} {...rest} >
                <Link to={path} className={`${style.text} ${style.text_link}`}>
                    <Icon />
                    <span style={{color: `${isActive !== "" ? isActive === path ? "#6265DC" : "" : ""}`}} className='mx-2'>{title}</span>
                </Link>
            </li>
        </>
    )
}

export default SuperUser