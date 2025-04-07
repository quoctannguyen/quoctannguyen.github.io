
//daytime
window.onload = () => {
    document.getElementById('currentDate').textContent = 
        new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
};
//healthbar
function updateHealthValue() {
    document.getElementById('health_value').textContent = document.getElementById('health').value;
}
function validateFields() {
    // Array of validation functions
    const validationFunctions = [
        validateFullName,
        validateDOB,
        validateEmail,
        validatePhone,
        validateAddress1,
        validateAddress2,
        validateCityStateZip,
        validateUserID,
        validatePassword,
        validateRepassword
    ];

    // Assume all fields are valid initially
    let allFieldsValid = true;

    // Loop through each validation function
    for (let i = 0; i < validationFunctions.length; i++) {
        const isValid = validationFunctions[i]();
        if (!isValid) {
            allFieldsValid = false;
        }
    }

    // Enable/Disable submit button based on validation results
    const submitButton = document.getElementById("submit");
    submitButton.disabled = !allFieldsValid;
}


function validateFullName() {
    const firstName = document.getElementById("first_name").value.trim();
    const middleInitial = document.getElementById("minit").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const statusSpan = document.getElementById("validation_status");

    const nameRegex = /^[A-Za-z'-]+$/;
    const miRegex = /^[A-Za-z]?$/;

    const isFirstNameValid = nameRegex.test(firstName);
    const isMiddleInitialValid = miRegex.test(middleInitial);
    const isLastNameValid = nameRegex.test(lastName);

    if (isFirstNameValid && isMiddleInitialValid && isLastNameValid) {
        statusSpan.textContent = "✔ Valid";
        statusSpan.className = "status valid";
        return true;
    } else {
        statusSpan.textContent = "✖ Invalid";
        statusSpan.className = "status invalid";
        return false;
    }
}

function validateDOB() {
    const dobInput = document.getElementById("dob");
    const dobStatus = document.getElementById("dob_status");
    const selectedDate = new Date(dobInput.value);
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 120);

    if (!dobInput.value) {
        dobStatus.textContent = "✖ Date of Birth is required.";
        dobStatus.className = "status invalid";
        return false;
    }
    if (selectedDate > currentDate) {
        dobStatus.textContent = "✖ You are not born yet.";
        dobStatus.className = "status invalid";
        return false;
    }
    if (selectedDate < minDate) {
        dobStatus.textContent = "✖ Invalid date.";
        dobStatus.className = "status invalid";
        return false;
    }
    dobStatus.textContent = "✔ Valid date.";
    dobStatus.className = "status valid";
    return true;
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const emailStatus = document.getElementById("email_status");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(email);

    if (isEmailValid) {
        emailStatus.textContent = "✔ Valid";
        emailStatus.className = "status valid";
        return true;
    } else {
        emailStatus.textContent = "✖ Invalid Email";
        emailStatus.className = "status invalid";
        return false;
    }
}

function validatePhone() {
    const phone = document.getElementById("phone").value.trim();
    const phoneStatus = document.getElementById("phone_status");
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    const isPhoneValid = phoneRegex.test(phone);

    if (isPhoneValid) {
        phoneStatus.textContent = "✔ Valid";
        phoneStatus.className = "status valid";
        return true;
    } else {
        phoneStatus.textContent = "✖ Invalid Phone";
        phoneStatus.className = "status invalid";
        return false;
    }
}

function formatPhoneNumber() {
    let input = document.getElementById("phone");
    let numbers = input.value.replace(/\D/g, "");

    if (numbers.length > 3 && numbers.length <= 6) {
        numbers = numbers.slice(0, 3) + "-" + numbers.slice(3);
    } else if (numbers.length > 6) {
        numbers = numbers.slice(0, 3) + "-" + numbers.slice(3, 6) + "-" + numbers.slice(6, 10);
    }

    input.value = numbers;
}

function validateAddress1() {
    const address1Input = document.getElementById("address1");
    const address1Status = document.getElementById("address1_status");
    const addressRegex = /^.{2,30}$/;

    const isAddress1Valid = addressRegex.test(address1Input.value.trim());
    address1Status.textContent = isAddress1Valid ? "✔ Valid" : "✖ Invalid";
    address1Status.className = `status ${isAddress1Valid ? "valid" : "invalid"}`;

    return isAddress1Valid;
}

function validateAddress2() {
    const address2Input = document.getElementById("address2");
    const address2Status = document.getElementById("address2_status");
    const addressRegex = /^.{2,30}$/;

    const isAddress2Valid = address2Input.value.trim() === "" || addressRegex.test(address2Input.value.trim());
    address2Status.textContent = isAddress2Valid ? "✔ Valid" : "✖ Invalid";
    address2Status.className = `status ${isAddress2Valid ? "valid" : "invalid"}`;

    return isAddress2Valid;
}
function validateCityStateZip() {
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const zipInput = document.getElementById("zip");
    const zipStatus = document.getElementById("zip_status");
    const cityRegex = /^[A-Za-z\s]{2,30}$/;
    const zipRegex = /^\d{5}(-\d{4})?$/;

    // Format the zip code
    let numbers = zipInput.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (numbers.length > 5) {
        numbers = numbers.slice(0, 5) + "-" + numbers.slice(5, 9); // Auto-insert dash
    }
    zipInput.value = numbers;

    // Validation checks
    const isCityValid = cityRegex.test(cityInput.value.trim());
    const isStateValid = stateInput.value !== "";
    const isZipValid = zipRegex.test(zipInput.value.trim());

    // Update status based on validity
    if (isCityValid && isStateValid && isZipValid) {
        zipStatus.textContent = "✔ Valid";
        zipStatus.className = "status valid";
        return true;
    } else {
        zipStatus.textContent = "✖ Invalid City/State/Zip";
        zipStatus.className = "status invalid";
        return false;
    }
}

function validateUserID() {
    const userIdInput = document.getElementById("user_id");
    const userIdStatus = document.getElementById("user_id_status");
    let userIDValue = userIdInput.value.trim();

    const userIDRegex = /^[A-Za-z][A-Za-z0-9_-]{4,29}$/;
    const isUserIDValid = userIDRegex.test(userIDValue);

    userIDValue = userIDValue.toLowerCase();
    userIdInput.value = userIDValue;

    if (isUserIDValid) {
        userIdStatus.textContent = "✔ Valid User ID";
        userIdStatus.className = "status valid";
    } else {
        userIdStatus.textContent = "✖ Invalid: Must start with a letter, 5-30 characters, and contain only letters, numbers, underscores, or dashes.";
        userIdStatus.className = "status invalid";
    }

    return isUserIDValid;
}

function validatePassword() {
    const passwordInput = document.getElementById("password");
    const passwordStatus = document.getElementById("password_status");
    const userIdInput = document.getElementById("user_id");
    const firstNameInput = document.getElementById("first_name");
    const lastNameInput = document.getElementById("last_name");

    const passwordValue = passwordInput.value.trim();
    const userId = userIdInput.value.trim().toLowerCase();
    const firstName = firstNameInput.value.trim().toLowerCase();
    const lastName = lastNameInput.value.trim().toLowerCase();

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#%^&*()\-_+=\\/><.,`~])[A-Za-z\d!@#%^&*()\-_+=\\/><.,`~]{8,30}$/;

    if (!passwordPattern.test(passwordValue)) {
        passwordStatus.textContent = "✖ Password must be 8-30 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
        passwordStatus.className = "status invalid";
        return false;
    }

    if (userId && passwordValue.toLowerCase().includes(userId)) {
        passwordStatus.textContent = "✖ Password cannot contain your User ID.";
        passwordStatus.className = "status invalid";
        return false;
    }
    if (firstName && passwordValue.toLowerCase().includes(firstName)) {
        passwordStatus.textContent = "✖ Password cannot contain your First Name.";
        passwordStatus.className = "status invalid";
        return false;
    }
    if (lastName && passwordValue.toLowerCase().includes(lastName)) {
        passwordStatus.textContent = "✖ Password cannot contain your Last Name.";
        passwordStatus.className = "status invalid";
        return false;
    }

    passwordStatus.textContent = "✔ Strong password.";
    passwordStatus.className = "status valid";
    return true;
}

function validateRepassword() {
    const passwordValue = document.getElementById("password").value.trim();
    const repasswordValue = document.getElementById("repassword").value.trim();
    const repasswordStatus = document.getElementById("repassword_status");

    if (passwordValue !== repasswordValue) {
        repasswordStatus.textContent = "✖ Passwords do not match.";
        repasswordStatus.className = "status invalid";
        return false;
    }

    repasswordStatus.textContent = "✔ Passwords match.";
    repasswordStatus.className = "status valid";
    return true;
}


function loadStates() {
    const states = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", 
        "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", 
        "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", 
        "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", 
        "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", 
        "WY", "PR"
    ];
    
    const stateSelect = document.getElementById("state");
    
    stateSelect.innerHTML = "";
    
    const nullOption = document.createElement("option");
    nullOption.value = "";
    nullOption.textContent = "Select a state";
    nullOption.selected = true;
    stateSelect.appendChild(nullOption);
    
    states.forEach(stateCode => {
        const option = document.createElement("option");
        option.value = stateCode;
        option.textContent = stateCode;
        stateSelect.appendChild(option);
    });
}
document.addEventListener("DOMContentLoaded", loadStates);


function resetForm() {
    // Reset all validation status elements
    const statusElements = document.querySelectorAll(".status, .valid, .invalid");
    statusElements.forEach(element => {
        element.textContent = ""; // Clear the validation message
        element.className = "status"; // Reset the class to default
    });

    // Reset the form fields (optional, if you want to clear the form as well)
    document.getElementById("yourFormId").reset();

    // Hide the review section if it's visible
    const reviewSection = document.getElementById("reviewSection");
    if (reviewSection) {
        reviewSection.style.display = "none";
    }
}

// Add event listener to the reset button
document.querySelector('input[type="reset"]').addEventListener("click", resetForm);


function reviewForm() {
let reviewSection = document.getElementById('reviewSection');

// Toggle review section visibility
if (reviewSection.style.display === "block") {
    reviewSection.style.display = "none";
    return;
}

// Define field mappings: form field names -> corresponding span IDs
const fields = [
    { name: "first_name", id: "reviewFirstName" },
    { name: "minit", id: "reviewMiddleName" },
    { name: "last_name", id: "reviewLastName" },
    { name: "dob", id: "reviewDob" },
    { name: "email", id: "reviewEmail" },
    { name: "phone", id: "reviewPhone" },
    { name: "ssn", id: "reviewSsn" },
    { name: "address1", id: "reviewAddress1" },
    { name: "address2", id: "reviewAddress2" },
    { name: "city", id: "reviewCity" },
    { name: "state", id: "reviewState" },
    { name: "zip", id: "reviewZipcode" },
    { name: "symptoms", id: "reviewSymptoms" },
    { name: "user_id", id: "reviewUserId" },
    { name: "health", id: "reviewHealth" },
    { name: "password", id: "reviewPassword" },
    { name: "repassword", id: "reviewRepassword" }
];

// Loop through fields and update the review section
fields.forEach(field => {
    let inputElement = document.querySelector(`[name="${field.name}"]`);
    if (inputElement) {
        document.getElementById(field.id).textContent = inputElement.value || " ";
    }
});

// Get checked checkboxes (Illnesses)
let illnesses = Array.from(document.querySelectorAll('input.illness:checked'))
    .map(checkbox => checkbox.parentElement.innerText)
    .join(", ") || " ";
document.getElementById('reviewIllnesses').textContent = illnesses;

// Get selected radio button values
const radios = ["gender", "vaccinated", "insurance"];
radios.forEach(name => {
    let value = document.querySelector(`input[name="${name}"]:checked`)?.value || "Not specified";
    document.getElementById(`review${name.charAt(0).toUpperCase() + name.slice(1)}`).textContent = value;
});

// Get button values dynamically
let checkButton = document.getElementById('checkButton')?.textContent || "Check Inputs";
let reviewButton = document.querySelector('button[name="review"]')?.textContent || "Review";
let resetButton = document.querySelector('input[type="reset"]')?.value || "Reset";
let submitButton = document.querySelector('input[type="submit"]')?.value || "Submit";

// Assign button values to the review table
document.getElementById('reviewCheckButton').textContent = checkButton;
document.getElementById('reviewButton').textContent = reviewButton;
document.getElementById('reviewReset').textContent = resetButton;
document.getElementById('reviewSubmit').textContent = submitButton;

// Show the review section
reviewSection.style.display = "block";
}


function checkInputFields() {
if (!validateFullName()) {
    window.alert("Please correct your full name.");
    document.getElementById("first_name").focus();
    return;
}
if (!validateDOB()) {
    window.alert("Please correct your date of birth.");
    document.getElementById("dob").focus();
    return;
}
if (!validateEmail()) {
    window.alert("Please correct your email.");
    document.getElementById("email").focus();
    return;
}
if (!validatePhone()) {
    window.alert("Please correct your phone number.");
    document.getElementById("phone").focus();
    return;
}
if (!validateAddress1()) {
    window.alert("Please correct your address line 1.");
    document.getElementById("address1").focus();
    return;
}
if (!validateAddress2()) {
    window.alert("Please correct your address line 2.");
    document.getElementById("address2").focus();
    return;
}
if (!validateCityStateZip()) {
    window.alert("Please correct your city, state, or zip code.");
    document.getElementById("city").focus();
    return;
}
if (!validateUserID()) {
    window.alert("Please correct your user ID.");
    document.getElementById("user_id").focus();
    return;
}
if (!validatePassword()) {
    window.alert("Please correct your password.");
    document.getElementById("password").focus();
    return;
}
if (!validateRepassword()) {
    window.alert("Please correct your re-enter password.");
    document.getElementById("repassword").focus();
    return;
}

window.alert("All fields are valid!");
}






