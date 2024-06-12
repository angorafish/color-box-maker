import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewBoxForm from '../src/NewBoxForm';

test('renders without crashing', () => {
    render(<NewBoxForm addBox={() => {}} />);
});

test('matches snapshot', () => {
    const { asFragment } = render(<NewBoxForm addBox={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('can submit form', () => {
    const addBox = jest.fn();
    const { getByLabelText, getByText } = render(<NewBoxForm addBox={addBox} />);
    const widthInput = getByLabelText('Width:');
    const heightInput = getByLabelText('Height:');
    const backgroundColorInput = getByLabelText('Background Color:');
    fireEvent.change(widthInput, { target: { value: '100' } });
    fireEvent.change(heightInput, { target: { value: '100' } });
    fireEvent.change(backgroundColorInput, { target: { value: "red" } });
    fireEvent.click(getByText('Add Box'));
    expect(addBox).toHaveBeenCalledWith({ width: '100', height: '100', backgroundColor: 'red', id: expect.any(String) });
});