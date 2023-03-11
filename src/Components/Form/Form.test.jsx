import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Form from './index';

test('it should call handleApiCall when form is submitted', () => {
  const handleApiCall = jest.fn();
  render(<Form handleApiCall={handleApiCall} />);
  const urlInput = screen.getByLabelText('URL:');
  const submitButton = screen.getByText('GO!');

  fireEvent.change(urlInput, {
    target: { value: 'https://pokeapi.co/api/v2/pokemon' },
  });
  fireEvent.click(submitButton);

  expect(handleApiCall).toHaveBeenCalled();
  expect(handleApiCall).toHaveBeenCalledWith({
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon',
    requestJson: {},
  });
});
