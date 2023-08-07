
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
  

    function realtimeStatus(){
        fetch('/root',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error fetching device data');
            }
        })
        .then((data) => {
            if (data===null  && data.length()===0) {
                document.getElementById("deviceGrid").innerHTML='Data for the device is null.';
            } else {
                for(const index in data){
                    let deviceid,showdata,description;
                    if(typeof data[index] =='string'){
                        deviceid="DeviceId - "+data[index];
                        showdata=deviceid
                        description="Device id Not yet Avilable"
                        showdata = `<div id=devicebox1>
                        <button onclick="deleteDevice('${data[index]}')" class="delete-button"><svg width='20px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      </button><br>
                        <h4 id="deviceid">${deviceid}</h4>
                        <h4 id="air1" class="ds">${description}</h4><br>
                        </div>
                        `
                    }else{
                      //  deviceid=data[index].deviceid;
                    const airQuality = parseFloat(data[index].Airquality);
                    const tempQuality = parseFloat(data[index].temperature);
                    const waterQuality = parseFloat(data[index].waterLevelPercentage);
                    console.log("val")
                    let status = "Unknown";
                    let status2="unknown"
                    let status3='Unknown'
                    if (airQuality < 200.0) {
                        status = "🟢Air Quality "+airQuality+"ppm"+" (Good)";
                    } else if (airQuality < 400.0) {
                        status = "🟡Air Quality "+airQuality+"ppm"+" (Average)";
                        
                    }else{
                        status = "🔴Air Quality "+airQuality+"ppm"+" (Average)";
                    
                    }
                
                    if(tempQuality>30){
                        status2 ="🔴Temperature "+tempQuality+"°C (Not Good)";
                    }else if(tempQuality>25.0){
                        status2 ="🟡Temperature "+tempQuality+"°C (Average)";
                    }else{
                        status2 ="🟢Temperature "+tempQuality+"°C (Good)";
                    }
                    
                     if(waterQuality<10.0){
                    
                        status3="🟢No Water Leakage"
                    }else{
                        
                        status3="🔴Water Leakage"
                    }
                    let val=data[index].deviceid;
                    deviceid="DeviceId - "+data[index].deviceid;
                     showdata = `
                     <div id="devicebox1">
                     <button onclick="deleteDevice('${val}')" class="delete-button"><svg width='20px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                   </svg></button><br>
                    <h4 id="deviceid">${deviceid}</h4><br><br>
                    <h4 id="airvalue1">${status}</h4><br>
                    <h4 id="tempvalue">${status2}</h4><br>
                    <h4 id="watervalue">${status3}</h4><br>
                    <button onclick="showDevice('${val}')" class="show-button"><i class="fa fa-eye" aria-hidden="true"></i>Live</button>
                    </div>
                    `
                    }
                    document.getElementById("deviceGrid").innerHTML+=showdata;
           
            }

                 
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    realtimeStatus()


  



