<!DOCTYPE html>
<html lang="<?php language_attributes(); ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right');
    bloginfo('name'); ?></title>
    <?php wp_head() ?>
</head>
<body class="<?php body_class(); ?>">
    <div class="edusiteco-main">
        <?php block_template_part("header") ?>
        