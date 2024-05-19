import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateUserInfoPdf } from './CreateUserInfoPdf';

describe('CreateUserInfoPdf', () => {
  test('Пустое состояние формы', () => {
    render(<CreateUserInfoPdf />);

    const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
    const surnameInput = screen.getByTestId('surname-input') as HTMLInputElement;
    const ageInput = screen.getByTestId('age-input') as HTMLInputElement;

    expect(nameInput.value).toBe('');
    expect(surnameInput.value).toBe('');
    expect(ageInput.value).toBe('');
  });

  test('Сброс формы', async () => {
    render(<CreateUserInfoPdf />);

    const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
    const surnameInput = screen.getByTestId('surname-input') as HTMLInputElement;
    const ageInput = screen.getByTestId('age-input') as HTMLInputElement;
    const resetButton = screen.getByTestId('reset-btn') as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.change(ageInput, { target: { value: '30' } });

    expect(nameInput.value).toBe('John');
    expect(surnameInput.value).toBe('Doe');
    expect(ageInput.value).toBe('30');

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(surnameInput.value).toBe('');
      expect(ageInput.value).toBe('');
    });
  });

  test('Обновление при заполнении формы', () => {
    render(<CreateUserInfoPdf />);

    const nameInput = screen.getByTestId('name-input') as HTMLButtonElement;
    const surnameInput = screen.getByTestId('surname-input') as HTMLButtonElement;
    const ageInput = screen.getByTestId('age-input') as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: 'Jane' } });
    fireEvent.change(surnameInput, { target: { value: 'Smith' } });
    fireEvent.change(ageInput, { target: { value: '25' } });

    expect(nameInput.value).toBe('Jane');
    expect(surnameInput.value).toBe('Smith');
    expect(ageInput.value).toBe('25');
  });
});
