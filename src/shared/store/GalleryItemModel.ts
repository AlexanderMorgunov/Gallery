import { t } from "mobx-state-tree";

export const GalleryItemModel = t.model("GalleryItemModel", {
  id: t.identifierNumber,
  title: t.string,
  image: t.string,
  thumbnail: t.maybeNull(t.string),
});
