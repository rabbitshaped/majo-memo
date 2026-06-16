import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableNote({ id, children }) {
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
			scaleX: isDragging ? 1.03 : 1,
			scaleY: isDragging ? 1.03 : 1,
		}),
		transition,
		visibility: isDragging ? "hidden" : "visible",
	};

	return (
		<div ref={setNodeRef} style={style} className="sortable-wrapper">
			<div className="drag-strip" {...attributes} {...listeners} />

			{children}
		</div>
	);
}

export default SortableNote;
