// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to erase a cookie
function eraseCookie(name) {   
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Function to check for existing cookie and display welcome message
function checkForCookie() {
    const welcomeDiv = document.getElementById('welcomeMessage');
    const firstName = getCookie('firstName');
    
    if (firstName) {
        welcomeDiv.innerHTML = `Welcome back, ${firstName}! <a href="#" onclick="clearUserData()">Not ${firstName}? Click HERE to start as a NEW USER.</a>`;
        // You could also auto-fill the form here if you want
    } else {
        welcomeDiv.innerHTML = "Welcome New User!";
    }
}

// Function to clear user data and cookie
function clearUserData() {
    eraseCookie('firstName');
    document.getElementById('myForm').reset();
    checkForCookie(); // Refresh the welcome message
}

// Function to handle form submission and cookie setting
function handleFormSubmission() {
    const rememberMe = document.getElementById('rememberMe').checked;
    const firstName = document.getElementById('first_name').value;
    
    if (rememberMe && firstName) {
        setCookie('firstName', firstName, 2); // Expires in 2 days
    } else {
        eraseCookie('firstName');
    }
}

// Call checkForCookie when the page loads
window.onload = function() {
    checkForCookie();
    
    // Add event listener to form submission
    document.getElementById('myForm').addEventListener('submit', function() {
        handleFormSubmission();
    });
};