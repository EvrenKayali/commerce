import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { DeleteForever } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";
import SortableItem from "./SortableItem";

export interface Image {
  fileName: string;
  src: string;
  id: string | UniqueIdentifier;
  isNew: boolean;
  order?: number;
}

interface props {
  images: Image[];
  onChange: (images: Image[]) => void;
}

export default function SortableImageList({ images, onChange }: props) {
  const sensor = [useSensor(PointerSensor)];

  function handleSortEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((i) => i.id === active.id);
      const newIndex = images.findIndex((i) => i.id === over?.id);
      const newOrder = arrayMove(images, oldIndex, newIndex);
      onChange(newOrder);
    }
  }

  function handleDelete(imgId: UniqueIdentifier) {
    const newImgs = images.filter((img) => img.id !== imgId);
    onChange(newImgs);
  }

  return (
    <DndContext
      sensors={sensor}
      collisionDetection={closestCenter}
      onDragEnd={handleSortEnd}
    >
      <SortableContext
        items={images.map((i) => i.id)}
        strategy={rectSortingStrategy}
      >
        <Grid p="1rem" container spacing={2}>
          {images?.map((image, idx) => {
            return (
              <Grid item key={image.id}>
                <SortableItem
                  id={image.id}
                  actions={
                    <Box bgcolor="#e6e3e3">
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => {
                          handleDelete(image.id);
                        }}
                      >
                        <DeleteForever />
                      </IconButton>
                    </Box>
                  }
                >
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
