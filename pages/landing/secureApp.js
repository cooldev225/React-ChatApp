import React from "react";
import { Col, Container, Row } from "reactstrap";

const SecureApp = () => {
	return (
		<div>
			<section className="section-pb-space secure-app-main">
				<Container className="custom-container">
					<Row>
						<Col className="col-lg-5 offset-lg-7 col-lg-5 offset-lg-2">
							<div className="secure-app-content">
								<div>
									<div className="ply-main">
										<div className="ply-content">
											<i className="ti-shield"></i>
										</div>
										<h3>
											Secure Your <span>Messages</span>
										</h3>
									</div>
									<h1>The world's top secure App</h1>
									<h4>
										<span>Desktop App </span>– Easy to use our chat app,
										Attractive and clean design, with many Features :- Dark &
										light, Recent Chat And many more.......
									</h4>
									<a className="btn pricing-btn" href="/messenger">
										learn more
									</a>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
				<div className="secure-back-content">
					<img
						className="img-fluid secure-img1"
						src="../assets/images/landing/parallax/1.png"
						alt="parellex-img1"
					/>
					<img
						className="img-fluid secure-img2"
						src="../assets/images/landing/parallax/1.png"
						alt="parellex-img1"
					/>
				</div>
			</section>
		</div>
	);
};

export default SecureApp;
