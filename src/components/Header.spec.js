import { render, fireEvent } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import {useHref} from 'react-router';
import { useTranslation } from 'react-i18next';
import { act } from 'react-dom/test-utils';
import '@aws-amplify/ui-react';


const mockSetDisplayMenu = jest.fn();
const mockSetDisplayLogin = jest.fn();
const mockUseHref = jest.fn();

jest.mock('react-router', () => {
    return {
        ...jest.requireActual('react-router'),
        useHref: (to) => {mockUseHref(to)}
        }
    })

const mockChangeLanguage = jest.fn();

jest.mock('react-i18next', () => {
    return {
        ...jest.requireActual('react-i18next'),
        useTranslation: () => ({
            t: (text) => text === 'home.signin' ? 'home.signin' : 'home.signout', 
            i18n: {changeLanguage: mockChangeLanguage}})
    }
})

jest.mock('@aws-amplify/ui-react', () => {
    return {
        ...jest.requireActual('@aws-amplify/ui-react'),
        Authenticator: () => (<p>Login</p>)
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
         expect(mockUseHref).toHaveBeenCalledWith('/');
    })

    it('should have a language selector', () => {
        const { getByTestId } = render(<Header {...props} />, {wrapper: MemoryRouter}) 
        expect(getByTestId('rfs')).toBeInTheDocument()
    })

    it('should be able to select a language', () => {
        const { getByTestId, getAllByRole, getByText } = render(<Header {...props} />, {wrapper: MemoryRouter}) 
        fireEvent.click(getByTestId('rfs-btn'))
        fireEvent.click(getByText(/english/ig))
        expect(mockChangeLanguage).toHaveBeenCalledWith('GB')
    })

    it('should have a Sign In button', () => {
        const { getByText } = render(<Header {...props} />, {wrapper: MemoryRouter}) 
        expect(getByText('home.signin')).toBeInTheDocument()
    })

    it('should call setDisplayLogin, when Sign In button is clicked', () => {
        const { getByText } = render(<Header {...props} />, {wrapper: MemoryRouter}) 
        fireEvent.click(getByText('home.signin'))
        expect(mockSetDisplayLogin).toHaveBeenCalled();
    })

    it('should display login when displayLogin is true', () => {
        const loginProps = {...props, displayLogin: true};
        const { getByRole } = render(<Header {...loginProps} />, {wrapper: MemoryRouter}) 
        expect(getByRole('dialog')).toBeInTheDocument()
    })

    it('should have a Sign Out button if user is signed in', () => {
        const userProps = {...props, user: {}}
        const { getByText } = render(<Header {...userProps} />, {wrapper: MemoryRouter}) 
        expect(getByText('home.signout')).toBeInTheDocument()
    })

});