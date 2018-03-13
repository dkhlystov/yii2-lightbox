$(function() {

	function showSplash($el) {
		var $overlay = $('<div class="lightbox-overlay"><div class="lightbox-header"></div><div class="lightbox-footer"></div><div class="lightbox-block block-current"><div class="buffer"><img></div><div class="loading"></div><img class="preview"><div class="next hidden"><span>&gt;</span></div><div class="prev hidden"><span>&lt;</span></div><div class="close hidden">&times;</div></div></div>'),
			$block = $overlay.find('.lightbox-block');

		//title
		makeTitle($overlay, $el);

		//events
		$overlay.find('.close').on('click', hideSplash); //close
		$overlay.find('.prev').on('click', prevClick);
		$overlay.find('.next').on('click', nextClick);
		$overlay.find('.buffer img').on('load', bufferLoad); //load image in buffer
		$(window).bind('keydown', windowKeydown); //hot keys

		//image block
		BlockEl($block, $el);

		//showing
		$overlay.appendTo('body').css({'display': 'block', 'opacity': 0}).animate({'opacity': 1}, 200);
	};

	function makeTitle($overlay, $el) {
		if ($el == undefined)
			$el = $overlay.find('.lightbox-block').data('el');

		var $links = $el.closest('.lightbox').find('a:has(img)'),
			current = $links.index($el) + 1,
			total = $links.length;

		if (total > 1)
			$overlay.find('.lightbox-header').html('<span>' + current + '</span>/' + total);

		//buttons
		var $prev = $overlay.find('.prev'),
			$next = $overlay.find('.next');
		if (current > 1) {
			$prev.removeClass('disabled');
		} else {
			$prev.addClass('disabled');
		};
		if (current < total) {
			$next.removeClass('disabled');
		} else {
			$next.addClass('disabled');
		};
	};

	function BlockEl($block, $el) {
		$block.data('el', $el);
		$block.find('.loading').css('display', 'block').animate({'opacity': 1}, 200);
		$block.find('.buffer img').attr('src', '').attr('src', $el.attr('href'));
	};

	function hideSplash() {
		$(window).unbind('keydown', windowKeydown);
		var $overlay = $('.lightbox-overlay');
		$overlay.animate({'opacity': 0}, 200, function() {
			$overlay.remove();
		});
	};

	function lightboxClick(event) {
		if (event.target == this)
			hideSplash();
	};

	function windowKeydown(event) {
		var $overlay = $('.lightbox-overlay');

		if (event.keyCode == 27)
			hideSplash();

		if (event.which == 37)
			prevClick();

		if (event.which == 39)
			nextClick();
	};

	function bufferLoad() {
		var $buffer = $(this),
			$block = $buffer.closest('.lightbox-block'),
			$preview = $block.find('.preview'),
			$overlay = $block.closest('.lightbox-overlay'),
			$controls = $block.find('.prev, .next, .close');

		//size and aspect ratio
		var w = $buffer.width() + 2, h = $buffer.height() + 2, a = w/h,
			sw = $overlay.width(), sh = $overlay.height(), sa = sw/sh;

		//image size correction
		if ((a > sa) && (w > sw)) {
			w = sw;
			h = w / a;
		} else if ((a <= sa) && (h > sh)) {
			h = sh;
			w = h * a;
		};

		//title
		makeTitle($overlay);

		//image switch
		$controls.addClass('hidden');
		$preview.animate({'opacity': 0}, 200, function() {

			//loading remove
			$block.find('.loading').animate({'opacity': 0}, 200, function() {$(this).css('display', 'none');});
			//new image
			$preview.attr('src', $buffer.attr('src'));
			$preview.animate({'height': h - 2, 'width': w - 2}, 200);
			$block.animate({
				'height': h,
				'margin-left': -w / 2,
				'margin-top': -h / 2,
				'width': w
			}, 200, function() {
				//showing
				$preview.animate({'opacity': 1}, 200);
				$controls.removeClass('hidden');
			});

		});
	};

	function prevClick() {
		var $overlay = $('.lightbox-overlay');
		if ($overlay.find('.prev').is('.disabled'))
			return false;

		if ($overlay.find('.loading').is(':visible'))
			return false;

		var $block = $overlay.find('.lightbox-block'),
			$el = $block.data('el'),
			$links = $el.closest('.lightbox').find('a:has(img)'),
			idx = $links.index($el) - 1;

		if (idx >= 0)
			BlockEl($block, $links.eq(idx));
	};

	function nextClick() {
		var $overlay = $('.lightbox-overlay');
		if ($overlay.find('.next').is('.disabled'))
			return false;

		if ($overlay.find('.loading').is(':visible'))
			return false;

		var $block = $overlay.find('.lightbox-block'),
			$el = $block.data('el'),
			$links = $el.closest('.lightbox').find('a:has(img)'),
			idx = $links.index($el) + 1;

		if (idx < $links.length)
			BlockEl($block, $links.eq(idx));
	};

	function linkClick(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.data('touch')) {
			var $lightbox = $this.closest('.lightbox'),
				$form = $('<form method="post"></form>').attr('action', $lightbox.data('url'));
			$lightbox.find('a:has(img)').each(function() {
				$('<input type="hidden" name="src[]" />').val(this.href).appendTo($form);
			});
			$('<input type="hidden" name="touch">').val(this.href).appendTo($form);
			$form.appendTo('body').submit();
		} else {
			showSplash($this);
		};
	};

	//background event
	$(document).on('click', '.lightbox-overlay', lightboxClick);
	//link events
	$(document).on('touchstart', '.lightbox a:has(img)', function() {$(this).data('touch', true);});
	$(document).on('click', '.lightbox a:has(img)', linkClick);

});
