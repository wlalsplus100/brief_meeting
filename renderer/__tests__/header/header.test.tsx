import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../../components/header';

describe('Header component', () => {
  test('기회가 1일 때 렌더링', () => {
    const { getByText, getByAltText } = render(<Header opportunity={1} />);

    const opportunityLeft = getByText('1');
    const logo = getByAltText('Logo');
    const seeMore = getByAltText('See More');

    expect(opportunityLeft).toHaveStyle('color: red');
    expect(logo).toBeInTheDocument();
    expect(seeMore).toBeInTheDocument();
  });

  test('기회가 5 이하일 때 렌더링', () => {
    const { getByText, getByAltText } = render(<Header opportunity={5} />);

    const opportunityLeft = getByText('5');
    const logo = getByAltText('Logo');
    const seeMore = getByAltText('See More');

    expect(opportunityLeft).toHaveStyle('color: yellow');
    expect(logo).toBeInTheDocument();
    expect(seeMore).toBeInTheDocument();
  });

  test('기회가 5 초과일 때 렌더링', () => {
    const { getByText, getByAltText } = render(<Header opportunity={10} />);

    const opportunityLeft = getByText('10');
    const logo = getByAltText('Logo');
    const seeMore = getByAltText('See More');

    expect(opportunityLeft).toHaveStyle('color: inherit');
    expect(logo).toBeInTheDocument();
    expect(seeMore).toBeInTheDocument();
  });
});
