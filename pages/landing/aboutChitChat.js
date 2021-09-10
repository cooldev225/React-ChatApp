import React from "react";
import { Col, Container, Row } from "reactstrap";

const AboutChitChat = () => {
	return (
		<div>
			<section className="section-py-space chitchat-main light-bg">
				<Container fluid={true}>
					<div className="landing-title">
						<div>
							<h1>why choose</h1>
						</div>
						<div className="sub-title">
							<div>
								<h4>Why Choose Chitchat</h4>
								<h2>Chitchat is fully responsive excellent choice</h2>
							</div>
						</div>
					</div>
				</Container>
				<Container className="custom-container">
					<Row className="chit-chat-block">
						<Col md="6">
							<div className="chitchat-contain">
								<img
									className="img-fluid chitchat-img"
									src="../assets/images/landing/chitchat/4.png"
									alt="chit-chat"
								/>
							</div>
						</Col>
						<Col md="6">
							<div className="chitchat-contain">
								<div>
									<div className="chitchat-logo">
										<img
											className="img-fluid"
											src="../assets/images/logo/landing-logo.png"
											alt="landing-logo"
										/>
									</div>
									<h3>
										Easy to use <span>Our Application</span>
									</h3>
									<h1>All-in-one responsive app for you</h1>
									<h4>
										It is about us being able to offer help with the branding
										campaign, product presentation, and advertisement running
										across social media.
									</h4>
									<ul className="detial-price">
										<li>
											<i className="fa fa-check"></i>Customer First
											Content-focused Displaying Effects
										</li>
										<li>
											<i className="fa fa-check"> </i>High Definition
											Full-screen Sliders & Backgrounds
										</li>
										<li>
											<i className="fa fa-check"> </i>Try for free, Forever!
										</li>
									</ul>
									<a className="btn pricing-btn" href="/messenger">
										view more
									</a>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
				<div className="chitchat-back-block">
					<img
						className="img-fluid chit-chat1"
						src="../assets/images/landing/chitchat/2.png"
						alt="chit-chat-back-img"
					/>
					<img
						className="img-fluid chit-chat2"
						src="../assets/images/landing/chitchat/1.png"
						alt="chit-chat-back-img"
					/>
					<img
						className="img-fluid chit-chat3"
						src="../assets/images/landing/chitchat/3.png"
						alt="chit-chat-back-img"
					/>
				</div>
			</section>
		</div>
	);
};

export default AboutChitChat;
