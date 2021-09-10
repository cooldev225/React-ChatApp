import { useContext, useState } from "react";
import ChatContext from "../../helpers/chatContext";
import SliderSection from "./sliderSection";

const RecentSection = (props) => {
	const { handleClickRight, mainMenu } = useContext(ChatContext);
	const [sidebarToggle, setSidebarToggle] = useState(false);
	const OpenCloseSidebar = (sidebar) => {
		if (sidebar) {
			setSidebarToggle(!sidebar);
			document.querySelector(".main-nav").classList.add("on");
		} else {
			setSidebarToggle(!sidebar);
			document.querySelector(".main-nav").classList.remove("on");
		}
	};

	const hangleRightClick = () => {
		handleClickRight(!mainMenu);
		document.querySelector(".main-nav").classList.remove("on");
		document.querySelector(".app-sidebar").classList.add("active");
	};

	return (
		<div className="recent">
			<div className="theme-title">
				<div className="media">
					<div>
						<h2>Recent</h2>
						<h4>Chat from your friends &#128536;</h4>
					</div>
					<div className="media-body">
						<a
							className={`icon-btn button-effect pull-right mobile-back  ${
								sidebarToggle ? "btn-outline-primary" : "btn-outline-light"
							}`}
							href="#"
						>
							<i
								className="ti-angle-right"
								onClick={() => hangleRightClick()}
							></i>
						</a>
						<a
							className={`icon-btn button-effect pull-right mainnav  ${
								sidebarToggle ? "btn-outline-primary" : "btn-outline-light"
							}`}
							href="#"
							onClick={() => OpenCloseSidebar(sidebarToggle)}
						>
							<i className="ti-layout-grid2"></i>
						</a>
					</div>
				</div>
			</div>
			<SliderSection />
		</div>
	);
};

export default RecentSection;
