import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userimage, setUserimage] = useState('');
    //const [status, setStatus] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost/App/registration.php', {
                username,
                email,
                password
            });
            const registeruser = response.data;
            if (registeruser.status === 'success') {
                const status = registeruser.message;
                Swal.fire({
                    title: "Success",
                    text: status,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "/login";
                });

            } else if (registeruser.status === 'error') {
                const status = registeruser.message;
                Swal.fire({
                    title: "Warning",
                    text: status,
                    icon: "warning",
                    showConfirmButton: true
                });
            } else {
                const status = registeruser.message;
                Swal.fire({
                    title: "Warning",
                    text: status,
                    icon: "warning",
                    showConfirmButton: true
                })
            }
        } catch (error) {
            console.log(error.data);

        }
    };
// dffg
    return (
        <div>
            <Header />
            <p>User image: {userimage}</p>
            <div className='form-register container'>
                <form className="user-form" onSubmit={submitHandler} enctype="multipart/form-data" method='post'>
                    <Link className='home-page-back-link' to="/login"><span className='home-page-arrow'><FontAwesomeIcon icon={faArrowLeft} size='lg' /></span></Link>
                    <h3 className='form-heading'> User Registration</h3>
                    <div className="form-input ">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-input">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-input">
                    <input type="file" name="user-image" value={userimage} onChange={(e) => setUserimage(e.target.value)} required />
                    </div>
                    <button type="submit" className="register-button btn btn-primary">Register</button>
                    <span className='register-form link-page'>You have an account? <Link className='register-form link-page' to="/login"> login..</Link></span>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Register;
