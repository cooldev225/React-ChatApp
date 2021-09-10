import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";

import {
	Col,
	Collapse,
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavItem,
	NavLink,
	Row,
} from "reactstrap";

const Header = () => {
	const router = useRouter()
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [dropdownOpen3, setDropdownOpen3] = useState(false);
	const [dropdownOpen4, setDropdownOpen4] = useState(false);
	const [isMenu, setisMenu] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const toggle3 = () => setDropdownOpen3((prevState) => !prevState);
	const toggle4 = () => setDropdownOpen4((prevState) => !prevState);

	const handleScroll = () => {
		if (window.scrollY > 60) {
			document.querySelector(".landing-header").classList.add("fixed");
		} else {
			document.querySelector(".landing-header").classList.remove("fixed");
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div>
			<div className={`${router.pathname ==='/landing' || router.pathname === '/' ? "theme-landing" : ""}`}>
				<header id="home">
					<Container className="custom-container">
						<Row>
							<Col className="col-12">
								<div className="landing-header">
									<div className="main-menu">
										<Navbar className="navbar navbar-expand-xl navbar-light">
											<a className="navbar-brand" href="/landing">
												<div className="logo-block">
													<img
														className="img-fluid"
														src="/assets/images/logo/landing-logo.png"
														alt="logo"
													/>
												</div>
											</a>
											<button
												className="navbar-toggler d-xl-none"
												type="button"
												data-toggle="collapse"
												data-target="#navbarNav"
												aria-controls="navbarNav"
												aria-expanded={isMenu}
												aria-label="Toggle navigation"
												onClick={() => setisMenu(!isMenu)}
											>
												<span className="navbar-toggler-icon"></span>
											</button>
											<Collapse
												className="navbar-collapse d-xl-block"
												id="navbarNav"
												isOpen={isMenu}
											>
												<Nav className="mr-auto" navbar>
													<NavItem className="active">
														<NavLink href="/messenger">
															Messenger
															<span className="sr-only">(current)</span>
														</NavLink>
													</NavItem>
													<Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
														<DropdownToggle nav caret>
															Blog
														</DropdownToggle>
														<DropdownMenu>
															<DropdownItem href="/blog/rightSidebar">
																Blog Right sidebar
															</DropdownItem>
															<DropdownItem href="/blog/leftSidebar">
																Blog Left sidebar
															</DropdownItem>
															<DropdownItem href="/blog/detailSidebar">
																Blog Details
															</DropdownItem>
															<DropdownItem href="/blog/noSidebar">
																Blog No sidebar
															</DropdownItem>
														</DropdownMenu>
													</Dropdown>

													<Dropdown nav isOpen={dropdownOpen3} toggle={toggle3}>
														<DropdownToggle nav caret>
															Authentication
														</DropdownToggle>
														<DropdownMenu>
															<DropdownItem href="/auth/signIn">
																Signin
															</DropdownItem>
															<DropdownItem href="/auth/signInClassic">
																Signin Classic
															</DropdownItem>
															<DropdownItem href="/auth/signUp">
																Signup
															</DropdownItem>
															<DropdownItem href="/auth/signUpClassic">
																Signup Classic
															</DropdownItem>
														</DropdownMenu>
													</Dropdown>

													<Dropdown nav isOpen={dropdownOpen4} toggle={toggle4}>
														<DropdownToggle nav caret>
															Bouns page
														</DropdownToggle>

														<DropdownMenu>
															<DropdownItem href="/bonus/about">
																About
															</DropdownItem>
															<DropdownItem href="/bonus/faq">FAQ</DropdownItem>
															<DropdownItem href="/bonus/elements">
																Elements
															</DropdownItem>
															<DropdownItem href="/bonus/price">Price</DropdownItem>
														</DropdownMenu>
													</Dropdown>
												</Nav>
											</Collapse>
										</Navbar>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</header>
			</div>
		</div>
	);
};

export default Header;
