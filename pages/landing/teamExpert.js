import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";

const TeamExpert = () => {
	const [current, setCurrent] = useState({
		nav1: null,
	});

	const slider1 = useRef();

	useState(() => {
		setCurrent({
			nav1: slider1.current,
		});
	}, []);

	const { nav1 } = current;

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2200,
		responsive: [
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1070,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				},
			},
		],
	};

	const next = () => {
		slider1.current.slickNext();
	};
	const previous = () => {
		slider1.current.slickPrev();
	};
	return (
		<div>
			<section className="section-py-space light-bg">
				<div className="landing-title">
					<div>
						<h1>Team</h1>
					</div>
					<div className="sub-title">
						<div>
							<h4>Team</h4>
							<h2>Our Experts</h2>
						</div>
					</div>
				</div>
				<Container className="custom-container testimonial-main">
					<Row>
						<Col sm="12">
							{/* <div className="testimonial-slider owl-carousel owl-theme pt-0"> */}
							<Slider
								asNavFor={nav1}
								ref={(slider) => (slider1.current = slider)}
								{...settings}
							>
								<div className="item">
									<div className="testimonial-box mt-0">
										<div className="test-img">
											<img
												className="img-fluid"
												src="../assets/images/landing/testimonial/1.png"
												alt="test-img"
											/>
											<i className="test-wish fa fa-heart"></i>
										</div>
										<div className="test-contain">
											<h4>project manager</h4>
											<h3>Advanced Equipment</h3>
											<h6>
												Lorem Ipsum is simply dummy text of the printing and
												typesetting industry.
											</h6>
											<ul className="test-icon">
												<li>
													<a href="https://www.google.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon1.png"
															alt="icon-google"
														/>
													</a>
												</li>
												<li>
													<a href="https://twitter.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon2.png"
															alt="icon-google"
														/>
													</a>
												</li>
												<li>
													<a href="https://www.facebook.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon3.png"
															alt="icon-google"
														/>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="item">
									<div className="testimonial-box mt-0">
										<div className="test-img">
											<img
												className="img-fluid"
												src="../assets/images/landing/testimonial/2.png"
												alt="test-img"
											/>
										</div>
										<div className="test-contain">
											<h4>project manager</h4>
											<h3>Advanced Equipment</h3>
											<h6>
												Lorem Ipsum is simply dummy text of the printing and
												typesetting industry.
											</h6>
											<ul className="test-icon">
												<li>
													<a href="https://www.google.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon1.png"
															alt="icon-google"
														/>
													</a>
												</li>
												<li>
													<a href="https://twitter.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon2.png"
															alt="icon-google"
														/>
													</a>
												</li>
												<li>
													<a href="https://www.facebook.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon3.png"
															alt="icon-google"
														/>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="item">
									<div className="testimonial-box mt-0">
										<div className="test-img">
											<img
												className="img-fluid"
												src="../assets/images/landing/testimonial/3.png"
												alt="test-img"
											/>
											<i className="test-wish fa fa-heart"></i>
										</div>
										<div className="test-contain">
											<h4>project manager</h4>
											<h3>Advanced Equipment</h3>
											<h6>
												Lorem Ipsum is simply dummy text of the printing and
												typesetting industry.
											</h6>
											<ul className="test-icon">
												<li>
													<a href="https://www.google.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon1.png"
															alt="icon-google"
														/>
													</a>
												</li>
												<li>
													<a href="https://twitter.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon2.png"
															alt="icon-google"
														/>
													</a>
												</li>
												<li>
													<a href="https://www.facebook.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon3.png"
															alt="icon-google"
														/>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="item">
									<div className="testimonial-box mt-0">
										<div className="test-img">
											<img
												className="img-fluid"
												src="../assets/images/landing/testimonial/4.png"
												alt="test-img"
											/>
											<i className="test-wish fa fa-heart"></i>
										</div>
										<div className="test-contain">
											<h4>project manager</h4>
											<h3>Advanced Equipment</h3>
											<h6>
												Lorem Ipsum is simply dummy text of the printing and
												typesetting industry.
											</h6>
											<ul className="test-icon">
												<li>
													<a href="https://www.google.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon1.png"
															alt="icon-google"
														/>
													</a>
												</li>
												<li>
													<a href="https://twitter.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon2.png"
															alt="icon-google"
														/>
													</a>
												</li>
												<li>
													<a href="https://www.facebook.com/">
														<img
															className="img-fluid"
															src="../assets/images/landing/testimonial/icon3.png"
															alt="icon-google"
														/>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</Slider>
							<div className="owl-nav" style={{ textAlign: "center" }}>
								<button
									type="button"
									className="owl-prev"
									onClick={previous}
								>
									<span ><i className="fa fa-arrow-left"></i></span>
								</button>
								<button
									type="button"
									className="owl-next ml-3"
									onClick={next}
								>
									<span ><i className="fa fa-arrow-right" ></i></span>
								</button>
							</div>
						</Col>
					</Row>
					<div className="testimonial-back-content">
						<img
							className="img-fluid test-img2"
							src="../assets/images/landing/testimonial/6.png"
							alt="testimonial"
						/>
					</div>
				</Container>
			</section>
		</div>
	);
};

export default TeamExpert;
