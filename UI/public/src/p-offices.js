const toggleView = document.getElementsByClassName('hide')
const toggleCandidate = document.getElementById('view-candidates-pre')
const toggleCandidateGov = document.getElementById('view-candidates-gov')
const toggleSenate = document.getElementById('view-senate')
const toggleMinister = document.getElementById('view-Minister')
const toggleLga = document.getElementById('view-Lga')

const arr = [...toggleView]
let theDiv

console.log(toggleCandidate.parentNode.parentElement.querySelectorAll('div.hide'))
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

toggleCandidate.onclick = () => {checkToggle(toggleCandidate)}
toggleCandidateGov.onclick = () => {checkToggle(toggleCandidateGov)}
toggleSenate.onclick = () => {checkToggle(toggleSenate)}
toggleMinister.onclick = () => {checkToggle(toggleMinister)}
toggleLga.onclick = () => {checkToggle(toggleLga)}
