import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
function Createdocx() {
    const token = localStorage.getItem('token_id');
    if (!token) {
        window.location.href = '/login';
    }
    const [userid, setUserid] = useState(localStorage.getItem('token_id'));
    const [username, setUsername] = useState(localStorage.getItem('token'));
    const [docxname, setDocxname] = useState('');
    const [docxdata, setDocxdata] = useState('');
    const [docxdesc, setDocxdesc] = useState('');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const docxid = query.get('docxid');
    
    const submitdocx = async (event) => {
        event.preventDefault();
        try {

            const response = await axios.post('http://localhost/App/createdocx.php', {
                docxid,
                userid,
                username,
                docxname,
                docxdata,
                docxdesc
            });

            if (response.data.status === 'success') {
                const status = response.data.message;
                Swal.fire({
                    title: "success",
                    text: status,
                    icon: "success",
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/dashboard";
                    }
                });
            } else if (response.data.status === 'error') {
                const status = response.data.message;
                Swal.fire({
                    title: "Warning",
                    text: status,
                    icon: "warning",
                    showConfirmButton: true
                });
            } else {
                const status = response.data.message;
                Swal.fire({
                    title: "Warning",
                    text: status,
                    icon: "warning",
                    showConfirmButton: true
                });
            }

        } catch (error) {
            console.log(error.data);
        }
    }
    useEffect(() => {
        const updateDocx = async () => {
            try {
                const response = await axios.post('http://localhost/app/fatchonedocx.php', {
                    docxid
                });

                if (response.data.status === 'success') {
                    setDocxname(response.data.docxtitle);
                    setDocxdata(response.data.docxcontent);
                    setDocxdesc(response.data.docxtags);
                }
            } catch (error) {
                console.log(error.data);
            }
        }
        updateDocx();
    }, [docxid]);

    return (
        <div>
            <Header />
            <div className="container">
                {!docxid ?
                    <div className="row docx-create-form">
                        <div className="col-md-12 docx-create-form-col">
                            <h4 className="craete-docx-heading">Craete Document</h4>
                            <form onSubmit={submitdocx} method='post'>
                                <div class="mb-3">
                                    <input type="text" class="form-control" value={docxname} onChange={(event) => { setDocxname(event.target.value) }} id="exampleFormControlInput1" placeholder="Docx title" />
                                </div>
                                <div class="mb-3">
                                    <textarea class="form-control" value={docxdata} onChange={(event) => { setDocxdata(event.target.value) }} id="exampleFormControlTextarea1" rows="8" placeholder="Write text here..."></textarea>
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" value={docxdesc} onChange={(event) => { setDocxdesc(event.target.value) }} id="exampleFormControlInput1" placeholder="Docx desc" />
                                </div>
                                <div>
                                    <button className="btn btn-primary create-docx-btn">Create Document</button>
                                </div>
                            </form>
                        </div>
                    </div> :
                    <div className="row docx-create-form">
                        <div className="col-md-12 docx-create-form-col">
                            <h4 className="craete-docx-heading">Craete Document</h4>
                            <form onSubmit={submitdocx} method='post'>
                                <div class="mb-3">
                                    <input type="text" class="form-control" value={docxname} onChange={(event) => { setDocxname(event.target.value) }} id="exampleFormControlInput1" placeholder="Docx title" />
                                </div>
                                <div class="mb-3">
                                    <textarea class="form-control" value={docxdata} onChange={(event) => { setDocxdata(event.target.value) }} id="exampleFormControlTextarea1" rows="8" placeholder="Write text here..."></textarea>
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" value={docxdesc} onChange={(event) => { setDocxdesc(event.target.value) }} id="exampleFormControlInput1" placeholder="Docx desc" />
                                </div>
                                <div>
                                    <button className="btn btn-success create-docx-btn">Update</button>
                                </div>
                            </form>
                        </div>

                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}
export default Createdocx;