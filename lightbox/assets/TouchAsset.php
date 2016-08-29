<?php

namespace dkhlystov\lightbox\assets;

use yii\web\AssetBundle;

class TouchAsset extends AssetBundle {

	public $sourcePath = __DIR__ . '/touch';

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
