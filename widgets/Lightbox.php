<?php

namespace dkhlystov\widgets;

use yii\base\Widget;
use yii\helpers\Html;
use yii\helpers\Url;

use dkhlystov\widgets\assets\LightboxAsset;

/**
 * Lightbox widget
 */
class Lightbox extends Widget {

	/**
	 * @var string Widget content
	 */
	public $content;

	/**
	 * @var array Widget container options
	 */
	public $options = [];

	/**
	 * @inheritdoc
	 */
	public function init() {
		parent::init();

		//assets
		LightboxAsset::register($this->view);

		//css class
		Html::addCssClass($this->options, 'lightbox');

		//open tag
		$this->options['data-url'] = Url::toRoute(['lightbox']);
		echo Html::beginTag('div', $this->options);
	}

	/**
	 * @inheritdoc
	 */
	public function run() {
		//content
		if ($this->content !== null) echo $this->content;

		//close tag
		echo Html::endTag('div');
	}

}
