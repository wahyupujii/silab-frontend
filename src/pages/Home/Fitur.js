import React from 'react'
import {Container} from "react-bootstrap";
import { Link } from 'react-router-dom';

const Fitur = () => {
  return (
    <div className="bg-light py-5" id="program">
      <Container className="px-3">
          <div className="w-50">
              <h1 className="fw-bold mb-4">Fitur Yang Tersedia.</h1>
          </div>

          <div className="d-flex">
              <div className="feature col py-2" style={{ paddingRight: '20px' }}>
                  <h3>Pengajuan Alat Lab Baru</h3>
                  <p>Bapak dan Ibu Pegawai bisa melakukan pengajuan alat lab baru yang diperlukan.</p>
                  <Link to="/login" className='icon-link text-decoration-none'>
                    <span>Coba Sekarang</span>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.25055 6.15136C7.89305 6.50886 7.89305 7.08636 8.25055 7.44386L11.8072 11.0005L8.25055 14.5572C7.89305 14.9147 7.89305 15.4922 8.25055 15.8497C8.60805 16.2072 9.18555 16.2072 9.54305 15.8497L13.7505 11.6422C14.108 11.2847 14.108 10.7072 13.7505 10.3497L9.54305 6.1422C9.19471 5.79386 8.60805 5.79386 8.25055 6.15136Z" fill="#4A47D6" />
                    </svg>
                  </Link>
              </div>

              <div className="feature col py-2" style={{ paddingRight: '20px', paddingLeft: '20px', backgroundColor: "#3D8CDB", color: "white", borderRadius: "10px" }}>
                  <h3>Peminjaman Alat Lab</h3>
                  <p>Bapak dan Ibu Pegawai bisa melakukan peminjaman alat lab yang diperlukan.</p>
                  <Link to="/login" className='icon-link text-decoration-none text-white'>
                    <span>Coba Sekarang</span>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.25055 6.15136C7.89305 6.50886 7.89305 7.08636 8.25055 7.44386L11.8072 11.0005L8.25055 14.5572C7.89305 14.9147 7.89305 15.4922 8.25055 15.8497C8.60805 16.2072 9.18555 16.2072 9.54305 15.8497L13.7505 11.6422C14.108 11.2847 14.108 10.7072 13.7505 10.3497L9.54305 6.1422C9.19471 5.79386 8.60805 5.79386 8.25055 6.15136Z" fill="#fff" />
                    </svg>
                  </Link>
              </div>

              <div className="feature col py-2" style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                  <h3>Pengajuan Perbaikan Alat Lab</h3>
                  <p>Bapak dan Ibu Pegawai bisa melakukan pengajuan perbaikan alat lab yang perlu diperbaiki</p>
                  <Link to="/login" className='icon-link text-decoration-none'>
                    <span>Coba Sekarang</span>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.25055 6.15136C7.89305 6.50886 7.89305 7.08636 8.25055 7.44386L11.8072 11.0005L8.25055 14.5572C7.89305 14.9147 7.89305 15.4922 8.25055 15.8497C8.60805 16.2072 9.18555 16.2072 9.54305 15.8497L13.7505 11.6422C14.108 11.2847 14.108 10.7072 13.7505 10.3497L9.54305 6.1422C9.19471 5.79386 8.60805 5.79386 8.25055 6.15136Z" fill="#4A47D6" />
                    </svg>
                  </Link>
              </div>
          </div>
      </Container>
    </div>
  )
}

export default Fitur