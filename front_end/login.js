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

	}).then((resp) => {

		elem.innerHTML = resp
		if (resp == "fail name or password is invalid") {
			elem.style.color = 'red'
		} else {
			elem.style.color = 'green'
		}



	})



	document.getElementById('loginForm').reset();


});

