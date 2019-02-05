let users = document.getElementById('reimData');


fetch('/reimbursements/reimdata').then(function(res) {
    res.json().then(function(reimArr) {
        reimArr.map(re => {
            let li = document.createElement('li');
            li.innerHTML = re.description;
            users.append(li);
        });
      });
});