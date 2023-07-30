const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});



// login validation


function validateForm() {

  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  if (email.trim() === '' || password === '') {
      alert("Please fill in both email and password fields.");
      window.location.href = "/register";
  }else if(email)

  document.getElementById("loginForm").submit();
}


// registration validation


document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let phone = document.getElementById("phone").value;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const passwordErrorElement = document.getElementById("passwordError");

  if (email.trim() === '' || password === ''|| phone==='') {
      alert("you are not enter email")
  }else if(!passwordPattern.test(password)){
    passwordErrorElement.textContent = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &), and be between 8 and 12 characters long."
    setTimeout(function () {
      passwordErrorElement.textContent = "";
    }, 60000);
  }else{ 
      document.getElementById("registrationForm").submit();
  }


});