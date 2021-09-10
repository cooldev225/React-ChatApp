import React from "react";
import { Col, Container, Row } from "reactstrap";

const Subscribe = () => {
	return (
		<div>
			<section className="section-py-space subscribe-main light-bg" id="subscribe">
				<Container fluid={true}>
					<Row>
						<Col sm="12">
							<div className="landing-title">
								<div>
									<h1>subscribe</h1>
								</div>
								<div className="sub-title">
									<div>
										<h4>Subscribe Newsletter</h4>
										<h2>Subscribe to receive updates</h2>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
				<Container className="custom-container">
					<Row className="subscribe-block">
						<Col md="6">
							<div className="subscribe-content">
								<img
									className="img-fluid"
									src="/assets/images/landing/subscribe/1.png"
									alt="subscribe-landing"
								/>
							</div>
						</Col>
						<Col md="6">
							<div className="subscribe-content">
								<div>
									<h1>Subscribe our Newsletter get new update.</h1>
									<form className="form-inline">
										<input className="form-control" placeholder="your name" />
										<input className="form-control" placeholder="email" />
										<button className="btn">Submit</button>
									</form>
									<h4>
										Check Features.<a href="/messenger">&nbsp; Learn More</a>
									</h4>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
				<div className="subscribe-back-content">
					<img
						className="img-fluid subscribe-img1"
						src="/assets/images/landing/subscribe/2.png"
						alt="subscribe-back-img"
					/>
				</div>
			</section>
		</div>
	);
};

export default Subscribe;
