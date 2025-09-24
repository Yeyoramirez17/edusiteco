<?php
function ita_enqueue_styles_scripts(): void {
    # CSS Normalize
    wp_enqueue_style('ita_enqueue_css_normalize', get_theme_file_uri() . '/assets/css/normalize.css');
    # Tailwind CSS
    # CSS
    wp_enqueue_style('edusiteco_enqueue_css_style', get_theme_file_uri() . '/assets/css/style.css');
    # JS
    wp_enqueue_script('edusiteco_enqueue_js_script', get_theme_file_uri() . '/assets/js/scripts.js', array('jquery'), '1.0', true);
    
}
add_action('wp_enqueue_scripts', 'ita_enqueue_styles_scripts');

function edusiteco_theme_setup(): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
    add_theme_support("editor-styles");
}
add_action('after_setup_theme', 'edusiteco_theme_setup');

function edusiteco_add_editor_styles(): void {
    add_editor_style([
        'assets/css/editor-styles.css',
    ]);
}
add_action('after_setup_theme', 'edusiteco_add_editor_styles');
