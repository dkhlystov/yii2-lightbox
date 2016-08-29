$(function() {
	//отображение сплеша
	function showSplash($el) {
		var $overlay = $('<div class="lightbox-overlay"><div class="header"></div><div class="footer"></div><div class="block block-current"><div class="buffer"><img></div><div class="loading"></div><img class="preview"><div class="next hidden"><span>&gt;</span></div><div class="prev hidden"><span>&lt;</span></div><div class="close hidden">&times;</div></div></div>'), $block = $overlay.find('.block');
		//заголовок
		makeTitle($overlay, $el);
		//обработчики
		$overlay.find('.close').click(hideSplash); //закрыть
		$overlay.find('.prev').click(prevClick);
		$overlay.find('.next').click(nextClick);
		$overlay.find('.buffer img').load(bufferLoad); //загрузка изображения в буфер
		$(window).bind('keydown', windowKeydown); //горячие кнопки
		//блок изображения
		BlockEl($block, $el);
		//показываем
		$overlay.appendTo('body').css({'display': 'block', 'opacity': 0}).animate({'opacity': 1}, 200);
	}

	//формирование заголовка
	function makeTitle($overlay, $el) {
		if ($el == undefined) $el = $overlay.find('.block').data('el');
		var current = $el.prevAll('a').length + 1, total = current + $el.nextAll('a').length;
		if (total > 1) $overlay.find('.header').html('<span>'+current+'</span>/'+total);
		//кнопки
		var $prev = $overlay.find('.prev'), $next = $overlay.find('.next');
		if (current > 1) $prev.removeClass('disabled');
		else $prev.addClass('disabled');
		if (current < total) $next.removeClass('disabled');
		else $next.addClass('disabled');
	}

	//присвоение блоку ссылки
	function BlockEl($block, $el) {
		var $overlay = $block.closest('.lightbox-overlay');
		$block.data('el', $el);
		$block.find('.loading').css('display', 'block').animate({'opacity': 1}, 200);
		$block.find('.buffer img').attr('src', '').attr('src', $el.attr('href'));
	}

	//закрытие сплеша
	function hideSplash() {
		$(window).unbind('keydown', windowKeydown);
		var $overlay = $('.lightbox-overlay');
		$overlay.animate({'opacity': 0}, 200, function() {
			$overlay.remove();
		});
	}

	//клик по фону
	function lightboxClick(event) {
		if (event.target == this) hideSplash();
	}

	//обработчик клавиш
	function windowKeydown(event) {
		var $overlay = $('.lightbox-overlay');
		if (event.keyCode == 27) hideSplash();
		if (event.which == 37) prevClick();
		if (event.which == 39) nextClick();
	}

	//загрузилась картинка
	function bufferLoad() {
		var $buffer = $(this), $block = $buffer.closest('.block'), $preview = $block.find('.preview'), $overlay = $block.closest('.lightbox-overlay'), $controls = $block.find('.prev,.next,.close');
		//размеры картинки и подложки + соотношение сторон
		var w = $buffer.width() + 2, h = $buffer.height() + 2, a = w/h,
			sw = $overlay.width(), sh = $overlay.height(), sa = sw/sh;
		//корректировка размеров
		if (a > sa && (w > sw)) {
			w = sw;
			h = w / a;
		} else if (a <= sa && (h > sh)) {
			h = sh;
			w = h * a;
		}
		//заголовок
		makeTitle($overlay);
		//меняем изображение
		$controls.addClass('hidden');
		$preview.animate({'opacity': 0}, 200, function() {
			//убираем загрузчик
			$block.find('.loading').animate({'opacity': 0}, 200, function() {$(this).css('display', 'none')});
			//новое изображение
			$preview.attr('src', $buffer.attr('src'));
			$preview.animate({'height': h - 2, 'width': w - 2}, 200);
			$block.animate({
				'height': h,
				'margin-left': -w / 2,
				'margin-top': -h / 2,
				'width': w
			}, 200, function() {
				//показываем
				$preview.animate({'opacity': 1}, 200);
				$controls.removeClass('hidden');
			});
			
		});
	}

	//предыдущая
	function prevClick() {
		var $overlay = $('.lightbox-overlay');
		if ($overlay.find('.prev').is('.disabled')) return false;
		var $block = $overlay.find('.block'), $el = $block.data('el');
 		$el = $el.prevAll('a:first');
 		if ($el.length > 0) BlockEl($block, $el);
	}

	//следующая
	function nextClick() {
		var $overlay = $('.lightbox-overlay');
		if ($overlay.find('.next').is('.disabled')) return false;
		var $block = $overlay.find('.block'), $el = $block.data('el');
 		$el = $el.nextAll('a:first');
		if ($el.length > 0) BlockEl($block, $el);
	}

	//клик по ссылке
	function linkClick(event) {
		event.preventDefault();
		var $this = $(this);
		if ($this.data('touch')) {
			var $lightbox = $this.closest('.lightbox'), $form = $('<form method="post"></form>').attr('action', $lightbox.data('url')).append($('<input type="hidden" name="_csrf">').val(yii.getCsrfToken()));
			$lightbox.find('a:has(img)').each(function() {
				$('<input type="hidden" name="src[]" />').val(this.href).appendTo($form);
			});
			$('<input type="hidden" name="touch">').val(this.href).appendTo($form);
			$form.appendTo('body').submit();
		} else showSplash($this);
	}

	//обработчик на фон
	$(document).on('click', '.lightbox-overlay', lightboxClick);
	//вешаем обработчики на все ссылки с картинками
	$(document).on('touchstart', '.lightbox a:has(img)', function() {$(this).data('touch', true)});
	$(document).on('click', '.lightbox a:has(img)', linkClick);
});
