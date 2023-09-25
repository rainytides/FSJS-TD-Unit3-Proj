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

//Initially disable the color select element
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
    const clickedCost = parseInt(clicked.getAttribute('data-cost'));
    if (clicked.checked) {
        totalCost += clickedCost;
    } else {
        totalCost -= clickedCost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
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
});

// Step 5: Add a change event listener to the payment select element
const paymentSelect = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

// Initially hide the "Select Payment Method" option
paymentSelect.children[0].hidden = true;

// Initially hide the paypal and bitcoin divs
paypalDiv.hidden = true;
bitcoinDiv.hidden = true;

paymentSelect.addEventListener('change', (e) => {
    const selectedPayment = e.target.value;
    if (selectedPayment === 'credit-card') {
        creditCardDiv.hidden = false;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = true;
    } else if (selectedPayment === 'paypal') {
        creditCardDiv.hidden = true;
        paypalDiv.hidden = false;
        bitcoinDiv.hidden = true;
    } else if (selectedPayment === 'bitcoin') {
        creditCardDiv.hidden = true;
        paypalDiv.hidden = true;
        bitcoinDiv.hidden = false;
    }
});

// Step 6: Add a submit event listener to the form element
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const cardNumberInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

form.addEventListener('submit', (e) => {
    cardNumberInput.parentElement.classList.remove('not-valid');    
    zipInput.parentElement.classList.remove('not-valid');
    cvvInput.parentElement.classList.remove('not-valid');
    emailInput.parentElement.classList.remove('not-valid');
    activities.classList.remove('not-valid');
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

// Step 9: Validating input elements and their corresponding validation functions
const inputValidations = {
    'cc-num': isValidCardNumber,
    'zip': isValidZip,
    'cvv': isValidCvv,
    'email': isValidEmail,
    'name': isValidName,
    'other-job-role': isValidName,
    'design': isValidActivities,
    'payment': isValidActivities,
    'color': isValidActivities,
    'title': isValidActivities,
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

// For the activities section
activities.addEventListener('keyup', (e) => {
    const isValid = isValidActivities();
    if (isValid) {
        activities.classList.remove('not-valid');
    } else {
        activities.classList.add('not-valid');
    }
});


