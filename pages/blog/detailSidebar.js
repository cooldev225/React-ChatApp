import React from "react";
import CommonLayout from "../common/commonLayout";
import { Row, Col, FormGroup } from "reactstrap";
import Sidebar from "./sidebar";
const DetailSidebar = (props) => {
	return (
		<CommonLayout title="Blog" parent="home">
			<section className="blog-detail-page section-py-space blog-page">
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
				<div className="custom-container">
					<Row>
						<Col xl="3" lg="4" md="5">
							<Sidebar />
						</Col>
						<Col xl="9" lg="8" md="7" className="order-sec">
							<Row>
								<Col sm="12">
									<div className="blog-detail blog-card">
										<img
											className="img-fluid"
											src="../assets/images/blog/blog-detail.jpg"
											alt=""
										/>
										<h2>
											Also the leap into electronic typesetting unchanged.
										</h2>
										<div className="post-social">
											<ul>
												<li>25 January 2021</li>
												<li>
													<i className="fa fa-user"></i>Admin
												</li>
												<li>
													<i className="fa fa-comments"></i>10 Comment
												</li>
											</ul>
											<ul className="social-group">
												<li>
													<a
														className="icon-btn btn-google button-effect btn-sm"
														href="https://www.facebook.com/"
													>
														<i className="fa fa-facebook"></i>
													</a>
												</li>
												<li>
													<a
														className="icon-btn btn-twiter button-effect btn-sm"
														href="https://twitter.com/"
													>
														<i className="fa fa-twitter"></i>
													</a>
												</li>
												<li>
													<a
														className="icon-btn btn-linkedin button-effect btn-sm"
														href="https://www.linkedin.com/"
													>
														<i className="fa fa-linkedin"></i>
													</a>
												</li>
												<li>
													<a
														className="icon-btn btn-instagram button-effect btn-sm"
														href="https://www.instagram.com/"
													>
														<i className="fa fa-instagram"></i>
													</a>
												</li>
											</ul>
										</div>
										<p>
											Fusce scelerisque augue a viverra semper. Etiam nisi nibh,
											vestibulum quis augue id, imperdiet fringilla dolor. Nulla
											sed nisl vel nisi cursus finibus. Vivamus ut augue nec
											justo viverra laoreet. Nunc efficitur, arcu ac cursus
											gravida, lorem elit commodo urna, id viverra libero tellus
											non ipsum. Fusce molestie ultrices nibh feugiat pretium.
											Donec pulvinar arcu metus, et dapibus odio condimentum id.
											Quisque malesuada mauris sit amet dui feugiat, ut pretium
											mauris luctus. Ut aliquam, tellus nec molestie
											condimentum, tellus arcu dignissim quam, a gravida nunc
											nulla vel magna. Sed pulvinar tortor et euismod blandit.
											Proin accumsan orci ac nunc fermentum vehicula.
										</p>
										<p>
											Cras quis neque urna. Pellentesque mollis, dui nec
											elementum elementum, ipsum quam suscipit ligula, sit amet
											lobortis dolor sem sed neque. Vivamus consequat est non
											sodales efficitur. Aliquam sodales eleifend sodales.
											Aliquam auctor ipsum quis nisl facilisis, at convallis
											mauris iaculis. Duis eleifend, magna ac convallis blandit,
											dui dui auctor leo, sed tincidunt nisi mauris ut nulla.
											Praesent porttitor dui ac turpis commodo porttitor.
											Integer ligula nisi, bibendum non sem at, porta
											condimentum dui.
										</p>
										<p>
											Proin id eleifend diam, euismod dictum nibh. Ut
											ullamcorper in purus at tempor. Nullam mattis risus nec
											velit semper lobortis. Donec accumsan ligula fermentum,
											ultricies massa eget, cursus leo. Suspendisse placerat
											elit et lacus aliquam, ut elementum leo aliquet. Integer
											ornare, ipsum eu lacinia viverra, lectus ipsum scelerisque
											nisl, nec iaculis leo elit id arcu. Aliquam id ante elit.
											Donec commodo purus eget lacus pharetra, et egestas metus
											blandit. Quisque pellentesque porta urna, sed dictum enim
											viverra a.
										</p>
										<ul className="tags">
											<li>
												<a href="#">Design</a>
											</li>
											<li>
												<a href="#">Branding</a>
											</li>
											<li>
												<a href="#">Clean</a>
											</li>
											<li>
												<a href="#">CSS3</a>
											</li>
											<li>
												<a href="#">JQuery</a>
											</li>
										</ul>
									</div>
								</Col>
								<Col sm="12">
									<div className="blog-commant blog-card">
										<h3>Comments</h3>
										<ul className="comment-section">
											<li>
												<div className="media">
													<img
														src="../assets/images/avtar/3.jpg"
														alt="Generic placeholder image"
													/>
													<div className="media-body">
														<h6>Josephin water </h6>
														<span>
															( 11 Jannuary 2018 at 1:30AM ){" "}
															<a className="pl-2" href="#">
																reply
															</a>
														</span>
														<p>
															Donec rhoncus massa quis nibh imperdiet dictum.
															Vestibulum id est sit amet felis fringilla
															bibendum at at leo. Proin molestie ac nisi eu
															laoreet. Integer faucibus enim nec ullamcorper
															tempor. Aenean nec felis dui. Integer tristique
															odio mi, in volutpat metus posuere eu. Aenean
															suscipit ipsum nunc, id volutpat lorem hendrerit
															ac. Sed id elit quam. In ac mauris arcu.{" "}
														</p>
													</div>
												</div>
											</li>
											<li>
												<div className="media">
													<img
														src="../assets/images/avtar/1.jpg"
														alt="Generic placeholder image"
													/>
													<div className="media-body">
														<h6>Josephin water </h6>
														<span>
															( 12 Jannuary 2018 at 1:30AM ){" "}
															<a className="pl-2" href="#">
																reply
															</a>
														</span>
														<p>
															Donec rhoncus massa quis nibh imperdiet dictum.
															Vestibulum id est sit amet felis fringilla
															bibendum at at leo. Proin molestie ac nisi eu
															laoreet. Integer faucibus enim nec ullamcorper
															tempor. Aenean nec felis dui. Integer tristique
															odio mi, in volutpat metus posuere eu. Aenean
															suscipit ipsum nunc, id volutpat lorem hendrerit
															ac. Sed id elit quam. In ac mauris arcu.{" "}
														</p>
													</div>
												</div>
											</li>
											<li className="replay">
												<div className="media">
													<img
														src="../assets/images/avtar/1.jpg"
														alt="Generic placeholder image"
													/>
													<div className="media-body">
														<h6>Josephin water </h6>
														<span>
															( 12 Jannuary 2018 at 1:30AM ){" "}
															<a className="pl-2" href="#">
																reply
															</a>
														</span>
														<p>
															Donec rhoncus massa quis nibh imperdiet dictum.
															Vestibulum id est sit amet felis fringilla
															bibendum at at leo. Proin molestie ac nisi eu
															laoreet. Integer faucibus enim nec ullamcorper
															tempor. Aenean nec felis dui. Integer tristique
															odio mi, in volutpat metus posuere eu. Aenean
															suscipit ipsum nunc, id volutpat lorem hendrerit
															ac. Sed id elit quam. In ac mauris arcu.
														</p>
													</div>
												</div>
												<ul>
													<li className="replay">
														<div className="media">
															<img
																src="../assets/images/avtar/1.jpg"
																alt="Generic placeholder image"
															/>
															<div className="media-body">
																<h6>Josephin water </h6>
																<span>
																	( 12 Jannuary 2018 at 1:30AM ){" "}
																	<a className="pl-2" href="#">
																		reply
																	</a>
																</span>
																<p>
																	Donec rhoncus massa quis nibh imperdiet
																	dictum. Vestibulum id est sit amet felis
																	fringilla bibendum at at leo. Proin molestie
																	ac nisi eu laoreet. Integer faucibus enim nec
																	ullamcorper tempor. Aenean nec felis dui.
																	Integer tristique odio mi, in volutpat metus
																	posuere eu. Aenean suscipit ipsum nunc, id
																	volutpat lorem hendrerit ac. Sed id elit quam.
																	In ac mauris arcu.
																</p>
															</div>
														</div>
													</li>
												</ul>
											</li>
											<li>
												<div className="media">
													<img
														src="../assets/images/avtar/3.jpg"
														alt="Generic placeholder image"
													/>
													<div className="media-body">
														<h6>Josephin water </h6>
														<span>
															( 11 Jannuary 2018 at 1:30AM ){" "}
															<a className="pl-2" href="#">
																reply
															</a>
														</span>
														<p>
															Donec rhoncus massa quis nibh imperdiet dictum.
															Vestibulum id est sit amet felis fringilla
															bibendum at at leo. Proin molestie ac nisi eu
															laoreet. Integer faucibus enim nec ullamcorper
															tempor. Aenean nec felis dui. Integer tristique
															odio mi, in volutpat metus posuere eu. Aenean
															suscipit ipsum nunc, id volutpat lorem hendrerit
															ac. Sed id elit quam. In ac mauris arcu.{" "}
														</p>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</Col>
								<Col sm="12">
									<div className="blog-contact blog-card">
										<h3>Leave Your Comment</h3>
										<form className="default-form">
											<Row>
												<Col md="4" sm="4" className="mt-3">
													<FormGroup>
														<label htmlFor="name">Name</label>
														<input
															className="form-control"
															id="name"
															type="text"
															placeholder="Enter Your name"
															required=""
														/>
													</FormGroup>
												</Col>
												<Col md="4" sm="4" className="mt-3">
													<FormGroup>
														<label htmlFor="email">Email</label>
														<input
															className="form-control"
															id="email"
															type="text"
															placeholder="Email"
															required=""
														/>
													</FormGroup>
												</Col>
												<Col md="4" sm="4" className="mt-3">
													<FormGroup>
														<label htmlFor="emailid">Website</label>
														<input
															className="form-control"
															id="emailid"
															type="text"
															placeholder="Website"
															required=""
														/>
													</FormGroup>
												</Col>
												<Col xs="12" className="mt-3">
													<FormGroup>
														<label htmlFor="exampleFormControlTextarea1">
															Comment
														</label>
														<textarea
															className="form-control"
															id="exampleFormControlTextarea1"
															placeholder="Write Your Comment"
															rows="6"
														></textarea>
													</FormGroup>
													<FormGroup>
														<a className="btn btn-primary" href="#">
															Post Comment
														</a>
													</FormGroup>
												</Col>
											</Row>
										</form>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			</section>
		</CommonLayout>
	);
};

export default DetailSidebar;
