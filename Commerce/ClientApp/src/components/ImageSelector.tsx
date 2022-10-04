import { Image } from "./SortableImageList";

export type SelectableImage = Image & { selected?: boolean };

interface props {
  images: SelectableImage[];
  selectedImage?: string;
  onSelect: (src: string) => void;
}
export function ImageSelector({ images, selectedImage, onSelect }: props) {
  return (
    <>
      {images?.map((image) => (
        <img
          key={image.id}
          onClick={() => onSelect(image.src)}
          src={image.src}
          alt=""
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            margin: "1rem",
            border: `${
              selectedImage === image.src ? "solid 2px green" : "none"
            }`,
          }}
        />
      ))}
    </>
  );
}
