import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Modal from "react-modal";


test('renders learn react link', () => {
  jest
    .spyOn(Modal, "setAppElement")
    .mockReturnValue();

  const result = render(<App />);
  const linkElement = result.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();
});
