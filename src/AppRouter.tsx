import { Route, Routes } from "react-router-dom";
import { ImageList } from "./modules/ImageList";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ImageList />}>
        <Route path=":imgId" />
      </Route>
      <Route path="*" element={<div>Страницы не существует</div>} />
    </Routes>
  );
};

export { AppRouter };
