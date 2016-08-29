<?php $this->beginPage(); ?>
<!DOCTYPE html>
<html xml:lang="<?= Yii::$app->language ?>" lang="<?= Yii::$app->language ?>" dir="ltr">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<?php $this->head(); ?>
	</head>
	<body><?php $this->beginBody(); ?>
		<div class="wrapper"><?= $content ?></div>
	<?php $this->endBody(); ?></body>
</html>
<?php $this->endPage(); ?>
