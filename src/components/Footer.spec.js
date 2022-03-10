import { render } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
    it('should contain footer text', () => {
        const { getByText } = render(<Footer />);
        expect(getByText('© HopeN 2022')).toBeInTheDocument();
    })
})