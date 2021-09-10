import React,{useState} from 'react';
import {useRouter} from 'next/router'
import firebase from '../../../config/firebase';
import { toast } from 'react-toastify';

const Auth_SignIn = (props) => {

    const [credential,setCredential] = useState({email:"test@gmail.com",password:"test@123"})
    const router = useRouter();

    const handleChange = (e) => {
        const {name,value} = e.target
        setCredential({...credential,[name]:value})
    }

    // simple firebase login
    const firebaseLogin = async (email,password) => { 
      try {
          await firebase.auth().signInWithEmailAndPassword(email,password).then(function () {                
              setTimeout(() => {
                  toast.success("Login Success");
                  router.push(`/`);
              }, 200);
              })
      } catch (error) {
              setTimeout(() => {
                  toast.error("error", error);
              }, 200);
      }
    }

    const redirectToSignUpPage = () => {
        router.push("/auth/signUp")
    }


    return (
    <div className="login-page1">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-12 p-0">
            <div className="login-contain-main">
              <div className="left-page">
                <div className="login-content">
                    <div className="login-content-header"><a href="/landing"><img className="image-fluid" src="/assets/images/logo/landing-logo.png" alt="images" /></a></div>
                  <h3>Hello Everyone , We are Chitchat</h3>
                  <h4>Welcome to chitchat please login to your account.</h4>
                  <form className="form1">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="inputEmail3">Email Address</label>
                      <input className="form-control" id="inputEmail3" defaultValue={credential.email} onChange={(e) => handleChange(e)} name="email" type="email" placeholder="Demo@123gmail.com"/>
                    </div>
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="inputPassword3">Password</label><span> </span>
                      <input className="form-control" id="inputPassword3" defaultValue={credential.password} onChange={(e) => handleChange(e)} name="password" type="password" placeholder="*******"/>
                    </div>
                    <div className="form-group">
                      <div className="rememberchk">
                        <div className="input-text form-check pl-0">
                          <input type="checkbox" id="gridCheck1" aria-label="Checkbox for following text input"/>
                          <label className="form-check-label ml-2 mr-auto" htmlFor="gridCheck1">Remember Me.</label>
                          <h6>Forgot Password?</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="buttons">
                            <a className="btn btn-primary button-effect" href="#" onClick={() => firebaseLogin(credential.email,credential.password)}>Login</a>
                            <a className="btn button-effect btn-signup" href="#" onClick={() => redirectToSignUpPage()}>SignUp</a>
                        </div>
                    </div>
                  </form>
                  <div className="line">
                    <h6>OR Connect with</h6>
                  </div>
                  <div className="medialogo">
                    <ul>
                      <li><a className="icon-btn btn-danger button-effect" href="https://www.google.com/"><i className="fa fa-google"></i></a></li>
                      <li><a className="icon-btn btn-primary button-effect" href="https://twitter.com/"><i className="fa fa-twitter"></i></a></li>
                      <li><a className="icon-btn btn-facebook button-effect" href="https://www.facebook.com/"><i className="fa fa-facebook-f"></i></a></li>
                    </ul>
                  </div>
                  <div className="termscondition">
                    <h4 className="mb-0"><span>*</span>Terms and condition<b>&amp;</b>Privacy policy</h4>
                  </div>
                </div>
              </div>
              <div className="right-page">
                <div className="right-login animat-rate">
                  <div className="animation-block">
                    <div className="bg_circle">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="cross"></div>
                    <div className="cross1"></div>
                    <div className="cross2"></div>
                    <div className="dot"></div>
                    <div className="dot1"></div>
                    <div className="maincircle"></div>
                    <div className="top-circle"></div>
                    <div className="center-circle"></div>
                    <div className="bottom-circle"></div>
                    <div className="bottom-circle1"></div>
                    <div className="right-circle"></div>
                    <div className="right-circle1"></div>
                    <img className="heart-logo" src="/assets/images/login_signup/5.png" alt="login logo"/>
                    <img className="has-logo" src="/assets/images/login_signup/4.png" alt="login logo"/>
                    <img className="login-img" src="/assets/images/login_signup/1.png" alt="login logo"/>
                    <img className="boy-logo" src="/assets/images/login_signup/6.png" alt="login boy logo"/>
                    <img className="girl-logo" src="/assets/images/login_signup/7.png" alt="girllogo"/>
                    <img className="cloud-logo" src="/assets/images/login_signup/2.png" alt="login logo"/>
                    <img className="cloud-logo1" src="/assets/images/login_signup/2.png" alt="login logo"/>
                    <img className="cloud-logo2" src="/assets/images/login_signup/2.png" alt="login logo"/>
                    <img className="cloud-logo3" src="/assets/images/login_signup/2.png" alt="login logo"/>
                    <img className="cloud-logo4" src="/assets/images/login_signup/2.png" alt="login logo"/>
                    <img className="has-logo1" src="/assets/images/login_signup/4.png" alt="login logo"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Auth_SignIn;