(function($) {
	"use strict";
  
	/*----------------------------------------------------*/
	/* Preloader
	------------------------------------------------------*/
	$(window).on('load', function() {
	  $("#loader").fadeOut("slow", function() {
		$("#preloader").delay(300).fadeOut("slow");
	  });
	});
  
	/*----------------------------------------------------*/
	/* FitText Settings
	------------------------------------------------------*/
	setTimeout(function() {
	  $('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });
	}, 100);
  
	/*----------------------------------------------------*/
	/* FitVids
	------------------------------------------------------*/
	$(".fluid-video-wrapper").fitVids();
  
	/*----------------------------------------------------*/
	/* Owl Carousel
	------------------------------------------------------*/
	$("#owl-slider").owlCarousel({
	  navigation: false,
	  pagination: true,
	  itemsCustom: [
		[0, 1],
		[700, 2],
		[960, 3]
	  ],
	  navigationText: false
	});
  
	/*-----------------------------------------------------*/
	/* Alert Boxes
	------------------------------------------------------*/
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});
  
	/*-----------------------------------------------------*/
	/* Stat Counter
	------------------------------------------------------*/
	var statSection = $("#stats"),
		stats = $(".stat-count");
  
	statSection.waypoint({
	  handler: function(direction) {
		if (direction === "down") {
		  stats.each(function() {
			var $this = $(this);
			$({ Counter: 0 }).animate({ Counter: $this.text() }, {
			  duration: 4000,
			  easing: 'swing',
			  step: function(curValue) {
				$this.text(Math.ceil(curValue));
			  }
			});
		  });
		}
		this.destroy();
	  },
	  offset: "90%"
	});
  
	/*----------------------------------------------------*/
	/* Masonry
	------------------------------------------------------*/
	var containerProjects = $('#folio-wrapper');
  
	containerProjects.imagesLoaded(function() {
	  containerProjects.masonry({
		itemSelector: '.folio-item',
		resize: true
	  });
	});
  
	/*----------------------------------------------------*/
	/* Modal Popup
	------------------------------------------------------*/
	$('.item-wrap a').magnificPopup({
	  type: 'inline',
	  fixedContentPos: false,
	  removalDelay: 300,
	  showCloseBtn: false,
	  mainClass: 'mfp-fade'
	});
  
	$(document).on('click', '.popup-modal-dismiss', function(e) {
	  e.preventDefault();
	  $.magnificPopup.close();
	});
  
	/*-----------------------------------------------------*/
	/* Navigation Menu
	------------------------------------------------------*/
	$(document).ready(function() {
	  const $sections = $("section");
	  const $navLinks = $("#main-nav-wrap li a");
	  const headerHeight = $("header").outerHeight();
  
	  // Highlight current section
	  function highlightNav() {
		const scrollPos = $(window).scrollTop() + headerHeight;
		
		$sections.each(function() {
		  const $section = $(this);
		  const sectionTop = $section.offset().top;
		  const sectionBottom = sectionTop + $section.outerHeight();
		  
		  if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
			const id = $section.attr('id');
			$navLinks.removeClass('active');
			$navLinks.filter('[href="#' + id + '"]').addClass('active');
		  }
		});
	  }
  
	  // Smooth scrolling
	  $navLinks.on('click', function(e) {
		e.preventDefault();
		const target = $(this).attr('href');
		const $target = $(target);
		
		$('html, body').stop().animate({
		  'scrollTop': $target.offset().top - headerHeight + 20
		}, 800, 'swing', function() {
		  window.location.hash = target;
		});
	  });
  
	  // Initialize and bind events
	  highlightNav();
	  $(window).on('scroll', highlightNav);
	});
  
	/*----------------------------------------------------*/
	/* Carousel Functionality
	------------------------------------------------------*/
	const carouselInner = document.querySelector('.carousel-inner');
	const prevButton = document.querySelector('.carousel-prev');
	const nextButton = document.querySelector('.carousel-next');
	const carouselItems = document.querySelectorAll('.carousel-item');
	let currentIndex = 0;
  
	function getItemsPerSlide() {
	  if (window.innerWidth >= 1024) return 3;
	  if (window.innerWidth >= 768) return 2;
	  return 1;
	}
  
	function updateCarousel() {
	  const itemsPerSlide = getItemsPerSlide();
	  const offset = -currentIndex * (100 / itemsPerSlide);
	  carouselInner.style.transform = `translateX(${offset}%)`;
	}
  
	prevButton.addEventListener('click', () => {
	  const itemsPerSlide = getItemsPerSlide();
	  currentIndex = currentIndex > 0 ? currentIndex - 1 : Math.ceil(carouselItems.length / itemsPerSlide) - 1;
	  updateCarousel();
	});
  
	nextButton.addEventListener('click', () => {
	  const itemsPerSlide = getItemsPerSlide();
	  currentIndex = currentIndex < Math.ceil(carouselItems.length / itemsPerSlide) - 1 ? currentIndex + 1 : 0;
	  updateCarousel();
	});
  
	window.addEventListener('resize', updateCarousel);
  
	/*----------------------------------------------------*/
	/* Placeholder Plugin Settings
	------------------------------------------------------*/
	$('input, textarea, select').placeholder();
  
	/*----------------------------------------------------*/
	/* Contact Form
	------------------------------------------------------*/
	$('#contactForm').validate({
	  submitHandler: function(form) {
		var sLoader = $('#submit-loader');
		$.ajax({
		  type: "POST",
		  url: "inc/sendEmail.php",
		  data: $(form).serialize(),
		  beforeSend: function() {
			sLoader.fadeIn();
		  },
		  success: function(msg) {
			if (msg == 'OK') {
			  sLoader.fadeOut();
			  $('#message-warning').hide();
			  $('#contactForm').fadeOut();
			  $('#message-success').fadeIn();
			} else {
			  sLoader.fadeOut();
			  $('#message-warning').html(msg);
			  $('#message-warning').fadeIn();
			}
		  },
		  error: function() {
			sLoader.fadeOut();
			$('#message-warning').html("Something went wrong. Please try again.");
			$('#message-warning').fadeIn();
		  }
		});
	  }
	});
  
	/*-----------------------------------------------------*/
	/* Back to Top
	------------------------------------------------------*/
	var pxShow = 300;
	var fadeInTime = 400;
	var fadeOutTime = 400;
	var scrollSpeed = 300;
  
	$(window).scroll(function() {
	  if (!($("#header-search").hasClass('is-visible'))) {
		if ($(window).scrollTop() >= pxShow) {
		  $("#go-top").fadeIn(fadeInTime);
		} else {
		  $("#go-top").fadeOut(fadeOutTime);
		}
	  }
	});
  
	/*-----------------------------------------------------*/
	/* Header Background Change on Scroll
	------------------------------------------------------*/
	$(window).on('scroll', function() {
	  const header = $('header');
	  if ($(window).scrollTop() > 50) {
		header.css({
		  'background-color': '#1C1C1E',
		  'box-shadow': '0 2px 10px rgba(0,0,0,0.1)'
		});
	  } else {
		header.css({
		  'background-color': 'transparent',
		  'box-shadow': 'none'
		});
	  }
	});
  
	/*-----------------------------------------------------*/
	/* Update Copyright Year
	------------------------------------------------------*/
	$('#year').text(new Date().getFullYear());
  
  })(jQuery);
  (function($) {
	"use strict";
  
	/*-----------------------------------------------------*/
	/* Instant Navigation Scrolling
	/*-----------------------------------------------------*/
	$(document).ready(function() {
	  const $sections = $("section");
	  const $navLinks = $("#main-nav-wrap li a");
	  const headerHeight = $("header").outerHeight();
	  let isScrolling = false;
  
	  // INSTANT scroll to section
	  $navLinks.on('click', function(e) {
		e.preventDefault();
		const target = $(this).attr('href');
		const $target = $(target);
		
		// Cancel any ongoing animations
		$('html, body').stop();
		
		// INSTANT jump (no animation)
		window.location.hash = target;
		window.scrollTo(0, $target.offset().top - headerHeight + 20);
		
		// Update active class immediately
		$navLinks.removeClass('active');
		$(this).addClass('active');
	  });
  
	  // Smooth highlight on scroll
	  $(window).on('scroll', function() {
		if (!isScrolling) {
		  const scrollPos = $(this).scrollTop() + headerHeight;
		  
		  $sections.each(function() {
			const $section = $(this);
			const sectionTop = $section.offset().top;
			const sectionBottom = sectionTop + $section.outerHeight();
			
			if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
			  const id = $section.attr('id');
			  $navLinks.removeClass('active');
			  $navLinks.filter('[href="#' + id + '"]').addClass('active');
			}
		  });
		}
	  });
  
	  // Handle hash links on page load
	  if (window.location.hash) {
		const $target = $(window.location.hash);
		if ($target.length) {
		  setTimeout(() => {
			window.scrollTo(0, $target.offset().top - headerHeight + 20);
		  }, 10);
		}
	  }
	});
  
	/*----------------------------------------------------*/
	/* Keep all your other existing functions below */
	/* (Preloader, FitText, Owl Carousel, etc.) */
	/*----------------------------------------------------*/
  
  })(jQuery);