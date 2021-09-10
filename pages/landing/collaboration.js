import React from "react";
import { Col, Container, Row } from "reactstrap";

const Collaboration = () => {
	const activeClass = (e) => {
		document
			.querySelectorAll(".collaboration-content ul li a")
			.forEach((item) => {
				item.classList.remove("active");
			});
		e.currentTarget.classList.add("active");
	};

	return (
		<div>
			<section className="collaboration-main section-py-space">
				<Container fluid={true}>
					<Row>
						<Col sm="12">
							<div className="landing-title">
								<div>
									<h1>finger tips</h1>
								</div>
								<div className="sub-title">
									<div>
										<h4>Exclusive Features</h4>
										<h2>Put collaboration at your fingertips</h2>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
				<Container className="custom-container">
					<Row>
						<Col sm="12">
							<div className="collaboration-content">
								<ul className="collab-tab nav nav-pills">
									<li className="nav-item">
										<a
											className={`nav-link active`}
											onClick={(e) => activeClass(e)}
											data-toggle="pill"
											href="#tab1"
										>
											<div className="tab-main">
												<div className="tab-img">
													<i className="ti-thought"></i>
												</div>
												<div className="tab-content">
													<h3>organize</h3>
													<p>conversation</p>
												</div>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className={`nav-link`}
											onClick={(e) => activeClass(e)}
											data-toggle="pill"
											href="#tab2"
										>
											<div className="tab-main">
												<div className="tab-img">
													<i className="ti-zip"></i>
												</div>
												<div className="tab-content">
													<h3>Shared</h3>
													<p>file and etc</p>
												</div>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											data-toggle="pill"
											href="#tab3"
											onClick={(e) => activeClass(e)}
										>
											<div className="tab-main">
												<div className="tab-img">
													<i className="ti-search"></i>
												</div>
												<div className="tab-content">
													<h3>Search</h3>
													<p>everything</p>
												</div>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											data-toggle="pill"
											href="#tab4"
											onClick={(e) => activeClass(e)}
										>
											<div className="tab-main">
												<div className="tab-img">
													<i className="ti-video-camera"></i>
												</div>
												<div className="tab-content">
													<h3>talk in</h3>
													<p>video call</p>
												</div>
											</div>
										</a>
									</li>
								</ul>
							</div>
							<div className="tab-detail">
								<div className="tab-content">
									<a className="tab-pane container active" id="tab1" href="/messenger">
										<img
											className="img-fluid"
											src="/assets/images/landing/finger-tips/main.jpg"
											alt="tab-detail-img"
										/>
									</a>
									<div className="tab-pane container fade" id="tab2">
										<img
											className="img-fluid"
											src="/assets/images/landing/finger-tips/main.jpg"
											alt="tab-detail-img"
										/>
									</div>
									<div className="tab-pane container fade" id="tab3">
										<img
											className="img-fluid"
											src="/assets/images/landing/finger-tips/main.jpg"
											alt="tab-detail-img"
										/>
									</div>
									<div className="tab-pane container fade" id="tab4">
										<img
											className="img-fluid"
											src="/assets/images/landing/finger-tips/main.jpg"
											alt="tab-detail-img"
										/>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
};

export default Collaboration;
