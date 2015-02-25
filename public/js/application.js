jQuery( function($){
	
	/*----------------------/
	/* PAGE LOADER
	/*---------------------*/

	$('body').jpreLoader({
		showSplash: false,
		loaderVPos: "50%"
	});


	/*----------------------/
	/* MAIN NAVIGATION
	/*---------------------*/
		
	$(window).on('scroll', function(){
		if( $(window).width() > 1024 ) {
			if( $(document).scrollTop() > 150 ) {
				setNavbarLight();
			}else {
				setNavbarTransparent();
			}
		}
	});	
	
	function toggleNavbar() {
		if( ($(window).width() > 1024) && ($(document).scrollTop() <= 150) ) {
			setNavbarTransparent();
		} else {
			setNavbarLight();
		}
	}

	toggleNavbar();

	$(window).resize( function() {
		toggleNavbar();	
	});

	/* navbar setting functions */
	function setNavbarLight() {
		$('.navbar').addClass('navbar-light');
		$('.navbar-brand img').attr('src', 'assets/img/loop-logo.png');
	}

	function setNavbarTransparent() {
		$('.navbar').removeClass('navbar-light');
		$('.navbar-brand img').attr('src', 'assets/img/loop-logo-white.png');
	}

	// hide collapsible menu
	$('.navbar-nav li a').click( function() {
		if($(this).parents('.navbar-collapse.collapse').hasClass('in')) {
			$('#main-nav').collapse('hide');
		}		
	});

	$('#main-nav').localScroll({
		duration: 1000,
		easing: 'easeInOutExpo'
	});

	$('.hero-buttons').localScroll({
		duration: 1000,
		easing: 'easeInOutExpo'
	});


	/*----------------------/
	/* HERO UNIT SUPERSIZED
	/*---------------------*/


	
	/*-----------------------------/
	/* HERO UNIT FULLSCREEN VIDEO
	/*---------------------------*/

	if( $('.hero-video').length > 0 ) {
		var videoOptions = {
			mp4: '/css/motion.mp4',
			webm: '/css/motion.webm',
			ogv: '/css/motion.ogv',
			opacity: 1,
			zIndex: 0,
			muted: 'muted'
		}
		// iPhone seems provide video accesibility, so don't give poster to show the video
		if( $(window).width() > 480 ) {
			videoOptions.poster = '/css/motion.png';
		}

		$('.hero-video').videoBG(videoOptions);

		// resize the wrapper as the video resized
		$(window).resize( function() {
			$('.videoBG_wrapper').width('100%').height('100%');
			$('.videoBG').width('100%');
		});

		// video volume control
		$('.fa-volume-up, .fa-volume-off').click( function() {
				$('.videoBG video').toggleVolume();
				$(this).toggleClass("fa-volume-up fa-volume-off");
			}
		);

		$.fn.toggleVolume = function() {
			var domVideo = $(this).get(0);

			if( domVideo.muted == true ) {
				domVideo.muted = false;
			}else {
				domVideo.muted = true;
			}
		}
	}


	/*----------------------/
	/* PARALLAX
	/*---------------------*/

	$('.full-width-parallax').parallax(0, 0.1);

	function setParallax() {
		if( $(window).width() > 1024 ) {
			$('.full-width-parallax').parallax(0, 0.1);
		}
	}

	setParallax();

	$(window).resize( function() {
		setParallax();
	});
	
	/*----------------------/
	/* SKILLS
	/*---------------------*/

	$('#skills').waypoint( function() {
		$('.chart').each( function() {
			$(this).easyPieChart({
				size: 150,
				barColor: '#ffae3f',
				trackColor: '#eee',
				scaleColor: false,
				lineWidth: 2,
				easing: 'easeOutExpo',
				animate: 2000
			});		
		});
	},
	{
		offset: '70%'
	});

	



	/*----------------------/
	/* SCROLL TO TOP
	/*---------------------*/

	if( $(window).width() > 992 ) {
		$(window).scroll( function() {
			if( $(this).scrollTop() > 300 ) {
				$('.back-to-top').fadeIn();
			} else {
				$('.back-to-top').fadeOut();
			}
		});

		$('.back-to-top').click( function(e) {
			e.preventDefault();

			$('body, html').animate({
				scrollTop: 0
			}, 800, 'easeInOutExpo');
		});	
	}
	


	/*----------------------/
	/* SOCIAL NETWORK
	/*---------------------*/

	if( $(window).width() > 1024 ) {
		wow = new WOW({
			animateClass: 'animated'
		});

		wow.init();
	} else {
		$('.wow').attr('class', '');
	}

	
	/*----------------------/
	/* TOOLTIP
	/*---------------------*/

	if( $(window).width() > 1024 ) {
		$('body').tooltip({
			selector: "[data-toggle=tooltip]",
			container: "body"
		});
	}
	
	
	/*----------------------/
	/* AJAX CONTACT FORM
	/*---------------------*/

	$('#contact-form').parsley();

	$('.contact-form form').submit( function(e) {
		
		e.preventDefault();

		if( !$(this).parsley('isValid') )
			return;

		$theForm = $(this);
		$btn = $(this).find('#submit-button');
		$btnText = $btn.text();
		$alert = $(this).parent().find('.alert');

		$btn.find('.loading-icon').addClass('fa-spinner fa-spin ');
		$btn.prop('disabled', true).find('span').text("Sending...");

		$.post('contact.php', $(this).serialize(), function(data){
			
			$message = data.message;
			
			if( data.result == true ){
				$theForm.slideUp('medium', function() {
					$alert.removeClass('alert-danger');
					$alert.addClass('alert-success').html($message).slideDown('medium');
				});
			}else {
				$alert.addClass('alert-danger').html($message).slideDown('medium');	
			}

			$btn.find('.loading-icon').removeClass('fa-spinner fa-spin ');
			$btn.prop('disabled', false).find('span').text($btnText);

		})
		.fail(function() { console.log('AJAX Error'); });

	});


	// init scrollspy except on Opera, it doesn't work because body has 100% height
	if ( !navigator.userAgent.match("Opera/") ) {
		$('body').scrollspy({
			target: '#main-nav'
		});
	}else {
		$('#main-nav .nav li').removeClass('active');
	}

});
