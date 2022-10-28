import styled from 'styled-components';

export const CategoryPageContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	row-gap: 50px;
	column-gap: 20px;
`;

export const CategoryPageTitle = styled.h2`
	font-size: 38px;
	margin-bottom: 25px;
	text-transform: uppercase;
	text-align: center;
`;
