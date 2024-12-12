import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";
import Footer from "./Footer";

function UpdateUsername() {
    const [email, setEmail] = useState('');
    const [newusername, setNewusername] = useState('');
    const [password, setpassword] = useState('');
    //const [status, setStatus] = useState('');
    const id = localStorage.getItem('token_id');
    

    const updateUsername = async (event) => {
        event.preventDefault();
        try {
            
            const response = await axios.post('http://localhost/App/userupdate.php', {
                id,
                email,
                newusername,
                password
            });
            const userupdate = response.data;
                console.log(userupdate);
            if (userupdate.status ==='success') {
                const status = userupdate.message;
                Swal.fire({   
                    title: "Success",
                    text: status,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                  }).then(() => {
                            window.location.href = "/login";
                  });
            }
            else if(userupdate.status ==='error') {
                const status = userupdate.message;
                Swal.fire({
                    title: "Warning",
                    text: status,
                    icon: "warning",
                    showConfirmButton: true
                  });
            }else{
                const status = userupdate.message;
                Swal.fire({
                    title: "Warning",
                    text: status,
                    icon: "warning",
                    showConfirmButton: true
                  });
            }
        }
        catch (error) {
            console.log(error.data);
        }
    }
// fddgfdgdf
    return (
        <div>
            <Header />
            <div className='form-register container'>
                <form onSubmit={updateUsername} className="user-form">
                    <Link className='home-page-back-link' to="/"><span className='home-page-arrow'><FontAwesomeIcon icon={faArrowLeft} size='lg' /></span></Link>
                    <h3 className='form-heading'>Update Username</h3>
                    <div className="form-input">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />

                    </div>
                    <div className="form-input">
                        <label htmlFor="exampleUsernameInputpPassword1" className="form-label">New Username</label>
                        <input type="text" className="form-control" name="newusername" value={newusername} onChange={(event) => setNewusername(event.target.value)} />

                    </div>
                    <div className="form-input">
                        <label htmlFor="examplepasswordInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={password} onChange={(event) => setpassword(event.target.value)} />

                    </div>
                    <button type="submit" className="register-button btn btn-primary">Update</button>

                </form>
            </div>
            <Footer />
        </div>

    )
}
export default UpdateUsername;