import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkCustom = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.color ? props.color : "white")};

  :hover {
    color: inherit;
  }
`;
