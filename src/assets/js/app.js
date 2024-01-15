$(document).ready(function () {
  // new AirDatepicker('#date')

  //год
  document.getElementById("year").innerHTML = new Date().getFullYear();


  //высота элементов


  try {
    let header = document.querySelector('.header')
    let footer = document.querySelector('.footer-top')
    let breadcrumb = document.querySelector('.breadcrumb-section')
    let errorImg = document.getElementById('errorImg')
    let wholeHeight = document.querySelector('.whole-height')
    let cont = wholeHeight.querySelector('.container')
    let screenHeight = document.documentElement.clientHeight

    let headerHeight = header.getBoundingClientRect().height
    let footerHeight = footer.getBoundingClientRect().height



    if (breadcrumb !== null) {
      let breadcrumbHeight = breadcrumb.getBoundingClientRect().height
      let contHeight = screenHeight - (headerHeight + footerHeight + breadcrumbHeight)
      if (contHeight < 469) {
        contHeight = screenHeight - headerHeight
      }

      wholeHeight.style.minHeight = contHeight + 'px'
      cont.style.minHeight = contHeight + 'px'

      if (errorImg !== null) {
        errorImg.style.minHeight = contHeight + 'px'
      }
      console.log('сработало с крошками')
    }

    else {
      let contHeight = screenHeight - (headerHeight + footerHeight)
      if (contHeight < 469) {
        contHeight = screenHeight - headerHeight
      }

      wholeHeight.style.minHeight = contHeight + 'px'
      cont.style.minHeight = contHeight + 'px'

      if (errorImg !== null) {
        errorImg.style.minHeight = contHeight + 'px'
      }
      console.log('сработало без крошек')
    }





  } catch (err) {
  }


  /// svg

  const Svg = () => {
    let x = [".svg"];
    x.forEach((item) => {
      $(item).each(function () {
        let $img = $(this);
        let imgClass = $img.attr("class");
        let imgURL = $img.attr("src");
        $.get(
          imgURL,
          function (data) {
            let $svg = $(data).find("svg");
            if (typeof imgClass !== "undefined") {
              $svg = $svg.attr("class", imgClass + " replaced-svg");
            }
            $svg = $svg.removeAttr("xmlns:a");
            if (
              !$svg.attr("viewBox") &&
              $svg.attr("height") &&
              $svg.attr("width")
            ) {
              $svg.attr(
                "viewBox",
                "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
              );
            }
            $img.replaceWith($svg);
          },
          ""
        );
      });
    });
  };
  Svg();



  // Fancybox.show([{ src: "#order", type: "inline" }]);



  ymaps.ready(init);

  function init() {
    // в этой версии координаты просто элементы массива (и они поменяны местами)
    if (document.getElementById('map') === null) return
    let destinations = {
      'OR': [53.014796, 36.15], //орел
    },

      // Создание экземпляра карты и его привязка к контейнеру с
      // заданным id ("map").
      myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: destinations['OR'], // Московское шоссе, д.173
        zoom: 13.5
      });

    // Добавление метки
    // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
    let myPlacemark = new ymaps.Placemark([53.014796, 36.156400], {}, {
      //опции
      iconLayout: 'default#image',
      iconImageHref: '../assets/img/map-icon.svg',
      iconImageSize: [54, 77],
      iconImageOffset: [-27, -54],
    });

    // После того как метка была создана, добавляем её на карту.
    myMap.geoObjects.add(myPlacemark);
  }


  // меню

  let catalogButton = document.querySelector("#hamburger-menu");
  let catalogDrop = document.querySelector("#catalog-drop");
  let openMenu = false;

  catalogButton.addEventListener("click", (e) => {
    changeCatalogDrop(e);
  });

  const changeCatalogDrop = (e) => {
    e.stopPropagation();
    changeCatalogDropType(openMenu);
  };
  const changeCatalogDropType = (open_menu) => {
    if (open_menu) {
      catalogButton.classList.remove("catalog-button--active");
      catalogDrop.classList.remove("d-block");
      openMenu = false;
    } else {
      catalogButton.classList.add("catalog-button--active");
      catalogDrop.classList.add("d-block");
      openMenu = true;
    }
  };
  let tireSelectionItems = document.querySelectorAll(".tire-selection-item");

  const changeTireSelectionBlock = (e) => {
    tireSelectionItems.forEach((item) => {
      let tireSelectionItemHeader = item.querySelector(
        ".tire-selection-item__header"
      );
      tireSelectionItemHeader.addEventListener("click", () => {
        tireSelectionItemHeader.parentNode.classList.toggle(
          "tire-selection-item--active"
        );
      });
    });
  };

  changeTireSelectionBlock();

  /////мобильное меню

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
  // Бургер
  let burger = document.querySelector('#hamburger-menu-mob');
  let menu = document.querySelector('#catalog-drop-mob');
  let menuLinks = menu.querySelectorAll('.catalog-link');
  let closeMenu = menu.querySelector('#close-mob')

  burger.addEventListener('click', function () {
    menu.classList.toggle('active');
    document.body.classList.toggle('stop-scroll');
  });

  closeMenu.addEventListener('click', function () {
    menu.classList.toggle('active');
    document.body.classList.toggle('stop-scroll');
  });

  menuLinks.forEach(function (el) {
    el.addEventListener('click', function () {
      menu.classList.remove('active');
      document.body.classList.remove('stop-scroll')
    })
  });




  //////

  class Select {
    constructor(el, placeholder) {
      this.el = el;
      this.placeholder = placeholder;
    }
    init() {
      $(this.el)
        .select2({
          theme: "select-filter__theme",
          dropdownCssClass: "select-filter__drop",
          selectionCssClass: "select-filter__selection",
          allowClear: true,
          closeOnSelect: true,
          dropdownAutoWidth: false,
          placeholder: this.placeholder,
          language: {
            noResults: function (params) {
              return "Нет результатов";
            },
          },
        })
        .on("select2:open", function (e) {
          $(".select2-search__field").attr("placeholder", "Поиск");
        });
    }
  }

  const selectStructure = new Select($(".select-structure"), "Выберите состав");
  const selectViscosity = new Select($(".select-viscosity"), "Выберите вязкость");
  const selectVolume = new Select($(".select-volume"), "Выберите объем");
  const selectBrand = new Select($(".select-brand"), "Выберите производителя");


  selectStructure.init();
  selectViscosity.init();
  selectVolume.init();
  selectBrand.init();


  //слайдер баннер 

  new Swiper(".swiper-banner", {
    loop: true,
    allowSlideNext: true,
    autoplay: {
      delay: 3000,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // spaceBetweenSlides: 10
      },
      567: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // spaceBetweenSlides: 10
      },
      767: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetweenSlides: 30,
      },
      1023: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // spaceBetweenSlides: 50
      },
      1139: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // spaceBetweenSlides: 60
      },
    },
  });

  new Swiper(".swiper-discounts", {
    loop: false,
    // navigation: {
    //   nextEl: ".swiper-discounts__swiper-button-next",
    //   prevEl: ".swiper-discounts__swiper-button-prev",
    // },
    autoHeight: true,
    pagination: {
      el: ".swiper-discounts__swiper-pagination ",
      clickable: true,
    },
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // spaceBetweenSlides: 10
      },
      567: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1023: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1139: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  new Swiper(".swiper-seller", {
    loop: false,
    // navigation: {
    //   nextEl: ".swiper-discounts__swiper-button-next",
    //   prevEl: ".swiper-discounts__swiper-button-prev",
    // },
    autoHeight: true,
    pagination: {
      el: ".swiper-seller__swiper-pagination ",
      clickable: true,
    },
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // spaceBetweenSlides: 10
      },
      567: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1023: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1139: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });



  new Swiper(".swiper-catalog-banner", {
    loop: true,
    allowSlideNext: true,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // spaceBetweenSlides: 10
      },
      567: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // spaceBetweenSlides: 10
      },
      767: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetweenSlides: 30,
      },
      1023: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // spaceBetweenSlides: 50
      },
      1139: {
        slidesPerView: 1,
        // slidesPerGroup: 1,
        spaceBetweenSlides: 30
      },
    },
  });




  ///корзина

  let cardsBtns = document.querySelectorAll('.card__btn')

  cardsBtns.forEach(element => {
    element.addEventListener('click', function () {
      console.log(element)
      element.classList.add('active')
      element.innerHTML = '<span class="card__btn-order">В корзинe</span>'
      console.log(element)

    });


  })





  ///////
  $(".range-price").slider({
    animate: "slow",
    range: true,
    values: [10, 1000],
    slide: function (event, ui) {
      $(".result-range-price > .from > input").val(ui.values[0]);
      $(".result-range-price > .to > input").val(ui.values[1]);
    },
  });
  $(".result-range-price > .from > input").val(
    $(".range-price").slider("values", 0)
  );
  $(".result-range-price > .to  > input").val(
    $(".range-price").slider("values", 1)
  );

  console.log("hty");



  // Фильтр мобильная версия

  let filter = $(".filter-mobile");
  let filterNextStep = $(".filter-mobile-step-next");

  $(".js-button-filter-mobile").click(function () {
    filter.addClass("filter-mobile--active");
    $("html").css("overflow-y", "hidden");
  });

  $(".js-filter-mobile-block__button-all").click(function () {
    filterNextStep.toggleClass("filter-mobile-step-next--active");
  });

  $(".js-filter-mobile-header-back").click(function () {
    filterNextStep.removeClass("filter-mobile-step-next--active");
  });

  $(".js-filter-mobile-close").click(function () {
    filter.removeClass("filter-mobile--active");
    filterNextStep.removeClass("filter-mobile-step-next--active");
    $("html").css("overflow-y", "auto");
  });

  $(".js-catalog-select").click(function () {
    $(".catalog-select__options").toggleClass(
      "catalog-select__options--active"
    );
  });
})