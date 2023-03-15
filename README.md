# React: Hacker Dormitory

Given a partially completed React application with the HTML template and few built-in functionalities, your task is to implement a resident directory that makes note of a list of residents in the dormitory.

Certain core React functionalities have already been implemented. Complete the React application as shown below in order to pass all the unit tests.

![](https://hrcdn.net/s3_pub/istreet-assets/DyxnWZZfQtoe9d6OG9hEwA/Screen%20Recording%202020-06-25%20at%209.45.30%20PM.gif)

The application has 3 Components:
 - The _Search_ view, which has two inputs: 'Student Name', where the user can type a student's name, and 'Joining Date', a date field denoting when the student will join the dormitory.
 - The _ResidentsList_ view, which shows all the residents' names.
 - The _Error_ view, which is shown in case of an error.

The `studentsList.js` file holds the _STUDENTS_ constant, which holds the _name_ and _validityDate_ of all the students who are part of the college. The structure of the _STUDENTS_ variable is as follows:
- _name_: The name of the student. `<String>`
- _validityDate_: The last valid day the student can be added to the dormitory. `<String>` of format `<yyyy-mm-dd>`

The function _checkValidity_ takes two arguments: _joiningDate_ and _validityDate_. It needs to be called to check if the student’s joining date is valid.
 - _joiningDate_: The date when the student will join the dormitory. `<String>` of format `<yyyy-mm-dd>`
 - _validityDate_: The last valid day the student can be added to the dormitory. `<String>` of format `<yyyy-mm-dd>`

The app should implement the following functionalities:
- On providing student's name and joining date, the following should happen:
   - It should check for the student's name in the _STUDENTS_ list , without case sensitivity.
   - The _checkValidity(...)_ function needs to be called to check if the student’s joining date is valid.
- If the student is part of the college and the joining date is valid, then they should be added to the 'Residents List' `<ul>`.
- If the student  is not part of the college, then show the following error message:
   - _"Sorry, `<NAME>` is not a verified student!"_
   - `<NAME>` represents the name of the student who is being checked if they are part of the college.
 - If the student's name is valid but the joining date is after the student's validity date, then show the following error message:
    - _"Sorry, `<NAME>`'s validity has Expired!"_
    - `<NAME>` represents the name of the student whose validity is being checked for.
 - After adding each student, the form should be cleared out.

### Note:
- Retrieve the list of college students from the `studentsList.js` file.

The following data-testid attributes are required in the component for the tests to pass:

- The 'Student Name' `<input>` tag should have the data-testid 'studentName'.
- The 'Joining Date' `<input>` tag should have the data-testid 'joiningDate'.
- The 'Add' `<button>` tag should have the data-testid 'addBtn'.
- The error message `<div>` tag should have the data-testid 'errorMsg'.
- The 'Residents List' `<ul>` should have the data-testid 'residentsNameList'.

Please note that the component has the above data-testid attributes for test cases. It is advised not to change them.

## Environment 

- React Version: 16.13.1
- Default Port: 8000


**Read Only Files**
- `src/App.test.js`


**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```

