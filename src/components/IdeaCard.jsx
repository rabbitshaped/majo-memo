import React from "react";

function IdeaCard() {
	return (
		<div className="memo ideas-card">
			<img src="/images/witch-hat.png" className="memo-corner" alt="" />
			{/* <span className="memo-corner">🔮</span> */}

			<h2>Ideas</h2>

			<p>Add note colors, drag-and-drop, tags, and a moon phase widget.</p>
		</div>
	);
}

export default IdeaCard;
