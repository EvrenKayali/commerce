import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
} from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
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
  onDragEnd: (event: DragEndEvent) => void;
  onDelete?: (id: string | number) => void;
}

export default function SortableImageList({
  images,
  onDragEnd,
  onDelete,
}: props) {
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
              <Grid item key={image.id}>
                <SortableItem
                  id={image.id}
                  actions={
                    <Box bgcolor="blueviolet">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          onDelete && onDelete(image.id);
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
