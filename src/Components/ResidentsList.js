import React from 'react';

function ResidentsList({residentNameList}) {
	return (
		<div className="pa-10 mt-10 w-75">
			<div className="font-weight-bold text-center">Residents List</div>
			<ul className="mt-10 styled w-50 mx-auto" data-testid="residentsNameList">
				{residentNameList.map((resident, idx) => 
					<li key={`item${idx}`} className="slide-up-fade-in">
						{resident}
					</li>
				)}
			</ul>
		</div>
	);
}

export default ResidentsList;
