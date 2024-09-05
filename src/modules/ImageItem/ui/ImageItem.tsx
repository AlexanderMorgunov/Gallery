import { FC, useEffect, useState } from "react";
import { getImage } from "../api/getImage";
// import { GalleryItem } from "../../../shared/types/GalleryItem";
import styled from "styled-components";
import { GalleryItemModuleType } from "../../../shared/store";

interface ItemProps {
  item: GalleryItemModuleType;
  onClickHandler: (item: GalleryItemModuleType) => void;
}

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin: 0.5rem;
  text-align: center;
  background-color: #f9f9f9;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
    transition: background-color 0.3s ease-in-out;
  }
  > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin-bottom: 0.5rem;
  }
`;

const ImageItem: FC<ItemProps> = ({ item, onClickHandler }) => {
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    getImage(item.thumbnail ?? item.image).then((data) => {
      setImage(URL.createObjectURL(data));
    });
  }, []);
  return (
    <StyledItem key={item.id} onClick={() => onClickHandler(item)}>
      {image.length > 0 ? <img src={image} alt={item.title} /> : null}
      <p>{item.title}</p>
    </StyledItem>
  );
};

export { ImageItem };
