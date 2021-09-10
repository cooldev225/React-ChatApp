import React, { useContext } from "react"
import ChatContext from "../../helpers/chatContext";

const Contact = () => {
	const { handleClickRight, mainMenu } = useContext(ChatContext);

    return (
        <div className="contact-content tabto">
          <div className="contact-sub-content"><a className="icon-btn btn-outline-primary button-effect mobile-back mb-3" href="#" onClick={() => handleClickRight(mainMenu)}><i className="ti-angle-left"></i></a>
            <div className="row">
              <div className="col-sm-5">
                <div className="user-profile">
                  <div className="user-content"><img className="img-fluid bg-icon" src="/assets/images/contact/2.jpg" alt="user-img"/>
                    <h3>Josephin water</h3>
                    <ul> 
                      <li><i className="fa fa-twitch"> </i>massage</li>
                      <li><i className="fa fa-phone"> </i>voice call</li>
                      <li> <i className="fa fa-video-camera"> </i>video call</li>
                    </ul>
                  </div>
                </div>
                <div className="personal-info-group">
                  <div className="social-info-group">
                    <ul className="integratin mt-0">
                      <li>
                        <div className="media">
                          <div className="media-left"><a className="fb" href="https://www.facebook.com/login" target="_blank">
                              <i className="fa fa-facebook mr-1"></i>
                              <h5> Facebook   </h5></a></div>
                          <div className="media-right">
                            <div className="profile bg-size" style={{ backgroundImage: `url('assets/images/contact/1.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="media">
                          <div className="media-left"><a className="twi" href="https://twitter.com/login" target="_blank">
                            <i className="fa fa-twitter mr-1"></i>
                              <h5> twitter   </h5></a></div>
                          <div className="media-right">
                            <div className="profile bg-size" style={{ backgroundImage: `url('assets/images/contact/3.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="media">
                          <div className="media-left"><a className="ggl" href="https://accounts.google.com/signin/v2/identifier?service=mail&amp;passive=true&amp;rm=false&amp;continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&amp;ss=1&amp;scc=1&amp;ltmpl=default&amp;ltmplcache=2&amp;emr=1&amp;osid=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin" target="_blank">
                            <i className="fa fa-google mr-1"></i>
                              <h5>google   </h5></a></div>
                          <div className="media-right">
                            <div className="profile bg-size" style={{ backgroundImage: `url('assets/images/contact/2.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-7">
                <div className="personal-info-group"> 
                  <h3>contact info                    </h3>
                  <ul className="basic-info">
                    <li>
                      <h5>name</h5>
                      <h5 className="details">Nick</h5>
                    </li>
                    <li>
                      <h5>gender</h5>
                      <h5 className="details">male</h5>
                    </li>
                    <li>
                      <h5>Birthday</h5>
                      <h5 className="details">9 april 1994</h5>
                    </li>
                    <li>
                      <h5>Favorite Book</h5>
                      <h5 className="details">Perfect Chemistry</h5>
                    </li>
                    <li>
                      <h5>Personality</h5>
                      <h5 className="details">Cool</h5>
                    </li>
                    <li>
                      <h5>City</h5>
                      <h5 className="details">Moline Acres</h5>
                    </li>
                    <li>
                      <h5>mobile no</h5>
                      <h5 className="details">+0 1800 76855</h5>
                    </li>
                    <li>
                      <h5>email</h5>
                      <h5 className="details">pixelstrap@test.com</h5>
                    </li>
                    <li>
                      <h5>Website</h5>
                      <h5 className="details">www.test.com</h5>
                    </li>
                    <li>
                      <h5 className="m-0">Interest</h5>
                      <h5 className="details">Photography</h5>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Contact;