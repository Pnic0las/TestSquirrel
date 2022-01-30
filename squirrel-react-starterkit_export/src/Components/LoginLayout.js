import React, { lazy } from 'react';
import PropTypes from 'prop-types'
import Image from '../assets/_Image.png'

const Header = lazy(() => import('./Header'));
const Login = lazy(() => import('../Screens/Login'))


const LoginLayout = props => {
    return (
        <div className='row no-gutters h-100'>
            <Header />
            <div className="col-6 h-100 loginColumn">
            <Login />
            </div>
            <div className="col-6 h-100 d-none d-lg-block">
            <img className="img-fluid w-100 h-100 image-fit" src={Image} alt='...'></img>
            </div>
        </div>
    )
}

LoginLayout.propTypes = {

}

export default LoginLayout
