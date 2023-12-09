// Define validation functions
const validateUsername = (username) => {
    let uniqueChars = new Set(username);
    return uniqueChars.size >= 2 && !username.match(/[^a-zA-Z0-9]/);
  };
  
  const validateEmail = (email) => {
    return !email.endsWith("@example.com");
  };
  
  const validatePassword = (password, username) => {
    let hasUppercase = /[A-Z]/.test(password);
    let hasLowercase = /[a-z]/.test(password);
    let hasNumber = /\d/.test(password);
    let hasSpecialChar = /[!@#$%^&*]/.test(password);
    let isLongEnough = password.length >= 12;
    let doesNotContainUsername = !password.includes(username);
    let doesNotContainPassword = !password.toLowerCase().includes("password");
  
    return (
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar &&
      isLongEnough &&
      doesNotContainUsername &&
      doesNotContainPassword
    );
  };
  
  // Add event listener to the form
  document.getElementById("registration").addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Retrieve form data
    let username = document.querySelector('[name="username"]').value;
    let email = document.querySelector('[name="email"]').value;
    let password = document.querySelector('[name="password"]').value;
    let passwordCheck = document.querySelector('[name="passwordCheck"]').value;
    let terms = document.querySelector('[name="terms"]').checked;
  
    // Validation checks
    let isValidUsername = validateUsername(username);
    let isValidEmail = validateEmail(email) && !email.endsWith("@example.com");
    let isValidPassword = validatePassword(password, username);
    let passwordsMatch = password === passwordCheck;
    let acceptedTerms = terms;
  
    if (
      isValidUsername &&
      isValidEmail &&
      isValidPassword &&
      passwordsMatch &&
      acceptedTerms
    ) {
      // Store data in localStorage
      localStorage.setItem(
        username.toLowerCase(),
        JSON.stringify({ email: email.toLowerCase(), password })
      );
  
      // Clear form
      document.getElementById("registration").reset();
  
      // Display success message
      document.getElementById("errorDisplay").innerHTML =
        "Successfully Registered!";
      document.getElementById("errorDisplay").style.display = "block";
    } else {
      // Display appropriate error message
      let errorMessage = "Please correct the following errors:\n";
      if (!isValidUsername) errorMessage += "Invalid username.\n";
      if (!isValidEmail) errorMessage += "Invalid email.\n";
      if (!isValidPassword) errorMessage += "Invalid password.\n";
      if (!passwordsMatch) errorMessage += "Passwords do not match.\n";
      if (!acceptedTerms)
        errorMessage += "You must accept the terms and conditions.\n";
  
      document.getElementById("errorDisplay").innerHTML = errorMessage;
      document.getElementById("errorDisplay").style.display = "block";
    }
  });
  