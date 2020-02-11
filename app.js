// Submit Event Listener
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate results
function calculateResults(e) {
  console.log('calculating..');

  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x-1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
  } else {
    // alert('Please check your number again.');
    showErrorFloating('Please check your numbers');
  }

  e.preventDefault();
}

// Show Error CLASSIC
function showErrorClassic(error) {
  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text nodes and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error
  setTimeout(clearError, 3000);
}

// Show Error FLOATING
function showErrorFloating(error) {
  // Create a div
  const errorDiv = document.createElement('div');

  // Add class
  errorDiv.className = 'alert alert-danger';
  errorDiv.style.zIndex = '1';
  errorDiv.style.position = 'fixed';
  errorDiv.style.width = '350px';
  errorDiv.style.height = '200';
  errorDiv.style.left = '0';
  errorDiv.style.right = '0';
  errorDiv.style.top = '5%';
  errorDiv.style.marginRight = 'auto';
  errorDiv.style.marginLeft = 'auto';

  // Create text nodes and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error
  document.body.insertBefore(errorDiv, document.body.firstElementChild);

  // Clear error
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove();
}