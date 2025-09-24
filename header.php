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
        
    <header class="edusiteco-header-container">
        <?php get_template_part("components/gov", 'header') ?>

        <div class="edusiteco-menu-main">
            <a class="edusiteco-menu-main__logo" href="/"></a>
            

            <?php
                wp_nav_menu([
                    'theme_location'  => 'edu-site-menu',
                    'menu_class'      => 'edusiteco-menu',
                    'menu_id'         => 'edusiteco-menu',
                    'container'       => 'nav',
                    'container_class' => 'edusiteco-menu-main__container',
                    'container_id'    => 'edusiteco-menu-main__container',
                ])
            ?>
            
            <?php get_search_form(); ?>

            <button class="edusiteco-menu-main__btn-menu" id="edusiteco-menu-main__btn-menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
            </button>
        </div>
    </header>