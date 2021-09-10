import React, { useState } from "react";
import CommonLayout from "../common/commonLayout";
import {
	Container,
	Row,
	Col,
	Modal,
	ModalBody,
	ModalFooter,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from "reactstrap";
import {
	CameraOff,
	Circle,
	MicOff,
	Pause,
	Phone,
	Star,
	UserPlus,
	Users,
	Video,
	VideoOff,
	Volume2,
} from "react-feather";
const Elements = (props) => {
	const [shareDoc, setShareDoc] = useState(false);
	const [shareMedia, setShareMedia] = useState(false);
	const [audioCall, setAudioCall] = useState(false);
	const [recieveAudioCall, setRecieveAudioCall] = useState(false);
	const [conferenceCall, setConferenceCall] = useState(false);
	const [onePersonCall, setOnePersonCall] = useState(false);
	const [activeTab, setActiveTab] = useState();

	const [noInernet, setNoInernet] = useState(false);
	const [videoCall, setVideoCall] = useState(false);
	const [videoCallHangCall, setVideoCallHangCall] = useState(false);
	const [videoConferenceCall, setVideoConferenceCall] = useState(false);

	const shareDocToggle = () => setShareDoc(!shareDoc);
	const shareMediaToggle = () => setShareMedia(!shareMedia);

	const audioCallToggle = () => setAudioCall(!audioCall);
	const recieveAudioCallToggle = () => setRecieveAudioCall(!recieveAudioCall);
	const conferenceCallToggle = () => setConferenceCall(!conferenceCall);
	const onePersonCallToggle = () => setOnePersonCall(!onePersonCall);

	const noInernetToggle = () => setNoInernet(!noInernet);
	const videoCallToggle = () => setVideoCall(!videoCall);
	const videoCallHangCallToggle = () =>
		setVideoCallHangCall(!videoCallHangCall);
	const videoConferenceCallToggle = () =>
		setVideoConferenceCall(!videoConferenceCall);

	return (
		<CommonLayout title="Elements" parent="home">
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
			<Container>
				<div className="section-py-space">

					<section className="header-typography">
						<Row>
							<Col xs="12">
								<div className="element-card mt-0">
									<div className="element-card-header heading">
										<h2>H1 to H6 Headings</h2>
									</div>
									<div className="element-card-body typography">
										<h1>This is heading</h1>
										<h2>This is heading</h2>
										<h3>This is heading</h3>
										<h4>This is heading</h4>
										<h5>This is heading</h5>
										<h6>This is heading</h6>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section className="element-span-prag">
						<Row>
							<Col xs="12">
								<div className="element-card">
									<div className="element-card-header heading">
										<h2>Span and Paragraph</h2>
									</div>
									<div className="element-card-body typography">
										<span className="small_prag">This is span</span>
										<p>
											Lorem Ipsum is simply dummy text printing and typesetting
											industry.
									</p>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section>
						<Row>
							<Col xs="12">
								<div className="element-card element-images">
									<div className="element-card-header heading">
										<h2>Images</h2>
									</div>
									<div className="element-card-body typography">
										<img
											className="img-10 img-fluid"
											src="../assets/images/avtar/1.jpg"
											alt="Avatar"
										/>
										<img
											className="img-20 img-fluid"
											src="../assets/images/avtar/1.jpg"
											alt="Avatar"
										/>
										<img
											className="img-30 img-fluid"
											src="../assets/images/avtar/1.jpg"
											alt="Avatar"
										/>
										<img
											className="img-40 img-fluid"
											src="../assets/images/avtar/1.jpg"
											alt="Avatar"
										/>
										<img
											className="img-50 img-fluid"
											src="../assets/images/avtar/1.jpg"
											alt="Avatar"
										/>
										<img
											className="img-60 img-fluid"
											src="../assets/images/avtar/1.jpg"
											alt="Avatar"
										/>
										<img
											className="img-70 img-fluid"
											src="../assets/images/avtar/1.jpg"
											alt="Avatar"
										/>
										<img
											className="img-80 img-fluid"
											src="../assets/images/avtar/1.jpg"
											alt="Avatar"
										/>
										<img
											className="img-90 img-fluid"
											src="../assets/images/avtar/1.jpg"
											alt="Avatar"
										/>
										<img
											className="img-100 img-fluid"
											src="../assets/images/avtar/1.jpg"
											alt="Avatar"
										/>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section className="element-span-prag">
						<Row>
							<Col xs="12">
								<div className="element-card element-font">
									<div className="element-card-header heading">
										<h2>Fonts</h2>
									</div>
									<div className="element-card-body typography">
										<div className="font-primary fonts">font-primary</div>
										<div className="font-success fonts">font-success</div>
										<div className="font-danger fonts">font-danger</div>
										<div className="font-light fonts">font-light</div>
										<div className="font-warning fonts">font-warning </div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section>
						<Row>
							<Col md="6" sm="12">
								<div className="element-card element-font">
									<div className="element-card-header heading">
										<h2>Fonts</h2>
									</div>
									<div className="element-card-body typography">
										<div className="badge badge-primary fonts font_label">
											{" "}
										label-primary
									</div>
										<div className="badge badge-success fonts font_label">
											label-success
									</div>
										<div className="badge badge-danger fonts font_label">
											label-danger
									</div>
										<div className="badge badge-light fonts font_label">
											label-light
									</div>
										<div className="badge badge-warning fonts font_label">
											label-warning
									</div>
									</div>
								</div>
							</Col>
							<Col md="6" sm="12">
								<div className="element-card element-font">
									<div className="element-card-header heading">
										<h2>Fonts</h2>
									</div>
									<div className="element-card-body typography">
										<div className="badge badge-outline-primary fonts font_label">
											{" "}
										label-primary
									</div>
										<div className="badge badge-outline-success fonts font_label">
											label-success
									</div>
										<div className="badge badge-outline-danger fonts font_label">
											label-danger
									</div>
										<div className="badge badge-outline-light fonts font_label">
											label-light
									</div>
										<div className="badge badge-outline-warning fonts font_label">
											label-warning
									</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section>
						<Row>
							<Col xs="12">
								<div className="element-card element-badge">
									<div className="element-card-header heading">
										<h2>Badge</h2>
									</div>
									<div className="element-card-body typography">
										<a
											className="badge badge-outline-primary font_label"
											href="#"
										>
											{" "}
										label-primary
									</a>
										<a className="badge badge-success font_label" href="#">
											{" "}
										label-success
									</a>
									</div>
								</div>
							</Col>
						</Row>
						<Row>
							<Col md="6" sm="12">
								<div className="element-card element-badge">
									<div className="element-card-header heading">
										<h2>Badge</h2>
									</div>
									<div className="element-card-body typography">
										<div className="badge badge-outline-primary xl font_label">
											{" "}
										label-primary
									</div>
										<div className="badge badge-success xl font_label">
											label-success
									</div>
									</div>
								</div>
							</Col>
							<Col md="6" sm="12">
								<div className="element-card element-badge">
									<div className="element-card-header heading">
										<h2>Badge</h2>
									</div>
									<div className="element-card-body typography">
										<div className="badge badge-outline-primary xl rounded font_label">
											{" "}
										label-primary
									</div>
										<div className="badge badge-success xl rounded font_label">
											label-success
									</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section>
						<Row>
							<Col xs="12">
								<div className="element-card element-badge">
									<div className="element-card-header heading">
										<h2>Badge</h2>
									</div>
									<div className="element-card-body typography">
										<div className="badge badge-outline-primary xl font_label">
											<i className="ti-settings"></i>label-primary
									</div>
										<div className="badge badge-outline-success xl font_label">
											<Star />
										label-success
									</div>
										<div className="badge badge-primary xl font_label">
											<i className="ti-settings"></i>label-primary
									</div>
										<div className="badge badge-success xl font_label">
											<Star />
										label-success{" "}
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section>
						<Row>
							<Col md="6" sm="12">
								<div className="element-card element-badge">
									<div className="element-card-header heading">
										<h2>Badge</h2>
									</div>
									<div className="element-card-body typography label-spacing">
										<div className="badge badge-outline-primary fonts font_label">
											<i className="ti-settings"></i>label-primary
									</div>
										<div className="badge badge-outline-success fonts font_label">
											<Star />
										label-success
									</div>
										<div className="badge badge-primary fonts font_label">
											<i className="ti-settings"></i>label-primary
									</div>
										<div className="badge badge-success fonts font_label">
											<Star />
										label-success
									</div>
									</div>
								</div>
							</Col>
							<Col md="6" sm="12">
								<div className="element-card element-badge">
									<div className="element-card-header heading">
										<h2>Badge</h2>
									</div>
									<div className="element-card-body typography label-spacing">
										<div className="badge badge-outline-primary sm fonts font_label">
											<i className="ti-settings"></i>label-primary
									</div>
										<div className="badge badge-outline-success sm fonts font_label">
											<Star />
										label-success
									</div>
										<div className="badge badge-primary sm fonts font_label">
											<i className="ti-settings"></i>label-primary
									</div>
										<div className="badge badge-success sm fonts font_label">
											<Star />
										label-success
									</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section>
						<Row>
							<Col xs="12">
								<div className="element-card element-badge">
									<div className="element-card-header heading">
										<h2>Badge</h2>
									</div>
									<div className="element-card-body typography badge-one">
										<div className="badge badge-outline-primary sm font_label">
											R
									</div>
										<div className="badge badge-primary sm font_label">E</div>
										<div className="badge badge-outline-success sm font_label">
											R
									</div>
										<div className="badge badge-success sm font_label">E</div>
										<div className="badge badge-outline-danger sm font_label">
											R
									</div>
										<div className="badge badge-danger sm font_label">E</div>
										<div className="badge badge-outline-warning sm font_label">
											R
									</div>
										<div className="badge badge-warning sm font_label">E</div>
										<div className="badge badge-outline-primary sm font_label">
											R
									</div>
										<div className="badge badge-info sm font_label">E</div>
										<div className="badge badge-outline-light sm font_label">
											R
									</div>
										<div className="badge badge-light sm font_label">E</div>
										<div className="badge badge-outline-dark sm font_label">
											R
									</div>
										<div className="badge badge-dark sm font_label">E</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section>
						<Row>
							<Col xs="12">
								<div className="element-card element-badge">
									<div className="element-card-header heading">
										<h2>Badge</h2>
									</div>
									<div className="element-card-body typography element-dot">
										<div className="dot-btn dot-primary grow font_label">
											<div className="badge badge-outline-primary xl">
												{" "}
											label-primary
										</div>
										</div>
										<div className="dot-btn dot-danger grow font_label">
											<div className="badge badge-success xl">label-success</div>
										</div>
										<div className="dot-btn dot-danger font_label">
											<div className="badge badge-outline-primary xl">
												{" "}
											label-primary
										</div>
										</div>
										<div className="dot-btn dot-success font_label">
											<div className="badge badge-success xl">label-success</div>
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section className="background">
						<Row>
							<Col xs="12">
								<div className="element-card">
									<div className="element-card-header heading">
										<h2>Background Color</h2>
									</div>
									<div className="element-card-body typography">
										<div className="bg-primary p-15">bg-primary</div>
										<div className="bg-success p-15">bg-success</div>
										<div className="bg-danger p-15">bg-danger</div>
										<div className="bg-light p-15">bg-light</div>
										<div className="bg-warning p-15">bg-warning</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section className="background">
						<Row>
							<Col xs="12">
								<div className="element-card element-button">
									<div className="element-card-header heading">
										<h2>Button Background</h2>
									</div>
									<div className="element-card-body typography">
										<a
											className="btn btn-primary button-effect fonts font_label"
											href="#"
										>
											btn-primary
									</a>
										<a
											className="btn btn-success button-effect fonts font_label"
											href="#"
										>
											btn-success
									</a>
										<a
											className="btn btn-danger button-effect fonts font_label"
											href="#"
										>
											btn-danger
									</a>
										<a
											className="btn btn-light button-effect fonts font_label"
											href="#"
										>
											btn-light
									</a>
										<a
											className="btn btn-warning button-effect fonts font_label"
											href="#"
										>
											btn-warning
									</a>
										<a
											className="btn btn-outline-primary button-effect fonts font_label"
											href="#"
										>
											btn-primary
									</a>
										<a
											className="btn btn-outline-success button-effect fonts font_label"
											href="#"
										>
											btn-success
									</a>
										<a
											className="btn btn-outline-danger button-effect fonts font_label"
											href="#"
										>
											btn-danger
									</a>
										<a
											className="btn btn-outline-light button-effect fonts font_label"
											href="#"
										>
											btn-light
									</a>
										<a
											className="btn btn-outline-warning button-effect fonts font_label"
											href="#"
										>
											btn-warning
									</a>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section className="Icons">
						<Row>
							<Col xs="12">
								<div className="element-card">
									<div className="element-card-header heading">
										<h2>Icons</h2>
									</div>
									<div className="element-card-body typography">
										<div className="fonts">
											<a className="icon-btn btn-primary button-effect" href="#">
												<Circle />
											</a>
											<a className="icon-btn btn-success button-effect" href="#">
												<Users />
											</a>
											<a className="icon-btn btn-danger button-effect" href="#">
												<Star />
											</a>
											<a className="icon-btn btn-light button-effect" href="#">
												<Star />
											</a>
											<a className="icon-btn btn-warning button-effect" href="#">
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-primary button-effect"
												href="#"
											>
												<Circle />
											</a>
											<a
												className="icon-btn btn-outline-success button-effect"
												href="#"
											>
												<Users />
											</a>
											<a
												className="icon-btn btn-outline-danger button-effect"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-light button-effect"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-warning button-effect"
												href="#"
											>
												<Star />
											</a>
										</div>
									</div>
									<div className="element-card-body typography">
										<div className="fonts">
											<div className="dot-btn dot-primary">
												<a
													className="icon-btn btn-primary button-effect"
													href="#"
												>
													<Circle />
												</a>
											</div>
											<div className="dot-btn dot-success">
												<a
													className="icon-btn btn-success button-effect"
													href="#"
												>
													<Users />
												</a>
											</div>
											<div className="dot-btn dot-danger">
												<a className="icon-btn btn-danger button-effect" href="#">
													<Star />
												</a>
											</div>
											<div className="dot-btn dot-light">
												<a className="icon-btn btn-light button-effect" href="#">
													<Star />
												</a>
											</div>
											<div className="dot-btn dot-warning">
												<a
													className="icon-btn btn-warning button-effect"
													href="#"
												>
													<Star />
												</a>
											</div>
											<div className="dot-btn dot-primary">
												<a
													className="icon-btn btn-outline-primary button-effect"
													href="#"
												>
													<Circle />
												</a>
											</div>
											<div className="dot-btn dot-success">
												<a
													className="icon-btn btn-outline-success button-effect"
													href="#"
												>
													<Users />
												</a>
											</div>
											<div className="dot-btn dot-danger">
												<a
													className="icon-btn btn-outline-danger button-effect"
													href="#"
												>
													<Star />
												</a>
											</div>
											<div className="dot-btn dot-light">
												<a
													className="icon-btn btn-outline-light button-effect"
													href="#"
												>
													<Star />
												</a>
											</div>
											<div className="dot-btn dot-warning">
												<a
													className="icon-btn btn-outline-warning button-effect"
													href="#"
												>
													<Star />
												</a>
											</div>
										</div>
									</div>
									<div className="element-card-body typography">
										<div className="fonts">
											<a
												className="icon-btn btn-primary button-effect btn-xl"
												href="#"
											>
												<Circle />
											</a>
											<a
												className="icon-btn btn-success button-effect btn-xl"
												href="#"
											>
												<Users />
											</a>
											<a
												className="icon-btn btn-danger button-effect btn-xl"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-light button-effect btn-xl"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-warning button-effect btn-xl"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-primary button-effect btn-xl"
												href="#"
											>
												<Circle />
											</a>
											<a
												className="icon-btn btn-outline-success button-effect btn-xl"
												href="#"
											>
												<Users />
											</a>
											<a
												className="icon-btn btn-outline-danger button-effect btn-xl"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-light button-effect btn-xl"
												href="#"
											>
												<Star />
											</a>
										</div>
									</div>
									<div className="element-card-body typography">
										<div className="fonts">
											<a
												className="icon-btn btn-primary button-effect btn-xl rouded15"
												href="#"
											>
												<Circle />
											</a>
											<a
												className="icon-btn btn-success button-effect btn-xl rouded15"
												href="#"
											>
												<Users />
											</a>
											<a
												className="icon-btn btn-danger button-effect btn-xl rouded15"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-light button-effect btn-xl rouded15"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-warning button-effect btn-xl rouded15"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-primary button-effect btn-xl rouded15"
												href="#"
											>
												<Circle />
											</a>
											<a
												className="icon-btn btn-outline-success button-effect btn-xl rouded15"
												href="#"
											>
												<Users />
											</a>
											<a
												className="icon-btn btn-outline-danger button-effect btn-xl rouded15"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-light button-effect btn-xl rouded15"
												href="#"
											>
												<Star />
											</a>
										</div>
									</div>
									<div className="element-card-body typography">
										<div className="fonts">
											<div className="dot-btn dot-primary grow">
												<a
													className="icon-btn btn-primary button-effect"
													href="#"
												>
													<Circle />
												</a>
											</div>
											<div className="dot-btn dot-success grow">
												<a
													className="icon-btn btn-success button-effect"
													href="#"
												>
													<Users />
												</a>
											</div>
											<div className="dot-btn dot-danger grow">
												<a className="icon-btn btn-danger button-effect" href="#">
													<Star />
												</a>
											</div>
											<div className="dot-btn dot-light grow">
												<a className="icon-btn btn-light button-effect" href="#">
													<Star />
												</a>
											</div>
											<div className="dot-btn dot-warning grow">
												<a
													className="icon-btn btn-warning button-effect"
													href="#"
												>
													<Star />
												</a>
											</div>
											<div className="dot-btn dot-primary grow">
												<a
													className="icon-btn btn-outline-primary button-effect"
													href="#"
												>
													<Circle />
												</a>
											</div>
											<div className="dot-btn dot-success grow">
												<a
													className="icon-btn btn-outline-success button-effect"
													href="#"
												>
													<Users />
												</a>
											</div>
											<div className="dot-btn dot-danger grow">
												<a
													className="icon-btn btn-outline-danger button-effect"
													href="#"
												>
													<Star />
												</a>
											</div>
											<div className="dot-btn dot-light grow">
												<a
													className="icon-btn btn-outline-light button-effect"
													href="#"
												>
													<Star />
												</a>
											</div>
											<div className="dot-btn dot-danger grow">
												<a
													className="icon-btn btn-outline-light button-effect"
													href="#"
												>
													<Star />
												</a>
											</div>
										</div>
									</div>
									<div className="element-card-body typography">
										<div className="fonts">
											<a
												className="icon-btn btn-primary button-effect btn-sm"
												href="#"
											>
												<Circle />
											</a>
											<a
												className="icon-btn btn-success button-effect btn-sm"
												href="#"
											>
												<Users />
											</a>
											<a
												className="icon-btn btn-danger button-effect btn-sm"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-light button-effect btn-sm"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-warning button-effect btn-sm"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-primary button-effect btn-sm"
												href="#"
											>
												<Circle />
											</a>
											<a
												className="icon-btn btn-outline-success button-effect btn-sm"
												href="#"
											>
												<Users />
											</a>
											<a
												className="icon-btn btn-outline-danger button-effect btn-sm"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-light button-effect btn-sm"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-warning button-effect btn-sm"
												href="#"
											>
												<Star />
											</a>
										</div>
									</div>
									<div className="element-card-body typography">
										<div className="fonts">
											<a
												className="icon-btn btn-primary button-effect btn-xs"
												href="#"
											>
												<Circle />
											</a>
											<a
												className="icon-btn btn-success button-effect btn-xs"
												href="#"
											>
												<Users />
											</a>
											<a
												className="icon-btn btn-danger button-effect btn-xs"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-light button-effect btn-xs"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-warning button-effect btn-xs"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-primary button-effect btn-xs"
												href="#"
											>
												<Circle />
											</a>
											<a
												className="icon-btn btn-outline-success button-effect btn-xs"
												href="#"
											>
												<Users />
											</a>
											<a
												className="icon-btn btn-outline-danger button-effect btn-xs"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-light button-effect btn-xs"
												href="#"
											>
												<Star />
											</a>
											<a
												className="icon-btn btn-outline-warning button-effect btn-xs"
												href="#"
											>
												<Star />
											</a>
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section className="theme_btn_group">
						<Row>
							<Col md="6" sm="12">
								<div className="element-card">
									<div className="element-card-header heading">
										<h2>Theme Buttons</h2>
									</div>
									<div className="element-card-body typography">
										<div className="theme-btn-group fonts">
											<div className="dot-btn dot-success grow">
												<a
													className="icon-btn btn-primary button-effect btn-sm"
													href="#"
												>
													<Circle />
												</a>
											</div>
											<div className="dot-btn dot-success grow">
												<a
													className="icon-btn btn-success button-effect btn-sm"
													href="#"
												>
													<Users />
												</a>
											</div>
										</div>
										<div className="theme-btn-group fonts">
											<a
												className="icon-btn btn-primary button-effect btn-sm"
												href="#"
											>
												<Circle />
											</a>
											<a
												className="icon-btn btn-success button-effect btn-sm"
												href="#"
											>
												<Users />
											</a>
											<a
												className="icon-btn btn-success button-effect btn-sm"
												href="#"
											>
												<Users />
											</a>
										</div>
										<div className="theme-btn-group fonts">
											<a className="icon-btn btn-primary button-effect" href="#">
												<Circle />
											</a>
											<a className="icon-btn btn-success button-effect" href="#">
												<Users />
											</a>
										</div>
										<div className="theme-btn-group fonts">
											<a className="icon-btn btn-primary button-effect" href="#">
												<Circle />
											</a>
											<a className="icon-btn btn-primary button-effect" href="#">
												<Circle />
											</a>
											<a className="icon-btn btn-success button-effect" href="#">
												<Users />
											</a>
										</div>
									</div>
								</div>
							</Col>
							<Col md="6" sm="12">
								<div className="element-card">
									<div className="element-card-header heading">
										<h2>Theme Tab &amp; Content</h2>
									</div>
									<div className="element-card-body typography">
										<div className="theme-tab">
											<Nav tabs>
												<NavItem>
													<NavLink
														className={activeTab === "home" ? "active" : ""}
														onClick={() => setActiveTab("Home")}
													>
														Home
												</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={activeTab === "profile" ? "active" : ""}
														onClick={() => setActiveTab("Profile")}
													>
														Profile
												</NavLink>
												</NavItem>
											</Nav>
											<TabContent activeTab={activeTab}>
												<TabPane className="fade button-effect show active">
													{activeTab ? activeTab : "Home"}
												</TabPane>
												<TabPane
													className="button-effect fade"
													id="profile"
													role="tabpanel"
													aria-label="profile-tab"
												>
													{activeTab}
												</TabPane>
											</TabContent>
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section className="massage_box">
						<Col xs="12" className="p-0">
							<div className="element-card element-msg">
								<div className="element-card-header heading">
									<h2>Massage Box</h2>
								</div>
								<div className="element-card-body typography">
									<ul className="msg-box fonts">
										<li>
											<h5>Hi Alan, Please send me document.</h5>
										</li>
										<li>
											<h5>Imigiatly.</h5>
										</li>
									</ul>
									<ul className="msg-box fonts">
										<li>
											<h5>Hi Alan, Please send me document.</h5>
										</li>
										<li>
											<h5>Imigiatly.</h5>
										</li>
									</ul>
									<ul className="msg-box fonts">
										<li>
											<h5>Hi Alan, Please send me document.</h5>
										</li>
										<li>
											<h5>Hi Alan, Please .</h5>
										</li>
										<li>
											<h5>Imigiatly.</h5>
										</li>
									</ul>
									<ul className="msg-box fonts">
										<li>
											<h5>Imigiatly. </h5>
										</li>
									</ul>
								</div>
							</div>
						</Col>
					</section>
					<section className="massage_box">
						<Col xs="12" className="p-0">
							<div className="element-card">
								<div className="element-card-header heading">
									<h2>Main Chat</h2>
								</div>
								<div className="element-card-body typography">
									<ul className="chat-main">
										<li className="py-0">
											<div className="chat-box">
												<div
													className="profile offline"
													style={{
														backgroundImage: `url('../assets/images/avtar/1.jpg')`,
														backgroundSize: "cover",
														backgroundPosition: "center",
														display: "block",
													}}
												>
													<img
														className="bg-img"
														src="/assets/images/avtar/1.jpg"
														alt="Avatar"
														style={{ display: "none" }}
													/>
												</div>
												<div className="details">
													<h5>Josephin water</h5>
													<h6>
														Hi, i am josephin. How are you.. ! There are many
														variations of passages.
												</h6>
												</div>
												<div className="date-status">
													<h6>22/10/19</h6>
													<h6 className="font-success status"> Seen </h6>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</Col>
					</section>
					<section className="massage_box">
						<Row>
							<Col md="6" sm="12">
								<div className="element-card">
									<div className="element-card-header heading">
										<h2>Shared Document</h2>
									</div>
									<div className="element-card-body typography">
										<div className="document">
											<div className="filter-block">
												<div
													className={`collapse-block ${shareDoc ? "" : "open"}`}
												>
													<h5
														className="block-title"
														onClick={() => shareDocToggle()}
													>
														Shared Document
												</h5>
													<div
														className="block-content"
														style={
															shareDoc
																? { display: "none" }
																: { display: "block" }
														}
													>
														<ul className="document-list">
															<li>
																<i className="ti-folder font-danger"></i>
																<h5>Simple_practice_project-zip</h5>
															</li>
															<li>
																<i className="ti-write font-success"></i>
																<h5>Word_Map-jpg</h5>
															</li>
															<li>
																<i className="ti-zip font-primary"></i>
																<h5>Latest_Design_portfolio.pdf</h5>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Col>
							<Col md="6" sm="12">
								<div className="element-card">
									<div className="element-card-header heading">
										<h2>Shared Document</h2>
									</div>
									<div className="element-card-body typography">
										<div className={`collapse-block ${shareMedia ? "" : "open"}`}>
											<h5
												className="block-title"
												onClick={() => shareMediaToggle()}
											>
												Shared Media
										</h5>
											<div
												className="block-content"
												style={
													shareMedia ? { display: "none" } : { display: "block" }
												}
											>
												<div className="share-media">
													<Row>
														<Col xs="4">
															<div
																className="media-big"
																style={{
																	backgroundImage: `url('../assets/images/avtar/1.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
														</Col>
														<Col xs="4">
															<div
																className="media-small"
																style={{
																	backgroundImage: `url('../assets/images/avtar/2.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
															<div
																className="media-small"
																style={{
																	backgroundImage: `url('../assets/images/avtar/3.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
														</Col>
														<Col xs="4">
															<div
																className="media-small"
																style={{
																	backgroundImage: `url('../assets/images/avtar/big/audiocall.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
															<div
																className="media-small"
																style={{
																	backgroundImage: `url('../assets/images/avtar/5.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
														</Col>
													</Row>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section>
						<Row>
							<Col xs="12">
								<div className="element-card element-animate">
									<div className="element-card-header heading">
										<h2>Buttons</h2>
									</div>
									<div className="element-card-body typography">
										<a
											className="icon-btn btn-success button-effect btn-xl is-animating font_label"
											href="#"
										>
											<Phone />
										</a>
										<a
											className="icon-btn btn-danger button-effect btn-xl is-animating font_label"
											href="#"
										>
											<Phone />
										</a>
									</div>
								</div>
							</Col>
						</Row>
					</section>
					<section>
						<Row>
							<Col xs="12">
								<div className="element-card element-animate">
									<div className="element-card-header heading">
										<h2>Buttons</h2>
									</div>
									<div className="element-card-body popup-group">
										<button
											className="btn btn-primary fonts font_label"
											type="button"
											onClick={() => audioCallToggle()}
										>
											Audio call
									</button>
										{/* <!-- Modal--> */}
										<Modal
											isOpen={audioCall}
											toggle={() => audioCallToggle()}
											centered={true}
										>
											<ModalBody className="p-0">
												<div
													className="audiocall1 call-modal"
													style={{
														backgroundImage: `url('../assets/images/avtar/big/audiocall.jpg')`,
														backgroundSize: "cover",
														backgroundPosition: "center",
														display: "block",
													}}
												>
													<div className="center-con text-center">
														<div className="title2">Josephin water</div>
														<h6>log angelina california</h6>
														<ul>
															<li>
																<a
																	className="icon-btn btn-success button-effect btn-xl is-animating"
																	href="#"
																>
																	<Phone />
																</a>
															</li>
															<li>
																<a
																	className="icon-btn btn-danger button-effect btn-xl is-animating cancelcall"
																	href="#"
																	onClick={() => audioCallToggle()}
																>
																	<Phone />
																</a>
															</li>
														</ul>
													</div>
												</div>
											</ModalBody>
										</Modal>
										<div className="custom-dropdown add-chat custom-scroll">
											<h3>Start new conversation</h3>
											<ul className="contact-log-main">
												<li>
													<div className="contact-box">
														<div className="profile offline">
															<img
																className="bg-img"
																src="../assets/images/contact/2.jpg"
																alt="Avatar"
															/>
														</div>
														<div className="details">
															<h5>Jony Lynetin</h5>
															<h6>+21 3523 25544</h6>
														</div>
														<div className="contact-action">
															<div className="icon-btn btn-outline-primary btn-sm button-effect">
																<i data-feather="message-square"></i>
															</div>
														</div>
													</div>
												</li>
												<li className="active">
													<div className="contact-box">
														<div className="																																																">
															<img
																className="bg-img"
																src="../assets/images/contact/1.jpg"
																alt="Avatar"
															/>
														</div>
														<div className="details">
															<h5>Jony Lynetin</h5>
															<h6>+54 541447 255</h6>
														</div>
														<div className="contact-action">
															<div className="icon-btn btn-outline-primary btn-sm button-effect">
																<i data-feather="message-square"></i>
															</div>
														</div>
													</div>
												</li>
												<li>
													<div className="contact-box">
														<div className="profile busy">
															<img
																className="bg-img"
																src="../assets/images/contact/3.jpg"
																alt="Avatar"
															/>
														</div>
														<div className="details">
															<h5>Jony Lynetin</h5>
															<h6>+58 2564 02554</h6>
														</div>
														<div className="contact-action">
															<div className="icon-btn btn-outline-primary btn-sm button-effect">
																<i data-feather="message-square"></i>
															</div>
														</div>
													</div>
												</li>
												<li>
													<div className="contact-box">
														<div className="profile unreachable">
															<img
																className="bg-img"
																src="../assets/images/contact/4.jpg"
																alt="Avatar"
															/>
														</div>
														<div className="details">
															<h5>Jony Lynetin</h5>
															<h6>+44 55124 2524</h6>
														</div>
														<div className="contact-action">
															<div className="icon-btn btn-outline-primary btn-sm button-effect">
																<i data-feather="message-square"></i>
															</div>
														</div>
													</div>
												</li>
												<li>
													<div className="contact-box">
														<div className="profile online">
															<img
																className="bg-img"
																src="../assets/images/contact/4.jpg"
																alt="Avatar"
															/>
														</div>
														<div className="details">
															<h5>Jony Lynetin</h5>
															<h6>+54 541447 255</h6>
														</div>
														<div className="contact-action">
															<div className="icon-btn btn-outline-primary btn-sm button-effect">
																<i data-feather="message-square"></i>
															</div>
														</div>
													</div>
												</li>
											</ul>
										</div>
										<button
											className="btn btn-primary fonts font_label"
											type="button"
											onClick={() => recieveAudioCallToggle()}
										>
											Receive Audio Call
									</button>
										{/* <!-- Modal--> */}
										<Modal
											isOpen={recieveAudioCall}
											toggle={() => recieveAudioCallToggle()}
											centered={true}
										>
											<ModalBody className="p-0">
												<div
													className="audiocall2 call-modal"
													style={{
														backgroundImage: `url('../assets/images/avtar/big/audiocall.jpg')`,
														backgroundSize: "cover",
														backgroundPosition: "center",
														display: "block",
													}}
												>
													<div className="center-con text-center">
														<div id="basicUsage2">00:00:00</div>
														<div className="title2">Josephin water</div>
														<h6>log angelina california</h6>
														<ul>
															<li>
																<a
																	className="icon-btn btn-light button-effect mute"
																	href="#"
																	data-tippy-content="Mute"
																>
																	<i className="fa fa-microphone"></i>
																</a>
															</li>
															<li>
																<a
																	className="icon-btn btn-light button-effect mute"
																	href="#"
																	data-tippy-content="Speaker"
																>
																	<i className="fa fa-volume-up"></i>
																</a>
															</li>
															<li>
																<a
																	className="icon-btn btn-danger button-effect btn-xl is-animating"
																	href="#"
																	onClick={() => recieveAudioCallToggle()}
																>
																	<Phone />
																</a>
															</li>
															<li>
																<a
																	className="icon-btn btn-light button-effect"
																	href="#"
																	data-tippy-content="Add Call"
																>
																	<UserPlus />
																</a>
															</li>
															<li>
																<a
																	className="icon-btn btn-light button-effect"
																	href="#"
																	data-tippy-content="Disable Video"
																>
																	<Pause />
																</a>
															</li>
														</ul>
													</div>
												</div>
											</ModalBody>
										</Modal>
										<button
											className="btn btn-primary fonts font_label"
											type="button"
											onClick={() => conferenceCallToggle()}
										>
											conference call
									</button>
										{/* <!-- Modal--> */}
										<Modal
											isOpen={conferenceCall}
											toggle={() => conferenceCallToggle()}
											centered={true}
										>
											<ModalBody className="p-0">
												<div
													className="conferencecall call-modal"
													style={{
														backgroundImage: `url('../assets/images/avtar/big/audiocall.jpg')`,
														backgroundSize: "cover",
														backgroundPosition: "center",
														display: "block",
													}}
												>
													<div className="center-con text-center">
														<div className="usersprof">
															<div
																className="profile"
																style={{
																	backgroundImage: `url('../assets/images/avtar/2.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
															<div
																className="profile"
																style={{
																	backgroundImage: `url('../assets/images/avtar/3.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
															<div
																className="profile"
																style={{
																	backgroundImage: `url('../assets/images/avtar/5.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
															<div
																className="profile"
																style={{
																	backgroundImage: `url('../assets/images/avtar/big/videocall_bg.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
														</div>
														<p>Incoming Call</p>
														<h3>Conference Call</h3>
														<ul>
															<li>
																<a
																	className="icon-btn btn-danger button-effect btn-xl is-animating cancelcall"
																	href="#"
																	onClick={() => conferenceCallToggle()}
																>
																	<Phone />
																</a>
															</li>
															<li>
																<a
																	className="icon-btn btn-success button-effect btn-xl is-animating"
																	href="#"
																>
																	<Video />
																</a>
															</li>
														</ul>
													</div>
												</div>
											</ModalBody>
										</Modal>
										<button
											className="btn btn-primary fonts font_label"
											type="button"
											onClick={() => onePersonCallToggle()}
										>
											One Person call
									</button>
										{/* <!-- Modal--> */}
										<Modal
											isOpen={onePersonCall}
											toggle={() => onePersonCallToggle()}
											centered={true}
										>
											<ModalBody className="p-0">
												<div
													className="conferencecall call-modal"
													style={{
														backgroundImage: `url('../assets/images/avtar/big/audiocall.jpg')`,
														backgroundSize: "cover",
														backgroundPosition: "center",
														display: "block",
													}}
												>
													<div className="center-con text-center">
														<div className="usersprof">
															<div
																className="profile"
																style={{
																	backgroundImage: `url('../assets/images/avtar/big/videocall_bg.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
														</div>
														<p>Incoming Call</p>
														<h3>Jack p angulo</h3>
														<p>Product Manager</p>
														<ul>
															<li>
																<a
																	className="icon-btn btn-danger button-effect btn-xl is-animating cancelcall"
																	href="#"
																	onClick={() => onePersonCallToggle()}
																>
																	<Phone />
																</a>
															</li>
															<li>
																<a
																	className="icon-btn btn-success button-effect btn-xl is-animating"
																	href="#"
																>
																	<Video />
																</a>
															</li>
														</ul>
													</div>
												</div>
											</ModalBody>
										</Modal>
										<button
											className="btn btn-primary fonts font_label"
											type="button"
											onClick={() => noInernetToggle()}
										>
											No Internet
									</button>
										{/* <!-- Modal--> */}
										<Modal
											isOpen={noInernet}
											toggle={() => noInernetToggle()}
											centered={true}
										>
											<ModalBody className="p-0">
												<div className="no-internet animat-rate">
													<div className="connection-img">
														<img
															className="left-img"
															src="../assets/images/disconnect/3.png"
															alt="Disconnected"
														/>
														<img
															className="right-img"
															src="../assets/images/disconnect/2.png"
															alt="Disconnected internet"
														/>
													</div>
													<div className="quarterCircle">
														<div
															className="close-btn"
															onClick={() => noInernetToggle()}
														>
															<span aria-hidden="true">&times;</span>
														</div>
													</div>
													<div className="bg_circle">
														<div></div>
														<div></div>
														<div></div>
														<div></div>
														<div></div>
													</div>
													<div className="cross"></div>
													<div className="cross1"></div>
													<div className="dot"></div>
													<div className="dot1"></div>
													<div className="content text-center">
														<a
															className="icon-btn btn-danger button-effect btn-sm is-animating"
															href="#"
														>
															<i className="fa fa-wifi"></i>
														</a>
														<h5>Internet issue</h5>
														<div className="title2">Disconnected</div>
														<button
															className="btn reconnect-btn"
															type="button"
															onClick={() => noInernetToggle()}
														>
															Reconnect
													</button>
													</div>
												</div>
											</ModalBody>
										</Modal>
										<button
											className="btn btn-primary fonts font_label"
											type="button"
											onClick={() => videoCallToggle()}
										>
											video call
									</button>
										{/* <!-- Modal--> */}
										<Modal
											className="viddiolog show"
											isOpen={videoCall}
											toggle={() => videoCallToggle()}
											centered={true}
											size="lg"
										>
											<ModalBody className="p-0">
												<div
													className="videocall call-modal"
													style={{
														backgroundImage: `url('../assets/images/avtar/big/videocall_bg.jpg')`,
														backgroundSize: "cover",
														backgroundPosition: "center",
														display: "block",
													}}
												>
													<div
														className="small-image"
														style={{
															backgroundImage: `url('../assets/images/avtar/big/videocall.jpg')`,
															backgroundSize: "cover",
															backgroundPosition: "center",
															display: "block",
														}}
													></div>
													<div className="media videocall-details">
														<div className="usersprof">
															<div
																className="profile"
																style={{
																	backgroundImage: `url('../assets/images/avtar/2.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
															<div
																className="profile"
																style={{
																	backgroundImage: `url('../assets/images/avtar/3.jpg')`,
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	display: "block",
																}}
															></div>
														</div>
														<ModalBody>
															<h5>Josephin water</h5>
															<h6>America ,California</h6>
														</ModalBody>
														<div id="basicUsage">00:00:00</div>
														<div className="zoomcontent">
															<a
																className="text-dark"
																href="#!"
																onClick="javascript:toggleFullScreen()"
															>
																<img
																	src="../assets/images/logo/maximize.svg"
																	alt="zoom screen"
																/>
															</a>
														</div>
													</div>
													<div className="center-con text-center">
														<ul>
															<li>
																<a
																	className="icon-btn btn-light button-effect pause"
																	href="#"
																>
																	<i className="ti-control-pause"></i>
																</a>
															</li>
															<li>
																<a
																	className="icon-btn btn-danger button-effect btn-xl is-animating"
																	href="#"
																	onClick={() => videoCallToggle()}
																>
																	<Phone />
																</a>
															</li>
															<li>
																<a
																	className="icon-btn btn-light button-effect mic"
																	href="#"
																>
																	<i className="fa fa-microphone"></i>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</ModalBody>
										</Modal>
										<button
											className="btn btn-primary fonts font_label"
											type="button"
											onClick={() => videoConferenceCallToggle()}
										>
											video call conference
									</button>
										{/* <!-- Modal--> */}
										<Modal
											isOpen={videoConferenceCall}
											toggle={() => videoConferenceCallToggle()}
											centered
										>
											<ModalBody>
												<Row className="confimg">
													<Col xs="6">
														<div
															className="vclimg"
															style={{
																backgroundImage: `url('../assets/images/avtar/big/videocall_bg.jpg')`,
																backgroundSize: "cover",
																backgroundPosition: "center",
																display: "block",
															}}
														></div>
													</Col>
													<Col xs="6">
														<div
															className="vclimg"
															style={{
																backgroundImage: `url('../assets/images/avtar/5.jpg')`,
																backgroundSize: "cover",
																backgroundPosition: "center",
																display: "block",
															}}
														></div>
													</Col>
													<Col xs="6">
														<div
															className="vclimg"
															style={{
																backgroundImage: `url('../assets/images/avtar/2.jpg')`,
																backgroundSize: "cover",
																backgroundPosition: "center",
																display: "block",
															}}
														></div>
													</Col>
													<Col xs="6">
														<div
															className="vclimg"
															style={{
																backgroundImage: `url('../assets/images/avtar/3.jpg')`,
																backgroundSize: "cover",
																backgroundPosition: "center",
																display: "block",
															}}
														></div>
													</Col>
												</Row>
											</ModalBody>
											<ModalFooter className="clfooter">
												<div id="basicUsage3">
													00:00:00</div>
												<ul>
													<li>
														<a
															className="icon-btn btn-light button-effect"
															href="#"
															data-tippy-content="speaker"
														>
															<Volume2 />
														</a>
													</li>
													<li>
														<a
															className="icon-btn btn-light button-effect"
															href="#"
															data-tippy-content="Camera"
														>
															<CameraOff />
														</a>
													</li>
													<li>
														<a
															className="icon-btn btn-light button-effect"
															href="#"
															data-tippy-content="Add Call"
														>
															<UserPlus />
														</a>
													</li>
													<li>
														<a
															className="icon-btn btn-danger button-effect is-animating"
															href="#"
															onClick={() => videoConferenceCallToggle()}
														>
															<Phone />
														</a>
													</li>
													<li>
														<a
															className="icon-btn btn-light button-effect"
															href="#"
															data-tippy-content="Disable Video"
														>
															<VideoOff />
														</a>
													</li>
													<li>
														<a
															className="icon-btn btn-light button-effect mic"
															href="#"
															data-tippy-content="Mute"
														>
															<MicOff />
														</a>
													</li>
													<li>
														<a
															className="icon-btn btn-light button-effect"
															href="#"
															data-tippy-content="Hold"
														>
															<Pause />
														</a>
													</li>
												</ul>

											</ModalFooter>
										</Modal>
									</div>
								</div>
							</Col>
						</Row>
					</section>


				</div>
			</Container>
		</CommonLayout>
	);
};

export default Elements;
