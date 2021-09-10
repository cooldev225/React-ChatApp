import { Fragment, useEffect, useState, useContext } from "react";
import CustomizerContext from "../../helpers/customizerContext";
import {
	Container,
	Row,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import { config } from "../../config/customizerConfig.json";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const ThemeCustomizer = () => {
	const customizerCtx = useContext(CustomizerContext);
	const addSidebarBackgroundLayout = customizerCtx.addSidebarBackgroundLayout;
	const addLayoutType = customizerCtx.addLayoutType;
	const addSidebarTypes = customizerCtx.addSidebarTypes;
	const addThemeColors = customizerCtx.addThemeColors;
	const addBackgroundWallpaper = customizerCtx.addBackgroundWallpaper;
	const addBackgroundWallpaperGradients =
		customizerCtx.addBackgroundWallpaperGradients;
	const [modal, setModal] = useState();
	const [customizer, setCustomizer] = useState(false);
	const [layout, setLayout] = useState(true);

	useEffect(() => {
		// sidebar type ltr or rtl
		document.querySelector(".main-nav").className =
			"main-nav custom-scroll " + config.sidebar_setting;

		if (!config.layout_type) {
			// sidebar background layout
			document.body.className = config.sidebar_layout;
		} else {
			// layout type
			document.body.className = `sidebar-active ${config.layout_type}`;
			document.querySelector(
				".rtl-setting"
			).className = `rtl-setting icon-btn btn-primary ${config.layout_type}`;
		}

		if (localStorage.getItem("layout_mode")) {
			document.body.className = `sidebar-active main-page ${localStorage.getItem(
				"layout_mode"
			)}`;
		}

		// theme color
		document.documentElement.className =
			config.color || localStorage.getItem("color");

		// wallpaper and gradients
		if (config.wallpaper) {
			document.querySelector(".wallpapers");
		}
	}, []);

	const toggle = () => {
		setModal(!modal);
	};

	const openCloseCustomizer = (open) => {
		setCustomizer(open);
	};

	const handleSidebarBackgroundLayout = (e, layout) => {
		addSidebarBackgroundLayout(e, layout);
		config.sidebar_layout = layout;
	};

	const handleLayoutType = (layouts) => {
		if (layouts) {
			setLayout(!layouts);
			addLayoutType("rtl");
			config.layout_type = "rtl";
		} else {
			setLayout(!layouts);
			addLayoutType("");
			config.layout_type = "";
		}
	};

	const handleSidebarType = (e, type) => {
		addSidebarTypes(e, type);
		config.sidebar_setting = type;
	};

	const colorChangeTheme = (e, color) => {
		addThemeColors(e, color);
		config.color = color;
	};

	const setBackgroundWallpaper = (e, wallpaper) => {
		addBackgroundWallpaper(e, wallpaper);
		config.wallpaper = wallpaper;
	};

	const setBackgroundWallpaperGradients = (e, gradient) => {
		document.querySelectorAll(".wallpaper li").forEach((item) => {
			item.classList.remove("active");
		});
		addBackgroundWallpaperGradients(gradient);
		e.currentTarget.classList.add("active");
		if (gradient === "grediant-1") {
			document.querySelector(
				".wallpapers"
			).style = `background-image: linear-gradient(359.3deg, rgba(28, 157, 234, 0.1) 1%, rgba(187, 187, 187, 0) 70.9%); background-color: transparent; background-blend-mode: unset;`;
		}
		if (gradient === "grediant-2") {
			document.querySelector(
				".wallpapers"
			).style = `background-image: radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%); background-color: transparent; background-blend-mode: unset;`;
		}
		if (gradient === "grediant-3") {
			document.querySelector(
				".wallpapers"
			).style = `background-image: linear-gradient(109.6deg, rgb(223, 234, 247) 11.2%, rgb(244, 248, 252) 91.1%); background-color: transparent; background-blend-mode: unset;`;
		}
		if (gradient === "grediant-4") {
			document.querySelector(
				".wallpapers"
			).style = `background-image: linear-gradient(-109.6deg, rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%); background-color: transparent; background-blend-mode: unset;`;
		}
		if (gradient === "grediant-5") {
			document.querySelector(
				".wallpapers"
			).style = `background-image: radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%); background-color: transparent; background-blend-mode: unset;`;
		}
		if (gradient === "grediant-6") {
			document.querySelector(
				".wallpapers"
			).style = `background-image: radial-gradient(circle at 10% 20%, rgb(226, 240, 254) 0%, rgb(255, 247, 228) 90%); background-color: transparent; background-blend-mode: unset;`;
		}
	};

	return (
		<Fragment>
			<div className="sidebar-pannle-main">
				<ul>
					<li
						className="rtl-setting icon-btn btn-primary"
						onClick={() => handleLayoutType(layout)}
					>
						{layout ? "RTL" : "LTR"}
					</li>
					<li
						className="cog-click icon-btn btn-success"
						onClick={() => openCloseCustomizer(!customizer)}
					>
						<i className="fa fa-cog"></i>
					</li>
				</ul>
			</div>
			<section
				className="setting-sidebar"
				style={customizer ? { right: "0px" } : { right: "-400px" }}
			>
				<div className="theme-title">
					<div className="media">
						<div>
							<h2>{"Customizer"}</h2>
							<h4>{"Real Time Customize"}</h4>
							<Button
								color="primary"
								className="plus-popup mt-2 btn-sm"
								onClick={() => setModal(!modal)}
							>
								{"Configuration"}
							</Button>
						</div>
						<div
							className="media-body"
							onClick={() => openCloseCustomizer(!customizer)}
						>
							<a
								className="icon-btn btn-outline-light button-effect pull-right cog-close"
								href="#"
							>
								<i className="fa fa-close"></i>
							</a>
						</div>

						<Modal
							isOpen={modal}
							toggle={toggle}
							className="modal-body configuration-modal add-popup"
							centered={true}
						>
							<ModalHeader toggle={toggle}>{"Modal Title"}</ModalHeader>
							<ModalBody>
								<Container fluid={true} className="bd-example-row">
									<Row>
										<p>
											{
												"To replace our design with your desired theme. Please do configuration as mention"
											}{" "}
										</p>
										<p>
											{" "}
											<b>
												{" "}
												{"Path : src > config > customizerConfig.json"}
											</b>{" "}
										</p>
									</Row>
									{Object.keys(config).map((key, i) => (
										<h5 className="mb-2" key={i}>
											<span>{key}:</span> <span>{`${config[key]}`}</span>
										</h5>
									))}
								</Container>
							</ModalBody>
							<ModalFooter>
								<CopyToClipboard text={JSON.stringify(config)}>
									<Button
										color="primary"
										className="notification btn-sm"
										onClick={() =>
											toast.success("Code Copied to clipboard !", {
												position: toast.POSITION.BOTTOM_RIGHT,
											})
										}
									>
										{"CopyText"}
									</Button>
								</CopyToClipboard>
								<Button color="secondary" className="btn-sm" onClick={toggle}>
									{"Cancel"}
								</Button>
							</ModalFooter>
						</Modal>
					</div>
				</div>
				<div className="color-picker">
					<h5>{"Choose color"}</h5>
					<ul className="colors">
						<li
							className="color active"
							onClick={(e) => colorChangeTheme(e, "style")}
						></li>
						<li
							className="color1"
							onClick={(e) => colorChangeTheme(e, "style1")}
						></li>
						<li
							className="color2"
							onClick={(e) => colorChangeTheme(e, "style2")}
						></li>
						<li
							className="color3"
							onClick={(e) => colorChangeTheme(e, "style3")}
						></li>
						<li
							className="color4"
							onClick={(e) => colorChangeTheme(e, "style4")}
						></li>
						<li
							className="color5"
							onClick={(e) => colorChangeTheme(e, "style5")}
						></li>
						<li
							className="color6"
							onClick={(e) => colorChangeTheme(e, "style6")}
						></li>
					</ul>
				</div>
				<div className="theme-layout">
					<h5>{"Layout"}</h5>
					<ul className="theme-layout-type">
						<li
							className="active"
							onClick={(e) => handleSidebarBackgroundLayout(e, "")}
						>
							<div className="sidebar"></div>
							<div className="sidebar-content"></div>
						</li>
						<li
							data-attr="dark-sidebar"
							onClick={(e) => handleSidebarBackgroundLayout(e, "dark-sidebar")}
						>
							<div className="sidebar"></div>
							<div className="sidebar-content"></div>
						</li>
						<li
							data-attr="dark"
							onClick={(e) => handleSidebarBackgroundLayout(e, "dark")}
						>
							<div className="sidebar"></div>
							<div className="sidebar-content"></div>
						</li>
						<li
							data-attr="colorfull"
							onClick={(e) => handleSidebarBackgroundLayout(e, "colorfull")}
						>
							<div className="sidebar"></div>
							<div className="sidebar-content"></div>
						</li>
					</ul>
				</div>
				<div className="chat-wallpaper">
					<h5>{"Chat wallpaper"}</h5>
					<ul className="wallpaper">
						<li
							className="bg-color bg-default active"
							onClick={(e) => setBackgroundWallpaper(e, 0)}
						></li>
						<li
							onClick={(e) => setBackgroundWallpaper(e, 2)}
							className="bg-size"
							style={{
								backgroundImage: `url("/assets/images/wallpaper/2.jpg")`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="../assets/images/wallpaper/2.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</li>
						<li
							onClick={(e) => setBackgroundWallpaper(e, 3)}
							className="bg-size"
							style={{
								backgroundImage: `url('/assets/images/wallpaper/3.jpg')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="../assets/images/wallpaper/3.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</li>
						<li
							onClick={(e) => setBackgroundWallpaper(e, 4)}
							className="bg-size"
							style={{
								backgroundImage: `url(/assets/images/wallpaper/4.jpg)`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="../assets/images/wallpaper/4.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</li>
						<li
							onClick={(e) => setBackgroundWallpaper(e, 5)}
							className="bg-size"
							style={{
								backgroundImage: `url(/assets/images/wallpaper/5.jpg)`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="../assets/images/wallpaper/5.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</li>
						<li
							onClick={(e) => setBackgroundWallpaper(e, 1)}
							className="bg-size"
							style={{
								backgroundImage: `url("/assets/images/wallpaper/1.jpg")`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								display: "block",
							}}
						>
							<img
								className="bg-img"
								src="../assets/images/wallpaper/1.jpg"
								alt="Avatar"
								style={{ display: "none" }}
							/>
						</li>
						<li
							onClick={(e) => setBackgroundWallpaperGradients(e, "grediant-1")}
							className="bg-color grediant-1"
						></li>
						<li
							onClick={(e) => setBackgroundWallpaperGradients(e, "grediant-2")}
							className="bg-color grediant-2"
						></li>
						<li
							onClick={(e) => setBackgroundWallpaperGradients(e, "grediant-3")}
							className="bg-color grediant-3"
						></li>
						<li
							onClick={(e) => setBackgroundWallpaperGradients(e, "grediant-4")}
							className="bg-color grediant-4"
						></li>
						<li
							onClick={(e) => setBackgroundWallpaperGradients(e, "grediant-5")}
							className="bg-color grediant-5"
						></li>
						<li
							onClick={(e) => setBackgroundWallpaperGradients(e, "grediant-6")}
							className="bg-color grediant-6"
						></li>
					</ul>
					<div className="sidebar-setting">
						<h5>{"Sidebar"}</h5>
						<ul className="sidebar-type">
							<li
								className="three-column active"
								onClick={(e) => handleSidebarType(e, "on")}
							>
								<div className="sm-sidebar"></div>
								<div className="sidebar"></div>
								<div className="sidebar-content"></div>
							</li>
							<li
								className="two-column"
								onClick={(e) => handleSidebarType(e, "")}
							>
								<div className="sidebar"></div>
								<div className="sidebar-content"></div>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

export default ThemeCustomizer;
