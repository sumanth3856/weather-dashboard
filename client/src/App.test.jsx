import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    it('renders without crashing', () => {
        render(<App />);
        // Check for the main title
        expect(screen.getByText(/Weather/i)).toBeInTheDocument();
        expect(screen.getByText(/Bun/i)).toBeInTheDocument();
    });
});
