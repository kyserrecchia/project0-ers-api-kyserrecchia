let navBar = document.getElementById('nav');
let welcomeSess = document.getElementById('welcome');

fetch('/info').then(function(res) {
    res.json().then(function(userSess) {

        // conditionally render navbar based on user role
        if (userSess.role === 1 || userSess.role === 2) {
            let link = document.createElement('a');
            link.innerText = 'Users';
            link.setAttribute('href', '/users');
            navBar.append(link);
        }

        // send welcome to user by first name
        welcomeSess.innerText = `Welcome, ${userSess.firstName}!`;
      });
});