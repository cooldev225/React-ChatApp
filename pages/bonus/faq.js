import React, { useState } from "react";
import CommonLayout from "../common/commonLayout";
import {
	Row,
	Col,
	Container,
	Card,
	CardHeader,
	CardBody,
	Collapse,
} from "reactstrap";
import { Search } from "react-feather";
const Faq = (props) => {
	const [isOpen1, setIsOpen1] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);
	const [isOpen4, setIsOpen4] = useState(false);
	const [isOpen5, setIsOpen5] = useState(false);
	const [isOpen6, setIsOpen6] = useState(false);
	const [responsivesearch, setResponsiveSearch] = useState(false);

	const toggle1 = () => setIsOpen1(!isOpen1);
	const toggle2 = () => setIsOpen2(!isOpen2);
	const toggle3 = () => setIsOpen3(!isOpen3);
	const toggle4 = () => setIsOpen4(!isOpen4);
	const toggle5 = () => setIsOpen5(!isOpen5);
	const toggle6 = () => setIsOpen6(!isOpen6);

	const SeacrhResposive = (responsivesearch) => {
		if (responsivesearch) {
			setResponsiveSearch(!responsivesearch);
			document.querySelector(".search-form").classList.add("open");
		} else {
			setResponsiveSearch(!responsivesearch);
			document.querySelector(".search-form").classList.remove("open");
			document.querySelector(".close-search").classList.remove("open");
		}
	};

	return (
		<CommonLayout title="FAQ" parent="home">
			<section className="section-py-space faq-section">
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
					<Row className="faq-block">
						<Col sm="12">
							<div className="media">
								<div>
									<h2>Frequently Asked Questions</h2>
									<p>
										Discover you question from underneath or present your
										inquiry fromt tahe submit box.
									</p>
								</div>
								<div className="media-body">
									<a
										className="icon-btn btn-outline-primary btn-sm search contact-search float-right"
										href="#"
									>
										<Search onClick={() => SeacrhResposive(responsivesearch)} />
									</a>
									<form className="form-inline search-form">
										<div className="form-group">
											<input
												className="form-control-plaintext"
												type="search"
												placeholder="Search.."
											/>
											<div
												className="icon-close close-search"
												onClick={() => SeacrhResposive(responsivesearch)}
											></div>
										</div>
									</form>
								</div>
							</div>
						</Col>
						<Col md="12">
							<div className="accordion theme-accordion" id="accordionExample1">
								<Card
									className="faq-block accordion theme-accordion"
									id="accordionExample"
								>
									<CardHeader id="headingOne">
										<h5 className="mb-0">
											<button
												className="btn-link"
												type="button"
												data-toggle="collapse"
												data-target="#headingOne"
												aria-controls="headingOne"
												aria-expanded={isOpen1}
												onClick={toggle1}
											>
												How can I downgrade to an earlier ?
											</button>
										</h5>
									</CardHeader>
									<Collapse
										isOpen={isOpen1}
										aria-labelledby="headingTwo"	
										data-parent="#accordionExample"
									>
										<CardBody>
											<p>
												<img
													className="img-fluid faq-decor"
													src="../assets/images/landing/chitchat/2.png"
													alt="chit-chat-back-img"
												/>
												it look like readable English. Many desktop publishing
												packages and web page editors now use Lorem Ipsum as
												their default model text, and a search for &apos;lorem
												ipsum&apos; will uncover many web sites still in their
												infancy. Various versions have evolved over the
												years,All the Lorem Ipsum generators on the Internet
												tend to repeat predefined chunks as necessary, making
												this the first true generator on the Internet. It uses a
												dictionary of over 200 Latin words, combined with a
												handful of model sentence structures
											</p>
										</CardBody>
									</Collapse>
								</Card>
								<Card>
									<CardHeader id="headingTwo">
										<h5 className="mb-0">
											<button
												className="btn-link collapsed"
												type="button"
												data-toggle="collapse"
												data-target="#headingTwo"
												aria-controls="headingTwo"
												aria-expanded={isOpen2}
												onClick={toggle2}
											>
												How can I upgrade from Shopify 2.5 to shopify 3?
											</button>
										</h5>
									</CardHeader>
									<Collapse
										isOpen={isOpen2}
										aria-labelledby="headingTwo"
										data-parent="#accordionExample"
									>
										<CardBody>
											<p>
												<img
													className="img-fluid faq-decor"
													src="../assets/images/landing/chitchat/2.png"
													alt="chit-chat-back-img"
												/>
												it look like readable English. Many desktop publishing
												packages and web page editors now use Lorem Ipsum as
												their default model text, and a search for &apos;lorem
												ipsum&apos; will uncover many web sites still in their
												infancy. Various versions have evolved over the
												years,All the Lorem Ipsum generators on the Internet
												tend to repeat predefined chunks as necessary, making
												this the first true generator on the Internet. It uses a
												dictionary of over 200 Latin words, combined with a
												handful of model sentence structures
											</p>
										</CardBody>
									</Collapse>
								</Card>
								<Card>
									<CardHeader id="headingThree">
										<h5 className="mb-0">
											<button
												className="btn-link collapsed"
												type="button"
												data-toggle="collapse"
												data-target="#headingThree"
												aria-controls="headingThree"
												aria-expanded={isOpen3}
												onClick={toggle3}
											>
												Under what license are Regular Labs released?
											</button>
										</h5>
									</CardHeader>
									<Collapse
										isOpen={isOpen3}
										aria-labelledby="headingThree"
										data-parent="#accordionExample"
									>
										<CardBody>
											<p>
												<img
													className="img-fluid faq-decor"
													src="../assets/images/landing/chitchat/2.png"
													alt="chit-chat-back-img"
												/>
												it look like readable English. Many desktop publishing
												packages and web page editors now use Lorem Ipsum as
												their default model text, and a search for &apos;lorem
												ipsum&apos; will uncover many web sites still in their
												infancy. Various versions have evolved over the
												years,All the Lorem Ipsum generators on the Internet
												tend to repeat predefined chunks as necessary, making
												this the first true generator on the Internet. It uses a
												dictionary of over 200 Latin words, combined with a
												handful of model sentence structures
											</p>
										</CardBody>
									</Collapse>
								</Card>
								<Card>
									<CardHeader id="headingFour">
										<h5 className="mb-0">
											<button
												className="btn-link collapsed"
												type="button"
												data-toggle="collapse"
												data-target="#headingFour"
												aria-controls="headingFour"
												aria-expanded={isOpen4}
												onClick={toggle4}
											>
												What is the Regular Labs Library?
											</button>
										</h5>
									</CardHeader>
									<Collapse
										isOpen={isOpen4}
										aria-labelledby="headingFour"
										data-parent="#accordionExample"
									>
										<CardBody>
											<p>
												<img
													className="img-fluid faq-decor"
													src="../assets/images/landing/chitchat/2.png"
													alt="chit-chat-back-img"
												/>
												it look like readable English. Many desktop publishing
												packages and web page editors now use Lorem Ipsum as
												their default model text, and a search for &apos;lorem
												ipsum&apos; will uncover many web sites still in their
												infancy. Various versions have evolved over the
												years,All the Lorem Ipsum generators on the Internet
												tend to repeat predefined chunks as necessary, making
												this the first true generator on the Internet. It uses a
												dictionary of over 200 Latin words, combined with a
												handful of model sentence structures
											</p>
										</CardBody>
									</Collapse>
								</Card>
								<Card>
									<CardHeader id="headingFive">
										<h5 className="mb-0">
											<button
												className="btn-link collapsed"
												type="button"
												data-toggle="collapse"
												data-target="#headingFive"
												aria-controls="headingFive"
												aria-expanded={isOpen5}
												onClick={toggle5}
											>
												Can I turn on/off some blocks on the page?
											</button>
										</h5>
									</CardHeader>
									<Collapse
										isOpen={isOpen5}
										aria-labelledby="headingFive"
										data-parent="#accordionExample"
									>
										<CardBody>
											<p>
												<img
													className="img-fluid faq-decor"
													src="../assets/images/landing/chitchat/2.png"
													alt="chit-chat-back-img"
												/>
												it look like readable English. Many desktop publishing
												packages and web page editors now use Lorem Ipsum as
												their default model text, and a search for &apos;lorem
												ipsum&apos; will uncover many web sites still in their
												infancy. Various versions have evolved over the
												years,All the Lorem Ipsum generators on the Internet
												tend to repeat predefined chunks as necessary, making
												this the first true generator on the Internet. It uses a
												dictionary of over 200 Latin words, combined with a
												handful of model sentence structures
											</p>
										</CardBody>
									</Collapse>
								</Card>
								<Card>
									<CardHeader id="headingSix">
										<h5 className="mb-0">
											<button
												className="btn-link collapsed"
												type="button"
												data-toggle="collapse"
												data-target="#headingSix"
												aria-controls="headingSix"
												aria-expanded={isOpen6}
												onClick={toggle6}
											>
												What is included in the theme package?
											</button>
										</h5>
									</CardHeader>
									<Collapse
										isOpen={isOpen6}
										aria-labelledby="headingSix"
										data-parent="#accordionExample"
									>
										<CardBody>
											<p>
												<img
													className="img-fluid faq-decor"
													src="../assets/images/landing/chitchat/2.png"
													alt="chit-chat-back-img"
												/>
												it look like readable English. Many desktop publishing
												packages and web page editors now use Lorem Ipsum as
												their default model text, and a search for &apos;lorem
												ipsum&apos; will uncover many web sites still in their
												infancy. Various versions have evolved over the
												years,All the Lorem Ipsum generators on the Internet
												tend to repeat predefined chunks as necessary, making
												this the first true generator on the Internet. It uses a
												dictionary of over 200 Latin words, combined with a
												handful of model sentence structures
											</p>
										</CardBody>
									</Collapse>
								</Card>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</CommonLayout>
	);
};

export default Faq;
