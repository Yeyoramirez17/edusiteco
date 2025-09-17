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


    <header class="edusiteco-header-container">
        <?php get_template_part("components/gov", 'header') ?>

        <div class="edusiteco-menu-main">
            <a class="edusiteco-menu-main__logo" href="/"></a>
            <div class="edusiteco-menu-main__menu">
                <?php
                    wp_nav_menu([
                        'theme_location'  => 'edu-site-menu',
                        'menu_class'      => 'edusiteco-menu',
                        'menu_id'         => 'edusiteco-menu',
                        'container'       => 'nav',
                        'container_class' => 'edusiteco-menu-container',
                        'container_id'    => 'edusiteco-menu-container',
                    ])
                ?>
                <div class="edusiteco-menu-main__search">
                    <?php get_search_form(); ?>
                </div>
            </div>

        </div>
    </header>