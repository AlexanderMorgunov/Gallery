import { FC } from "react";
import { UiModal } from "../../../shared/ui/UiModal/UiModal";
import styled from "styled-components";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const StyledModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;

  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-bottom: 1rem;

    img {
      max-width: 80vw;
      max-height: 70vh;
      border-radius: 20px;
    }
  }

  .button-wrapper {
    gap: 10px;
    display: flex;
    justify-content: flex-end;
    > button {
      background-color: transparent;
      border: none;
      font-size: 20px;
      color: #000;
      cursor: pointer;

      &:hover {
        color: #888;
        transition: color 0.3s ease-in-out;
      }
    }
  }
`;

interface Props {
  children?: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextItem: () => void;
  handlePrevItem: () => void;
  totalCount: number;
  currentIndex: number;
}

const ImageModal: FC<Props> = ({
  children,
  setIsOpen,
  handleNextItem,
  handlePrevItem,
  totalCount,
  currentIndex,
}) => {
  return (
    <UiModal setIsOpen={setIsOpen}>
      <StyledModalWrapper>
        <div className="image-wrapper">{children}</div>
        <div className="button-wrapper">
          <button onClick={handlePrevItem}>
            <FaLongArrowAltLeft />
          </button>
          {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1}/
          {totalCount < 10 ? `0${totalCount}` : totalCount}
          <button onClick={handleNextItem}>
            <FaLongArrowAltRight />
          </button>
        </div>
      </StyledModalWrapper>
    </UiModal>
  );
};

export { ImageModal };
