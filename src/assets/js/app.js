$(document).ready(function () {


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



  //слайдер баннер 


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
        slidesPerView:3,
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


  /////




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