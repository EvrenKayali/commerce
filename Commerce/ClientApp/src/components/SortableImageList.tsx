import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
} from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Grid } from "@mui/material";
import SortableItem from "./SortableItem";

export interface Image {
  src: string;
  id: string | UniqueIdentifier;
}

interface props {
  images: Image[];
  onDragEnd: (event: DragEndEvent) => void;
}

export default function SortableImageList({ images, onDragEnd }: props) {
  const sensor = [useSensor(PointerSensor)];

  return (
    <DndContext
      sensors={sensor}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={images.map((i) => i.id)}
        strategy={rectSortingStrategy}
      >
        <Grid p="1rem" container spacing={2}>
          {images?.map((image, idx) => {
            return (
              <Grid item key={idx}>
                <SortableItem id={image.id}>
                  <img
                    src={image.src}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </SortableItem>
              </Grid>
            );
          })}
        </Grid>
      </SortableContext>
    </DndContext>
  );
}
