<?php

namespace dkhlystov\lightbox;

use yii\web\AssetBundle;

class Asset extends AssetBundle {

	public $sourcePath = '@dkhlystov/lightbox/assets';

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
