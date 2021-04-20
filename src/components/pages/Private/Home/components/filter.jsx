import React from 'react';
import styled from 'styled-components';

import { ButtonPrimary } from '../../../../molecules/Button';

import { FaFilter } from 'react-icons/fa';
import Pagination from '../../../../molecules/Pagination';

const Container = styled.div`
  margin-top: 35px;
  padding: 10px 10px;
  border: 2px solid #e7e7e7;
  border-radius: 15px;
  background-color: #ffffff;
  border: none;
  box-shadow: 0px 4.90798px 6.13497px rgba(0, 0, 0, 0.14),
    0px 1.84049px 8.58896px rgba(0, 0, 0, 0.12),
    0px 3.06748px 3.06748px rgba(0, 0, 0, 0.2);
  width: ${(props) => (props.isClose ? '70px;' : '100%')};
  transition: all 0.3s ease 0s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  p {
    margin: 0;
  }
`;

const Filter = ({ setIsOpen, setPage, meta }) => {
	const openModal = () => {
		setIsOpen(true);
	};
	return (
		<Container>
			<Pagination meta={meta} action={setPage} withRedux={false} />
			<ButtonPrimary onClick={openModal}>
				<FaFilter />
        Filtro
			</ButtonPrimary>
		</Container>
	);
};

export default Filter;
