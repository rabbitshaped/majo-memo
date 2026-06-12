import React from "react";
import { Search } from "lucide-react";

function SearchBar(props) {
	return (
		<div className="search-container">
			<Search className="search-icon" size={18} />
			<input
				className="search"
				type="text"
				placeholder="Search spellbook"
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
			/>
		</div>
	);
}

export default SearchBar;
