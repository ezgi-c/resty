import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Header', () => {
  render(<App />);

  const headerElement = screen.getByTestId('header');
  expect(headerElement).toBeInTheDocument();
  // expect(screen.getByTestId('footer')).toBeInTheDocument();
});
