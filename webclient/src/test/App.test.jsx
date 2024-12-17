import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Renders the app', () => {
    test('test the main title', () => {
        render(
            <App />
        );
        expect(screen.getByText('kund webbklient')).toBeInTheDocument();
    });
});
