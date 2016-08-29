$(function() {
	var $body = $('body'), $header = $('.header span'), $container = $('.container'), $blocks = $container.find('.block');

	function setBlockSize() {
		//page size
		var bw = $body.width(), bh = $body.height();

		$blocks.each(function() {
			//block size
			$(this).css({
				'width': bw,
				'height': bh
			});
		});

		//container size
		$container.css({
			'height': bh,
			'margin-left': -bw * $container.data('touch'),
			'width': $blocks.length * bw
		});
	};

	function setImageSize($b) {
		var load = $b != undefined
		if (!load) $b = $blocks;
		//page size
		var bw = $body.width(), bh = $body.height(), ba = bw / bh;
		$b.each(function() {
			//image size
			var $this = $(this), $loading = $this.find('.loading'), $buffer = $this.find('.buffer img'), $image = $this.find('.preview');
			if ($loading.css('opacity') == 0 || load) {
				var w = $buffer.width(), h = $buffer.height(), a = w / h;
				if (a > ba) {
					w = bw;
					h = w / a;
				} else {
					h = bh;
					w = h * a;
				};
				$image.css({
					'height': h,
					'margin-left': -w / 2,
					'margin-top': -h / 2,
					'width': w
				}).attr('src', $buffer.attr('src')).animate({'opacity': 1}, 200);
				$loading.css('opacity', 0);
			};
		});
	};

	function setBlockSrc() {
		$blocks.each(function() {
			var $this = $(this);
			$this.find('.buffer img').attr('src', $this.data('src'));
		});
	};

	function bufferLoad() {
		setImageSize($(this).closest('.block'));
	};

	function windowResize() {
		setBlockSize();
		setImageSize();
	};

	//touch
	var timestamp = null, lastX = null, speedX = null;
	function touchstart(event) {
		//coord
		var x = event.pageX;
		if (x == undefined)
			x = event.originalEvent.touches[0].pageX;
		//stop animation
		$(':animated').stop(true, true);
		//drag params
		$container.data({
			'x': x,
			'left': parseInt($container.css('margin-left'))
		});
		//handler
		$body.bind('touchmove', touchmove);
	};
	function touchend(event) {
		//handler
		$body.unbind('touchmove', touchmove);
		//determine index
		var bw = $body.width(),
			touch = Math.round(-parseInt($container.data('left')) / bw);
		if (speedX < -0.05) {
			touch++;
		} else if (speedX > 0.05) {
			touch--;
		};
		if (touch > $blocks.length - 1)
			touch = $blocks.length - 1;
		if (touch < 0) touch = 0;
		//offset
		$container.data('touch', touch).animate({'margin-left': -touch * bw}, 200);
		//title
		$header.text(touch + 1);
	};
	function touchmove(event) {
		//coord
		var x = event.pageX;
		if (x == undefined)
			x = event.originalEvent.touches[0].pageX;
		//shift
		var dx = x - $container.data('x');
		//place correction
		$container.css('margin-left', $container.data('left') + dx);
		//speed
		if (timestamp === null) {
			timestamp = Date.now();
			lastX = x;
		} else {
			var now = Date.now(), dt = now - timestamp, dx = x - lastX;
			speedX = dx / dt;
			timestamp = now;
			lastX = x;
		};
	};

	//initialization
	function init() {
		//handlers
		$('.buffer img').bind('load', bufferLoad); //image loading
		$(window).bind('orientationchange, resize', windowResize); //resize
		$body.bind('touchstart', touchstart); //touch
		$body.bind('touchend', touchend); //touch
		//blocks size
		setBlockSize();
		//images
		setBlockSrc();
	};

	//block initialization
	init();

});
