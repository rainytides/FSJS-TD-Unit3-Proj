

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
const emailInput = document.getElementById('email');
const cardNumberInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

form.addEventListener('submit', (e) => {
    if (!isValidName(nameInput.value) || nameInput.value.trim() === "") {
        e.preventDefault();
        nameInput.parentElement.classList.add('not-valid');
    } else {
        nameInput.parentElement.classList.remove('not-valid');
    }

    if (!isValidEmailDetailed(emailInput.value) || emailInput.value.trim() === "") {
        e.preventDefault();
        emailInput.parentElement.classList.add('not-valid');
    } else {
        emailInput.parentElement.classList.remove('not-valid');
    }

    if (!isValidActivities()) {
        e.preventDefault();
        activities.classList.add('not-valid');
    } else {
        activities.classList.remove('not-valid');
    }

    if (paymentSelect.value === 'credit-card') {
        if (!isValidCardNumber(cardNumberInput.value)) {
            e.preventDefault();
            cardNumberInput.parentElement.classList.add('not-valid');
        } else {
            cardNumberInput.parentElement.classList.remove('not-valid');
        }
        
        if (!isValidZip(zipInput.value)) {
            e.preventDefault();
            zipInput.parentElement.classList.add('not-valid');
        } else {
            zipInput.parentElement.classList.remove('not-valid');
        }
        
        if (!isValidCvv(cvvInput.value)) {
            e.preventDefault();
            cvvInput.parentElement.classList.add('not-valid');
        } else {
            cvvInput.parentElement.classList.remove('not-valid');
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

// Step 9: Real-Time Error Messages for the email field
const emailFeedbackElement = document.createElement('span');
emailFeedbackElement.className = 'email-feedback';
emailInput.insertAdjacentElement('afterend', emailFeedbackElement);

emailInput.addEventListener('keyup', (e) => {
    const validationMessage = isValidEmailDetailed(e.target.value);
    
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

// Helper functions
function isValidName(name) {
    return /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name);
}

function isValidCardNumber(cardNumber) {
    return /^\d{13,16}$/.test(cardNumber);
}

function isValidZip(zip) {
    return /^\d{5}$/.test(zip);
}

function isValidCvv(cvv) {
    return /^\d{3}$/.test(cvv);
}

function isValidActivities() {
    const checkedActivities = activities.querySelectorAll('input[type="checkbox"]:checked');
    return checkedActivities.length > 0;
}

function isValidPayment() {
    return paymentSelect.value !== 'select method';
}

function isValidEmailDetailed(email) {
    if (email === "") {
        return "Please enter an email address.";
    }
    if (!/^[^@]+@[^@.]+\.[a-z]+$/i.test(email)) {
        return "Please enter a valid email address.";
    }
    return true;
}

// Step 10: Validating input elements and their corresponding validation functions
const inputValidations = {
    'cc-num': isValidCardNumber,
    'zip': isValidZip,
    'cvv': isValidCvv,
    'name': isValidName,
    'other-job-role': isValidOtherJobRole, // Assuming you have defined this function elsewhere
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

// Accessibility enhancements
activities.addEventListener('focus', (e) => {
    const clicked = e.target;
    if (clicked.type === 'checkbox') {
        clicked.parentElement.classList.add('focus');
    }
}, true);

