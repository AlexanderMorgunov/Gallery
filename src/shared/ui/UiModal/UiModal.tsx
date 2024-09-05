import { FC, useEffect } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

const StyledUiModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledWinModal = styled.div`
@media (max-width: 900px) {
  width: max-content;
  max-width: 90vw;
max-height: 98vh;
}
  max-width: 60vw;
  background-color: #fff;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  }
    .close-btn {
    position: absolute;
    top: 8px;
    right: 10px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 20px;
    color: #000;
        &:hover {
        color: #888;
        transition: color 0.3s ease-in-out;
      }
  }
`;

interface Props {
  children?: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UiModal: FC<Props> = ({ children, setIsOpen }) => {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    });
    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      });
    };
  });
  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <StyledUiModal onClick={handleClose}>
      <StyledWinModal>
        <>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <GrClose />
          </button>
          {children}
        </>
      </StyledWinModal>
    </StyledUiModal>
  );
};

export { UiModal };
