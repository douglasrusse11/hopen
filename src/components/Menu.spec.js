import { render, fireEvent } from '@testing-library/react';
import Menu from './Menu';
import { MemoryRouter } from 'react-router-dom';
import {useHref} from 'react-router';

const mockUseHref = jest.fn();

jest.mock('react-router', () => {
    return {
        ...jest.requireActual('react-router'),
        useHref: (to) => {mockUseHref(to)}
        }
    })

jest.mock('react-i18next', () => {
    return {
        ...jest.requireActual('react-i18next'),
        useTranslation: () => ({
            t: (text) => text, 
            i18n: () => {}
        })
    }
})

const props = {
    user: null
}

const adminProps = {
    user: { isAdmin: true }
}

describe('Menu', () => {

    it('should have a resources link', () => {
        const { getByText } = render(<Menu {...props} />, {wrapper: MemoryRouter}) 
        expect(getByText('home.resources')).toBeInTheDocument()
    })

    it('should link to resources when resources link is clicked', () => {
        const { getByText } = render(<Menu {...props} />, {wrapper: MemoryRouter}) 
         fireEvent.click(getByText('home.resources'));
         expect(mockUseHref).toHaveBeenCalledWith('/resources/bycategory/Accomodation');
    })

    it('should have a contact link', () => {
        const { getByText } = render(<Menu {...props} />, {wrapper: MemoryRouter}) 
        expect(getByText('home.contact')).toBeInTheDocument()
    })

    it('should link to contact when contact link is clicked', () => {
        const { getByText } = render(<Menu {...props} />, {wrapper: MemoryRouter}) 
         fireEvent.click(getByText('home.contact'));
         expect(mockUseHref).toHaveBeenCalledWith('/contact');
    })

    it('should have a news link', () => {
        const { getByText } = render(<Menu {...props} />, {wrapper: MemoryRouter}) 
        expect(getByText('home.news')).toBeInTheDocument()
    })

    it('should link to news when news link is clicked', () => {
        const { getByText } = render(<Menu {...props} />, {wrapper: MemoryRouter}) 
         fireEvent.click(getByText('home.news'));
         expect(mockUseHref).toHaveBeenCalledWith('/news');
    })

    it('should not have a seed db link if user is not admin', () => {
        const { queryByText } = render(<Menu {...props} />, {wrapper: MemoryRouter}) 
        expect(queryByText('home.db')).not.toBeInTheDocument()
    })

    it('should have a seed db link', () => {
        const { getByText } = render(<Menu {...adminProps} />, {wrapper: MemoryRouter}) 
        expect(getByText('home.db')).toBeInTheDocument()
    })

    it('should link to seed db when seed db link is clicked', () => {
        const { getByText } = render(<Menu {...adminProps} />, {wrapper: MemoryRouter}) 
         fireEvent.click(getByText('home.db'));
         expect(mockUseHref).toHaveBeenCalledWith('/seeder');
    })

});