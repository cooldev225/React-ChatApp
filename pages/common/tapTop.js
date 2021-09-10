import React, { useState, useEffect } from "react";

const TapTop = (props) => {
	const [taptopStyle, setTapTopStyle] = useState("none");

	const executeScroll = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};

	const handleScroll = () => {
		if (window.scrollY > 600) {
			setTapTopStyle("block");
		} else {
			setTapTopStyle("none");
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
		<div className="tap-top" style={{ display: taptopStyle }}>
			<div>
				<i
					className="fa fa-angle-double-up"
					onClick={() => executeScroll()}
				></i>
			</div>
		</div>
	);
};

export default TapTop;
