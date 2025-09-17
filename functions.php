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
    wp_enqueue_script('ita_enqueue_js_main', get_theme_file_uri() . '/assets/js/scripts.js', array('jquery'), '1.0', true);
    
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


function edu_site_register_pages(): void {
    // Registrar la página "Directorio" si no existe
    $page_title = 'Contacto';
    $page_slug = 'contacto';
    $page_content = <<<'HTML'

            <img src="https://via.placeholder.com/150" alt="Directorio Placeholder">

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ipsum numquam similique rem nobis facere a mollitia delectus hic libero. Maiores nostrum, dolorem obcaecati iste voluptatibus asperiores velit ab aut!
                Quis, alias cum. Sapiente sit eaque, odio beatae mollitia dicta reiciendis nemo consequuntur quos. Laboriosam alias, totam accusamus nulla sequi repellat blanditiis id inventore laborum fugiat quis laudantium velit illo?
                Iste aut consectetur quae quos id, voluptatibus atque qui voluptatum doloribus dignissimos. Pariatur illum vitae deserunt quam architecto non eum et ullam aliquam, eaque esse delectus amet ea ab! Unde?
                Quo odit amet, molestias vel similique facere consequuntur porro soluta quis maxime accusamus, quos deleniti fugit tempore ipsum voluptatem nobis quae consectetur illo temporibus velit adipisci animi sequi! Vero, placeat!
                Laudantium repudiandae hic quisquam. Saepe suscipit iste distinctio aliquid quidem vel magni ea quasi quas. Voluptatibus esse, dolore dolorum natus harum nostrum nemo vitae obcaecati possimus deleniti odit veniam quidem?
            </p>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, mollitia corrupti. Deleniti placeat aliquam quos quasi ducimus accusamus! Voluptatum nihil labore modi quas inventore, deserunt incidunt perspiciatis doloremque aut dolor.
                Earum exercitationem sunt necessitatibus iusto accusamus ullam architecto quae modi doloribus. Facere odio saepe nostrum. Nemo placeat, tempore laudantium quis quas, maxime impedit dolor sunt, accusamus ab veritatis officia cum?
                Dignissimos eaque debitis natus harum assumenda voluptatum voluptas necessitatibus eveniet sapiente aliquid deserunt minima recusandae temporibus neque quo magni accusamus, corrupti esse quam alias mollitia distinctio reprehenderit, ipsa voluptatem! Voluptatibus.
                Nulla aliquam at nostrum, necessitatibus non ipsam vitae dolores quis dignissimos id laudantium numquam rerum possimus quo ex sed alias deserunt itaque voluptatibus excepturi ipsa eaque iure impedit. Enim, est!
                Aspernatur totam a eius, quos excepturi similique, ea obcaecati voluptas odio ullam impedit alias! Recusandae nostrum incidunt qui. Corporis, libero. Blanditiis nostrum facere perspiciatis dicta modi voluptatum dolorum debitis dignissimos!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, aperiam, repellat mollitia ea ducimus, minima inventore ipsa error deleniti accusantium recusandae. Qui nisi vero alias illum numquam quae explicabo cum.
                Eos quidem temporibus, unde id quasi non tempora natus veritatis doloremque! Eveniet libero animi quos quisquam molestiae maxime natus vero perspiciatis nostrum, cupiditate debitis voluptas earum expedita, dignissimos reprehenderit sequi?
                Vitae fugit quis beatae. Eveniet non iure obcaecati nobis sint odio repellat excepturi, inventore magni ducimus laudantium aspernatur nemo voluptas maxime ullam blanditiis tempora quo nulla ab distinctio suscipit incidunt!
                Unde repudiandae facilis architecto incidunt pariatur ad laborum rerum animi placeat, quos ab sint necessitatibus dicta temporibus nemo, corporis tempore dolorum odit voluptatum! Neque voluptas blanditiis, sequi dolore perferendis earum!
                Excepturi ad sed doloremque sunt vero ducimus optio corporis beatae expedita, illum asperiores rerum voluptatum quis aliquam esse inventore laudantium nobis ipsa ut voluptates enim corrupti eos quos. Quaerat, eum.
            </p>
        HTML;

    $page_check = get_page_by_path($page_slug, OBJECT, 'page');

    if (!isset($page_check->ID)) {
        $new_page_id = wp_insert_post(array(
            'post_type' => 'page',
            'post_title' => $page_title,
            'post_content' => $page_content,
            'post_status' => 'publish',
            'post_author' => 1,
        ));
        if (!is_wp_error($new_page_id)) {
            update_post_meta($new_page_id, '_wp_page_template', 'page-directory.php');
        }
    }
}
add_action('after_setup_theme', 'edu_site_register_pages');
