<?php

namespace dkhlystov\lightbox;

use yii\base\Widget;
use yii\helpers\Html;
use yii\helpers\Url;
use dkhlystov\lightbox\Asset;

class Lightbox extends Widget {

	//контент для виджета
	public $content;

	//параметры контейнера
	public $options = [];

	public function init() {
		parent::init();

		//активы
		Asset::register($this->view);

		//класс
		Html::addCssClass($this->options, 'lightbox');

		//открываем
		$this->options['data-url'] = Url::toRoute(['lightbox']);
		echo Html::beginTag('div', $this->options);
	}

	public function run() {
		//контент
		if ($this->content !== null) echo $this->content;

		//закрываем
		echo Html::endTag('div');
	}

}
