const signInBtn =  document.querySelectorAll('button')
signInBtn.forEach((btn)=>{
	btn.onclick = (e) => {
		e.preventDefault()
		window.location = 'all-parties.html'
	}
})
