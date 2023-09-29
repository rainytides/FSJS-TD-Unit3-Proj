// -------------------
// Global Variables
// -------------------
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const jobRoleSelect = document.getElementById('title');
const otherJobRoleInput = document.getElementById('other-job-role');
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = colorSelect.children;
const activities = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
const activitiesCheckboxes = activities.querySelectorAll('input[type="checkbox"]');
const paymentSelect = document.getElementById('payment');
const paymentMapping = {
    'credit-card': document.getElementById('credit-card'),
    'paypal': document.getElementById('paypal'),
    'bitcoin': document.getElementById('bitcoin')
};
const cardNumberInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

// Page Load Functions
nameInput.focus();

// Job Role Section
otherJobRoleInput.style.display = 'none';
jobRoleSelect.addEventListener('change', (e) => {
    otherJobRoleInput.style.display = e.target.value === 'other' ? '' : 'none';
});

// T-Shirt Info Section (Design/Color)
colorSelect.disabled = true;
designSelect.addEventListener('change', (e) => {
    colorSelect.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        const option = colorOptions[i];
        option.hidden = option.getAttribute('data-theme') !== e.target.value;
        option.selected = !option.hidden;
    }
});

// Function to update the total cost of selected activities
function updateActivitiesCost() {
    let totalCost = 0;
    for (let i = 0; i < activitiesCheckboxes.length; i++) {
        const checkbox = activitiesCheckboxes[i];
        if (checkbox.checked) {
            totalCost += parseInt(checkbox.getAttribute('data-cost'));
        }
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
}

// Register for Activities Section
activities.addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedTime = clicked.getAttribute('data-day-and-time');
    const clickedCost = parseInt(clicked.getAttribute('data-cost'));
    for (let i = 0; i < activitiesCheckboxes.length; i++) {
        const checkbox = activitiesCheckboxes[i];
        if (checkbox !== clicked && checkbox.getAttribute('data-day-and-time') === clickedTime) {
            checkbox.disabled = clicked.checked;
            checkbox.parentElement.classList.toggle('disabled', clicked.checked);
        }
    }
    updateActivitiesCost();
});

// Payment Info Section
paymentSelect.children[0].classList.add('hidden');
Object.values(paymentMapping).forEach(element => element.classList.add('hidden'));
paymentSelect.value = 'credit-card';
paymentMapping['credit-card'].classList.remove('hidden');
paymentSelect.addEventListener('change', (e) => {
    Object.values(paymentMapping).forEach(element => element.classList.add('hidden'));
    if (paymentMapping[e.target.value]) paymentMapping[e.target.value].classList.remove('hidden');
});

// Form Validation
form.addEventListener('submit', (e) => {
    if (!isValidName(nameInput.value)) {
        e.preventDefault();
        nameInput.parentElement.classList.add('not-valid');
    }
    if (!isValidEmailFormat(emailInput.value)) {
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

// Real-time Validation for Email, Credit Card, Zip Code, CVV, and Name
// Email
const emailFeedbackElement = document.createElement('span');
emailFeedbackElement.className = 'email-feedback';
emailInput.insertAdjacentElement('afterend', emailFeedbackElement);
emailInput.addEventListener('keyup', (e) => {
    const validationMessage = isValidEmailFormat(e.target.value);
    if (validationMessage !== true) {
        emailInput.parentElement.classList.add('not-valid');
        emailInput.parentElement.classList.remove('validation-checkmark');
        emailFeedbackElement.textContent = validationMessage;
        emailFeedbackElement.style.display = "block";
    } else {
        emailInput.parentElement.classList.remove('not-valid');
        emailInput.parentElement.classList.add('validation-checkmark');
        emailFeedbackElement.textContent = "";
        emailFeedbackElement.style.display = "none";
    }
});

// Credit Card Number
const cardNumberFeedbackElement = document.createElement('span');
cardNumberFeedbackElement.className = 'card-number-feedback';
cardNumberInput.insertAdjacentElement('afterend', cardNumberFeedbackElement);
cardNumberInput.addEventListener('keyup', (e) => {
    const validationMessage = isValidCardNumber(e.target.value);
    if (validationMessage !== true) {
        cardNumberInput.parentElement.classList.add('not-valid');
        cardNumberInput.parentElement.classList.remove('validation-checkmark');
        cardNumberFeedbackElement.textContent = validationMessage;
        cardNumberFeedbackElement.style.display = "block";
    } else {
        cardNumberInput.parentElement.classList.remove('not-valid');
        cardNumberInput.parentElement.classList.add('validation-checkmark');
        cardNumberFeedbackElement.textContent = "";
        cardNumberFeedbackElement.style.display = "none";
    }
});

// Zip Code
const zipFeedbackElement = document.createElement('span');
zipFeedbackElement.className = 'zip-feedback';
zipInput.insertAdjacentElement('afterend', zipFeedbackElement);
zipInput.addEventListener('keyup', (e) => {
    const validationMessage = isValidZip(e.target.value);
    if (validationMessage !== true) {
        zipInput.parentElement.classList.add('not-valid');
        zipInput.parentElement.classList.remove('validation-checkmark');
        zipFeedbackElement.textContent = validationMessage;
        zipFeedbackElement.style.display = "block";
    } else {
        zipInput.parentElement.classList.remove('not-valid');
        zipInput.parentElement.classList.add('validation-checkmark');
        zipFeedbackElement.textContent = "";
        zipFeedbackElement.style.display = "none";
    }
});

// CVV
const cvvFeedbackElement = document.createElement('span');
cvvFeedbackElement.className = 'cvv-feedback';
cvvInput.insertAdjacentElement('afterend', cvvFeedbackElement);
cvvInput.addEventListener('keyup', (e) => {
    const validationMessage = isValidCvv(e.target.value);
    if (validationMessage !== true) {
        cvvInput.parentElement.classList.add('not-valid');
        cvvInput.parentElement.classList.remove('validation-checkmark');
        cvvFeedbackElement.textContent = validationMessage;
        cvvFeedbackElement.style.display = "block";
    } else {
        cvvInput.parentElement.classList.remove('not-valid');
        cvvInput.parentElement.classList.add('validation-checkmark');
        cvvFeedbackElement.textContent = "";
        cvvFeedbackElement.style.display = "none";
    }
});

// Name
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

// Accessibility Features
activities.addEventListener('focus', (e) => {
    if (e.target.type === 'checkbox') e.target.parentElement.classList.add('focus');
}, true);
activities.addEventListener('blur', (e) => {
    if (e.target.type === 'checkbox') e.target.parentElement.classList.remove('focus');
}, true);

// Helper Validation Functions
function isValidName(name) {
    return /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name);
}

function isValidEmailFormat(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

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

function isValidActivities() {
    const checkedActivities = activities.querySelectorAll('input[type="checkbox"]:checked');
    return checkedActivities.length > 0;
}

function isValidPayment() {
    return paymentSelect.value !== 'select method';
}

