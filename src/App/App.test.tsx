import { act, render, screen } from '@testing-library/react';
import App from './App';

it('Renders React App', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', {
    name: 'Checkout System'
  });
  expect(headingElement).toBeInTheDocument();
});

it('Validate Products List', () => {
  render(<App />);
  const productsList = screen.getAllByRole('listitem');
  expect(productsList.length).toBe(4);
});

it('Validate Empty Basket', () => {
  render(<App />);
  const emptyBasketElement = screen.getByText('Basket Empty');
  expect(emptyBasketElement).toBeInTheDocument();
});

it('Add and Remove Product to Basket', async () => {
  render(<App />);
  const bProductElement = screen.getAllByRole('listitem')[1];
  const addButton = bProductElement.querySelector('.btn-outline-primary');
  const removeButton = bProductElement.querySelector('.btn-outline-secondary');
  await act(() => {
    addButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  const productsList = document.querySelectorAll('tbody>tr');
  expect(productsList.length).toBe(1);

  await act(() => {
    removeButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  const newProductsList = document.querySelectorAll('tbody>tr');
  expect(newProductsList.length).toBe(0);
});

it('Verify Product Quantity in Basket', async () => {
  render(<App />);
  const bProductElement = screen.getAllByRole('listitem')[1];
  const addButton = bProductElement.querySelector('.btn-outline-primary');
  await act(() => {
    addButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await act(() => {
    addButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  const productQuantity = document.querySelector('tbody>tr>td:nth-child(4)');
  expect(productQuantity?.textContent).toBe('2');
});

it('Verify Product Discount in Basket', async () => {
  render(<App />);
  const bProductElement = screen.getAllByRole('listitem')[0];
  const addButton = bProductElement.querySelector('.btn-outline-primary');
  await act(() => {
    addButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await act(() => {
    addButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await act(() => {
    addButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  const productQuantity = document.querySelector('tbody>tr>td:nth-child(6)');
  expect(productQuantity?.textContent).toBe('£1.30');
});
