let toggleMenuBtn
let navToggle
let nav

const toggleView = document.getElementsByClassName('hide')
const toggleCandidate = document.getElementById('view-candidates-pre')
const toggleCandidateGov = document.getElementById('view-candidates-gov')
const toggleSenate = document.getElementById('view-senate')
const toggleMinister = document.getElementById('view-Minister')
const toggleLga = document.getElementById('view-Lga')

toggleCandidate.onclick = () => {checkToggle(toggleCandidate)}
toggleCandidateGov.onclick = () => {checkToggle(toggleCandidateGov)}
toggleSenate.onclick = () => {checkToggle(toggleSenate)}
toggleMinister.onclick = () => {checkToggle(toggleMinister)}
toggleLga.onclick = () => {checkToggle(toggleLga)}

const arr = [...toggleView]
let theDiv

arr.forEach( function(element) {
	// statements
	theDiv = element
	element.style.display = 'none'
});

const checkToggle = (div) => {
	div.parentNode.parentElement.querySelectorAll('div.hide').forEach( function(element) {
		// statements
		if (element.style.display === 'none') {
			element.style.display = 'block'
			element.style.transition = 'all 2s ease-in'
		}else{
			element.style.display = 'none'
			element.style.transition = 'all 1s ease-in'	
		}		
	});	
}

toggleMenuBtn = document.getElementById('toggle-menu');
navToggle = document.getElementById('nav-toggle');
nav = document.getElementById('nav')

const checkLog = setInterval(()=>{

		if (window.outerWidth <= 1196) {
			nav.style.display = 'none'
			navToggle.style.display = 'none'
			toggleMenuBtn.style.display = 'block'
		}else{
			nav.style.display = 'block'
			navToggle.style.display = 'none'
			toggleMenuBtn.style.display = 'none'
		}

}, 1)


toggleMenuBtn.onclick = () => { 

	if(navToggle.style.display == 'none'){
		navToggle.style.display = 'block'
		clearInterval(checkLog)
	}else{
		navToggle.style.display = 'none'
	}

}