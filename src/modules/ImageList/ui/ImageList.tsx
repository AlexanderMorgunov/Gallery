import { useEffect } from "react";
import { ImageItem } from "../../ImageItem/ui/ImageItem";
import styled from "styled-components";
import { ImageModal } from "./ImageModal";
import { useStore } from "../../../shared/store";
import { observer } from "mobx-react-lite";

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ImageList = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.loadGallery();
  }, []);

  return (
    <>
      <StyledList>
        {store.gallery.length > 0 ? (
          store.gallery.map((item) => (
            <ImageItem
              key={item.id}
              item={item}
              onClickHandler={store.setActiveItem}
            />
          ))
        ) : (
          <p>No data</p>
        )}
      </StyledList>
      {store.isOpen && (
        <ImageModal
          setIsOpen={store.closeItem}
          handleNextItem={store.handleNextItem}
          handlePrevItem={store.handlePrevItem}
        >
          <img src={store.image} alt={store.activeItem?.title} />
        </ImageModal>
      )}
    </>
  );
});

export { ImageList };
