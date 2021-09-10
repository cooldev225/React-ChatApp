import {X} from "react-feather"
const NotificationSection = (props) => {
    const closeLeftSide = () => {
      document.querySelector(".notification-tab").classList.remove("active")
      document.querySelector(".recent-default").classList.add("active");
      props.ActiveTab("")
    }
    return (
        <div className={`notification-tab dynemic-sidebar custom-scroll ${props.tab === "notification" ? "active" : ""}`} id="notification">
            <div className="theme-title">
              <div className="media">
                <div> 
                  <h2>Notification</h2>
                  <h4>List of notification</h4>
                </div>
                <div className="media-body text-right">   <a className="icon-btn btn-outline-light btn-sm close-panel" href="#" onClick={() => closeLeftSide()}><X/></a></div>
              </div>
            </div>
            <ul className="chat-main">
              <li>
                <div className="chat-box notification">
                  <div className="profile offline" style={{ backgroundImage: `url('assets/images/contact/1.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}><img className="bg-img" src="/assets/images/contact/1.jpg" alt="Avatar" style={{display:'none'}}/></div>
                  <div className="details"><span>Josephin water</span>
                    <h5>Upload New Photos</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                  <div className="date-status">
                    <h6>Now</h6>
                  </div>
                </div>
              </li>
              <li>
                <div className="chat-box notification">
                  <div className="profile bg-success offline"><span>J</span></div>
                  <div className="details"><span>Jony Today Birthday</span>
                    <h5>Upload New Photos</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                  <div className="date-status">
                    <h6>1 hour ago</h6>
                  </div>
                </div>
              </li>
              <li>
                <div className="chat-box notification">
                  <div className="profile offline" style={{ backgroundImage: `url('assets/images/contact/2.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}><img className="bg-img" src="/assets/images/contact/2.jpg" alt="Avatar" style={{display:'none'}}/></div>
                  <div className="details"><span>Sufiya Elija</span>
                    <h5>Comment On your Photo</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                  <div className="date-status">
                    <h6>5 hour ago</h6>
                  </div>
                </div>
              </li>
              <li>
                <div className="chat-box notification">
                  <div className="profile unreachable" style={{ backgroundImage: `url('assets/images/contact/3.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}><img className="bg-img" src="/assets/images/contact/3.jpg" alt="Avatar" style={{display:'none'}}/></div>
                  <div className="details"><span>Pabelo Mukrani</span>
                    <h5>Invite Your New Friend</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                  <div className="date-status">
                    <h6>6 hour ago</h6>
                  </div>
                </div>
              </li>
              <li>
                <div className="chat-box notification">
                  <div className="profile bg-success offline"><span>PM</span></div>
                  <div className="details"><span>Pabelo Mukrani</span>
                    <h5>Update Profile Picture</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                  <div className="date-status">
                    <h6>6 hour ago</h6>
                  </div>
                </div>
              </li>
            </ul>
        </div>
    );
}

export default NotificationSection;