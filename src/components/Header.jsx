import React from "react";
import SearchBar from "./SearchBar";

function Header() {
	return (
		<header className="header">
			<div className="header-left">
				<h1>Majo Memo</h1>
				<p>A tidy notebook for chaotic witches.</p>
			</div>
			<div className="header-right">
				<SearchBar />
				<img
					src="./images/right-corner-moon.png"
					alt=""
					className="header-decoration"
				/>
			</div>
		</header>
	);
}

export default Header;
