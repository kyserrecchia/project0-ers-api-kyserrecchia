let users = document.getElementById('userIdData');
let url = window.location.pathname.split('/')

fetch(`/users/userdatabyid/${url[url.length-1]}`).then(function(res) {
    res.json().then(function(userbyid) {
            let li = document.createElement('li');
            li.innerHTML = userbyid.username;
            users.append(li);
      });
});
     