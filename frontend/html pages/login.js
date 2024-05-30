function validateForm() {
    const email = document.querySelector('input[type="text"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();
    const rememberMe = document.querySelector('input[type="checkbox"]').checked;

    if (email === '') {
        alert('Please enter your email.');
        return false;
    } else if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password === '') {
        alert('Please enter your password.');
        return false;
    }

    return true; 
}

function isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

const form = document.getElementById('loginForm');
console.log("form: ", form );
form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (validateForm()) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        axios.post('http://127.0.0.1:8000/login/user', data)
        .then(response => {
            console.log('Form submitted successfully:', response.data);
            alert('Login successful!');
            window.location.href = "user_page.html?username=" + response.data.username;
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            if (error.response) {
                console.log(error.response.status); 
                if (error.response.status === 400) {
                    alert('Please fill all the required details.');
                } else if (error.response.status === 401) {
                    alert('Wrong password entered. Please try again.');
                } else if (error.response.status === 404) {
                    alert('No such user exists.');
                } else {
                    alert('An error occurred. Please try again later.');
                }
            } else if (error.request) {
                alert('No response from server. Please try again later.');
            } else {
                alert('Error submitting form. Please try again later.');
            }
        });

    }
});
