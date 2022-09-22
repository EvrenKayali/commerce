import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface props {
  children: React.ReactNode;
  actions?: React.ReactNode;
  id: string | number;
}

export default function SortableItem({ children, actions, id }: props) {
  const { setNodeRef, attributes, listeners, transform } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style}>
      {actions && <div>{actions}</div>}
      <div {...attributes} {...listeners}>
        {children}
      </div>
    </div>
  );
}
