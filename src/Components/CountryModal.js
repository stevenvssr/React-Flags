import React, { useEffect } from "react";
import styled from "styled-components";
import Flag from "./Flag";

// --- Styled Components ---
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
`;

const ModalCard = styled.div`
  background: linear-gradient(145deg, #181c2e, #0c101d);
  border-radius: 16px;
  padding: 30px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  color: #e0e0e0;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 1;
  font-size: 1.1rem;
  color: #e0e0e0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #ffb830;
    color: #181c2e;
    transform: rotate(90deg);
    border-color: #ffb830;
  }
`;

const CountryName = styled.h1`
  margin: 15px 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  text-align: left;
`;

const InfoItem = styled.li`
  margin: 5px 0;
  display: flex;
  justify-content: space-between;

  span {
    font-weight: 500;
  }

  strong {
    font-weight: 600;
    color: #ffb830;
  }
`;

// --- Component ---
export default function CountryModal({ show, onClose, result }) {
  // Close modal on ESC or Enter
  useEffect(() => {
    const handleKeydown = (event) => {
      if (show && (event.key === "Escape" || event.key === "Enter")) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [show, onClose]);

  if (!show || !result) return null;

  const formatPopulation = (num) =>
    num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "N/A";

  return (
    <Overlay onClick={onClose}>
      <ModalCard
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
      >
        <CloseButton onClick={onClose}>×</CloseButton>

        <Flag
          src={result.flag}
          style={{ width: "100px", height: "auto", border: "2px solid white" }}
        />

        <CountryName>{result.name}</CountryName>

        <InfoList>
          <InfoItem>
            <span>Capital:</span> <strong>{result.capital || "N/A"}</strong>
          </InfoItem>
          <InfoItem>
            <span>Language:</span> <strong>{result.language || "N/A"}</strong>
          </InfoItem>
          <InfoItem>
            <span>Population:</span>{" "}
            <strong>{formatPopulation(result.population)}</strong>
          </InfoItem>
          <InfoItem>
            <span>Subregion:</span> <strong>{result.subregion || "N/A"}</strong>
          </InfoItem>
          <InfoItem>
            <span>Currency:</span> <strong>{result.currency || "N/A"}</strong>
          </InfoItem>
        </InfoList>
      </ModalCard>
    </Overlay>
  );
}
