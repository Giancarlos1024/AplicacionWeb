import React from 'react'
import '../assets/css/Footer.css'
import { NavLink } from 'react-router-dom'
export const Footer = () => {
  return (
    
    <footer className='footer-web'>
      <section>
        <div className='informacion-footer'>
          <div className='unidad-educativa'>
            <h3>UNIDAD EDUCATIVA REPUBLICA <br /> DEL ECUADOR </h3>
            {/* <p>Unidad Educativa Fiscal © - Eficiencia y Disciplina Acuerdo Ministerial ® : N° 016858, 26 de Agosto de 1966™.</p> */}
          </div>
          <div className='contacto'>
            <h3>PONTE EN CONTACTO</h3>
            <p>DIRECCION</p><br />
            <p>KM 1 vía al Rcto Chade, Jipijapa, Ecuador</p>
          </div>
          <div className='telefono'>
            <h3><img src="img/phone2.png" alt="telefono" />TELEFONO</h3>
            <p>0991598287</p>
          </div>
        </div>
        <div className='redes_sociales'>
          <a href="https://www.tiktok.com/@amre2363?_t=ZM-8sseRlsCqcY&_r=1" target='_blank'><img src="img/tik-tok.png" id='tiktokclass' alt="tiktok" /></a>
          {/* <a href="#"><img src="img/linkedin_red.png" alt="linkedin" /></a> */}
          <a href="https://web.facebook.com/amre.jipijapa?mibextid=LQQJ4d&rdid=qTFaabUNt0FG3kVO&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F14zodHC3KR%2F%3Fmibextid%3DLQQJ4d%26_rdc%3D1%26_rdr" target='_blank'><img src="img/facebook_red.png" alt="facebook" /></a>
          <a href="https://www.instagram.com/amrejipijapa/?igsh=MW56NHBpanYzeHI1" target='_blank'><img src="img/instagram_red.png" alt="instagram" /></a>
        </div>
      
      </section>
      <div className='informacion-bot-footer'>
        <div className='logo-titulo'>
          <img src="img/LogoE.png" alt="logo" />
          <NavLink to="/" className="titulo-header-principal-footer"><span className='titulo-header2'>ACADEMIA REPUBLICA DEL ECUADOR</span></NavLink>
        </div>
        {/* <div className='opionesFooter'>
          <a href="#">Ayuda</a>
          <a href="#">Terminos</a>
          <a href="#">Privacidad</a>
        </div> */}
        <div className='subir-footer'>
         <a href="#"> <img src="img/subir2.png" alt="logo" /></a>
        </div>
      </div>
    </footer>
    
  )
}
