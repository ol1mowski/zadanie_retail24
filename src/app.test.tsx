import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument();
  });

  it('displays counter', () => {
    render(<App />);
    expect(screen.getByText(/count is 0/i)).toBeInTheDocument();
  });
});
