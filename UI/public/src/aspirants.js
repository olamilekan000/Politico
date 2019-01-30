let toggleMenuBtn
let navToggle
let nav

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


const btn = document.querySelectorAll('button#profile')
btn.forEach( function(element) {
	element.onclick = (e) => {
		e.preventDefault()
		// testing routing
		window.location = 'profile-page.html'
	}
});
