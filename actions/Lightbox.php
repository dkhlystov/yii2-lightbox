<?php

namespace dkhlystov\lightbox\actions;

use yii\base\Action;

class Lightbox extends Action {

	public function run() {
		//читаем изображения
		$src = isset($_POST['src']) && is_array($_POST['src']) ? $_POST['src'] : [];
		//определяем индекс нажатого
		$touch = isset($_POST['touch']) ? array_search($_POST['touch'], $src) : 0;

		$controller = $this->controller;
		$controller->layout = '@dkhlystov/lightbox/views/layout';
		return $controller->render('@dkhlystov/lightbox/views/lightbox', [
			'src'=>$src,
			'touch'=>$touch,
		]);
	}

}
