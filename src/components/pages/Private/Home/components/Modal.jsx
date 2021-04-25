import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FiXCircle } from "react-icons/fi";
import { apiCall } from "../../../../../crud/api.crud";

const animatedComponents = makeAnimated();

const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 125px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: all 0.5s ease-out;
`;

const MainModal = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 40px 2px rgba(0, 0, 0, 0.08);
  width: 500px;
`;

const CloseIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 24px 20px 0 0;
  font-size: 30px;
  cursor: pointer;
  color: rgb(130, 130, 130);
  &:hover {
    color: #010101;
  }
`;

const BodyModal = styled.div`
  width: 420px;
  margin: 0 40px 40px;
`;

const DivMargin = styled.div`
  margin: 25px 0;
`;

const convertResponseToOptions = (array, label, value) => {
  if (!value) value = label;
  if(array.length ==0) return [];
  return array.map((v) => ({ value: v[value], label: v[label] }));
};

const Modal = ({ setIsOpen, isOpen, setFilter, filter }) => {
  const addFilter = (name) => (value) => {
    setFilter({ ...filter, [name]: value });
  };

  const [filtersCustom, setFiltersCustom] = useState({});

  const addCustomFilter = (name) => (value) => {
    setFiltersCustom({ ...filtersCustom, [name]: value });
  };



  useEffect(() => {
    let aux = [];
    for (const filterCustom in filtersCustom) {
      if(filtersCustom[filterCustom]){
        aux = [...aux, ...filtersCustom[filterCustom]];
      }
    }
    const customFilter = addFilter("inCustomFilter");

      customFilter(aux.length > 0?aux:"");

  }, [filtersCustom]);

  const [response, setResponse] = useState(null);

  useEffect(() => {
    apiCall(
      `filters/${process.env.REACT_APP_ID_ENTITY}`,
      null,
      "GET"
    ).then((res) => setResponse(res.data.data));
  }, []);

  const setName = (event) => {
    addFilter("withTitle")(event.target.value);
  };

  if (!(isOpen && response)) return null;

  return (
    <Overlay>
      <MainModal>
        <CloseIcon>
          <FiXCircle onClick={() => setIsOpen(false)} />
        </CloseIcon>
        <BodyModal>
          <h3>Filtros:</h3>
          <DivMargin>
            <input
              className="form-control"
              onChange={setName}
              placeholder="Nombre de la actividad"
              value={filter ? filter.withTitle : ""}
            />
          </DivMargin>

          {response.alternativeType && (
            <DivMargin>
              <Select
                placeholder="Tipo de la actividad"
                components={animatedComponents}
                isMulti
                onChange={addFilter("withAlternativeType")}
                options={convertResponseToOptions(
                  response.alternativeType,
                  "alternative_type"
                )}
                defaultValue={filter ? filter.withAlternativeType : []}
              />
            </DivMargin>
          )}

          {response.alternativeType && (
            <DivMargin>
              <Select
                placeholder="Objetivos de desarrollo sostenible"
                components={animatedComponents}
                isMulti
                onChange={addFilter("inSdgs")}
                options={convertResponseToOptions(response.ods, "label", "id")}
                defaultValue={filter ? filter.inSdgs : []}
              />
            </DivMargin>
          )}
          {response.filtersCustom &&
            response.filtersCustom.map((filter) => (
              <DivMargin key={`filter${filter.id}`}>
                <Select
                  placeholder={filter.title}
                  components={animatedComponents}
                  isMulti
                  onChange={addCustomFilter(filter.id)}
                  options={convertResponseToOptions(
                    filter.values,
                    "value",
                    "id"
                  )}
                  defaultValue={filtersCustom ? filtersCustom[filter.id] : []}
                />
              </DivMargin>
            ))}
        </BodyModal>
      </MainModal>
    </Overlay>
  );
};

export default Modal;
