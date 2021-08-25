import styled from "styled-components";

const ListItem = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;

  &:hover {
    border: 1px solid #ffb830;
    background-color: rgba(0, 0, 0, 0.75);
  }

  & img {
    width: 100px;
    height: 70px;
    margin: 10px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export default ListItem;
