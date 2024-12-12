import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Header from "./Header";
import Footer from "./Footer";

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [newpassword, setNewpassword] = useState('');
    //const [status, setStatus] = useState('');

    const ForgotPassword = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost/App/forgotpassword.php', {
                email,
                username,
                newpassword
            });

            const forgotpassword = response.data;
            console.log(forgotpassword);
            if (forgotpassword.status === 'success') {
                const status = forgotpassword.message;
                Swal.fire({
                    title: "Success",
                    text: status,
                    icon: "success",
                    showConfirmButton: true
                }).then(() => {
                    window.location.href = "/login";
                });

            } else if (forgotpassword.status === 'error') {
                const status = forgotpassword.message;
                Swal.fire({
                    title: "Warning",
                    text: status,
                    icon: "warning",
                    showConfirmButton: true
                });
            } else {
                const status = forgotpassword.message;
                Swal.fire({
                    title: "Success",
                    text: status,
                    icon: "success",
                    showConfirmButton: true
                });
            }
        }
        catch (error) {
            console.log(error.data);
        }

    }
    return (
        <div>
            <Header />
            <p>Email:{email}</p>
            <p>username:{username}</p>
            <p>Password:{newpassword}</p>
            <div className='form-register container'>
                <form onSubmit={ForgotPassword} className="user-form">
                    <Link className='home-page-back-link' to="/"><span className='home-page-arrow'><FontAwesomeIcon icon={faArrowLeft} size='lg' /></span></Link>
                    <h3 className='form-heading'>Forgot Password</h3>
                    <div className="form-input">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />

                    </div>
                    <div className="form-input">
                        <label htmlFor="exampleUsernameInputpPassword1" className="form-label">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />

                    </div>
                    <div className="form-input">
                        <label htmlFor="examplepasswordInputPassword1" className="form-label">New Password</label>
                        <input type="password" className="form-control" name='password' value={newpassword} onChange={(event) => setNewpassword(event.target.value)} />

                    </div>
                    <button type="submit" className="register-button btn btn-primary">Update</button>

                </form>

            </div>
            <Footer />
        </div>
    )
}
export default ForgotPassword;