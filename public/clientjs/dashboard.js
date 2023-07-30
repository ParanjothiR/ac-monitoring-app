let list = document.querySelectorAll('.navigation ul li');

function activeLink() {
    list.forEach((item) =>
        item.classList.remove('hovered'));
    this.classList.add('hovered');
}
list.forEach((item) =>
    item.addEventListener('mouseover', activeLink));

// Side Menu Toggle
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

toggle.onclick = function () {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}

// Account Menu Toggle
let toggleMenu = document.querySelector('.accountMenu');
let userToggler = document.querySelector('.user');
userToggler.onclick = function () {
    toggleMenu.classList.toggle('active');
}
// document.addEventListener('click', function (event) {
//     // Check if the clicked element or any of its ancestors are the accountMenu or userToggler
//     let isInsideAccountMenu = toggleMenu.contains(event.target) || event.target === userToggler;

//     if (!isInsideAccountMenu) {
//         // If the click is outside the accountMenu, remove the 'active' class to hide the menu
//         toggleMenu.classList.remove('active');
//     }
// });



// Function to toggle the display of the form and overlay
function toggleForm(formId) {
    const formElement = document.getElementById(formId);
    const overlayElement = document.getElementById('overlay');
    if (formElement.style.display === "none") {
        formElement.style.display = "block";
        overlayElement.style.display = "block";
        fadeIn(formElement, 300); // Fade-in animation for the form
    } else {
        formElement.style.display = "none";
        overlayElement.style.display = "none";
        formElement.style.opacity = 0; // Reset opacity after hiding the form
    }
}

// Fade-in animation for the form
function fadeIn(element, duration) {
    let currentTime = 0;
    const increment = 20;
    const targetOpacity = 1;
    const step = targetOpacity / (duration / increment);
    
    const animate = () => {
        currentTime += increment;
        element.style.opacity = currentTime / duration;
        if (currentTime < duration) {
            setTimeout(animate, increment);
        }
    };

    animate();
}

// Function to add a new device box
function addDevice(event) {
 
    event.preventDefault();
    const deviceid = document.getElementById('deviceid1').value.trim();
    if (deviceid !== "") {
          document.getElementById("addDeviceform").submit();
    }
}

function deleteDevice(deviceId){
    fetch('/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deviceId: deviceId }),
      })
      .then((response) => {
        if (response.ok) {
          console.log('Device deleted successfully.');
          window.location.href = '/dashboard'
          // Optionally, you can update the UI or perform other actions after successful deletion
        } else {
          console.error('Error deleting device:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting device:', error);
      });
}

function showDevice(deviceId) { 
  const encodedDeviceId = encodeURIComponent(deviceId);
    window.location.href = `/graphs?id=${encodedDeviceId}`
}
