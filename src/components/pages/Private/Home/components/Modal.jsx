import React from "react";
import styled from "styled-components";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FiXCircle } from "react-icons/fi";

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

// const optionsTipoActividad = [
//   { value: "V", label: "Voluntariado" },
//   { value: "P", label: "Pro Bono y Prácticas Profesionales Supervisadas(PPS)" },
//   { value: "D", label: "Donación de bienes y servicios" },
//   { value: "C", label: "Compra/Venta: Negocios inclusivos y verdes" },
//   { value: "E", label: "Educación: Talleres, Webinarios, Cursos" },
//   { value: "W", label: "Wellness: habitos saludables" },
// ];

// const optionsOds = [
// 	{ value: 1, label: 'Fin de la pobreza' },
// 	{ value: 2, label: 'Hambre cero' },
// 	{ value: 3, label: 'Salud y bienestar' },
// 	{ value: 4, label: 'Educación de calidad' },
// 	{ value: 5, label: 'Igualdad de género y empoderamiento de la mujer' },
// 	{ value: 6, label: 'Agua limpia y saneamiento' },
// 	{ value: 7, label: 'Energía asequible y no contaminante' },
// 	{ value: 8, label: 'Trabajo decente y crecimiento económico' },
// 	{ value: 9, label: 'Industria, innovación e infraestructura' },
// 	{
// 		value: 10,
// 		label: 'Reducción de las desigualdades entre países y dentro de ellos',
// 	},
// 	{ value: 11, label: 'Ciudades y comunidades sostenibles' },
// 	{ value: 12, label: 'Producción y consumo responsables' },
// 	{ value: 13, label: 'Acción por el clima' },
// 	{ value: 14, label: 'Vida submarina' },
// 	{ value: 15, label: 'Vida de ecosistemas terrestres' },
// 	{ value: 16, label: 'Paz, justicia e instituciones sólidas' },
// 	{ value: 17, label: 'Alianzas para lograr los objetivos' },
// ];

// const optionsEntitiesType = [
// 	{ value: 1, label: 'Organización de la Sociedad Civil / ONG' },
// 	{ value: 2, label: 'Economía social' },
// 	{ value: 3, label: 'Empresa B' },
// 	{ value: 4, label: 'Empresa' },
// 	{ value: 5, label: 'Educación Superior (Universidad, Institutos)' },
// 	{ value: 6, label: 'Otros' },
// 	{ value: 7, label: 'Gobierno (Nacional, Estadual/Provincial, Municipal)' },
// 	{ value: 8, label: 'Escuelas' },
// 	{ value: 9, label: 'Cooperativa de Trabajo' },
// 	{ value: 10, label: 'Grupo de voluntariado' },
// 	{ value: 11, label: 'Consultoras y profesionales' },
// 	{ value: 12, label: 'Empresa - Naciente' },
// 	{ value: 13, label: 'Empresa - Idea de Negocio' },
// 	{ value: 14, label: 'Empresa - Nuevo proyecto de empresa' },
// ];

const Modal = ({ setIsOpen, isOpen, setFilter, filter }) => {
  const addFilter = (name) => (value) => {
    setFilter({ ...filter, [name]: value });
  };

  const setName = (event) => {
    addFilter("withTitle")(event.target.value);
  };
  const setType = (event) => {
    addFilter("withAlternativeType")(event.target.value);
  };

  if (!isOpen) return null;
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
            />
          </DivMargin>
          <DivMargin>
            <input
              className="form-control"
              onChange={setType}
              placeholder="Tipo de la actividad"
            />
          </DivMargin>
          {/* <DivMargin>
						<Select
							placeholder="Tipo de la actividad"
							components={animatedComponents}
							isMulti
							onChange={addFilter('inActivityType')}
							options={optionsTipoActividad}
							defaultValue={filter ? filter.inActivityType : []}
						/>
					</DivMargin> */}
          {/* <DivMargin>
						<Select
							placeholder="Objetivos de desarrollo sostenible"
							components={animatedComponents}
							isMulti
							onChange={addFilter('inSdgs')}
							options={optionsOds}
							defaultValue={filter ? filter.inSdgs : []}
						/>
					</DivMargin>
					<DivMargin>
						<Select
							placeholder="Tipo de organización"
							components={animatedComponents}
							isMulti
							onChange={addFilter('inEntityType')}
							options={optionsEntitiesType}
							defaultValue={filter ? filter.inEntityType : []}
						/>
					</DivMargin> */}
        </BodyModal>
      </MainModal>
    </Overlay>
  );
};

export default Modal;
