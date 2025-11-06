import styled from "styled-components";

const ButtonGrid = styled.div`
  display: grid;
  /* Default: Use 6 columns on larger screens (desktop) */
  grid-template-columns: repeat(6, 1fr);
  gap: 10px; /* Reduced gap for a tighter fit */
  width: 100%;
  max-width: 900px; /* Optional: Limit width on massive screens */

  @media (max-width: 992px) {
    /* Tablet size: switch to 4 columns */
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  @media (max-width: 600px) {
    /* Mobile size: switch to 3 columns per row */
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
`;

export default ButtonGrid;
