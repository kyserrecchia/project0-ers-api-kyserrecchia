let navBar = document.getElementById('nav');

fetch('/info').then(function(res) {
    res.json().then(function(userSess) {
        if (userSess.role === 1 || userSess.role === 2) {
            let link = document.createElement('a');
            link.innerText = 'Users';
            link.setAttribute('href', '/users');
            navBar.append(link);
        }
      });
});