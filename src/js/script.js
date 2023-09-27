const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

$(document).ready(function(){
  // menuIcon
  const menuIcon = document.querySelector('#menuIcon');
  const body = document.querySelector('body');
  const menuElem = document.querySelector('#menu');

  window.addEventListener('resize', () => {
    if (body.classList.contains("open-menu")) {
      body.classList.remove("open-menu");
    }
  })

  menuElem.addEventListener('click', (event) => {
    if (event.target.classList.contains('menu__link')) {
      body.classList.remove("open-menu");
    }
  })

  menuIcon.addEventListener('click', () => {
    body.classList.toggle("open-menu");
  })

  // International Telephone Input
  const form1 = document.querySelector('#form1');
  const form2 = document.querySelector('#form2');
  const input1 = form1.querySelector("#phone1");
  const input2 = form2.querySelector("#phone2");

  const options = {
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    separateDialCode: true,
    nationalMode: false,
    showFlags: false
  };

  const iti1 = window.intlTelInput(input1, options);
  const iti2 = window.intlTelInput(input2, options);

  // Slick Slider
  $('#slider').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: `<button type="button" class="slick-prev">
      <img src="assets/images/icons/arrowLeft.webp" alt="prevBtn">
    </button>`,
    nextArrow: `<button type="button" class="slick-next">
      <img src="assets/images/icons/arrowRight.webp" alt="nextBtn">
    </button>`
  });

    // Ion.RangeSlider
  $("#rangeSlider").ionRangeSlider({
    min: 1100,
    max: 500000,
    type: 'single',
  });

  //forms
  function handleSubmit(event){
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get('name');
    const surname = formData.get('surname');
    const email = formData.get('email');

    const phoneInput = event.target[3];
    const errorMsg = event.target.querySelector("[data-elem='error-msg']");

    const iti = event.target.id === 'form1' ? iti1 : iti2;

    if (phoneInput.value.trim()) {
      if (!iti.isValidNumber()) {
        phoneInput.classList.add("error");
        errorMsg.classList.remove('hide')
        const errorCode = iti.getValidationError();

        errorMsg.innerHTML = errorCode === -99
          ? 'Invalid value'
          : errorMap[errorCode];

        hideMessage(errorMsg);
      }
    }

    if (name && surname && email && iti.isValidNumber()) {
      event.target.reset();
      errorMsg.classList.add("hide");
    }
  }

  function hideMessage(elem) {
    setTimeout(() => {
      if (!elem.classList.contains('hide')) {
        elem.classList.add("hide");
      }
    }, 4000);
  }

  form1.addEventListener('submit', handleSubmit);
  form2.addEventListener('submit', handleSubmit);

  // rangeSlider
  const rangeSlider = $("#rangeSlider").data("ionRangeSlider");
  const profit = document.querySelector('#profitValue');

  const calcProfit = (sum) => {
    return Math.ceil(+sum * 654 / 100);
  };

  profit.innerHTML = calcProfit(rangeSlider.old_from);

  rangeSlider.update({
    onChange: function (data) {
      profit.innerHTML = calcProfit(data.from);
    },
  });
});
