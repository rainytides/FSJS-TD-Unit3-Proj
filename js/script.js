

// Step 1: Add a focus event listener to the name input field
const nameInput = document.getElementById('name');
if (nameInput) {
    nameInput.focus();
}

// Step 2: Add a change event listener to the job role select element
const jobRoleSelect = document.getElementById('title');
const otherJobRoleInput = document.getElementById('other-job-role');

// Initially hide the "Other job role" text field
otherJobRoleInput.style.display = 'none';

jobRoleSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRoleInput.style.display = '';
    } else {
        otherJobRoleInput.style.display = 'none';
    }
});

// Step 3: Add a change event listener to the design select element
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = colorSelect.children;

// Initially disable the color select element
colorSelect.disabled = true;
designSelect.addEventListener('change', (e) => {
    colorSelect.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        const option = colorOptions[i];
        const theme = option.getAttribute('data-theme');
        if (e.target.value === theme) {
            option.hidden = false;
            option.selected = true;
        } else {
            option.hidden = true;
            option.selected = false;
        }
    }
});

// Step 4: Add a change event listener to the activities section
const activities = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
const activitiesCheckboxes = activities.querySelectorAll('input[type="checkbox"]');
let totalCost = 0;

activities.addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedTime = clicked.getAttribute('data-day-and-time');
    const clickedCost = parseInt(clicked.getAttribute('data-cost'));

    for (let i = 0; i < activitiesCheckboxes.length; i++) {
        const checkbox = activitiesCheckboxes[i];
        const checkboxTime = checkbox.getAttribute('data-day-and-time');

        if (clicked !== checkbox && clickedTime === checkboxTime) {
            if (clicked.checked) {
                checkbox.disabled = true;
                checkbox.parentElement.classList.add('disabled');
            } else {
                checkbox.disabled = false;
                checkbox.parentElement.classList.remove('disabled');
            }
        }
    }

    if (clicked.checked) {
        totalCost += clickedCost;
    } else {
        totalCost -= clickedCost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
});

// Step 5: Add a change event listener to the payment select element
const paymentSelect = document.getElementById('payment');
const paymentMapping = {
    'credit-card': document.getElementById('credit-card'),
    'paypal': document.getElementById('paypal'),
    'bitcoin': document.getElementById('bitcoin')
};

paymentSelect.children[0].classList.add('hidden');
for (let method in paymentMapping) {
    paymentMapping[method].classList.add('hidden');
}
paymentSelect.value = 'credit-card';
paymentMapping['credit-card'].classList.remove('hidden');

paymentSelect.addEventListener('change', (e) => {
    const selectedPayment = e.target.value;
    for (let method in paymentMapping) {
        paymentMapping[method].classList.add('hidden');
    }
    if (paymentMapping[selectedPayment]) {
        paymentMapping[selectedPayment].classList.remove('hidden');
    }
});

// Step 6: Add a submit event listener to the form element
const form = document.querySelector('form');
const emailInput = document.querySelector('#email'); // Assuming the email input has an id of 'email'

// Real-time email validation
emailInput.addEventListener('input', () => {
    if (!isValidEmail(emailInput.value)) {
        emailInput.parentElement.classList.add('not-valid');
    } else {
        emailInput.parentElement.classList.remove('not-valid');
    }
});

form.addEventListener('submit', (e) => {
    if (!isValidName(nameInput.value)) {
        e.preventDefault();
        nameInput.parentElement.classList.add('not-valid');
    }
    if (!isValidEmail(emailInput.value)) {
        e.preventDefault();
        emailInput.parentElement.classList.add('not-valid');
    }
    if (!isValidActivities()) {
        e.preventDefault();
        activities.classList.add('not-valid');
    }
    if (!isValidPayment()) {
        e.preventDefault();
        paymentSelect.parentElement.classList.add('not-valid');
    }
    if (paymentSelect.value === 'credit-card') {
        if (!isValidCardNumber(cardNumberInput.value)) {
            e.preventDefault();
            cardNumberInput.parentElement.classList.add('not-valid');
        }
        if (!isValidZip(zipInput.value)) {
            e.preventDefault();
            zipInput.parentElement.classList.add('not-valid');
        }
        if (!isValidCvv(cvvInput.value)) {
            e.preventDefault();
            cvvInput.parentElement.classList.add('not-valid');
        }
    }
});


// Step 7: Add a focus event listener to the activities section
activities.addEventListener('focus', (e) => {
    const clicked = e.target;
    if (clicked.type === 'checkbox') {
        clicked.parentElement.classList.add('focus');
    }
}, true);

// Step 8: Add a blur event listener to the activities section
activities.addEventListener('blur', (e) => {
    const clicked = e.target;
    if (clicked.type === 'checkbox') {
        clicked.parentElement.classList.remove('focus');
    }
}, true);

// Step 9: Real-Time Error Messages for the email and credit card fields
const emailFeedbackElement = document.createElement('span');
emailFeedbackElement.className = 'email-feedback';
emailInput.insertAdjacentElement('afterend', emailFeedbackElement);

emailInput.addEventListener('keyup', (e) => {
    const validationMessage = isValidEmail(e.target.value);
    
    if (validationMessage !== true) {
        emailInput.parentElement.classList.add('not-valid');
        emailFeedbackElement.textContent = validationMessage;
        emailFeedbackElement.style.display = "block";
    } else {
        emailInput.parentElement.classList.remove('not-valid');
        emailFeedbackElement.textContent = "";
        emailFeedbackElement.style.display = "none";
    }
});

// Real-Time Error Messages for the credit card number field
const cardNumberInput = document.getElementById('cc-num'); // Assuming the credit card input has an id of 'cc-num'
const cardNumberFeedbackElement = document.createElement('span');
cardNumberFeedbackElement.className = 'card-number-feedback';
cardNumberInput.insertAdjacentElement('afterend', cardNumberFeedbackElement);

cardNumberInput.addEventListener('keyup', (e) => {
    const validationMessage = isValidCardNumber(e.target.value);
    
    if (validationMessage !== true) {
        cardNumberInput.parentElement.classList.add('not-valid');
        cardNumberFeedbackElement.textContent = validationMessage;
        cardNumberFeedbackElement.style.display = "block";
    } else {
        cardNumberInput.parentElement.classList.remove('not-valid');
        cardNumberFeedbackElement.textContent = "";
        cardNumberFeedbackElement.style.display = "none";
    }
});

function isValidCardNumber(cardNumber) {
    if (!cardNumber) {
        return "Please enter a credit card number.";
    }
    if (!/^\d+$/.test(cardNumber)) {
        return "Credit card number must be numeric.";
    }
    if (!/^\d{13,16}$/.test(cardNumber)) {
        return "Credit card number must be between 13 and 16 digits.";
    }
    return true;
}

// Event listener for the form submit to reload the page
form.addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.reload();
});

// Real-Time Error Messages for the Zip Code field
const zipInput = document.getElementById('zip');
const zipFeedbackElement = document.createElement('span');
zipFeedbackElement.className = 'zip-feedback';
zipInput.insertAdjacentElement('afterend', zipFeedbackElement);

zipInput.addEventListener('keyup', (e) => {
    const validationMessage = isValidZip(e.target.value);

    if (validationMessage !== true) {
        zipInput.parentElement.classList.add('not-valid');
        zipFeedbackElement.textContent = validationMessage;
        zipFeedbackElement.style.display = "block";
    } else {
        zipInput.parentElement.classList.remove('not-valid');
        zipFeedbackElement.textContent = "";
        zipFeedbackElement.style.display = "none";
    }
});

function isValidZip(zip) {
    if (!zip) {
        return "Please enter a zip code.";
    }
    if (!/^\d+$/.test(zip)) {
        return "Zip code must be numeric.";
    }
    if (zip.length !== 5) {
        return "Zip code must be 5 digits.";
    }
    return true;
}

// Real-Time Error Messages for the CVV field
const cvvInput = document.getElementById('cvv');
const cvvFeedbackElement = document.createElement('span');
cvvFeedbackElement.className = 'cvv-feedback';
cvvInput.insertAdjacentElement('afterend', cvvFeedbackElement);

cvvInput.addEventListener('keyup', (e) => {
    const validationMessage = isValidCvv(e.target.value);

    if (validationMessage !== true) {
        cvvInput.parentElement.classList.add('not-valid');
        cvvFeedbackElement.textContent = validationMessage;
        cvvFeedbackElement.style.display = "block";
    } else {
        cvvInput.parentElement.classList.remove('not-valid');
        cvvFeedbackElement.textContent = "";
        cvvFeedbackElement.style.display = "none";
    }
});

function isValidCvv(cvv) {
    if (!cvv) {
        return "Please enter a CVV.";
    }
    if (!/^\d+$/.test(cvv)) {
        return "CVV must be numeric.";
    }
    if (cvv.length !== 3) {
        return "CVV must be 3 digits.";
    }
    return true;
}


// Helper functions
function isValidName(name) {
    return /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name);
}

function isValidActivities() {
    const checkedActivities = activities.querySelectorAll('input[type="checkbox"]:checked');
    return checkedActivities.length > 0;
}

function isValidPayment() {
    return paymentSelect.value !== 'select method';
}

function isValidEmail(email) {
    if (email === "") {
        return "Please enter an email address.";
    }
    if (!/^[^@]+@[^@.]+\.[a-z]+$/i.test(email)) {
        return "Please enter a valid email address.";
    }
    return true;
}

// Validate Email
emailInput.addEventListener('keyup', function() {
    if (isValidEmail(emailInput.value) === true) {
        emailInput.parentElement.classList.add('validation-checkmark');
    } else {
        emailInput.parentElement.classList.remove('validation-checkmark');
    }
});

// Validate Credit Card Number
cardNumberInput.addEventListener('keyup', function() {
    if (isValidCardNumber(cardNumberInput.value) === true) {
        cardNumberInput.parentElement.classList.add('validation-checkmark');
    } else {
        cardNumberInput.parentElement.classList.remove('validation-checkmark');
    }
});

// Validate Zip Code
zipInput.addEventListener('keyup', function() {
    if (isValidZip(zipInput.value) === true) {
        zipInput.parentElement.classList.add('validation-checkmark');
    } else {
        zipInput.parentElement.classList.remove('validation-checkmark');
    }
});

// Validate CVV
cvvInput.addEventListener('keyup', function() {
    if (isValidCvv(cvvInput.value) === true) {
        cvvInput.parentElement.classList.add('validation-checkmark');
    } else {
        cvvInput.parentElement.classList.remove('validation-checkmark');
    }
});

// Validate Name
const nameFeedbackElement = document.createElement('span');
nameFeedbackElement.className = 'name-feedback';
nameInput.insertAdjacentElement('afterend', nameFeedbackElement);

nameInput.addEventListener('keyup', function() {
    if (isValidName(nameInput.value)) {
        nameInput.parentElement.classList.add('validation-checkmark');
    } else {
        nameInput.parentElement.classList.remove('validation-checkmark');
    }
});


// Step 10: Validating input elements and their corresponding validation functions
const inputValidations = {
    'cc-num': isValidCardNumber,
    'zip': isValidZip,
    'cvv': isValidCvv,
    'name': isValidName, 
};

// Keyup event listener for form element (Event Delegation)
form.addEventListener('keyup', (e) => {
    const inputElement = e.target;
    const inputId = inputElement.id;
    const validationFunction = inputValidations[inputId];

    if (validationFunction) {
        const isValid = validationFunction(inputElement.value);

        if (isValid) {
            inputElement.parentElement.classList.remove('not-valid');
        } else {
            inputElement.parentElement.classList.add('not-valid');
        }
    }
});

// Section 11: Accessibility enhancements
activities.addEventListener('focus', (e) => {
    const clicked = e.target;
    if (clicked.type === 'checkbox') {
        clicked.parentElement.classList.add('focus');
    }
}, true);

//Section 12: Register button functionality
form.addEventListener('submit', (e) => {
    e.preventDefault();
    location.reload();
});

