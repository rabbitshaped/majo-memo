import React, { useEffect, useRef } from "react";

function NotesGrid({ children }) {
	const gridRef = useRef(null);

	useEffect(() => {
		const grid = gridRef.current;

		if (!grid) return;

		const resizeGridItem = (item) => {
			const rowHeight = parseInt(
				window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"),
				10,
			);
			const rowGap = parseInt(
				window.getComputedStyle(grid).getPropertyValue("row-gap"),
				10,
			);
			const note = item.querySelector(".memo");

			if (!rowHeight || !note) return;

			const rowSpan = Math.ceil(
				(note.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap),
			);

			item.style.gridRowEnd = `span ${rowSpan}`;
		};

		const items = Array.from(grid.querySelectorAll(".sortable-wrapper"));
		const observer = new ResizeObserver((entries) => {
			entries.forEach((entry) => resizeGridItem(entry.target));
		});

		items.forEach((item) => {
			resizeGridItem(item);
			observer.observe(item);
		});

		return () => observer.disconnect();
	}, [children]);

	return (
		<section ref={gridRef} className="notes-grid">
			{children}
		</section>
	);
}

export default NotesGrid;
