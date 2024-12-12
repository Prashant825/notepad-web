
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
function Document(props) {
    // const [userdata, setUserdata] = useState([]);
    const [userdata, setData] = useState([]);
    const [reload, reloadData] = useState(false);
    //const [searchvalue, searchValue] = useState('');

    useEffect(() => {
        const fatchalldocx = async () => {
            const token_id = localStorage.getItem('token_id');
            if (token_id) {
                var id = token_id;
            }
            try {
                const response = await axios.post('http://localhost/app/fatchalldocx.php', {
                    id
                });
                if (response) {
                    const data = response.data;
                    console.log(data);
                    setData(data);

                }
            } catch (error) {
                console.log(error.data);
            }
        }
        fatchalldocx();
    }, [reload]);

    const deletedocx = async (docxid) => {
        if (docxid) {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete document",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('http://localhost/App/deleteuser.php', {
                        docxid
                    });
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your document has been deleted.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                    }).then(() => {
                            reloadData(!reload);
                    });
                }
            });
        }
    }

    const filterData = userdata.filter(item => item.docxname.toLowerCase().includes(props.searchkey.toLowerCase())
    );
    const downloadPDF = (docx) => {
        const doc = new jsPDF();

        // Define the margins (in points)
        const leftMargin = 20;  // 20 points from the left edge
        const rightMargin = 20;  // 20 points from the right edge
        const topMargin = 10;  // 20 points from the top edge
        const bottomMargin = 20; // 20 points from the bottom edge

        // Get the page width and height
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Calculate the available width between the left and right margins
        const contentWidth = pageWidth - leftMargin - rightMargin;

        // Starting position for the content
        let yPosition = topMargin + 20;  // Start 20 points below the top margin for header space

        // Add some text with left and right margins
        const text = docx.docxdata;

        // Function to add the header
        let headerAdded = false;
        const addHeader = () => {
            doc.text(docx.docxname, pageWidth / 2, topMargin + 5, { align: "center" });
        };

        // Function to add the footer
        const addFooter = (currentPage) => {
            const pageNumberText = `Page ${currentPage}`;
            doc.text(pageNumberText, pageWidth / 2, pageHeight - bottomMargin + 10, { align: "center" });
        };

        // Set font size for content
        doc.setFontSize(12);  // Set font size for content
        doc.setFont("helvetica", "normal");
        // Split the text into lines that fit within the content width
        const lines = doc.splitTextToSize(text, contentWidth); // Wrap text according to available width

        // Loop through the lines and add them to the PDF
        let currentPage = 1;
        lines.forEach((line) => {
            // Add the header to the first page
            if (yPosition === topMargin + 20) {
                if (!headerAdded) {
                    doc.setFontSize(14);  // Set font size for content
                    doc.setFont("helvetica", "bold");
                    addHeader();
                    headerAdded = true;
                }
                doc.setFontSize(12);  // Set font size for footer
                doc.setFont("helvetica", "normal");
                addFooter(currentPage);
                doc.setFont("helvetica", "normal");
            }

            // Add text at the specified position
            doc.text(line, leftMargin, yPosition);  // Start at left margin
            yPosition += 10;  // Move to the next line

            // Check if we need to add a new page
            if (yPosition + 10 > pageHeight - bottomMargin) {
                // If we exceed the page height, add a new page
                doc.addPage();
                currentPage += 1;
                yPosition = topMargin + 20; // Reset Y position for the new page
            }
        });

        // Save the PDF
        doc.save(docx.docxname);
    };

    return (
        <div>
            {/* <p>{userdata}</p> */}
            {/* Docx Section start here.. */}
            
            <section className="docx-sec">
                <div className="container docx-container">
                    <div className="row docx-row">
                    {userdata.length !== 0 ? <div className="col-md-12 docx-col">
                            {filterData.map((docx) => (
                                <div class="card docx-card">
                                    <div class="card-header">
                                        <h5>{docx.docxname}</h5>
                                    </div>
                                    <div class="card-body">

                                        <p class="card-text">{docx.docxdata.length < 40 ? docx.docxdata : docx.docxdata.substring(0, 100) + '...'}</p>
                                    </div>
                                    <div class="card-footer text-muted">
                                        {docx.docxdesc}
                                    </div>
                                    <div class="card-footer text-muted">
                                        <div className="create-docx-action-btn">
                                            <Link to={`/createdocx/?docxid=${docx.id}`} class="btn btn-primary">Edit</Link>
                                            <button onClick={() => deletedocx(docx.id)} class="btn btn-danger">Delete</button>
                                            <FontAwesomeIcon icon={faDownload} size="xl" onClick={() => { downloadPDF(docx) }} />
                                        </div>
                                    </div>
                                </div> 
                            ))}
                        </div>: <div className="dashboard-docx-not-found"> <h3 className="not_found_docx">No documents found!</h3>
                          If you want to create document? <Link to="/createdocx" className="user-option-link">Click here</Link> </div>}
                    </div>
                </div>
            </section>
            {/* Docx Section end here.. */}
        </div>
    )
}
export default Document;