import styled from "styled-components";

const FilterButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  background: ${(props) =>
    props.className?.includes("active") ? "#ffb830" : "#181c2e"};
  color: ${(props) =>
    props.className?.includes("active") ? "#11324d" : "#f0f0f0"};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: #ffb830;
    color: #11324d;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 184, 48, 0.5);
  }
`;

export default FilterButton;
