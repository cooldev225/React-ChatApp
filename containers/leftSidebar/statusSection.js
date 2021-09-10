import { X } from "react-feather"
const StatusSection = (props) => {
    const closeLeftSide = () => {
      document.querySelector(".status-tab").classList.remove("active")
      document.querySelector(".recent-default").classList.add("active");
      props.ActiveTab("")
    }
    return (
        <div className={`status-tab custom-scroll dynemic-sidebar ${props.tab === "status" ? "active" : ""}`} id="status">
            <div className="my-status-box">
              <div className="status-content">
                <div className="media">
                  <div className="img-status">
                    <div className="user-status  bg-size" style={{ backgroundImage: `url('../assets/images/avtar/girls.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}></div>
                    <div className="upload-img">
                      <input type="file"/>
                    </div>
                  </div>
                  <div className="media-body">
                    <h3>my status</h3>
                    <p>tap to add status Update</p>
                  </div>
                  <div><a className="icon-btn btn-outline-light btn-sm close-panel" href="#" onClick={() => closeLeftSide()}><X/></a></div>
                </div>
              </div>
            </div>
            <div className="contact-status-box">
              <div className="theme-title">
                <h3>Recent Update</h3>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-1.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-1.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox">
                      <img src="/assets/images/status-img/large/lg-1.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Josephin water</h5>
                    <p>today , 8:30am</p>
                  </li>
                </ul>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox2" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-2.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-2.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox2">
                      <img src="/assets/images/status-img/large/lg-2.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Jony Lynetin</h5>
                    <p>today , 10:30am</p>
                  </li>
                </ul>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox3" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-3.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-3.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox3">
                      <img src="/assets/images/status-img/large/lg-3.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Sufiya Elija</h5>
                    <p>today , 11:00am</p>
                  </li>
                </ul>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox4" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-4.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-4.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox4">
                      <img src="/assets/images/status-img/large/lg-4.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Mukrani Pabelo </h5>
                    <p>today , 9:55am</p>
                  </li>
                </ul>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox5" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-5.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-5.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox5">
                      <img src="/assets/images/status-img/large/lg-5.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Pabelo Mukrani</h5>
                    <p>today , 12:05am</p>
                  </li>
                </ul>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox6" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-3.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-3.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox6">
                      <img src="/assets/images/status-img/large/lg-3.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Sufiya Elija</h5>
                    <p>today , 11:00am</p>
                  </li>
                </ul>
              </div>
            </div>
        </div>
    );
}

export default StatusSection;