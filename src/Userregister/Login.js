import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const [hidepassword, setHidepassword] = useState('password');
    const [changedepassicon, setChangepassicon] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const passShow = () => {
        setChangepassicon(false);
        setHidepassword('text');
    }
    const passHide = () => {
        setChangepassicon(true);
        setHidepassword('password');

    }
    // Update state when input values change
    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost/App/login.php', {
                username,
                password,
            });
            const userdata = response.data;
            if (userdata.status === 'success') {
                localStorage.setItem('token', userdata.username);
                localStorage.setItem('token_id', userdata.userid);
                const token = localStorage.getItem('token_id');
                const status = userdata.message;

                Swal.fire({
                    title: "Success",
                    text: status,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                }).then(function () {
                    // Redirect the user
                    if (token) {
                        window.location.href = "/dashboard";
                    }
                });

            } else if (userdata.status === 'error') {
                const status = userdata.message;
                Swal.fire({
                    title: "Warning!",
                    text: status,
                    icon: "warning",
                    showConfirmButton: true
                });
            }
        } catch (error) {
            console.log(error.data);

        }
    }

    //window.location.href = `/dashboard?id=${token}`;

    return (
        <div>
            <div className='main-div-user-login'>
                <div className='user-login container'>
                    <form className='login-form' onSubmit={loginHandler}>
                        <h3 className='form-heading'>User Login</h3>
                        <div className="form-input">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <Link className='link-page' to="/updateusername">Forget Username?</Link>
                        </div>
                        <div className="form-input">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type={hidepassword} className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Link className='link-page' to="/forgotpassword">Forgot Password?</Link>
                            {changedepassicon ? <FontAwesomeIcon icon={faEyeSlash} size='lg' onClick={() => passShow()} /> : <FontAwesomeIcon icon={faEye} size='lg' onClick={() => passHide()} />}
                        </div>
                        <button type="submit" className="login-button btn btn-success">Login</button>
                        <span className='register-form link-page'>You don't have an account? <Link className='register-form link-page' to="/register"> click here</Link></span>
                    </form>

                </div>

            </div>
        </div>

    )
}
export default Login;