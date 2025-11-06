import styled from "styled-components";

const Wrapper = styled.div`
  /* Center the content horizontally and limit size */
  margin: 0 auto;
  max-width: 1400px;
  /* Add padding for overall spacing */
  padding: 50px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Ensure it respects max-width and internal padding */
`;

export default Wrapper;
