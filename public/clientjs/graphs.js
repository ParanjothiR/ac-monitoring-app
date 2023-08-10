/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SERVICES MODAL ===============*/
// Get the modal
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

// When the user clicks on the button, open the modal
let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");

function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/

let swiperTestimonial = new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the light / icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal(`.nav__menu`, {
  delay: 100,
  scale: 0.1,
  origin: "bottom",
  distance: "300px",
});

sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, {
  delay: 100,
});

sr.reveal(`.home__social, .home__scroll`, {
  delay: 100,
  origin: "bottom",
});

sr.reveal(`.about__img`, {
  delay: 100,
  origin: "left",
  scale: 0.9,
  distance: "30px",
});

sr.reveal(`.about__data, .about__description, .about__button-contact`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.skills__content`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.services__title, services__button`, {
  delay: 100,
  scale: 0.9,
  origin: "top",
  distance: "30px",
});

sr.reveal(`.work__card`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.testimonial__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.contact__info, .contact__title-info`, {
  delay: 100,
  scale: 0.9,
  origin: "left",
  distance: "30px",
});

sr.reveal(`.contact__form, .contact__title-form`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.footer, footer__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});


let graphrender=()=>{
  
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
   
const encodedDeviceId = encodeURIComponent(id);

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
        console.error('Error fetching device data:', response.statusText);
        throw new Error('Error fetching device data');
    }
})
.then((data) => {
    console.log('Data received:', data);
    const levelElement = document.querySelector('.level > span');
    const waterlevel=data.singledata.waterLevelPercentage
    
    levelElement.textContent =Math.floor(waterlevel)+"%"
    

    const tempValueElement = document.querySelector('#tempc');
    tempValueElement.textContent = data.singledata.temperature + '°';
    const  acstatusval=data.singledata.acState;
    const chartContainer = document.getElementById('chartContainer-acState');
    chartContainer.textContent ="Current State: " + acstatusval;

    document.getElementById('ac1').setAttribute('src', acstatusval==='AC ON' ? 'AC_ON.png' : 'AC_OFF.png');
    document.getElementById('time').innerHTML=data.singledata.timestamp
    
    
    let floatValue1=parseFloat(data.singledata.Airquality)
    if(floatValue1<200.0){
      airquality=floatValue1+'ppm '+'(Good 🟢)'
  }else if(floatValue1<600.0){
      airquality=floatValue1+'ppm '+'(Average 🟡)'
  }else{
      airquality=floatValue1+'ppm '+'(Not Good 🔴)'
  }
  document.getElementById('airvalue').innerHTML=airquality
    const dataArray=data.multipledata;
    createTemperatureChart(dataArray);

})
.catch((error) => {
    console.error('Error fetching device data:', error);
});

  
};

graphrender()

    function createTemperatureChart(dataArray) {
  let dps = processData(dataArray);
  console.log(dps)
  console.log("hi")
  let chart = new CanvasJS.Chart("chartContainer", {
    title: {
      text: "Temperature Chart",
    },
    data: [{
      label: 'Temperature',
      type: 'line',
      dataPoints: dps,
      showInLegend: false,
      legendText: 'Temperature',
      markerSize: 0,
      lineThickness: 3,
      markerBorderColor: 'white',
      markerBorderThickness: 2,
      markerType: 'none',
      lineTension: 5,
      backgroundColor: 'transparent',
    }],
    axisY: {
      title: 'Temperature (°C)',
      minimum: 14,
      maximum: 38,
       gridColor: "transparent"

    },
    axisX: {
      title: 'Time',
      type: 'time',
      time: {
       time: {
       format: 'HH:mm', // Format for displaying time on the X-axis
       interval: 1, // Interval in minutes between tick marks
       unit: 'minute', // Specify 'minute' for the interval
       displayFormat: 'HH:mm', // Format for displaying time on tooltip
    },
    backgroundColor: "transparent"
    }
    }
  });
  
  chart.render();
     }
setInterval(graphrender,60000)


function processData(dataArray) {
  console.log("data")
  return dataArray.map(item => ({
    x:new Date(item.timestamp),// Assuming timestamp is in a proper date format
    y: parseFloat(item.temperature),
    lineColor: item.acState === 'AC ON' ? 'green' : 'red', // Set the line color based on AC status
  }));
}



// air quality




