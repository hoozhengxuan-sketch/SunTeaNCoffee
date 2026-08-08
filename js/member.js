const tabRegister = document.getElementById("tabRegister");
const tabLogin = document.getElementById("tabLogin");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const steps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitRegBtn");
let currentStep = 1;

const greetingContainer = document.getElementById("greetingContainer");
const greetingTitle = document.getElementById("greetingTitle");
const logoutBtn = document.getElementById("logoutBtn");

// ====Register / Login====
tabRegister.addEventListener("click", function(){
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    registerForm.classList.add("active-form");
    loginForm.classList.remove("active-form");
});

tabLogin.addEventListener("click", function(){
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginForm.classList.add("active-form");
    registerForm.classList.remove("active-form");
});

// ====Show====
function showStep(step){
    steps.forEach(function(item){
        item.classList.remove("active");
    });
    document
        .querySelector('[data-step-content="' + step + '"]')
        .classList
        .add("active");
}

// ====Progress====
function updateProgress(){
    progressSteps.forEach(function(item,index){
        item.classList.remove("active");
        item.classList.remove("completed");
        if(index + 1 < currentStep){
            item.classList.add("completed");
        }
        if(index + 1 == currentStep){
            item.classList.add("active");
        }
    });
}

// ====Buttons====
function updateButtons(){
    if(currentStep == 1){
        prevBtn.style.display = "none";
    }
    else{
        prevBtn.style.display = "inline-flex";
    }
    if(currentStep == 3){
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-flex";
    }
    else{
        nextBtn.style.display = "inline-flex";
        submitBtn.style.display = "none";
    }
}

showStep(currentStep);
updateProgress();
updateButtons();


// ====Validation Step 1====

function validateStep1(){
    let valid = true;
    // Username
    const username = document.getElementById("regUsername");
    const errUsername = document.getElementById("errUsername");
    if(username.value.trim() == ""){
        errUsername.textContent = "Username is required";
        valid = false;
    }else{
        errUsername.textContent = "";
    }

    // Email
    const email = document.getElementById("regEmail");
    const errEmail = document.getElementById("errEmail");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email.value)){
        errEmail.textContent = "Invalid email";
        valid = false;
    }else{
        errEmail.textContent = "";
    }

    // Password
    const password = document.getElementById("regPassword");
    const errPassword = document.getElementById("errPassword");
    if(password.value.length < 6){
        errPassword.textContent = "Minimum 6 characters";
        valid = false;
    }else{
        errPassword.textContent = "";
    }

    // Confirm Password
    const confirmPassword = document.getElementById("regConfirmPassword");
    const errConfirmPassword = document.getElementById("errConfirmPassword");
    if(confirmPassword.value != password.value){
        errConfirmPassword.textContent = "Password does not match";
        valid = false;
    }else{
        errConfirmPassword.textContent = "";
    }
    return valid;
}


// ====Validation Step 2====
function validateStep2(){
    let valid = true;
    // Full Name
    const fullName = document.getElementById("regFullName");
    const errFullName = document.getElementById("errFullName");
    if(fullName.value.trim() == ""){
        errFullName.textContent = "Full name is required";
        valid = false;
    }else{
        errFullName.textContent = "";
    }

    // Phone
    const phone = document.getElementById("regPhone");
    const errPhone = document.getElementById("errPhone");
    const phonePattern = /^[0-9]{10,11}$/;
    if(!phonePattern.test(phone.value)){
        errPhone.textContent = "Invalid phone number";
        valid = false;
    }else{
        errPhone.textContent = "";
    }

    // Favourite Category
    const category = document.getElementById("regFavCategory");
    const errCategory = document.getElementById("errFavCategory");
    if(category.value == ""){
        errCategory.textContent = "Please select a category";
        valid = false;
    }else{
        errCategory.textContent = "";
    }
    return valid;

}


// ====Validation Step 3====
function validateStep3(){
    let valid = true;
    // Birthday
    const dob = document.getElementById("regDob");
    const errDob = document.getElementById("errDob");
    if(dob.value == ""){
        errDob.textContent = "Please select your birthday";
        valid = false;
    }else{
        errDob.textContent = "";
    }

    // Terms
    const terms = document.getElementById("regTerms");
    const errTerms = document.getElementById("errTerms");
    if(!terms.checked){
        errTerms.textContent = "Please accept the terms";
        valid = false;
    }else{
        errTerms.textContent = "";
    }
    return valid;
}

// Next Button
nextBtn.addEventListener("click", function(){
    let valid = false;
    if(currentStep == 1){
        valid = validateStep1();
    }
    if(currentStep == 2){
        valid = validateStep2();
    }
    if(valid){
        currentStep++;
        showStep(currentStep);
        updateProgress();
        updateButtons();
    }
});

// Previous Button
prevBtn.addEventListener("click", function(){
    currentStep--;
    showStep(currentStep);
    updateProgress();
    updateButtons();
});


// ====Register====
registerForm.addEventListener("submit", function(e){
    e.preventDefault();
    if(!validateStep3()){
        return;
    }
    const fullName = document.getElementById("regFullName").value;
    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    registerForm.style.display = "none";
    greetingContainer.classList.remove("hidden");
    greetingTitle.textContent = "Welcome, " + fullName + "!";
});

// Login
loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const errLoginEmail = document.getElementById("errLoginEmail");
    const errLoginPassword = document.getElementById("errLoginPassword");
    let valid = true;
    if(loginEmail.value.trim() == ""){
        errLoginEmail.textContent = "Please enter your email or username";
        valid = false;
    }else{
        errLoginEmail.textContent = "";
    }
    if(loginPassword.value.trim() == ""){
        errLoginPassword.textContent = "Please enter your password";
        valid = false;
    }else{
        errLoginPassword.textContent = "";
    }
    if(valid){

    const savedUsername = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if(
        (loginEmail.value === savedUsername ||
         loginEmail.value === savedEmail) &&
        loginPassword.value === savedPassword
    ){
        loginForm.style.display = "none";
        greetingContainer.classList.remove("hidden");
        greetingTitle.textContent = "Welcome Back!";
    }else{
        errLoginPassword.textContent =
        "Incorrect username/email or password";
    }

}
});

// Logout
logoutBtn.addEventListener("click", function(){
    greetingContainer.classList.add("hidden");
    loginForm.style.display = "block";
});