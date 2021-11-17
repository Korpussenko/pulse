const slider = tns({
	container: '.carousel__inner',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: false,
	nav: false
});

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});

$(document).ready(function() {
 
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
	
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	//Modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function(){
		$('.modal, .overlay').fadeOut('slow');
	});

	$('.button_catalog').on('click', function(){
		$('.overlay, #order').fadeIn('slow');
	});

	$('.button_catalog').each(function(i) {
		$(this).on('click',function(){
			$('#order .modal__desc').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});

	function validateForm (form){
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required:true,
					email:true
				}
			},
			messages: {
				name: "Пожалуйста, введите своё имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
				  required: "Пожалуйста, введите адрес электронной почты",
				  email: "Неверно указан адрес электронной почты"
				}
			},
		});
	};

	validateForm ('#main-form');
	validateForm ('#consultation form');
	validateForm ('#order form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit (function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function(){
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn(slow);

			$('form').trigger('reset');
		});
		return false;
	});

	//Smooth scroll

	$(window).scroll(function() {
		if ($(this).scrollTop() >1600) {
			$('.page-up').fadeIn();
		} else {
			$('.page-up').fadeOut();
		}
	});
	
	new WOW().init();

});