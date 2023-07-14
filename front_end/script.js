document.getElementById('registrationForm').addEventListener('submit', function (event) {
	event.preventDefault();

	let name = document.getElementById('name').value;
	let password = document.getElementById('password').value;

	let newUser = {
		name,
		password,
	};


	fetch('/registration', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newUser)
	})
		


	document.getElementById('registrationForm').reset();
	window.location.href = "login.html";
	
});
