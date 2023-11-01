jQuery(document).ready(function($){
  // Header Toggle Function
  $('.pr-header__mobile-toggle').on('click',function() {
    $(this).toggleClass('change');
    $('.mobile-navigation').slideToggle();
    $('body').toggleClass('menu--open')
  });

  // Function to make the header sticky.
  function makeHeaderSticky() {
    var header = $(".pr-header");
    var headerOffset = header.offset().top;
      
    $(window).scroll(function() {
        if ($(window).scrollTop() > headerOffset) {
            header.addClass("sticky");
        } else {
            header.removeClass("sticky");
        }
    });
  }

  makeHeaderSticky();

  //Functions to adjust the navigation menu on resizing and loading the window. 
  function appendNavigationMobile() {
    $('#pr-header__nav--second').appendTo('.pr-header__menu-wrap.menu--left');
    $('.pr-header__menu-wrap.menu--left').parent('.pr-header__menu').addClass("mobile-navigation");
  }
  
  function appendNavigationDesktop() {
    $('#pr-header__nav--second').appendTo('.pr-header__menu-wrap.menu--right');
    $('.pr-header__menu-wrap.menu--left').parent('.pr-header__menu').removeClass("mobile-navigation");
  }
  
  $(window).on('load',function() {
    if ($(window).width() < 992) {
      appendNavigationMobile();
    }
  })
  
  // Prevent to append the navigation multiple time while scrolling.
  var timeOutFunctionId;
  var countMobile = 0 , 
  countDesktop = 0;

  $(window).on('resize', function () {
    if ($(window).width() <= 992) {
      countDesktop = 0;
      if(countMobile==0) {
      clearTimeout(timeOutFunctionId);
      timeOutFunctionId = setTimeout(appendNavigationMobile, 100);
      }
      countMobile+=1;
    } else {
      countMobile = 0;
        if(countDesktop==0) {
            clearTimeout(timeOutFunctionId);
            timeOutFunctionId = setTimeout(appendNavigationDesktop, 100);
        }
      countDesktop+=1;
    }
  });

  // Change the color on select  
  $('.pr-bs__product-color-custom').on('click',function() {
    $(this).parents('.pr-bs__product-color').find('.pr-bs__product-color-custom').removeClass('selected');
    $(this).addClass('selected');
  });

  // slick function
  $('.pr-bs__product-row').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4.25,
    slidesToScroll: 1,
    'prevArrow': '<div class="pr-bs__product-slider-icon prev-icon"><img src="../assets/images/left-arrow.png" alt="Left Arrow"></div>',
    'nextArrow': '<div class="pr-bs__product-slider-icon next-icon"><img src="../assets/images/right-arrow.png" alt="Right Arrow"></div>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.25,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.25,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.25,
          slidesToScroll: 1
        }
      }
    ]
  });

  //Move the product slider outside from the container 
  function setRightOffset() {
    var containerWidth = $('.pr-bs__product-row').outerWidth();
    var elementRightOffset = $('.pr-bs__product-row').offset().left + $('.pr-bs__product-row').outerWidth();
    var rightOffset = elementRightOffset - containerWidth;
    
    if (rightOffset < 0) {
      rightOffset = 0; // Prevent negative margin
    }
    $('.pr-bs__product').css("margin-right", -rightOffset + "px");
  }

  $(window).on('load resize',function() {
    setRightOffset();
  });

// GSAP Animation
gsap.registerPlugin(ScrollTrigger);

const gridItems = document.querySelectorAll('.parallax-effect');
// Function to create the parallax effect
function createParallax() {
  gsap.to(gridItems, {
    y: function (index, target) {
      return -20 * index; 
    },
    ease: "none",
    scrollTrigger: {
      trigger: '.pr-rl__container',
      scrub: 2, 
    },
  });
}
window.addEventListener('load', createParallax);

});