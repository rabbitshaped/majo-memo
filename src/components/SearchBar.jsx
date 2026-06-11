import React from "react";
import { Search } from "lucide-react";

function SearchBar() {
	return (
		<div className="search-container">
			<Search className="search-icon" size={18} />
			<input className="search" type="text" placeholder="Search" />
		</div>
	);
}

export default SearchBar;
