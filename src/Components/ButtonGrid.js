import styled from "styled-components";

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default ButtonGrid;
