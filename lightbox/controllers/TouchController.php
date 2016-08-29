<?php

namespace dkhlystov\lightbox\controllers;

use Yii;
use yii\web\Controller;

/**
 * Lightbox for mobile.
 */
class TouchController extends Controller
{

	/**
	 * @var boolean Disable csrf validation.
	 */
	public $enableCsrfValidation = false;

	/**
	 * @var string Use custom layout.
	 */
	public $layout = '@dkhlystov/lightbox/views/layout';

	/**
	 * Render lightbox for mobile
	 * @return void
	 */
	public function actionImage()
	{
		$request = Yii::$app->getRequest();

		//read images
		$src = $request->post('src', []);

		//ckicked index
		$touch = array_search($request->post('touch'), $src);

		return $this->render('@dkhlystov/lightbox/views/lightbox', [
			'src' => $src,
			'touch' => (integer) $touch,
		]);
	}

}
