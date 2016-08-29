$(function() {
	var $body = $('body'), $header = $('.header span'), $container = $('.container'), $blocks = $container.find('.block');

	//установка размеров блоков
	function setBlockSize() {
		//размеры страницы
		var bw = $body.width(), bh = $body.height();
		//размеры блоков
		$blocks.each(function() {
			//размер блока
			$(this).css({
				'width': bw,
				'height': bh
			});
		});
		//размер контейнера
		$container.css({
			'height': bh,
			'margin-left': -bw*$container.data('touch'),
			'width': $blocks.length * bw
		});
	}

	//установка размеров изображения
	function setImageSize($b) {
		var load = $b != undefined
		if (!load) $b = $blocks;
		//размеры страницы
		var bw = $body.width(), bh = $body.height(), ba = bw/bh;
		$b.each(function() {
			//размеры изображения
			var $this = $(this), $loading = $this.find('.loading'), $buffer = $this.find('.buffer img'), $image = $this.find('.preview');
			if ($loading.css('opacity') == 0 || load) {
				var w = $buffer.width(), h = $buffer.height(), a = w/h;
				if (a > ba) {
					w = bw;
					h = w/a;
				} else {
					h = bh;
					w = h*a;
				}
				$image.css({
					'height': h,
					'margin-left': -w/2,
					'margin-top': -h/2,
					'width': w
				}).attr('src', $buffer.attr('src')).animate({'opacity': 1}, 200);
				$loading.css('opacity', 0);
			}
		});
	}

	//изображения
	function setBlockSrc() {
		$blocks.each(function() {
			var $this = $(this);
			$this.find('.buffer img').attr('src', $this.data('src'));
		});
	}

	//загружен буфер
	function bufferLoad() {
		setImageSize($(this).closest('.block'));
	}

	//изменение размера экрана
	function windowResize() {
		setBlockSize();
		setImageSize();
	}

	//тач
	var timestamp = null, lastX = null, speedX = null;
	function touchstart(event) {
		//координата
		var x = event.pageX;
		if (x == undefined) x = event.originalEvent.touches[0].pageX;
		//заканчиваем анимацию
		$(':animated').stop(true, true);
		//параметры перетаскивания
		$container.data({
			'x': x,
			'left': parseInt($container.css('margin-left'))
		});
		//обработчик
		$body.bind('touchmove', touchmove);
	}
	function touchend(event) {
		//обработчик
		$body.unbind('touchmove', touchmove);
		//определяем индекс
		var bw = $body.width(), touch = Math.round(-parseInt($container.data('left'))/bw);
		if (speedX < -0.05) touch++;
		else if (speedX > 0.05) touch--;
		if (touch > $blocks.length - 1) touch = $blocks.length - 1;
		if (touch < 0) touch = 0;
		//устанавливаем смещение
		$container.data('touch', touch).animate({'margin-left': -touch*bw}, 200);
		//заголовок
		$header.text(touch+1);
	}
	function touchmove(event) {
		//координата
		var x = event.pageX;
		if (x == undefined) x = event.originalEvent.touches[0].pageX;
		//изменение
		var dx = x-$container.data('x');
		//корректируем положение
		$container.css('margin-left', $container.data('left')+dx);
		//скорость
		if (timestamp === null) {
			timestamp = Date.now();
			lastX = x;
		} else {
			var now = Date.now(), dt = now - timestamp, dx = x - lastX;
			speedX = dx / dt;
			timestamp = now;
			lastX = x;
		}
	}

	//инициализация
	function init() {
		//обработчики
		$('.buffer img').bind('load', bufferLoad); //загрузка изображения
		$(window).bind('orientationchange, resize', windowResize); //изменение размера
		$body.bind('touchstart', touchstart); //тач
		$body.bind('touchend', touchend); //тач
		//размеры блоков
		setBlockSize();
		//изображения
		setBlockSrc();
	}

	//инициализация блоков
	init();

});
