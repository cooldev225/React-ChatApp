import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import TeamWorkModal from "./teamWorkModal";

const Slider = () => {
	const [VideoModal, setVideoModal] = useState(false);

    const toggle = () => setVideoModal(!VideoModal);
	return (
		<div>
			<section className="slider-block">
				<Container className="custom-container">
					<Row>
						<Col className="col-12">
							<div className="slider-main">
								<div className="slider-contain">
									<h1>Easy To Use Our Chat App</h1>
									<h4>
										<span>Desktop App </span>– Easy to use our chat app,
										Attractive and
										<br /> clean design, with many Features Dark & light, Recent
										Chat And many more.......
									</h4>
									<div className="downlaod">
										<div className="footer-btn">
											<a className="btn active" href="/messenger">
												Start for free
											</a>
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
				<img
					className="img-fluid chat-slide"
					src="../assets/images/landing/2.png"
					alt="inner"
				/>
				<img
					className="img-fluid inner1"
					src="../assets/images/landing/header/1.png"
					alt="inner1"
				/>
			</section>
		</div>
	);
};

export default Slider;
