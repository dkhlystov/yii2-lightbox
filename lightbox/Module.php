<?php

namespace dkhlystov\lightbox;

use Yii;

/**
 * Lightbox module
 */
class Module extends \yii\base\Module
{

	/**
	 * @inheritdoc
	 */
	public function init()
	{
		parent::init();

		static::addTranslation();
	}

	/**
	 * Adding translation to i18n
	 * @return void
	 */
	public static function addTranslation()
	{
		if (!isset(Yii::$app->i18n->translations['lightbox'])) {
			Yii::$app->i18n->translations['lightbox'] = [
				'class' => 'yii\i18n\PhpMessageSource',
				'sourceLanguage' => 'en-US',
				'basePath' => __DIR__ . '/messages',
			];
		}
	}

}
