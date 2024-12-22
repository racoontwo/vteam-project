import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { describe, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('renders navbar', () => {
    test('test if navbar links exists', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        expect(screen.getByText('Map')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
});
