import React from 'react'
import {Navbars} from "../../components"

// local component
import Jumbotron from './Jumbotron'
import Fitur from "./Fitur"
import Footer from "./Footer"

const Home = () => {
  return ( 
    <>
        <Navbars />
        
        <Jumbotron />

        <Fitur />

        <Footer />

    </>
  )
}

export default Home