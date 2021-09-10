import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Search, Plus, X, Star } from "react-feather";
const Section2 = (props) => {
	const [searchToggle, setSearchToggle] = useState(false);
	const [newContactModal, setContactModal] = useState(false);
	const closeLeftSide = () => {
		document.querySelector(".fevorite-tab").classList.remove("active");
		document.querySelector(".recent-default").classList.add("active");
		props.ActiveTab("");
	};

	const addToFavourite = (e) => {
		e.currentTarget.classList.toggle("btn-outline-primary");
		e.currentTarget.classList.toggle("btn-primary");
	};

	return (
		<div
			className={`fevorite-tab dynemic-sidebar ${
				props.tab === "fevorite" ? "active" : ""
			}`}
			id="favourite"
		>
			<div className="theme-title">
				<div className="media">
					<div>
						<h2>Favourite</h2>
						<h4>Last Recent</h4>
					</div>
					<div className="media-body text-right">
						{" "}
						<a
							className="icon-btn btn-outline-primary btn-sm m-r-15 search"
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
								></div>
							</div>
						</form>
						<a
							className="icon-btn btn-outline-primary btn-sm m-r-15"
							href="#"
							onClick={() => setContactModal(!newContactModal)}
						>
							<Plus />
						</a>
						<Modal
							isOpen={newContactModal}
							toggle={() => setContactModal(!newContactModal)}
							className="fade show add-popup add-contact-modal"
							centered
						>
							<ModalHeader toggle={() => setContactModal(!newContactModal)}>
								{"Add Contact"}
							</ModalHeader>
							<ModalBody>
								<form className="default-form">
									<div className="form-group">
										<h5>Email or Username</h5>
										<input
											className="form-control"
											id="exampleInputEmail1"
											type="text"
											placeholder="Josephin water"
										/>
									</div>
									<div className="form-group mb-0">
										<h5>Contact number</h5>
										<input
											className="form-control"
											id="examplemsg"
											type="number"
											placeholder="12345678912"
										/>
									</div>
								</form>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									className="button-effect"
									size="sm"
									onClick={() => setContactModal(!newContactModal)}
								>
									Cancel
								</Button>
								<Button
									color="primary"
									className="button-effect"
									size="sm"
									onClick={() => setContactModal(!newContactModal)}
								>
									Add contact
								</Button>
							</ModalFooter>
						</Modal>
						<a
							className="icon-btn btn-outline-primary btn-sm close-panel"
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
						<div className="media">
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
								<h6>Alabma , USA</h6>
							</div>
							<div className="media-body">
								<a
									className="icon-btn btn-outline-primary btn-sm pull-right favourite"
									href="#"
									onClick={(e) => addToFavourite(e)}
								>
									<Star />
								</a>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div className="media">
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
								<h6>Los Angeles, California</h6>
							</div>
							<div className="media-body">
								<a
									className="icon-btn btn-outline-primary btn-sm pull-right favourite"
									href="#"
									onClick={(e) => addToFavourite(e)}
								>
									{" "}
									<Star />
								</a>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div className="media">
							<div
								className="profile busy"
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
								<h6>Glasgow , Scotland</h6>
							</div>
							<div className="media-body">
								<a
									className="icon-btn btn-outline-primary btn-sm pull-right favourite"
									href="#"
									onClick={(e) => addToFavourite(e)}
								>
									{" "}
									<Star />
								</a>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div className="media">
							<div
								className="profile unreachable"
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
								<h6>Leicester , England</h6>
							</div>
							<div className="media-body">
								<a
									className="icon-btn btn-outline-primary btn-sm pull-right favourite"
									href="#"
									onClick={(e) => addToFavourite(e)}
								>
									{" "}
									<Star />
								</a>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div className="media">
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
								<h6>Alabma , USA</h6>
							</div>
							<div className="media-body">
								<a
									className="icon-btn btn-outline-primary btn-sm pull-right favourite"
									href="#"
									onClick={(e) => addToFavourite(e)}
								>
									{" "}
									<Star />
								</a>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div className="chat-box">
						<div className="media">
							<div
								className="profile online"
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
								<h6>Alabma , USA</h6>
							</div>
							<div className="media-body">
								<a
									className="icon-btn btn-outline-primary btn-sm pull-right favourite"
									href="#"
									onClick={(e) => addToFavourite(e)}
								>
									{" "}
									<Star />
								</a>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Section2;
