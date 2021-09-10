import React from "react";

const Auth_SignUpClassic = () => {
	return (
		<div className="login-page2 animat-rate">
			<div className="login-content-main">
				<div className="login-content2">
					<div className="theme-tab">
						<ul className="nav nav-tabs" id="myTab" role="tablist">
							<li className="nav-item">
								<a
									className="nav-link active"
									id="login-tab"
									data-toggle="tab"
									href="/auth/signInClassic"
									role="tab"
									aria-selected="false"
								>
									login
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link"
									id="signup-tab"
									data-toggle="tab"
									href="/auth/signUpClassic"
									role="tab"
									aria-selected="true"
								>
									Signup
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="login-content">
				<div className="login-content-header"><a href="/landing"><img className="image-fluid" src="/assets/images/logo/landing-logo.png" alt="images" /></a></div>
					<h3>Hello Everyone , We are Chitchat</h3>
					<h4>Welcome to chitchat please signup to your account.</h4>
					<form className="form2">
						<div className="form-group">
							<label className="col-form-label" htmlFor="inputname">
								Username
							</label>
							<input
								className="form-control"
								id="inputname"
								type="text"
								placeholder="Demo123"
							/>
						</div>
						<div className="form-group">
							<label className="col-form-label" htmlFor="inputEmail3">
								Email Address
							</label>
							<input
								className="form-control"
								id="inputEmail3"
								type="email"
								placeholder="Demo@123gmail.com"
							/>
						</div>
						<div className="form-group">
							<label className="col-form-label" htmlFor="inputPassword3">
								Password
							</label>
							<span> </span>
							<input
								className="form-control"
								id="inputPassword3"
								type="password"
								placeholder="Password"
							/>
						</div>
						<ul className="medialogo">
							<li>
								<a
									className="icon-btn btn-facebook button-effect rouded15"
									href="https://www.facebook.com/"
								>
									<i className="fa fa-facebook-f"></i>
								</a>
							</li>
							<li>
								<a
									className="icon-btn btn-danger button-effect rouded15"
									href="https://www.google.com/"
								>
									<i className="fa fa-google"></i>
								</a>
							</li>
							<li>
								<a
									className="icon-btn btn-primary button-effect rouded15"
									href="https://twitter.com/"
								>
									{" "}
									<i className="fa fa-twitter"></i>
								</a>
							</li>
						</ul>
						<div className="form-group mb-0">
							<div className="buttons">
								<a className="btn button-effect btn-primary signpbtn" href="#">
									Signup
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="animat-block">
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
				<div className="top-circle"></div>
				<div className="center-circle"></div>
				<div className="bottom-circle1"></div>
				<div className="right-circle"></div>
				<div className="right-circle1"></div>
				<div className="quarterCircle"></div>
				<img
					className="cloud-logo"
					src="../assets/images/login_signup/2.png"
					alt="login logo"
				/>
				<img
					className="cloud-logo1"
					src="../assets/images/login_signup/2.png"
					alt="login logo"
				/>
				<img
					className="cloud-logo2"
					src="../assets/images/login_signup/2.png"
					alt="login logo"
				/>
				<img
					className="cloud-logo3"
					src="../assets/images/login_signup/2.png"
					alt="login logo"
				/>
				<img
					className="cloud-logo4"
					src="../assets/images/login_signup/2.png"
					alt="login logo"
				/>
				<img
					className="cloud-logo5"
					src="../assets/images/login_signup/2.png"
					alt="login logo"
				/>
			</div>
		</div>
	);
};

export default Auth_SignUpClassic;
