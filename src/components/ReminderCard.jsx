import React from "react";

function ReminderCard() {
	return (
		<div className="memo reminder-card">
			<img src="/images/ringing-bell.png" className="reminder-corner" alt="" />
			{/* <span className="memo-corner">✨</span> */}

			<h2>Reminder</h2>

			<p>Parent meeting at 14:00 on Friday.</p>
		</div>
	);
}

export default ReminderCard;
