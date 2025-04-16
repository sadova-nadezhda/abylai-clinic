window.addEventListener("load", function () {
  let scroll = window.scrollY;
  let header = document.querySelector("header");
  let link = document.querySelector(".header__burger");
  let menu = document.querySelector(".header__nav");
  if (menu) {
    link.addEventListener(
      "click",
      function () {
        link.classList.toggle("active");
        menu.classList.toggle("open");
        header.classList.toggle("active");
      },
      false
    );
    document.addEventListener("click", (e) => {
      let target = e.target;
      if (
        !target.classList.contains("header__nav") &&
        !target.classList.contains("header__burger")
      ) {
        link.classList.remove("active");
        menu.classList.remove("open");
        header.classList.remove("active");
      }
    });
  }
  if(header) {
    scroll = window.scrollY;
    header.classList.toggle("scroll", scroll > 50);
  }

  // Swiper

  var heroSwiper = new Swiper(".heroSwiper", {
    spaceBetween: 26,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".main-hero-pagination",
    },
  });

  var qualifSwiper = new Swiper(".qualifSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 34,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 34,
      },
      1300: {
        slidesPerView: 5,
        spaceBetween: 34,
      },
    },
  });

  var programsSwiper = new Swiper(".programsSwiper", {
    slidesPerView: 1.1,
    spaceBetween: 18,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  });

  var doctorsSwiper = new Swiper(".doctorsSwiper", {
    slidesPerView: 1,
    spaceBetween: 18,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".doctors-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1300: {
        slidesPerView: 4,
      },
    }
  });

  var stockSwiper = new Swiper(".stockSwiper", {
    spaceBetween: 18,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".stock-pagination",
      clickable: true,
    },
  });

  var mediaSwiper = new Swiper(".mediaSwiper", {
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 18,
    watchSlidesProgress: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".gallery-media__next",
      prevEl: ".gallery-media__prev",
    },
    on: {
      init: function () {
        highlightThirdVisibleSlide();
      },
      slideChange: function () {
        highlightThirdVisibleSlide();
      },
      setTranslate: function () {
        highlightThirdVisibleSlide();
      },
      transitionEnd: function () {
        highlightThirdVisibleSlide();
      }
    },
  });
  
  function highlightThirdVisibleSlide() {
    const slides = document.querySelectorAll(".mediaSwiper .swiper-slide");
    slides.forEach((slide) => slide.classList.remove("swiper-slide-third"));
  
    const visibleSlides = Array.from(slides).filter((slide) =>
      slide.classList.contains("swiper-slide-visible")
    );
  
    if (visibleSlides[2]) {
      visibleSlides[2].classList.add("swiper-slide-third");
    }
  }

  var partnersSwiper = new Swiper(".partnersSwiper", {
    slidesPerView: 1,
    spaceBetween: 18,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".partners-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 38,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 58,
      },
    }
  });

  var reviewsSwiper = new Swiper(".reviewsSwiper", {
    slidesPerView: 1,
    spaceBetween: 18,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".reviews-page__next",
      prevEl: ".reviews-page__prev",
    },
    breakpoints: {
      1200: {
        slidesPerView: 2,
      },
    }
  });

  // tabs

  const tabsContainers = Array.from(document.querySelectorAll(".tabs"));

  tabsContainers.forEach(tabsContainer => {
    const STATE = { currentTab: null };
  
    const targetsContainer = tabsContainer.querySelector(".targets");
    const triggers = Array.from(tabsContainer.querySelectorAll(".trigger"));
    const select = tabsContainer.querySelector(".mobile-select");
    const targets = [];
  
    function activateTab(ind) {
      if (ind == null) return ind;
    
      const trigger = triggers[ind];
      const target = targets[ind];
    
      if (trigger) trigger.classList.add("active");
    
      if (target) {
        target.classList.add("active");
    
        targets.forEach(t => {
          const iframe = t.querySelector("iframe");
          if (iframe) iframe.removeAttribute("src");
        });
    
        const mapUrl = trigger.dataset.map;
        const iframe = target.querySelector("iframe");
        if (iframe) iframe.src = mapUrl;
      }
    
      targetsContainer.style.transform = `translateX(-${ind}00%)`;
      return ind;
    }
  
    function deactivateTab(ind) {
      if (ind == null) return ind;
      const trigger = triggers[ind];
      if (trigger) trigger.classList.remove("active");
      const target = targets[ind];
      if (target) target.classList.remove("active");
      return null;
    }
  
    if (targetsContainer) {
      triggers.forEach((trigger, ind) => {
        targets.push(tabsContainer.querySelector(trigger.dataset.target));
        trigger.addEventListener("click", () => {
          STATE.currentTab = deactivateTab(STATE.currentTab);
          STATE.currentTab = activateTab(ind);
        });
      });
  
      // Активируем вкладку на основе текущего URL хеша
      const currentHash = window.location.hash;
      const initialIndex = currentHash ? triggers.findIndex(trigger => trigger.getAttribute('href') === currentHash) : 0;
      STATE.currentTab = activateTab(initialIndex !== -1 ? initialIndex : 0);
  
      // Добавляем обработчик для мобильного селекта
      if (select) {
        select.addEventListener("change", (event) => {
          const selectedOption = select.options[select.selectedIndex];
          const targetId = selectedOption.dataset.target;
          const ind = targets.findIndex(target => target.id === targetId.slice(1));
          if (ind !== -1) {
            STATE.currentTab = deactivateTab(STATE.currentTab);
            STATE.currentTab = activateTab(ind);
          }
        });
      }
    }
  });

  // modal

  function hidemodal(modal) {
    modal.addEventListener('click', function(e) {
      const target = e.target;
      if (
        target.classList.contains("modal__close") ||
        target.classList.contains("modal")
      ) {
        modal.style.transition = "opacity 0.4s";
        modal.style.opacity = "0";
        setTimeout(() => {
          modal.style.display = "none";
        }, 400);
      }
    });
  }

  function showmodal(modal) {
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.transition = "opacity 0.4s";
      modal.style.opacity = "1";
    }, 10);
  } 

  let modal = document.querySelector('.modal')
  let modalBtns = document.querySelectorAll(".modal-btn");
  if(modal && modalBtns){
    hidemodal(modal);
    modalBtns.forEach( btn => {
      btn.addEventListener('click', () => {
        showmodal(modal);
      })
    })
  }

  // form

  const selects = document.querySelectorAll(".doctorSelect");

  selects.forEach( select => {
    select.addEventListener("change", function () {
      if (this.value === "") {
        this.classList.add("placeholder");
        this.classList.remove("normal");
      } else {
        this.classList.remove("placeholder");
        this.classList.add("normal");
      }
    });
  })

  // Fancybox

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  // mask for phone

  [].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substring(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

  // AOS

  AOS.init({
    duration: 1200,
    offset: 0
  });

  window.addEventListener("scroll", () => {
    if (menu.classList.contains("open")) {
      link.classList.remove("active");
      menu.classList.remove("open");
    }
    if(header) {
      scroll = window.scrollY;
      header.classList.toggle("scroll", scroll > 50);
    }
  });
});
