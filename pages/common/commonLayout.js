import React, { Fragment, useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import TapTop from "../common/tapTop";

const CommonLayout = ({ children, title, parent }) => {
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
		<Fragment>
			<div className="inner-page">
				<Header />
				<section className="breadcrumb-main">
					<div className="custom-container">
						<h2>{title}</h2>
						<ul>
							<li>
								<a href="/messenger">{parent}</a>
							</li>
							<li>
								<a href="#">{title}</a>
							</li>
						</ul>
					</div>
				</section>
			</div>
			<>{children}</>
			<Footer />
			<TapTop />
		</Fragment>
	);
};

export default CommonLayout;
