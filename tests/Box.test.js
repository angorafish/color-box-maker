import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Box from '../components/Box';

test('renders without crashing', () => {
    render(<Box id="1" width={100} height={100} backgroundColor="red" removeBox={() => {}} />);
});

test('matches snapshot', () => {
    const { asFragment } = render(<Box id="1" width={100} height={100} backgroundColor="red" removeBox={() => {}} />);
});

test('calls removeBox on button click', () => {
    const removeBox = jest.fn();
    const { getByText } = render(<Box id="1" width={100} height={100} backgroundColor="red" removeBox={removeBox} />);
    const button = getByText('X');
    fireEvent.click(button);
    expect(removeBox).toHaveBeenCalledWith('1');
});