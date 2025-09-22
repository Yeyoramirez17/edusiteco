<?php
function ita_enqueue_styles_scripts(): void {
    # CSS Normalize
    wp_enqueue_style('ita_enqueue_css_normalize', get_theme_file_uri() . '/assets/css/normalize.css');
    # Bootstrap
    wp_enqueue_style('ita_enqueue_css_bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
    wp_enqueue_script('ita_equeue_js_bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', array(), '5.0.2', true);
    # CSS
    wp_enqueue_style('edusiteco_enqueue_css_style', get_theme_file_uri() . '/assets/css/style.css');
    wp_enqueue_style('edusiteco_enqueue_css_edusiteco', get_theme_file_uri() . '/assets/css/edusiteco.css');
    wp_register_style('gov_enqueue_css_carrusel', get_theme_file_uri() . '/assets/css/carousel.css');
    wp_register_script('gov_enqueue_js_carrusel', get_theme_file_uri() . '/assets/js/carousel.js', array('jquery'), '1.0', true);
    if(is_page('home') || is_front_page()) {
        wp_enqueue_style('gov_enqueue_css_carrusel');
        wp_enqueue_script('gov_enqueue_js_carrusel');
    }
    # JS
    wp_enqueue_script('edusiteco_enqueue_js_script', get_theme_file_uri() . '/assets/js/scripts.js', array('jquery'), '1.0', true);
    wp_enqueue_script('edusiteco_enqueue_js_edusiteco', get_theme_file_uri() . '/assets/js/edusiteco.js', array(), '1.0', true);
    
}
add_action('wp_enqueue_scripts', 'ita_enqueue_styles_scripts');


function ita_add_menus(): void {
    register_nav_menus([
        'edu-site-menu' => __('EduSite Menu', 'edusiteco')
    ]);
}
add_action('init', 'ita_add_menus');

function edusiteco_add_editor_styles(): void {
    add_editor_style(get_theme_file_uri() . '/assets/css/editor-styles.css');
}
add_action('after_setup_theme', 'edusiteco_add_editor_styles');

function edusiteco_theme_setup(): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
}
add_action('after_setup_theme', 'edusiteco_theme_setup');

// Crear páginas automáticamente
// function edusiteco_create_default_pages() {
//     // Verificar si la página 'Directorio' ya existe
//     $directorio_page = get_page_by_path('directorio');
    
//     if (!$directorio_page) {
//         // Crear la página Directorio
//         wp_insert_post([
//             'post_title' => 'Directorio',
//             'post_content' => 'Esta es la página de directorio.',
//             'post_status' => 'publish',
//             'post_type' => 'page',
//             'post_name' => 'directorio',
//             'page_template' => 'page-directory.php'
//         ]);
//     }
    
//     // Verificar si la página 'Visión' ya existe
//     $vision_page = get_page_by_path('vision');
    
//     if (!$vision_page) {
//         // Crear la página Visión
//         wp_insert_post([
//             'post_title' => 'Misión, visión y valores',
//             'post_content' => 'Esta es la página de misión, visión y valores.',
//             'post_status' => 'publish',
//             'post_type' => 'page',
//             'post_name' => 'vision',
//             'page_template' => 'page-vision.php'
//         ]);
//     }
// }
# add_action('after_setup_theme', 'edusiteco_create_default_pages');
