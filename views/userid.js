let users = document.getElementById('userIdData');
let url = window.location.pathname.split('/');
let userid = document.getElementById('userid');
let username = document.getElementsByName('username')[0];
let firstname = document.getElementsByName('firstname')[0];
let lastname = document.getElementsByName('lastname')[0];
let email = document.getElementsByName('email')[0];
let password = document.getElementsByName('password')[0];
let role = document.getElementsByName('role')[0];

fetch(`/users/userdatabyid/${url[url.length-1]}`).then(function(res) {
    res.json().then(function(userbyid) {
            userid.innerText = userbyid.userId;
            username.value = userbyid.username;
            firstname.value = userbyid.firstName;
            lastname.value = userbyid.lastName;
            email.value = userbyid.email;
            password.value = userbyid.password;
            role.value = userbyid.role;
      });
});



