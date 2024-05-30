function validateForm() {
    const name = document.getElementById("firstname-input-box").value.trim(); 
    const email = document.getElementById("email-input-box").value.trim();
    const password = document.getElementById('password-box').value.trim();
    const confirm_password = document.getElementById('confirm-password-box').value.trim();



    if( name === '' ) {
        alert('Please enter your first name.'); 
        return false; 
    }

    if (email === '') {
        alert('Please enter your email.');
        return false;
    } 
    else if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password === '') {
        alert('Please enter your password.');
        return false;
    }
    else if ( confirm_password === '') {
        alert('Please confirm your password.'); 
        return false; 
    }
    else if( password != confirm_password ) {
        alert('Password and confirm password values should be same!!'); 
        return false; 
    }

    return true; 
}

function isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

const form = document.getElementById('SignUpForm');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (validateForm()) {
    
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        axios.post('http://127.0.0.1:8000/signUp/user', data)
        .then(response => {
            console.log('Form submitted successfully:', response.data);
            alert('Account Created. Thanks for joining us. Now please login to proceed!');
            window.location.href = 'http://127.0.0.1:5500/frontend/html%20pages/login_page.html'; 
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            if (error.response) {
                alert('Please fill all the required details.');
            }
            else {
                alert('Error submitting form. Please try again later.');
            }
        });

    }
});