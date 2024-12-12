import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import bannerdocximage from '../assets/image/bannerdocimage.png';


function Home() {
    const tokenid = localStorage.getItem('token_id');
  if(tokenid){
    var createdocxurl  = '/createdocx';
    var dashboardurl = '/dashboard';
  }else{
    var createdocxurl  = '/login';
    var dashboardurl  = '/login';
  }
  return (
    <div>
      <Header />

      {/* Home banner section start here.. */}
      <section className="home-banner-sec all-sec-css">
        <div className="container home-banner-container">
          <div className="row home-banner-row">
            <div className="col-md-12">
              <div className="home-banner-content">
                <div className="banner-heading">
                  <h1>Anyone Create And Keep Own Document Here..</h1>
                  <p>It is the most safe place to keep your document.</p>
                  <div className="banner-btn">
                  <Link to={createdocxurl} className="btn btn-primary show-docx-btn">Create Docx</Link>
                  <Link to={dashboardurl} className="btn btn-warning show-docx-btn">See Docx</Link>
                  </div>
                </div>
                <div className="home-banner-img">
                  <img src={bannerdocximage} alt='docx-img' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Home banner section start here.. */}

      <Footer />
    </div>
  )

}
export default Home;