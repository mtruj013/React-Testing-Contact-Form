/* eslint-disable no-unused-expressions */
import React from 'react'
import ContactForm from './ContactForm'
import { render, fireEvent } from "@testing-library/react"
import { act } from 'react-dom/test-utils'

test("renders Contact Form without crashing", () => {
    render(<ContactForm />)
})

test("inputs are visible", () => {
    const { getByLabelText } = render(<ContactForm />);

    getByLabelText(/first name/i)
    getByLabelText(/last name/i)
    getByLabelText(/email/i)
    getByLabelText(/message/i)
})

test("user can submit form",  () => {
    async () => {const { getByLabelText, getByTestId} = render(<ContactForm/>)

    const nameInput = getByLabelText(/first name/i);
    const lNameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);


    fireEvent.change(nameInput, {target:{value: 'Max'}});
    fireEvent.change(lNameInput, {target: {value: 'Smith'}});
    fireEvent.change(emailInput, {target: {value: 'email@email.com'}});
    fireEvent.change(messageInput, {target: {value: 'hello, from tests'}});

    expect(nameInput.value).toBe('Max');
    expect(lNameInput.value).toBe('Smith');
    expect(emailInput.value).toBe('email@email.com')
    expect(messageInput.value).toBe('hello, from tests');

    fireEvent.click(getByTestId("submit"));

   const nameText = getByTestId('Max');
   expect(nameText).toBeInTheDocument();
   const lNametext = getByTestId('Smith');
   expect(lNametext).toBeInTheDocument();
   const emailText = getByTestId('email@email.com');
   expect(emailText).toBeInTheDocument();
   const messageText = getByTestId('hello, from tests');
   expect(messageText).toBeInTheDocument();
}})