$(document).ready(function () {
  // Год
  $("#year").text(new Date().getFullYear());

  // SVG
  const replaceSvg = () => {
    $(".svg").each(function () {
      let $img = $(this);
      let imgClass = $img.attr("class");
      let imgURL = $img.attr("src");
      $.get(imgURL, function (data) {
        let $svg = $(data).find("svg");
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          );
        }
        $img.replaceWith($svg);
      });
    });
  };
  replaceSvg();

  // Слайдер баннер
  new Swiper(".swiper-main-big", {
    navigation: {
      nextEl: ".swiper-main-big__swiper-button-next",
      prevEl: ".swiper-main-big__swiper-button-prev",
    },
    spaceBetween: 8,
    breakpoints: {
      0: {
        slidesPerView: 1,
        grid: {
          rows: 2,
        },
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      891: {
        slidesPerView: 2,
      },
      1920: {
        slidesPerView: 2,
      },
    },
  });

  new Swiper(".swiper-main-saintly", {
    navigation: {
      nextEl: ".swiper-main-saintly__swiper-button-next",
      prevEl: ".swiper-main-saintly__swiper-button-prev",
    },
    spaceBetween: 8,
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3,
      },
      891: {
        slidesPerView: 4,
      },
      1920: {
        slidesPerView: 4,
      },
    },
  });

  // Бургер
  let burger = document.querySelector('.burger');
  let menu = document.querySelector('.header__mobile');
  let menuLinks = menu.querySelectorAll('.header__link');

  burger.addEventListener('click', function () {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('header__mobile--active');
    document.body.classList.toggle('stop-scroll');
  });

  menuLinks.forEach(function (el) {
    el.addEventListener('click', function () {
      burger.classList.remove('burger--active');
      menu.classList.remove('header__mobile--active');
      document.body.classList.remove('stop-scroll');
    });
  });




  /// кнопка подробнее

  if (document.querySelector('.player__btn-more')) {

    let btnMore = document.querySelector('.player__btn-more')
    let tbh = document.querySelector('.player__hidden')

    btnMore.addEventListener('click', () => {
      btnMore.classList.add('d-n')
      tbh.classList.remove('d-n')
    })


  }


  // const validation = new JustValidate('#pay-form', {
  //   validateBeforeSubmitting: true,
  //   focusInvalidField: true,
  //   lockForm: true,
  // });

  // validation
  //   .addField('#mail_input', [
  //     {
  //       rule: 'required',
  //       errorMessage: 'Введите адрес электронной почты',
  //     },
  //     {
  //       rule: 'email',
  //       errorMessage: 'Неправильно введен адрес электронной почты',
  //     },
  //   ])



  // модалки


  // 1
  let modalClose = document.getElementById('modalsClose')

  let btnOrderPrayer = document.getElementById('btnOrderPrayer')
  let orderPrayer = document.getElementById('orderPrayer')
  let modalBbackdrop = document.querySelector('.modal-backdrop')
  let bodyModal = document.querySelector('body')


  btnOrderPrayer.addEventListener('click', () => {
    modalBbackdrop.classList.add('show')
    orderPrayer.classList.add('show')
    bodyModal.classList.add('modal')

  })

  modalClose.addEventListener('click', () => {
    modalBbackdrop.classList.remove('show')
    orderPrayer.classList.remove('show')
    bodyModal.classList.remove('modal')
  })

  // 2

  let modalsCardLink = document.querySelectorAll('.card-modal')

  let modalCard = document.getElementById('modalCard')
  let modalCardClose = document.querySelector('.modals-kid__close')

  modalsCardLink.forEach(element => {
    element.addEventListener('click', () => {
      modalBbackdrop.classList.add('show')
      modalCard.classList.add('show')
    });
  })

  modalCardClose.addEventListener('click', () => {
    modalBbackdrop.classList.remove('show')
    modalCard.classList.remove('show')
  })




});





