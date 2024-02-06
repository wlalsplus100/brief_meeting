import React from 'react';
import { SendButton } from '../../components/sendButton';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('sendButton component', () => {
  const MockSetState = jest.fn();
  test('onButton이 true일 때', () => {
    const { getByRole } = render(<SendButton onButton={true} setOnButton={MockSetState} />);
    const button = getByRole('button');
    expect(button).toHaveStyle('display: inline-block');
  });

  test('onButton이 false일 때', () => {
    const { getByRole } = render(<SendButton onButton={false} setOnButton={MockSetState} />);
    const button = getByRole('button', { hidden: true });
    expect(button).toHaveStyle('display: none');
  });
});
