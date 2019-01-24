// guber-candidate form
const hideGuberForm = document.getElementById("guberCandiForm");
// warning in guber candiadte form
const warningGuber = document.getElementById("warningGuber");
// warning in the voters form
const warning = document.getElementById("warning");
// voters' form
const votersForm = document.getElementById("voters");

// function to hise form 
const hideForm = (form) => {	
	form.style.display = 'none';
}

// function to make form visible
const makeFormVisible = (form) => {	
	form.style.display = 'block';
}

hideForm(hideGuberForm);

// it should hide the voters form 
warning.onclick = () => {
	hideForm(votersForm);
	makeFormVisible(hideGuberForm);
}

// it should make the voters from visible
warningGuber.onclick = () => {
	hideForm(hideGuberForm);
	makeFormVisible(votersForm);
}

// prevents default behaviour of the botton
const btn = document.querySelectorAll('button')
btn.forEach( function(element) {
	element.onclick = (e) => {
		e.preventDefault()
		// testing routing
		window.location = 'dashboard.html'
	}
});


