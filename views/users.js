let users = document.getElementById('userData');

fetch('/users/userdatawithrole').then(function(res) {
    res.json().then(function(userArr) {
        userArr.map(user => {
            // make table row for each user
            makeTR(user);
        });
      });
});
     
// make table row for user
function makeTR(data) {
    let tr = document.createElement('tr');
    let idTD = document.createElement('td');
    let link = document.createElement('a');
    link.setAttribute('href', `/users/${data.userId}`);
    link.innerHTML = data.userId;
    idTD.append(link);
    tr.append(idTD);
    tr.append(makeTD(data.username));
    tr.append(makeTD(data.firstName));
    tr.append(makeTD(data.lastName));
    tr.append(makeTD(data.email));
    tr.append('*********');
    tr.append(makeTD(data.role));
    users.append(tr);
}

// make table data for each piece of user data
function makeTD(data) {
    let td = document.createElement('td');
    td.innerHTML = data;
    return td;
}