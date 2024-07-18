'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

window.onload = () => {
  (async function () {
    await emailjs.init({
      publicKey: "xLHttFLEiXnrDqyje",
    });
    console.log("Emailjs is ready")
  })();

}


async function sendEmail() {
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
  })

  const button = document.getElementById('send_btn');
  const btnText = document.getElementById('btn_text');
  const loader = document.getElementById('loader');

  // Disable the button and show the loader
  button.disabled = true;
  btnText.textContent = 'Sending...';
  loader.classList.remove('hidden');

  const fullname = document.getElementById('sender_fullname').value.trim();
  const email = document.getElementById('sender_email').value.trim();
  const message = document.getElementById('sender_message').value.trim();

  if (!fullname || !email || !message) {
    showToast('Please fill in all fields.', 'error');
    button.disabled = false;
    btnText.textContent = 'Send Message';
    loader.classList.add('hidden');
    return;
  }

  if (!validateEmail(email)) {
    showToast('Please enter a valid email address.', 'error');
    button.disabled = false;
    btnText.textContent = 'Send Message';
    loader.classList.add('hidden');
    return;
  }

  const params = {
    fullname: fullname,
    email: email,
    message: message
  };

  const serviceId = "service_f5uprrr";
  const templateId = "template_3rtsvnp";

  try {
    const response = await emailjs.send(serviceId, templateId, params);
    showToast("Message sent successfully!", 'success');
    console.log(response);
  } catch (e) {
    showToast("Failed to send message!", 'error');
    console.log(e);
  }

  // Reset button and loader
  button.disabled = false;
  btnText.textContent = 'Send Message';
  loader.classList.add('hidden');
}


function showToast(message, type) {
  let backgroundColor;
  if (type === 'success') {
    backgroundColor = 'linear-gradient(to right, #FDC663, #ffc371)';
  } else if (type === 'error') {
    backgroundColor = 'linear-gradient(to right, #FDC663, #ffc371)';
  }

  Toastify({
    text: message,
    duration: 3000,
    id: "send",
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: backgroundColor,
      borderRadius: "0px 0px 5px 5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      color: "#030303",
      fontSize: "18px",
      maxWidth: "60%",
      padding: "10px 20px",
      wordBreak: "break-word",
      margin: "0 auto",
      textAlign: "center"
    },
    className: 'toastify-fixed'
  }).showToast();
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}


let screen = document.querySelector("#screen");
let cursor = document.querySelector("#custom-cursor");
screen.addEventListener("mousemove", function(dets){
  cursor.style.left = dets.x + "px";
  cursor.style.top = dets.y + "px";
})