// warning in guber candiadte form
const warningGuber = document.getElementById("warningGuber");
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

// it should make the voters from visible
warningGuber.onclick = () => {
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


