import React from 'react';

function Error({error}) {
	return <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">{error}</div>
}

export default Error;
