import styled from "styled-components";

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(145deg, #181c2e, #0c101d);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
  color: #f0f0f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  padding: 10px;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  }

  & img {
    width: 100px;
    height: 70px;
    object-fit: cover;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  & span {
    font-weight: 600;
    font-size: 0.9rem;
    color: #f0f0f0;
    transition: color 0.2s ease;
  }
`;

export default ListItem;
