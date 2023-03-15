import React, {useState} from 'react';
import { STUDENTS } from '../studentsList';
// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const [year, month, day] = joiningDate.split('-');
	const [yyyy, mm, dd] = validityDate.split('-');
	const maxValid = new Date(yyyy, mm - 1, dd);
	const selected = new Date(year, month - 1, day);
	return (maxValid >= selected) && (maxValid >= today);
}

function Search({setError, setResidentNameList, residentNameList}) {
	const [studentName, setStudentName] = useState('')
	const [joiningDate, setJoiningDate] = useState('')
	const handleAdd = () => {
		if (!STUDENTS.filter(st => st.name.toUpperCase() === studentName.toUpperCase()).length) {
			setError(`Sorry, ${studentName} is not a verified student!`);
			setStudentName('');
			return;
		} 
		if (!checkValidity(joiningDate, STUDENTS.filter(st => st.name === studentName)[0].validityDate)) {
			setError(`Sorry, ${studentName}'s validity has Expired!`);
			setStudentName('');
			return;
		}
		setResidentNameList([...residentNameList, studentName])
		setStudentName('');
	}
	return (
		<div className="my-50 layout-row align-items-end justify-content-end">
			<label htmlFor="studentName">Student Name:
				<div>
					<input id="studentName" data-testid="studentName" type="text" className="mr-30 mt-10" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
				</div>
			</label>
			<label htmlFor="joiningDate">Joining Date:
				<div>
					<input id="joiningDate" data-testid="joiningDate" type="date" className="mr-30 mt-10" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)}/>
				</div>
			</label>
			<button type="button" data-testid="addBtn" className="small mb-0" onClick={handleAdd}>Add</button>
		</div>
	);
}

export default Search;
