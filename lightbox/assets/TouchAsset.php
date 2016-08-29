<?php

namespace dkhlystov\lightbox\assets;

use yii\web\AssetBundle;

class TouchAsset extends AssetBundle {

	public $sourcePath = __DIR__ . '/touch';

	public $css = [
		'lightbox-touch.css',
	];

	public $js = [
		'lightbox-touch' . (YII_DEBUG ? '' : '.min') . '.js',
	];

	public $depends = [
		'yii\web\JqueryAsset',
	];

}
