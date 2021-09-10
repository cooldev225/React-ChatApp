import React, { useRef, useState } from "react";
import CommonLayout from "../common/commonLayout";
import { Row, Col, Container } from "reactstrap";
import Slider from "react-slick";
const About = (props) => {
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

	const settingsTestimonial = {
		infinite: true,
		speed: 200,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
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

	const settingsCounter = {
		infinite: true,
		speed: 200,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 572,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4,
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
		<CommonLayout title="About" parent="home">
			<ul className="page-decore">
				<li className="top">
					<img
						className="img-fluid inner2"
						src="../assets/images/landing/footer/2.png"
						alt="footer-back-img"
					/>
				</li>
				<li className="bottom">
					<img
						className="img-fluid inner2"
						src="../assets/images/landing/footer/2.png"
						alt="footer-back-img"
					/>
				</li>
			</ul>
			<section className="about-page section-py-space">
				<div className="custom-container">
					<Row>
						<Col sm="8" className="offset-sm-2 text-center">
							<img
								className="img-fluid w-100 pb-4"
								src="../assets/images/about/1.jpg"
								alt="about"
							/>
							<Row>
								<Col md="10" className="offset-md-1">
									<p>
										On the other hand, we denounce with righteous indignation
										and dislike men who are so beguiled and demoralized by the
										charms of pleasure of the moment, so blinded by desire, that
										they cannot foresee the pain and trouble that are bound to
										ensue; and equal blame belongs to those who fail in their
										duty through weakness of will, which is the same as saying
										through shrinking from toil and pain. These cases are
										perfectly simple and easy to distinguish.
									</p>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			</section>
			{/* <!-- secure-app start //--> */}
			{/* <!-- testimonial start//--> */}
			<section className="section-py-space">
				<div className="custom-container testimonial-main">
					<Row>
						<Col xs="12">
							<Slider
								asNavFor={nav1}
								ref={(slider) => (slider1.current = slider)}
								{...settingsTestimonial}
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
									<span ><i className="fa fa-arrow-right"></i></span>
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
				</div>
			</section>
			{/* <!-- testimonial end //--> */}
			{/* <!--app section start //--> */}
			<section className="section-pb-space secure-app-main">
				<div className="custom-container">
					<Row>
						<Col xl="5" lg="5" className="offset-xl-7 offset-lg-7">
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
				</div>
			</section>
			{/* <!--app section end //--> */}
			{/* <!-- counter section  start//--> */}
			<section className="counter-sec section-py-space counter-main">
				<Container>
					<div className="counter-title">
						<h4 className="title-line">Counters</h4>
					</div>
					<Row>
						<Col xs="12">
							<div className="counter-slider">
								<Slider {...settingsCounter}>
									<div className="item">
										<div className="counter-box-second">
											<div className="counter-box">
												<div>
													<i className="counter-icon fa fa-user-o"></i>
													<h6 className="counter-no count">80</h6>
													<span>Happy Clients</span>
												</div>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="counter-box-second">
											<div className="counter-box">
												<div>
													<i className="counter-icon fa fa-square-o"></i>
													<h6 className="counter-no count">120</h6>
													<span>Project Completed</span>
												</div>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="counter-box-second">
											<div className="counter-box">
												<div>
													<i className="counter-icon fa fa-heart-o"></i>
													<h6 className="counter-no count">90</h6>
													<span>Photo Capture</span>
												</div>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="counter-box-second">
											<div className="counter-box">
												<div>
													<i className="counter-icon fa fa-comments-o"></i>
													<h6 className="counter-no count">140</h6>
													<span>Telephonic Talk </span>
												</div>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="counter-box-second">
											<div className="counter-box">
												<div>
													<i className="counter-icon fa fa-square-o"></i>
													<h6 className="counter-no count">120</h6>
													<span>Project Completed</span>
												</div>
											</div>
										</div>
									</div>
								</Slider>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			{/* <!-- counter section  end//--> */}
		</CommonLayout>
	);
};

export default About;
