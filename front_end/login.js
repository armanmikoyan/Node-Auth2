let elem = document.querySelector('#res')
document.getElementById('loginForm').addEventListener('submit', function (event) {
	event.preventDefault();


	let name = document.getElementById('name').value;
	let password = document.getElementById('password').value;

	let data = {
		name,
		password,
	};


	fetch('/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then((data) => {
		return data.json()

	}).then((key) => {
		localStorage.setItem('token', key);
		localStorage.setItem('name', name);
		window.location.href = '/users.html';
	
	})




	document.getElementById('loginForm').reset();


});

