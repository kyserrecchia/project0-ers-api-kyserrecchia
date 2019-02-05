let reims = document.getElementById('reimAuthorData');
let url = window.location.pathname.split('/')

fetch(`/reimbursements/author/byuserId/${url[url.length-1]}`).then(function(res) {
    res.json().then(function(reimArr) {
        reimArr.map(re => {
            let li = document.createElement('li');
            li.innerHTML = re.description;
            reims.append(li);
        });
      });
});
     