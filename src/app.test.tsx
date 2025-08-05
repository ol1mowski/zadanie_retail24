import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders stopwatch application', () => {
    render(<App />);
    expect(screen.getByText('Aplikacja Stoperów')).toBeInTheDocument();
  });

  it('displays add stopwatch button', () => {
    render(<App />);
    expect(screen.getByText('Dodaj stoper')).toBeInTheDocument();
  });

  it('shows statistics cards', () => {
    render(<App />);
    expect(screen.getByText('Aktywne')).toBeInTheDocument();
    expect(screen.getByText('Wstrzymane')).toBeInTheDocument();
    expect(screen.getByText('Ukończone')).toBeInTheDocument();
  });
});
