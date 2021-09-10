import React from "react";

const Sidebar = () => {
	return (
		<div>
			<div className="blog-sidebar">
				<div className="blog-card">
					<h4>search</h4>
					<div className="blog-search">
						<div className="input-group">
							<input
								className="form-control"
								type="text"
								placeholder="search in blog"
							/>
							<span className="input-group-text">
								<i className="fa fa-search"></i>
							</span>
						</div>
					</div>
				</div>
				<div className="blog-card">
					<h4>follow us</h4>
					<ul className="blog-follow">
						<li>
							<a href="https://www.facebook.com/"><i className="fa fa-facebook-square"></i></a>
						</li>
						<li>
							<a href="https://twitter.com/"><i className="fa fa-twitter"></i></a>
						</li>
						<li>
							<a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a>
						</li>
						<li>
							<a href="https://www.skype.com/"><i className="fa fa-skype"></i></a>
						</li>
						<li>
							<a href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></a>
						</li>
					</ul>
				</div>
				<div className="blog-card">
					<h4>Recent Blog</h4>
					<ul className="recent-blog">
						<li>
							<div className="media">
								<img
									className="img-fluid blur-up lazyload"
									src="../assets/images/blog/small/1.jpg"
									alt="Generic placeholder image"
								/>
								<div className="media-body align-self-center">
									<h5>1 Dec 2020</h5>
									<p>0 hits</p>
								</div>
							</div>
						</li>
						<li>
							<div className="media">
								<img
									className="img-fluid blur-up lazyload"
									src="../assets/images/blog/small/2.jpg"
									alt="Generic placeholder image"
								/>
								<div className="media-body align-self-center">
									<h5>2 Dec 2020</h5>
									<p>0 hits</p>
								</div>
							</div>
						</li>
						<li>
							<div className="media">
								<img
									className="img-fluid blur-up lazyload"
									src="../assets/images/blog/small/3.jpg"
									alt="Generic placeholder image"
								/>
								<div className="media-body align-self-center">
									<h5>3 Dec 2020</h5>
									<p>0 hits</p>
								</div>
							</div>
						</li>
						<li>
							<div className="media">
								<img
									className="img-fluid blur-up lazyload"
									src="../assets/images/blog/small/4.jpg"
									alt="Generic placeholder image"
								/>
								<div className="media-body align-self-center">
									<h5>4 Dec 2020</h5>
									<p>0 hits</p>
								</div>
							</div>
						</li>
						<li>
							<div className="media">
								<img
									className="img-fluid blur-up lazyload"
									src="../assets/images/blog/small/2.jpg"
									alt="Generic placeholder image"
								/>
								<div className="media-body align-self-center">
									<h5>5 Dec 2020</h5>
									<p>0 hits</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div className="blog-card">
					<h4>Popular Blog</h4>
					<ul className="popular-blog">
						<li>
							<div className="media">
								<div className="blog-date">
									<h3>03 </h3>
									<span>may</span>
								</div>
								<div className="media-body align-self-center">
									<h5>Humour the like </h5>
									<p>
										it look like readable English. Many desktop publishing text.
									</p>
								</div>
							</div>
						</li>
						<li>
							<div className="media">
								<div className="blog-date">
									<h3>03 </h3>
									<span>may</span>
								</div>
								<div className="media-body align-self-center">
									<h5>Injected like</h5>
									<p>
										it look like readable English. Many desktop publishing text.
									</p>
								</div>
							</div>
						</li>
						<li>
							<div className="media">
								<div className="blog-date">
									<h3>03 </h3>
									<span>may</span>
								</div>
								<div className="media-body align-self-center">
									<h5>Injected like </h5>
									<p>
										it look like readable English. Many desktop publishing text.
									</p>
								</div>
							</div>
						</li>
						<li>
							<div className="media">
								<div className="blog-date">
									<h3>03 </h3>
									<span>may</span>
								</div>
								<div className="media-body align-self-center">
									<h5>Injected the</h5>
									<p>
										it look like readable English. Many desktop publishing text.
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div className="blog-card">
					<ul className="tags">
						<li>
							{" "}
							<a href="#">Design</a>
						</li>
						<li>
							<a href="#">Clean</a>
						</li>
						<li>
							<a href="#">CSS3</a>
						</li>
						<li>
							<a href="#">Portfolio</a>
						</li>
						<li>
							<a href="#">Pixelstrap</a>
						</li>
						<li>
							<a href="#">Perfect</a>
						</li>
						<li>
							<a href="#">NoJquery </a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
