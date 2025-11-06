import styled from "styled-components";

// Container for suggestions (absolute, below input)
export const SuggestionContainer = styled.div`
  position: absolute;
  width: 100%;
  max-width: 500px; /* match your input max-width */
  z-index: 10;
  margin-top: 5px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  background: #25293d;
`;

// Individual suggestion items
export const SuggestionItem = styled.div`
  padding: 10px 15px;
  background: #25293d;
  color: #f0f0f0;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #ffb830;
    color: #11324d;
    font-weight: 600;
  }

  /* Highlighted suggestion for keyboard navigation */
  &.focused {
    background: #ffb830;
    color: #11324d;
    font-weight: 600;
  }
`;
