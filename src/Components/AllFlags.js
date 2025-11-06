import styled from "styled-components";

const AllFlags = styled.div`
  display: grid;
  /* Auto-fill ensures maximum coverage, minmax ensures flags are never too small */
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  margin-top: 30px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  @media (max-width: 600px) {
    /* Force 2 columns on small phones for readability */
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default AllFlags;
