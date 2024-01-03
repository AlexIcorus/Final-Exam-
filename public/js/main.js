let menu = document.querySelector('.menu-icon'); 
let navbar = document.querySelector('.menu'); 


menu.onclick = () => { 
  navbar.classList.toggle('active');
  menu.classList.toggle('move');
} 

//Notifcation
let bell = document.querySelector('.notification');

document.querySelector('#bell-icon').onclick = ()=>{
  bell.classList.toggle('active');
}

//Swiper
var swiper = new Swiper(".trending-content", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
   autoplay: {
       delay:13000,
       disableOnInteraction: false,
   },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1068: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });


//Custom Scroll Bar
window.onscroll = function() {mufunction()};

function mufunction(){
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById('scroll-bar').style.width = scrolled + '%';
}

// Loader
var loader = document.getElementById("preloader");

window.addEventListener("load", function() {
  // Add a delay of 2 seconds (2000 milliseconds)
  setTimeout(function() {
    loader.style.display = "none";
  }, 1500);
});



//font on input
document.addEventListener("DOMContentLoaded", function () {
  var searchInput = document.getElementById("search");

  searchInput.addEventListener("input", function () {
      searchInput.style.fontFamily = "'Noto Sans Lao', sans-serif";
  });

  searchInput.addEventListener("blur", function () {
      searchInput.style.fontFamily = "sans-serif";
  });
});

