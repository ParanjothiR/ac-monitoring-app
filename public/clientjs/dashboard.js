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




function detailsView(deviceId)
{
   
    const encodedDeviceId = encodeURIComponent(deviceId);
    console.log(encodedDeviceId)
        fetch('/dbview?deviceId=' + encodedDeviceId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
          
            if (!response.ok) {
                
                throw new Error('Error fetching device data');
                // Parse the JSON response
            } else {
            
                return response.json();
            }
        })
        .then((data) => {
            if (data.singlerecord === null) {
               
               window.location.href = '/error'; // Redirect to the error page when data is null
            } else{
              ///  const detailscontent = document.querySelector('.details-content');
               
                document.querySelector('.userid').textContent ="Device - "+data.deviceid;
                const air=data.Airquality;
                const temp=data.temperature;
                const water=data.waterLevelPercentage;
                const floatValue1 = parseFloat(air);
                const floatValue2 = parseFloat(temp);
                const floatValue3 = parseFloat(water);
                var airquality;
                var tempquality;
                var waterquality;
                if(floatValue1<200.0){
                    airquality="Good "+'('+floatValue1+'ppm)  🟢'
                }else if(floatValue1<600.0){
                    airquality="Average 🟡"+'('+floatValue1+'ppm)'
                }else{
                    airquality="Not Good "+'('+floatValue1+'ppm) 🔴'
                }

                if(floatValue2>30.0){
                    tempquality="Not Good "+'('+floatValue2+'°C) 🟢'
                }else if(floatValue2>25.0){
                    tempquality="Average "+'('+floatValue2+'°C) 🟡'
                }else{
                    tempquality="Good "+'('+floatValue2+'°C) 🔴'
                }

                if(floatValue3<10.0){
                    waterquality="No 🟢"
                }else if(floatValue3<=10.0){
                    waterquality="Yes 🟡"
                }


                // if(floatValue1<50.0){
                //       airquality="Fresh Air"
                // }else if(floatValue1<200.0){
                //     airquality="Normal Indoor Air"
                // }else if(floatValue1<400.0){
                //     airquality="Low Pollution"
                // }else if(floatValue1<600.0){
                //     airquality="Moderate Pollution"
                // }else if(floatValue1<1000.0){
                //     airquality="High Pollution"
                // }else{
                //     airquality="very High Pollution"
                // }
   
               
                // if(floatValue2>35.0){
                //     tempquality="Very bad"
                // }else if(floatValue2>27.0){
                //     tempquality="Bad"
                // }else if(floatValue2>25.0 ){
                //    tempquality="Normal"
                // }else if(floatValue2>17){
                //     tempquality="Good"
                // }

                // if(floatValue3<10.0){
                //     waterquality="No water Leakage"
                // }else if(floatValue3<40.0){
                //     waterquality="water Leakage"
                // }

                document.getElementById('display_result').removeAttribute('hidden');

                document.querySelector('.air-quality').textContent ="Air Quality: "+airquality;
                document.querySelector('.water-condition').textContent ="Temperature: "+tempquality;
                document.querySelector('.temperature-status').textContent ="Water Leakage: "+waterquality;
             

                // detailscontent.classList.toggle('active')
            } 
        })
        .catch((error) => {
         
           window.location.href = '/error'; // Redirect to the error page for other errors
        });
}


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
        fetch('/view?deviceId=' + encodedDeviceId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json(); // Parse the JSON response
            } else {
                throw new Error('Error fetching device data');
            }
        })
        .then((data) => {
            if (data.singledata === null && data.multipledata.length === 0) {
                console.error('Data for the device is null.');
                window.location.href = '/error'; // Redirect to the error page when data is null
            } else {
                window.location.href = `/graphs?id=${encodedDeviceId}`; // Redirect to the graphs page with the deviceId
            }
        })
        .catch((error) => {
            console.error('Error fetching device data:', error);
            window.location.href = '/error'; // Redirect to the error page for other errors
        });
    }
    

   
  



