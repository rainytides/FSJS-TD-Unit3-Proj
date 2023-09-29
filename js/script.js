// Focus on the Name input field when the page loads
const nameInput = document.getElementById('name');
nameInput.focus();

// Hide the "Other" job role input initially
const otherJobRoleInput = document.getElementById('other-job-role');
otherJobRoleInput.style.display = 'none';

// Listen for changes in the Job Role select field
const jobRoleSelect = document.getElementById('title');
jobRoleSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRoleInput.style.display = 'block';
    } else {
        otherJobRoleInput.style.display = 'none';
    }
});

// Hide the "Select Theme" option element in the "Design" menu  
const designSelect = document.getElementById('design');
const designSelectOptions = designSelect.children;
designSelectOptions[0].hidden = true;

// Disable the "Color" select menu
const colorSelect = document.getElementById('color');
colorSelect.disabled = true;

// Listen for changes in the Design select field
designSelect.addEventListener('change', (e) => {
    // Enable the "Color" select menu
    colorSelect.disabled = false;

    // Show only the color options that match the design selected
    for (let i = 0; i < colorSelect.children.length; i++) {
        const colorOption = colorSelect.children[i];
        const colorOptionDataTheme = colorOption.getAttribute('data-theme');

        if (colorOptionDataTheme === e.target.value) {
            colorOption.hidden = false;
            colorOption.selected = true;
        } else {
            colorOption.hidden = true;
            colorOption.selected = false;
        }
    }
});

// Create a variable to store the total cost of the activities selected
let totalCost = 0;

// Create a variable to store the activities checkboxes
const activitiesFieldset = document.getElementById('activities');
const activitiesCheckboxes = activitiesFieldset.querySelectorAll('input[type="checkbox"]');
const activitiesCost = document.getElementById('activities-cost');

// Listen for changes in the activities checkboxes
activitiesFieldset.addEventListener('change', (e) => {
    const activityCost = parseInt(e.target.getAttribute('data-cost'));
    const activityChecked = e.target.checked;

    // Add or subtract the cost of the activity selected
    if (activityChecked) {
        totalCost += activityCost;
    } else {
        totalCost -= activityCost;
    }

    // Display the total cost of the activities selected
    activitiesCost.innerHTML = `Total: $${totalCost}`;

    // Disable the activities that occur at the same time
    const activityDayAndTime = e.target.getAttribute('data-day-and-time');

    for (let i = 0; i < activitiesCheckboxes.length; i++) {
        const activityCheckbox = activitiesCheckboxes[i];
        const activityCheckboxDayAndTime = activityCheckbox.getAttribute('data-day-and-time');

        if (activityDayAndTime === activityCheckboxDayAndTime && e.target !== activityCheckbox) {
            if (activityChecked) {
                activityCheckbox.disabled = true;
                activityCheckbox.parentElement.classList.add('disabled');
            } else {
                activityCheckbox.disabled = false;
                activityCheckbox.parentElement.classList.remove('disabled');
            }
        }
    }
});

// Create a variable to store the payment select field
const paymentSelect = document.getElementById('payment');
const paymentSelectOptions = paymentSelect.children;

// Hide the "Select Payment Method" option element in the "Payment Info" menu
paymentSelectOptions[0].hidden = true;

// Hide the "PayPal" and "Bitcoin" div elements
const paypalDiv = document.getElementById('paypal');
paypalDiv.style.display = 'none';

const bitcoinDiv = document.getElementById('bitcoin');
bitcoinDiv.style.display = 'none';

// Display the "Credit Card" div element by default
const creditCardDiv = document.getElementById('credit-card');
creditCardDiv.style.display = 'block';

// Listen for changes in the payment select field
paymentSelect.addEventListener('change', (e) => {
    // Display the payment method selected
    if (e.target.value === 'credit-card') {
        creditCardDiv.style.display = 'block';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if (e.target.value === 'paypal') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'block';
        bitcoinDiv.style.display = 'none';
    } else if (e.target.value === 'bitcoin') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';
    }
});

// Create a variable to store the form element
const form = document.querySelector('form');

// Create a variable to store the name input field
const nameInputField = document.getElementById('name');

// Create a variable to store the email input field
const emailInputField = document.getElementById('email');

// Create a variable to store the activities checkboxes
const activitiesCheckboxesFieldset = document.getElementById('activities');

// Create a variable to store the credit card number input field
const creditCardNumberInputField = document.getElementById('cc-num');

// Create a variable to store the zip code input field
const zipCodeInputField = document.getElementById('zip');

// Create a variable to store the CVV input field
const cvvInputField = document.getElementById('cvv');

// Create a function to validate the name input field
const validateName = () => {
    const nameInputFieldValue = nameInputField.value;

    if (nameInputFieldValue === '') {
        nameInputField.parentElement.classList.add('not-valid');
        nameInputField.parentElement.classList.remove('valid');
        nameInputField.parentElement.lastElementChild.style.display = 'block';
        return false;
    } else {
        nameInputField.parentElement.classList.add('valid');
        nameInputField.parentElement.classList.remove('not-valid');
        nameInputField.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
};

// Create a function to validate the email input field
const validateEmail = () => {
    const emailInputFieldValue = emailInputField.value;
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;

    if (emailInputFieldValue === '') {
        emailInputField.parentElement.classList.add('not-valid');
        emailInputField.parentElement.classList.remove('valid');
        emailInputField.parentElement.lastElementChild.style.display = 'block';
        emailInputField.parentElement.lastElementChild.innerHTML = 'Email field cannot be blank';
        return false;
    } else if (!emailRegex.test(emailInputFieldValue)) {
        emailInputField.parentElement.classList.add('not-valid');
        emailInputField.parentElement.classList.remove('valid');
        emailInputField.parentElement.lastElementChild.style.display = 'block';
        emailInputField.parentElement.lastElementChild.innerHTML = 'Please enter a valid email address';
        return false;
    } else {
        emailInputField.parentElement.classList.add('valid');
        emailInputField.parentElement.classList.remove('not-valid');
        emailInputField.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
};

// Create a function to validate the activities checkboxes
const validateActivities = () => {
    const activitiesCheckboxesFieldsetLegend = activitiesCheckboxesFieldset.firstElementChild;

    if (totalCost === 0) {
        activitiesCheckboxesFieldsetLegend.classList.add('not-valid');
        activitiesCheckboxesFieldsetLegend.classList.remove('valid');
        activitiesCheckboxesFieldset.lastElementChild.style.display = 'block';
        return false;
    } else {
        activitiesCheckboxesFieldsetLegend.classList.add('valid');
        activitiesCheckboxesFieldsetLegend.classList.remove('not-valid');
        activitiesCheckboxesFieldset.lastElementChild.style.display = 'none';
        return true;
    }
};

// Create a function to validate the credit card number input field
const validateCreditCardNumber = () => {
    const creditCardNumberInputFieldValue = creditCardNumberInputField.value;
    const creditCardNumberRegex = /^\d{13,16}$/;

    if (creditCardNumberInputFieldValue === '') {
        creditCardNumberInputField.parentElement.classList.add('not-valid');
        creditCardNumberInputField.parentElement.classList.remove('valid');
        creditCardNumberInputField.parentElement.lastElementChild.style.display = 'block';
        creditCardNumberInputField.parentElement.lastElementChild.innerHTML = 'Credit card number field cannot be blank';
        return false;
    } else if (!creditCardNumberRegex.test(creditCardNumberInputFieldValue)) {
        creditCardNumberInputField.parentElement.classList.add('not-valid');
        creditCardNumberInputField.parentElement.classList.remove('valid');
        creditCardNumberInputField.parentElement.lastElementChild.style.display = 'block';
        creditCardNumberInputField.parentElement.lastElementChild.innerHTML = 'Please enter a number that is between 13 and 16 digits long';
        return false;
    } else {
        creditCardNumberInputField.parentElement.classList.add('valid');
        creditCardNumberInputField.parentElement.classList.remove('not-valid');
        creditCardNumberInputField.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
};

// Create a function to validate the zip code input field
const validateZipCode = () => {
    const zipCodeInputFieldValue = zipCodeInputField.value;
    const zipCodeRegex = /^\d{5}$/;

    if (zipCodeInputFieldValue === '') {
        zipCodeInputField.parentElement.classList.add('not-valid');
        zipCodeInputField.parentElement.classList.remove('valid');
        zipCodeInputField.parentElement.lastElementChild.style.display = 'block';
        zipCodeInputField.parentElement.lastElementChild.innerHTML = 'Zip code field cannot be blank';
        return false;
    } else if (!zipCodeRegex.test(zipCodeInputFieldValue)) {
        zipCodeInputField.parentElement.classList.add('not-valid');
        zipCodeInputField.parentElement.classList.remove('valid');
        zipCodeInputField.parentElement.lastElementChild.style.display = 'block';
        zipCodeInputField.parentElement.lastElementChild.innerHTML = 'Please enter a 5 digit zip code';
        return false;
    } else {
        zipCodeInputField.parentElement.classList.add('valid');
        zipCodeInputField.parentElement.classList.remove('not-valid');
        zipCodeInputField.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
};

// Create a function to validate the CVV input field
const validateCvv = () => {
    const cvvInputFieldValue = cvvInputField.value;
    const cvvRegex = /^\d{3}$/;

    if (cvvInputFieldValue === '') {
        cvvInputField.parentElement.classList.add('not-valid');
        cvvInputField.parentElement.classList.remove('valid');
        cvvInputField.parentElement.lastElementChild.style.display = 'block';
        cvvInputField.parentElement.lastElementChild.innerHTML = 'CVV field cannot be blank';
        return false;
    } else if (!cvvRegex.test(cvvInputFieldValue)) {
        cvvInputField.parentElement.classList.add('not-valid');
        cvvInputField.parentElement.classList.remove('valid');
        cvvInputField.parentElement.lastElementChild.style.display = 'block';
        cvvInputField.parentElement.lastElementChild.innerHTML = 'Please enter a 3 digit CVV';
        return false;
    } else {
        cvvInputField.parentElement.classList.add('valid');
        cvvInputField.parentElement.classList.remove('not-valid');
        cvvInputField.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
};

// Listen for the submit event on the form element
form.addEventListener('submit', (e) => {
    // Validate the name input field
    validateName();

    // Validate the email input field
    validateEmail();

    // Validate the activities checkboxes
    validateActivities();

    // Validate the credit card number input field
    validateCreditCardNumber();

    // Validate the zip code input field
    validateZipCode();

    // Validate the CVV input field
    validateCvv();

    // Prevent the form from submitting if any of the fields are invalid
    if (!validateName() || !validateEmail() || !validateActivities() || !validateCreditCardNumber() || !validateZipCode() || !validateCvv()) {
        e.preventDefault();
    }
});

// Listen for the focus event on the name input field
nameInputField.addEventListener('focus', () => {
    nameInputField.parentElement.classList.remove('not-valid');
    nameInputField.parentElement.classList.remove('valid');
    nameInputField.parentElement.lastElementChild.style.display = 'none';
});