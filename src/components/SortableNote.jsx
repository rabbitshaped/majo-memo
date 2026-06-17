import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableNote({ id, children, isNew, isDeleting }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id,
	});

	const style = {
		transform: CSS.Transform.toString({
			...transform,
			scaleX: isDragging ? 0.98 : 1,
			scaleY: isDragging ? 0.98 : 1,
		}),
		transition,
	};
	const className = [
		"sortable-wrapper",
		isDragging ? "is-dragging" : "",
		isNew ? "note-new" : "",
		isDeleting ? "note-deleting" : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div ref={setNodeRef} style={style} className={className}>
			<button
				className="drag-strip"
				type="button"
				aria-label="Drag note"
				{...attributes}
				{...listeners}
			/>

			{children}
		</div>
	);
}

export default SortableNote;
