import { ImageItem } from "../../ImageItem/";
import styled from "styled-components";
import { ImageModal } from "./ImageModal";
import { GalleryItemModuleType, useStore } from "../../../shared/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  const extractImgId = () => {
    const pathParts = location.pathname.split("/"); // Разделяем путь по "/"
    return pathParts[1] || null; // Возвращаем imgId, если он есть
  };

  const imgId = extractImgId();

  useEffect(() => {
    const loadGalleryAndSetActiveItem = async () => {
      await store.loadGallery();
      if (imgId && store.gallery.length > 0) {
        const activeItem = store.gallery.find((item) => item.image === imgId);
        if (activeItem) {
          store.setActiveItem(activeItem);
          await store.loadImage(activeItem.image);
          store.openItem();
        }
      }
    };

    loadGalleryAndSetActiveItem().catch((error) => {
      console.error("Ошибка при загрузке галереи:", error);
    });
  }, [store, imgId]);

  const handleImageClick = (item: GalleryItemModuleType) => {
    store.setActiveItem(item);
    store.loadImage(item.image);
    navigate(`/${item.image}`);
  };

  const handleCloseModal = () => {
    store.closeItem();
    navigate(`/`);
  };

  const handleNextItem = () => {
    store.handleNextItem();
    if (store.activeItem) {
      navigate(`/${store.activeItem.image}`);
    }
  };

  const handlePrevItem = () => {
    store.handlePrevItem();
    if (store.activeItem) {
      navigate(`/${store.activeItem.image}`);
    }
  };

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
          <p>No data</p>
        )}
      </StyledList>
      {store.isOpen && store.image.length > 0 && (
        <ImageModal
          setIsOpen={handleCloseModal}
          handleNextItem={handleNextItem}
          handlePrevItem={handlePrevItem}
        >
          <img src={store.image} alt={store.activeItem?.title} />
        </ImageModal>
      )}
    </>
  );
});

export { ImageList };
