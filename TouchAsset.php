<?php

namespace dkhlystov\lightbox;

use yii\web\AssetBundle;

class TouchAsset extends AssetBundle {

	public $sourcePath = '@dkhlystov/lightbox/assets';

	public $css = [
		'lightbox-touch.css',
	];

	public $js = [
		'lightbox-touch.js',
	];

	public $depends = [
		'yii\web\JqueryAsset',
	];

}
