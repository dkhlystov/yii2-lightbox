<?php

namespace dkhlystov\widgets\assets;

use yii\web\AssetBundle;

class LightboxAsset extends AssetBundle {

	public $sourcePath = __DIR__ . '/lightbox';

	public $css = [
		'lightbox.css',
	];

	public $js = [
		'lightbox.js',
	];

	public $depends = [
		'yii\web\JqueryAsset',
	];

}
