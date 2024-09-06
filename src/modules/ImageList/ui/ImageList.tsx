import { ImageItem } from "../../ImageItem/";
import styled from "styled-components";
import { ImageModal } from "./ImageModal";
import { observer } from "mobx-react-lite";
import { useImageList } from "../helpers/useImageList";

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
  const {
    handleImageClick,
    handleCloseModal,
    handleNextItem,
    handlePrevItem,
    store,
  } = useImageList();

  return (
    <>
      <StyledList>
        {store.gallery.length > 0 ? (
          store.gallery.map((item) => (
            <ImageItem
              key={item.id}
              item={item}
              onClickHandler={handleImageClick}
            />
          ))
        ) : (
          <p>Ничего не найдено</p>
        )}
      </StyledList>
      {store.isOpen && store.image.length > 0 && (
        <ImageModal
          setIsOpen={handleCloseModal}
          handleNextItem={handleNextItem}
          handlePrevItem={handlePrevItem}
          currentIndex={store.gallery.findIndex(
            (item) => item.id === store.activeItem?.id
          )}
          totalCount={store.gallery.length}
        >
          <img src={store.image} alt={store.activeItem?.title} />
        </ImageModal>
      )}
    </>
  );
});

export { ImageList };
