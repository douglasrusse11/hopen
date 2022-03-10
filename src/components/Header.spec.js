import { render, fireEvent } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import {useHref} from 'react-router';


const mockSetDisplayMenu = jest.fn();
const mockSetDisplayLogin = jest.fn();

jest.mock('react-router', () => {
    const originalModule = jest.requireActual('react-router');

    return {
        esModule: true,
        ...originalModule,
        useHref: jest.fn()
        }
    })

const props = {
    user: null,
    displayMenu: false,
    setDisplayMenu: mockSetDisplayMenu,
    displayLogin: false,
    setDisplayLogin: mockSetDisplayLogin
}

describe('Header', () => {
    it('should have a menu button', () => {
        const { getByText } = render(<Header {...props} />, {wrapper: MemoryRouter}) 
        expect(getByText('menu')).toBeInTheDocument()
    })

    it('should call setDisplayMenu when menu button is clicked', () => {
        const { getByText } = render(<Header {...props} />, {wrapper: MemoryRouter}) 
         fireEvent.click(getByText('menu'));
         expect(mockSetDisplayMenu).toHaveBeenCalled();
    })

    it('should have a home button', () => {
        const { getByText } = render(<Header {...props} />, {wrapper: MemoryRouter}) 
        expect(getByText(/hopen/i)).toBeInTheDocument()
    })

    it('should link to home when home button is clicked', () => {
        const { getByText } = render(<Header {...props} />, {wrapper: MemoryRouter}) 
         fireEvent.click(getByText(/hopen/i));
         expect(useHref).toHaveBeenCalledWith('/');
    })

    it('should have a language selector', () => {
        const { getByTestId } = render(<Header {...props} />, {wrapper: MemoryRouter}) 
        expect(getByTestId('rfs')).toBeInTheDocument()
    })

    it('should have a Sign In button', () => {
        const { getByText } = render(<Header {...props} />, {wrapper: MemoryRouter}) 
        expect(getByText('home.signin')).toBeInTheDocument()
    })

    it('should have a Sign Out button if use is signed in', () => {
        const newProps = {...props, user: {}}
        const { getByText } = render(<Header {...newProps} />, {wrapper: MemoryRouter}) 
        expect(getByText('home.signout')).toBeInTheDocument()
    })


});