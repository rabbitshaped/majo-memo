import React from "react";
import { Search, X } from "lucide-react";

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

			{props.value && (
				<button
					type="button"
					className="clear-search"
					onClick={() => props.onChange("")}
					aria-label="Clear search"
				>
					<X size={16} />
				</button>
			)}
		</div>
	);
}

export default SearchBar;
