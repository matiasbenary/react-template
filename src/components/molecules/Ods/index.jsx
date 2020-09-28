import React from "react";
import styled from "styled-components";
import { ods } from "./ods/icons/index";

const Img = styled.img`
  height: 85px;
`;

const Ods = ({ data }) => (
  <div className="card rounded">
    <div className="card-header">
      <h6 className="m-0">
        <a
          href="https://www.un.org/sustainabledevelopment/es"
          target="_blank"
          rel="noopener noreferrer"
        >
          Objetivos de desarrollo sostenible
        </a>
      </h6>
    </div>
    <div className="card-body">
      <Img src={ods[data.sdg - 1]} />
    </div>
  </div>
);
export default Ods;
