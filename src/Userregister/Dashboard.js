
import React, { useState } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Document from "./Document";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { faFilePen } from "@fortawesome/free-solid-svg-icons/faFilePen";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons/faSignOut";
import { faFile } from "@fortawesome/free-solid-svg-icons";
//import { useLocation } from "react-router-dom";

function Dashboard() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
    }
    const [searchvalue, searchValue] = useState('')
    const [userid, setUserid] = useState(localStorage.getItem('token_id'));
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_id');
        const token = localStorage.getItem('token');
        const token_id = localStorage.getItem('token_id');
        if (!token && !token_id) {
            setUserid(userid);
            Swal.fire({
                title: "Are you sure?",
                text: "You want to logout",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Logout"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                }
            });
        }
    }
    const deleteuser = async () => {
        if (userid) {
            setUserid(userid);
            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete account",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('http://localhost/App/deleteuser.php', {
                        userid
                    });

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your account has been deleted.",
                        icon: "success",
                        showConfirmButton: true,
                    }).then(() => {
                        localStorage.removeItem('token_id');
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    });
                }
            });
        }
    }
    const searchdocx = (event) => {
        searchValue(event.target.value);
    };
    //  const  location = useLocation();
    //  const urldata = new URLSearchParams(location.search);
    //  const id = urldata.get('id');
    return (
        <div>
            <Header />
            <section className="dashboard-sec ">
                <div className="conatiner-fluid">
                    <div className="dashboard-col">
                        <div className="dash-sidebar">
                            {token ? <h4 className="user-dashboard"> Welcome {token}</h4> : <p className="user-dashboard">User Dashboard</p>}
                            <div className="sidebar-option">
                                <div className="side-link">
                                    <Link to="/" className="user-option-link"><FontAwesomeIcon className="dashboard-sidebar-icon" icon={faHome} /> Home</Link>
                                    <Link to="/dashboard" className="user-option-link"><FontAwesomeIcon className="dashboard-sidebar-icon" icon={faDashboard} /> Dashboard</Link>
                                    <Link to="/createdocx" className="user-option-link"><FontAwesomeIcon className="dashboard-sidebar-icon" icon={faFile} /> Create document</Link>
                                    <Link to="/updateusername" className="user-option-link"><FontAwesomeIcon className="dashboard-sidebar-icon" icon={faFilePen} /> Update Username</Link>
                                    <Link to="/forgotpassword" className="user-option-link"><FontAwesomeIcon className="dashboard-sidebar-icon" icon={faUnlockKeyhole} /> Forgot Password</Link>
                                    <Link onClick={() => { deleteuser() }} className="user-option-link"><FontAwesomeIcon className="dashboard-sidebar-icon" icon={faUserXmark} /> Delete Account</Link>
                                    <Link onClick={() => { logout() }} className="user-option-link"><FontAwesomeIcon className="dashboard-sidebar-icon" icon={faSignOut} /> LogOut</Link>
                                </div>
                            </div>
                        </div>
                        <div className="show-all-docx">
                            <div className="docx-content">
                                <h2>My Documents</h2>
                                <form action="">
                                    <input className="search-bar" name="searchValue" value={searchvalue} onChange={searchdocx} type="text" placeholder="Search docx..." />
                                </form>
                            </div>
                            <Document searchkey={searchvalue} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
export default Dashboard;