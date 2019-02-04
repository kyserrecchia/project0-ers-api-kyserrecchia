let users = document.getElementById('userData');


fetch('/users/userdata').then(function(res) {
    res.json().then(function(userArr) {
        userArr.map(use => {
            let li = document.createElement('li');
            li.innerHTML = use.username;
            users.append(li);
        });
      });
});
     