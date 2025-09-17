<?php 

if(!class_exists('Edusiteco_Menu_Walker')) {
    class Edusiteco_Menu_Walker extends Walker_Nav_Menu 
    {
        /**
         * Agrega las etiquetas de inicio de elemento de menú <ul>
         * 
         * @param string $output
         * @param WP_Post $data_object
         * @param int $depth
         * @param array $args
         * @param int $current_object_id
         * @return void
         */
        public function start_el(&$output, $data_object, $depth = 0, $args = null, $current_object_id = 0) {
            $menu_class = explode(" ", $args['menu_class'] ?? "");
            $menu_class[] = !in_array('edusiteco-main-menu', $menu_class) ? "edusiteco-main-menu" : "";
            $menu_class  .= implode(" ", $menu_class);

            $container = $args['container'] ?? 'div';
            $container_class   = explode(" ", $args['container_class'] ?? "");
            $container_class[] = !in_array('edusiteco-main-menu-container', $container_class) ? "edusiteco-main-menu-container" : "";
            $container_class  .= implode(" ", $container_class);
            $container_id     = $args['container_id'] ?? 'edusiteco-main-menu-container';
            $container_aria_label = $args['container_aria_label'] ?? 'Menú de navegación';
            
            
            $menu_class = $args['menu_class'] ?? "navbar-nav";

            $output .= <<<OUT
                <{$container} class="{$container_class}" id="{$container_id}" aria-label="{$container_aria_label}" role="navigation">
                        <div class="container-fluid">
                            <a class=""></a>
                            <ul class="{$menu_class}">
            OUT;
        }

        public function end_el(&$output, $data_object, $depth = 0, $args = null): void 
        {
            $container = $args['container'] ?? 'nav';

            $output .= <<<OUT
                        </ul>
                        <di>
                            <input type="text" placeholder="Buscar..." />
                        </di>
                    </{$container}>
                OUT;
        }

        public function start_lvl( &$output, $depth = 0, $args = null ) : void
        {
            $classes = array('sub-menu');
            $classes  = implode(' ', apply_filters('nav_menu_submenu_css_class', $classes, $args, $depth));

            $attributes   = array();
            $attributes[] = apply_filters('nav_menu_submenu_attributes', '', $args, $depth);
            $attributes   = $this->build_atts($attributes);

            $output .= <<<EOT
                    <li {$attributes}>
                EOT;
        } 

        public function end_lvl( &$output, $depth = 0, $args = null ) : void
        {

            $output .= "</li>";
        }
        
    }
}