import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BoxList from '../src/BoxList';

test('renders without crashing', () => {
    render(<BoxList />);
});

test('matches snapshot', () => {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

test('can add a new box', () => {
    const { getByLabelText, getByText, queryByText } = render(<BoxList />);
    const widthInput = getByLabelText('Width:');
    const heightInput = getByLabelText('Height:');
    const backgroundColorInput = getByLabelText('Background Color:');
    fireEvent.change(widthInput, { target: { value: '100' } });
    fireEvent.change(heightInput, { target: { value: '100' } });
    fireEvent.change(backgroundColorInput, { target: { value: 'red' } });
    fireEvent.click(getByText('Add Box'));
    expect(queryByText('X')).toBeInTheDocument();
});

test('can remove a box', () => {
    const { getByLabelText, getByText, queryByText } = render(<BoxList />);
    const widthInput = getByLabelText('Width:');
    const heightInput = getByLabelText('Height:');
    const backgroundColorInput = getByLabelText('Background Color:');
    fireEvent.change(widthInput, { target: { value: '100' } });
    fireEvent.change(heightInput, { target: { value: '100' } });
    fireEvent.change(backgroundColorInput, { target: { value: 'red' } });
    fireEvent.click(getByText('Add Box'));
    const removeButton = queryByText('X');
    fireEvent(removeButton).not.toBeInTheDocument();
});