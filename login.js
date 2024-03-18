const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');
signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});
signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

// Add an event listener to the username input field to update its text color
const loginUsernameInput = document.getElementById('loginUsername');
loginUsernameInput.addEventListener('input', function() {
    this.style.color = 'white';
});

function showLoginModal() {
    const loginModal = document.getElementById("loginModal");
    loginModal.classList.remove("hidden");
}

// Function to hide the login modal
function hideLoginModal() {
    const loginModal = document.getElementById("loginModal");
    loginModal.classList.add("hidden");
}

// Event listener for the login button in the navbar
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", showLoginModal);

function performLogin() {
    // Get the entered username and password
    const enteredUsername = document.getElementById('loginUsername').value;
    const enteredPassword = document.getElementById('loginPassword').value;
  
    // Perform client-side authentication (for demonstration purposes)
    // In a real-world scenario, you would send these credentials to a server for verification
  
    if (enteredUsername === 'kshitij' && enteredPassword === 'demo') {
      // Display success message above the login form
      showSuccessMessage('Login successful!', 'successMessage');
      
      // Redirect to the main news website (index.html) after a delay
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000); // Delay in milliseconds (2 seconds in this example)
    } else {
      // Display error message
      alert('Invalid username or password');
    }
  }
  
  function showSuccessMessage(message, elementId) {
    // Get the success message element
    const successMessage = document.getElementById(elementId);
  
    // Set the success message content
    successMessage.innerText = message;
  
    // Make the success message visible
    successMessage.style.display = 'block';
  
    // Remove the success message after a delay
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 2000); // Delay in milliseconds (2 seconds in this example)
  }
  