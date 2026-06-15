import React from "react";
import SearchBar from "./SearchBar";
import { Moon, Sun } from "lucide-react";

function Header(props) {
	return (
		<header className="header">
			<div className="header-left">
				<h1>Majo Memo</h1>
				<p>A tidy notebook for chaotic witches.</p>
			</div>
			<div className="header-right">
				<SearchBar value={props.searchTerm} onChange={props.setSearchTerm} />
				{/* <button
					className="theme-toggle"
					onClick={() => props.setDarkMode(!props.darkMode)}
				>
					{props.darkMode ? <Sun /> : <Moon />}
				</button> */}

				<div
					className={`theme-toggle ${props.darkMode ? "active" : ""}`}
					onClick={() => props.setDarkMode(!props.darkMode)}
				>
					<div className="toggle-thumb">
						{props.darkMode ? <Moon size={24} /> : <Sun size={24} />}
					</div>
				</div>

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
