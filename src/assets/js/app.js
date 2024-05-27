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
  // валидация

  $("#card").mask("9999-9999-9999-9999");
  $("#month").mask("99");
  $("#year").mask("99");


  if (document.querySelector("#pay-form")) {
    const validation = new JustValidate('#pay-form', {
      validateBeforeSubmitting: true,
      focusInvalidField: true,
      lockForm: true,
    });

    validation
      .addField('#mail_input', [
        {
          rule: 'required',
          errorMessage: 'Введите адрес электронной почты',
        },
        {
          rule: 'email',
          errorMessage: 'Неправильно введен адрес электронной почты',
        },

      ])

  }

  // модалки


  // 1
  let modalClose = document.getElementById('modalsClose')

  let btnOrderPrayer = document.getElementById('btnOrderPrayer')
  let orderPrayer = document.getElementById('orderPrayer')
  let modalBbackdrop = document.querySelector('.modal-backdrop')
  let bodyModal = document.querySelector('body')

  if (btnOrderPrayer != null) {
    btnOrderPrayer.addEventListener('click', () => {
      modalBbackdrop.classList.add('show')
      orderPrayer.classList.add('show')
      bodyModal.classList.add('modal')

    })
  }
  if (modalClose != null) {
    modalClose.addEventListener('click', () => {
      modalBbackdrop.classList.remove('show')
      orderPrayer.classList.remove('show')
      bodyModal.classList.remove('modal')
    })
  }
  // 2

  let modalsCardLink = document.querySelectorAll('.card-modal')

  let modalCard = document.getElementById('modalCard')
  let modalCardClose = document.querySelector('.modals-kid__close')


  if (modalsCardLink != null) {

    modalsCardLink.forEach(element => {
      element.addEventListener('click', () => {
        modalBbackdrop.classList.add('show')
        modalCard.classList.add('show')
      });
    })
  }

  if (modalCardClose != null) {

    modalCardClose.addEventListener('click', () => {
      modalBbackdrop.classList.remove('show')
      modalCard.classList.remove('show')
    })

  }


  //добавление имени 

  let inputName = document.getElementById('modals-input-name')
  let listName = document.querySelector('.modals__content-list')
  let payBtn = document.querySelector('.modals__btn')

  if (inputName != null) {
    inputName.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {

        let valueInputName = inputName.value
        let itemList = document.createElement('li')
        itemList.classList.add('modals__content-item')
        // listName.insertBefore(itemList, listName.childNodes[1]);
        listName.prepend(itemList)

        let textItemList = document.createElement('p')
        textItemList.classList.add('modals__content-link')
        textItemList.textContent = valueInputName
        itemList.appendChild(textItemList)

        inputName.value = ""

        payBtn.disabled = false
      }
    })

  }


  // модалка оплаты

  let payModal = document.getElementById('payModal')
  let payModalClose = document.getElementById('payModalClose')
  let prevModal = document.getElementById('prevModal')

  if (payBtn != null) {
    payBtn.addEventListener('click', () => {

      payModal.classList.add('show')
      orderPrayer.classList.remove('show')
    })

    payModalClose.addEventListener('click', () => {
      modalBbackdrop.classList.remove('show')
      payModal.classList.remove('show')
      bodyModal.classList.remove('modal')
    })

    prevModal.addEventListener('click', () => {
      payModal.classList.remove('show')
      orderPrayer.classList.add('show')
    })

  }

});







