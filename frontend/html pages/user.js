const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

document.getElementById('user_name').innerText = username;
