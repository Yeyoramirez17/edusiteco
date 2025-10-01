<?php
function edusiteco_enqueue_styles_scripts(): void {
    # CSS Normalize
    wp_enqueue_style(
        'edusiteco_enqueue_css_normalize', 
        get_theme_file_uri('/assets/css/normalize.css'), 
        array(), 
        wp_get_theme()->get('Version')
    );
    # Tailwind CSS
    wp_enqueue_script(
        'edusiteco_enqueue_tailwindcss', 
        "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
        array(),
        '4.0.0',
        false
    );
    # CSS
    wp_enqueue_style(
        'edusiteco_enqueue_css_style', 
        get_theme_file_uri('/assets/css/style.css'),
        array('edusiteco_enqueue_css_normalize'),
        wp_get_theme()->get('Version')
    );
    # JS
    wp_enqueue_script(
        'edusiteco_enqueue_js_script', 
        get_theme_file_uri('/assets/js/scripts.js'), 
        array('jquery'), '1.0', 
        true
    );
    
}
add_action('wp_enqueue_scripts', 'edusiteco_enqueue_styles_scripts');

function edusiteco_theme_setup(): void {
    load_theme_textdomain('edusiteco', get_template_directory() . '/languages');; # Soporte para idioma
    add_theme_support('title-tag');         # Soporte automático para <title>
    add_theme_support('post-thumbnails');   # Imágenes destacadas
    add_theme_support('menus');
    add_theme_support("editor-styles");     # Estilos del editor
    add_theme_support('responsive-embeds'); # Embeds responsivos
    register_nav_menus(array(             # Registrar menús
        'primary' => __('Menú Principal',      'edusiteco'),
        'footer'  => __('Menú Footer',         'edusiteco'),
        'social'  => __('Menú Redes Sociales', 'edusiteco')
    ));
}
add_action('after_setup_theme', 'edusiteco_theme_setup');

# Estilos del Editor
function edusiteco_add_editor_styles(){
    add_editor_style(array(
        'assets/css/normalize.css',
        'assets/css/style.css',
        'assets/css/editor-styles.css',
    ));
}
add_action('after_setup_theme', 'edusiteco_add_editor_styles');

# Custom CSS Blocks
function edusiteco_custom_blocks_core_css(): void {
    wp_enqueue_block_style(
        'core/search',
        array(
            'handle' => 'core-search-custom',
            'src'    => get_theme_file_uri( 'assets/css/blocks/search.css' ),
            'path'   => get_theme_file_path('assets/css/blocks/search.css'),
        )
    );
}
add_action( 'after_setup_theme', "edusiteco_custom_blocks_core_css");

add_filter('render_block_core/site-logo', function($block_content, $block) {
    if (empty($block_content)) {
        $default_logo = get_theme_file_uri('/assets/images/logoipsum.png');
        $blog_name = get_bloginfo('name');
        
        $block_content = sprintf(
            '
            <a href="%s" class="wp-block-site-logo__default" aria-label="%s">
                <img src="%s" alt="%s" width="200" height="60">
            </a>',
            esc_url(home_url('/')),
            esc_attr($blog_name),
            esc_url($default_logo),
            esc_attr($blog_name)
        );
    }
    return $block_content;
}, 10, 2);


/**
 * Registrar estilos de carrusel para galerías
 */
function edusiteco_register_gallery_carousel_styles() {
    register_block_style('core/gallery', [
        'name' => 'carousel',
        'label' => __('Carrusel Deslizante', 'edusiteco')
    ]);
    
    register_block_style('core/gallery', [
        'name' => 'carousel-with-controls',
        'label' => __('Carrusel con Controles', 'edusiteco')
    ]);
}
add_action('init', 'edusiteco_register_gallery_carousel_styles');

/**
 * Enqueue scripts para carruseles
 */
function edusiteco_enqueue_carousel_scripts() {
    wp_enqueue_script(
        'edusiteco-gallery-carousel',
        get_theme_file_uri('/assets/js/blocks/gallery-carousel.js'),
        array(),
        wp_get_theme()->get('Version'),
        true
    );
}
add_action('wp_enqueue_scripts', 'edusiteco_enqueue_carousel_scripts');

/**
 * Agregar controles a galerías con estilo carrusel
 */
function edusiteco_add_carousel_controls($block_content, $block) {
    if ($block['blockName'] === 'core/gallery') {
        $styles = $block['attrs']['className'] ?? '';
        
        // Si es carrusel con controles, agregar HTML de controles
        if (strpos($styles, 'is-style-carousel-with-controls') !== false) {
            $controls_html = '
                <div class="carousel-controls">
                    <button class="carousel-prev" aria-label="Imagen anterior">‹</button>
                    <button class="carousel-next" aria-label="Imagen siguiente">›</button>
                </div>
                <div class="carousel-indicators"></div>
            ';
            
            $block_content = $block_content . $controls_html;
        }
    }
    return $block_content;
}
add_filter('render_block', 'edusiteco_add_carousel_controls', 10, 2);