import { useState } from "react";
import { Search, X } from "react-feather";
const ContactListSection = (props) => {
	const [searchToggle, setSearchToggle] = useState(false);
	const closeLeftSide = () => {
		document.querySelector(".contact-list-tab").classList.remove("active");
		document.querySelector(".recent-default").classList.add("active");
		props.ActiveTab("");
	};
	return (
		<div
			className={`contact-list-tab dynemic-sidebar custom-scroll ${
				props.tab === "contact" ? "active" : ""
			}`}
			id="contact-list"
		>
			<div className="theme-title">
				<div className="media">
					<div>
						<h2>Contact</h2>
						<h4>Start talking now</h4>
					</div>
					<div className="media-body text-right">
						{" "}
						<a
							className="icon-btn btn-outline-light btn-sm m-r-15 search"
							href="#"
							onClick={() => setSearchToggle(true)}
						>
							{" "}
							<Search />
						</a>
						<form
							className={`form-inline search-form ${
								searchToggle ? "open" : ""
							}`}
						>
							<div className="form-group">
								<input
									className="form-control-plaintext"
									type="search"
									placeholder="Search.."
								/>
								<div
									className="icon-close close-search"
									onClick={() => setSearchToggle(false)}
								>
									{" "}
								</div>
							</div>
						</form>
						<a
							className="icon-btn btn-outline-light btn-sm close-panel"
							href="#"
							onClick={() => closeLeftSide()}
						>
							<X />
						</a>
					</div>
				</div>
			</div>
			<ul className="chat-main">
				<li>
					<div className="chat-box">
						<div
							className="profile offline"
							style={{
								backgroundImage: `url('assets/images/contact/1.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/1.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Josephin water</h5>
							<h6>
								Hi, i am josephin. How are you.. ! There are many variations of
								passages.
							</h6>
						</div>
						<div className="date-status">
							<h6>22/10/19</h6>
							<h6 className="font-success status"> Seen</h6>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile online"
							style={{
								backgroundImage: `url('assets/images/contact/2.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/2.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Jony Lynetin</h5>
							<h6>Hello</h6>
						</div>
						<div className="date-status">
							<h6>30/11/19</h6>
							<div className="badge badge-primary sm">8</div>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile unreachable"
							style={{
								backgroundImage: `url('assets/images/contact/3.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/3.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Sufiya Elija</h5>
							<h6>I need job, please help me.</h6>
						</div>
						<div className="date-status">
							<h6>15/06/19</h6>
							<h6 className="font-dark status"> Sending</h6>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile busy"
							style={{
								backgroundImage: `url('assets/images/contact/4.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/4.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Pabelo Mukrani</h5>
							<h6>
								Hi, i am josephin. How are you.. ! There are many variations of
								passages.
							</h6>
						</div>
						<div className="date-status">
							<h6>04/06/19</h6>
							<h6 className="font-danger status"> Failed</h6>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile offline"
							style={{
								backgroundImage: `url('assets/images/contact/1.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/1.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Josephin water</h5>
							<h6>
								Hi, i am josephin. How are you.. ! There are many variations of
								passages.
							</h6>
						</div>
						<div className="date-status">
							<h6>22/10/19</h6>
							<h6 className="font-success status"> Seen</h6>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile online"
							style={{
								backgroundImage: `url('assets/images/contact/2.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/2.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Jony Lynetin</h5>
							<h6>Hello</h6>
						</div>
						<div className="date-status">
							<h6>30/11/19</h6>
							<div className="badge badge-primary sm">8</div>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile unreachable"
							style={{
								backgroundImage: `url('assets/images/contact/3.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/3.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Sufiya Elija</h5>
							<h6>I need job, please help me.</h6>
						</div>
						<div className="date-status">
							<h6>15/06/19</h6>
							<h6 className="font-dark status"> Sending</h6>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile online"
							style={{
								backgroundImage: `url('assets/images/contact/2.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/2.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Jony Lynetin</h5>
							<h6>Hello</h6>
						</div>
						<div className="date-status">
							<h6>30/11/19</h6>
							<div className="badge badge-primary sm">8</div>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile offline"
							style={{
								backgroundImage: `url('assets/images/contact/1.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/1.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Josephin water</h5>
							<h6>
								Hi, i am josephin. How are you.. ! There are many variations of
								passages.
							</h6>
						</div>
						<div className="date-status">
							<h6>22/10/19</h6>
							<h6 className="font-success status"> Seen</h6>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile online"
							style={{
								backgroundImage: `url('assets/images/contact/2.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/2.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Jony Lynetin</h5>
							<h6>Hello</h6>
						</div>
						<div className="date-status">
							<h6>30/11/19</h6>
							<div className="badge badge-primary sm">8</div>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile unreachable"
							style={{
								backgroundImage: `url('assets/images/contact/3.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/3.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Sufiya Elija</h5>
							<h6>I need job, please help me.</h6>
						</div>
						<div className="date-status">
							<h6>15/06/19</h6>
							<h6 className="font-dark status"> Sending</h6>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile busy"
							style={{
								backgroundImage: `url('assets/images/contact/4.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/4.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Pabelo Mukrani</h5>
							<h6>
								Hi, i am josephin. How are you.. ! There are many variations of
								passages.
							</h6>
						</div>
						<div className="date-status">
							<h6>04/06/19</h6>
							<h6 className="font-danger status"> Failed</h6>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile offline"
							style={{
								backgroundImage: `url('assets/images/contact/1.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/1.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Josephin water</h5>
							<h6>
								Hi, i am josephin. How are you.. ! There are many variations of
								passages.
							</h6>
						</div>
						<div className="date-status">
							<h6>22/10/19</h6>
							<h6 className="font-success status"> Seen</h6>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile online"
							style={{
								backgroundImage: `url('assets/images/contact/2.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/2.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Jony Lynetin</h5>
							<h6>Hello</h6>
						</div>
						<div className="date-status">
							<h6>30/11/19</h6>
							<div className="badge badge-primary sm">8</div>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile unreachable"
							style={{
								backgroundImage: `url('assets/images/contact/3.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/3.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Sufiya Elija</h5>
							<h6>I need job, please help me.</h6>
						</div>
						<div className="date-status">
							<h6>15/06/19</h6>
							<h6 className="font-dark status"> Sending</h6>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div
							className="profile online"
							style={{
								backgroundImage: `url('assets/images/contact/2.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="/assets/images/contact/2.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</div>
						<div className="details">
							<h5>Jony Lynetin</h5>
							<h6>Hello</h6>
						</div>
						<div className="date-status">
							<h6>30/11/19</h6>
							<div className="badge badge-primary sm">8</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default ContactListSection;
