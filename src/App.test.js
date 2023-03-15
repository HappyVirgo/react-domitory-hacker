import React from 'react';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

const TEST_IDS = {
  nameInputId: 'studentName',
  joiningDateId: 'joiningDate',
  addBtnId: 'addBtn',
  errorMsgId: 'errorMsg',
  residentsNameList: 'residentsNameList'
};

describe('Hacker Dormitory', () => {

  let getByTestId;
  let txtInput;
  let dateInput;
  let addButton;
  let list;

  beforeEach(() => {
    const app = render(<App />);
    getByTestId = app.getByTestId;
    txtInput = getByTestId(TEST_IDS.nameInputId);
    dateInput = getByTestId(TEST_IDS.joiningDateId);
    addButton = getByTestId(TEST_IDS.addBtnId);
    list = getByTestId(TEST_IDS.residentsNameList);
  });

  afterEach(() => {
    cleanup();
  });

  it('should add valid students in Residents list', () => {
    fireEvent.change(txtInput, { target: { value: 'Adam' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton, { button: '0' });
    expect(list.children[0].textContent.toLowerCase()).toEqual('adam');

    fireEvent.change(txtInput, { target: { value: 'Dhilip' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton, { button: '0' });

    expect(list.children[0].textContent.toLowerCase()).toEqual('adam');
    expect(list.children[1].textContent.toLowerCase()).toEqual('dhilip');
  });

  it('should add valid students without case sensitivity', () => {
    fireEvent.change(txtInput, { target: { value: 'aDaM' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton, { button: '0' });
    expect(list.children[0].textContent.toLowerCase()).toEqual('adam');
  });

  it('should clear the input fields after adding a new student', () => {
    fireEvent.change(txtInput, { target: { value: 'Adam' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton, { button: '0' });
    expect(txtInput.value).toEqual('');
    expect(dateInput.value).toEqual('');
  });

  it('should show error on trying to add a student who is not in the list', () => {
    fireEvent.change(txtInput, { target: { value: 'Anderson' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton, { button: '0' });
    let error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual('Sorry, Anderson is not a verified student!');

    fireEvent.change(txtInput, { target: { value: 'dam' } });
    fireEvent.change(dateInput, { target: { value: '2019-10-10' } });
    fireEvent.click(addButton, { button: '0' });
    error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual(`Sorry, dam is not a verified student!`);
  });

  it('should show error on trying to add a student whose validity has expired', () => {
    fireEvent.change(txtInput, { target: { value: 'Bonnie' } });
    fireEvent.change(dateInput, { target: { value: '2019-10-10' } });
    fireEvent.click(addButton, { button: '0' });
    const error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual(`Sorry, Bonnie's validity has Expired!`);
  });

  it('should hold the correct list and error message after series of Students addition', () => {
    fireEvent.change(txtInput, { target: { value: 'Adam' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton, { button: '0' });


    fireEvent.change(txtInput, { target: { value: 'Dhilip' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton, { button: '0' });

    fireEvent.change(txtInput, { target: { value: 'Talisk' } });
    fireEvent.change(dateInput, { target: { value: '2023-12-11' } });
    fireEvent.click(addButton, { button: '0' });

    let error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual(`Sorry, Talisk's validity has Expired!`);

    fireEvent.change(txtInput, { target: { value: 'Talisk' } });
    fireEvent.change(dateInput, { target: { value: '2023-10-10' } });
    fireEvent.click(addButton, { button: '0' });

    fireEvent.change(txtInput, { target: { value: 'Rock' } });
    fireEvent.change(dateInput, { target: { value: '2030-10-10' } });
    fireEvent.click(addButton, { button: '0' });

    error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual(`Sorry, Rock is not a verified student!`);

    expect(list.children[0].textContent.toLowerCase()).toEqual('adam');
    expect(list.children[1].textContent.toLowerCase()).toEqual('dhilip');
    expect(list.children[2].textContent.toLowerCase()).toEqual('talisk');
  });
});
