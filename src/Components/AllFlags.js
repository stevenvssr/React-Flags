import styled from "styled-components";
const AllFlags = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default AllFlags;
