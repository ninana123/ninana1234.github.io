$(document).ready(function () {
	$('.slides__wrapper').slick({
		speed: 1200,
		prevArrow: '<button type="button" class="slick-prev"><img src="img/arrow/arrow_left.svg"</button>',
		nextArrow: '<button type="button" class="slick-next"><img src="img/arrow/arrow_right.svg"</button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					dots: true,
					arrows: false
				}
			},
		]
	});
	$('ul.catalog__tabs').on('click', 'li:not(.catalog-item__list_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});
	function toggleContent(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$(".catalog-item__content").eq(i).toggleClass('catalog-item__content_active');
				$(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active")
			})
		})
	}
	toggleContent(".catalog-item__info")
	toggleContent(".catalog-item__back")

	// Modal

	$("[data-modal=consultation]").on("click", function (e) {
		$(".overlay, #consultation").fadeIn("slow");
	})

	$(".modal__close").on("click", function () {
		$(".overlay, #consultation,#order,#thanks").fadeOut("slow");
	})

	$(".button_mini").each(function (i) {
		$(this).on("click", function () {
			$("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text())
			$(".overlay, #order").fadeIn("slow");
		})
	})

	function validateForm(arg) {
		$(arg).validate({
			rules: {
				name: "required",
				phone: {
					required: true,
					minlength: 11,
				},
				email: {
					required: true,
					email: true,
				}
			},
			messages: {
				name: "Вы забыли указать свое имя",
				phone: {
					required: "Укажите номер телефона",
					minlength: jQuery.validator.format("Вам нужно указать {0} символов"),
				}
			}
		});
	}
	validateForm("#consultation form")
	validateForm("#consultation-form")
	validateForm("#order form")

	$("input[name=phone]").mask("7 (999) 999-9999");

	$("form").submit(function (e) {
		e.preventDefault();
		$("#consultation, #order").fadeOut();
		$(".overlay, #thanks").fadeIn();

		$("form").trigger("reset")

		return false
	})

	$(window).scroll(function () {
		if ($(this).scrollTop() > 1600) {
			$(".scroll").fadeIn()
		} else {
			$(".scroll").fadeOut()
		}
	})

	const scrollUp = $('.scroll');
	scrollUp.on('click', function (e) {
		e.preventDefault();
		$('html').animate({ scrollTop: 0 }, '300');
	});

	$("a[href='#up']").click(function () {
		var _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});

	new WOW().init();


});

