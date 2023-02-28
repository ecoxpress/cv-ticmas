/**************************************************************	
	01. Preloader
	02. Menu
	03. Header Shadow 
	04. Pagepiling
	05. Carousel
	06.Randon
	07. Forms	
***************************************************************/
(function ($) {
	'use strict';

	/*-------------------------------------------------------------------------------
	  Preloader
	-------------------------------------------------------------------------------*/
	$(window).on('load', function() {
		if ( $('.preloader').length ) {
			$('.preloader').fadeOut('slow');
		}
	});

	/*-------------------------------------------------------------------------------
	  Menu
	-------------------------------------------------------------------------------*/
	$('.a-nav-toggle, .menu-main a').on('click', function(){
		if ($('html').hasClass('body-menu-opened')) {
			$('html').removeClass('body-menu-opened').addClass('body-menu-close');
		} else {
			$('html').addClass('body-menu-opened').removeClass('body-menu-close');
		}
	});

	/*-------------------------------------------------------------------------------
	  Header Shadow
	-------------------------------------------------------------------------------*/
	$('.pp-scrollable').scroll(function() {
		if ($(this).scrollTop() > 0) {
			$('.header').addClass('header-shadow');
		} else {
			$('.header').removeClass('header-shadow');
		}
	});

	/*-------------------------------------------------------------------------------
	  Pagepiling
	-------------------------------------------------------------------------------*/
	if ( $('.a-pagepiling').length ) {
		$('.a-pagepiling').pagepiling({
			scrollingSpeed: 280,
			menu: '#menu, #menuMain',
			anchors: ['Inicio', 'Experiencia', 'Programacion', 'Softskills', 'Randon', 'Contacto'],
			loopTop: false,
			loopBottom: false,
			navigation: {
				'position': 'right'
			},
			onLeave: function(){
				$('.header').removeClass('header-shadow');
				if ($('.pp-scrollable.active').scrollTop() > 0) {
					$('.header').addClass('header-shadow');
				} else {
					$('.header').removeClass('header-shadow');
				}
				if ($('.slide-dark-footer').hasClass('active')) {
					$('body').addClass('body-copyright-light');
				} else {
					$('body').removeClass('body-copyright-light');
				}
				if ($('.slide-dark-bg').hasClass('active')) {
					$('body').addClass('body-bg-dark');
				} else {
					$('body').removeClass('body-bg-dark');
				}
				$('.a-carousel-projects').trigger('refresh.owl.carousel');
			}
		});
	}

	/*-------------------------------------------------------------------------------
	  Carousels
	-------------------------------------------------------------------------------*/
	if ( $('.a-carousel-projects').length ) {
		$('.a-carousel-projects').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			items: 1,
			navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'],
			smartSpeed: 750,
			dots: false,
			nav: true,
			loop: true
		});
	}

	if ( $('.a-carousel-experience').length ) {
		$('.a-carousel-experience').owlCarousel({
			items: 1,
			navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'],
			smartSpeed: 750,
			margin: 30,
			dots: false,
			nav: true,
			navContainer: '.a-carousel-nav',
			loop: true
		});
	}

	if ( $('.a-carousel-testimonial').length ) {
		$('.a-carousel-testimonial').owlCarousel({
			items: 1,
			navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'],
			smartSpeed: 750,
			margin: 30,
			dots: false,
			nav: true
		});
	}

	/*-------------------------------------------------------------------------------
	  Randon
	-------------------------------------------------------------------------------*/
	const boton = document.querySelector('#boton');
	const nombre = document.querySelector('#nombre');
	const correo = document.querySelector('#correo');
	const telefono = document.querySelector('#telefono');
	const foto = document.querySelector('#foto');
	
	const generarUsuario = async () => {
		//consultar a la API
		const url = 'https://randomuser.me/api/';
		const respuesta = await fetch(url);
		const { results } = await respuesta.json();
		const datos = results[0];
	
		foto.src = datos.picture.large;
		nombre.textContent = datos.name.first;
		correo.textContent = datos.email;
		telefono.textContent = datos.phone;
	}
	
		//crear un evento
	document.addEventListener('DOMContentLoaded', generarUsuario);
	boton.addEventListener('click', generarUsuario);

	/*-------------------------------------------------------------------------------
	  Forms
	-------------------------------------------------------------------------------*/
	// File Input Path
	$(document).on('change', '.a-file input[type="file"]', function () {
		var file_field = $(this).closest('.a-file');
		var path_input = file_field.find('input.file-path');
		var files = $(this)[0].files;
		var file_names = [];
		for (var i = 0; i < files.length; i++) {
		file_names.push(files[i].name);
		}
		path_input.val(file_names.join(", "));
		path_input.trigger('change');
	});

	// Material
	if ( $('.a-form-group').length ) {
		$('.a-form-group .form-control').each(function() {
			if ($(this).val().length > 0 || $(this).attr('placeholder') !== undefined) {
				$(this).closest('.a-form-group').addClass('active');
			}
		});
		$('.a-form-group .form-control').focus(function() {
			$(this).closest('.a-form-group').addClass('active');
		});
		$('.a-form-group .form-control').blur(function() {
			if ($(this).val() == '' && $(this).attr('placeholder') == undefined) {
				$(this).closest('.a-form-group').removeClass('active');
			}
		});
		$('.a-form-group .form-control').change(function() {
			if ($(this).val() == '' && $(this).attr('placeholder') == undefined) {
				$(this).closest('.a-form-group').removeClass('active');
			} else {
				$(this).closest('.a-form-group').addClass('active');
			}
		});
	}

	// Send Form
	if ($('.a-ajax-form').length) {
		$('.a-ajax-form').each(function () {
			var thisForm = $(this);
			var succMessage = thisForm.find('.success-message');
			var errMessage = thisForm.find('.error-message');
			thisForm.validate({
				errorClass: 'error',
				submitHandler: function (form) {
					$.ajax({
						type: 'POST',
						url: 'handler.php',
						data: new FormData(form),
						cache: false,
						contentType: false, // Not to set any content header
						processData: false, // Not to process data
						success: function () {
							succMessage.show();
						},
						error: function () {
							errMessage.show();
						}
					});

				}
			});
		});
	}
}($));