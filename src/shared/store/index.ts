import { Instance, types as t, flow } from "mobx-state-tree";
import { GalleryItemModel } from "./GalleryItemModel";
import { getItems } from "../../modules/ImageList/api/getItems";
import { getImage } from "../../modules/ImageItem/api/getImage";

export const Store = t
  .model("Store", {
    gallery: t.array(GalleryItemModel),
    isOpen: t.optional(t.boolean, false),
    activeItem: t.maybeNull(t.safeReference(GalleryItemModel)),
    image: t.optional(t.string, ""),
  })
  .actions((self) => {
    const loadGallery = flow(function* () {
      const items = yield getItems();
      self.gallery = items;
    });

    const setActiveItem = flow(function* (item: GalleryItemModuleType) {
      self.activeItem = item;
      self.isOpen = true;
      yield loadImage(item.image);
    });

    const closeItem = () => {
      self.isOpen = false;
      self.activeItem = null;
      self.image = "";
    };

    const loadImage = flow(function* (imageId: string) {
      const imageBlob = yield getImage(imageId);
      self.image = URL.createObjectURL(imageBlob);
    });

    const handleNextItem = () => {
      if (self.activeItem) {
        const currentIndex = self.gallery.findIndex(
          (item) => item.id === self.activeItem!.id
        );
        const nextIndex =
          currentIndex < self.gallery.length - 1 ? currentIndex + 1 : 0;
        setActiveItem(self.gallery[nextIndex]);
      }
    };

    const handlePrevItem = () => {
      if (self.activeItem) {
        const currentIndex = self.gallery.findIndex(
          (item) => item.id === self.activeItem!.id
        );
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : self.gallery.length - 1;
        setActiveItem(self.gallery[prevIndex]);
      }
    };

    return {
      loadGallery,
      setActiveItem,
      closeItem,
      loadImage,
      handleNextItem,
      handlePrevItem,
    };
  });

export type StoreType = Instance<typeof Store>;
export type GalleryItemModuleType = Instance<typeof GalleryItemModel>;

let store: StoreType;
export function useStore() {
  if (!store) {
    store = Store.create({
      gallery: [],
    });
  }
  return store;
}
