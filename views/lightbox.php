<?php

use dkhlystov\lightbox\TouchAsset;
use yii\helpers\Html;

//стили
TouchAsset::register($this);

?>
<div class="header"><span><?= $touch+1 ?></span>/<?= sizeof($src) ?></div>
<?= Html::beginTag('div', ['class'=>'container', 'data-touch'=>$touch]) ?><?php foreach ($src as $s) { ?>
<?= Html::beginTag('div', ['class'=>'block', 'data-src'=>$s]) ?><div class="loading"></div><div class="buffer"><img></div><img class="preview"><?= Html::endTag('div'); ?>
<?php } ?><?= Html::endTag('div'); ?>
