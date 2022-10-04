import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders React App', () => {
  render(<App />);
  const titleEl = screen.getByRole('heading', { level: 1 });
  expect(titleEl).toBeInTheDocument();
  expect(titleEl).toHaveTextContent('Checkout System');
});
