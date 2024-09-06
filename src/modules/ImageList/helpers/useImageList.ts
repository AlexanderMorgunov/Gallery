import { useEffect } from "react";
import { GalleryItemModuleType, useStore } from "../../../shared/store";
import { useLocation, useNavigate } from "react-router-dom";

const useImageList = () => {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const extractImgId = () => {
    const pathParts = location.pathname.split("/");
    return pathParts[1] || null;
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

  return {
    handleImageClick,
    handleCloseModal,
    handleNextItem,
    handlePrevItem,
    store,
  };
};

export { useImageList };
