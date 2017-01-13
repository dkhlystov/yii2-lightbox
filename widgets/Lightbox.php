<?php

namespace dkhlystov\widgets;

use Yii;
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
		$this->options['data-url'] = Url::toRoute([$this->getTouchRoute()]);
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

	/**
	 * Get url for mobile devices
	 * @return string
	 */
	private function getTouchRoute()
	{
		$result = '';

		foreach (Yii::$app->getModules(false) as $name => $module) {
			if (is_string($module)) {
				$className = $module;
			} elseif (is_array($module)) {
				$className = $module['class'];
			} else {
				$className = $module::className();
			}

			if ($className == 'dkhlystov\lightbox\Module') {
				$result = '/' . $name . '/touch/image';
				break;
			}
		}

		if (empty($result))
			throw new \Exception('Module "Lightbox" not found.');

		return $result;
	}

}
