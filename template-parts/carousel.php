<?php
$args = array(
    'post_type' => 'post',
    'posts_per_page' => 3,
    'orderby' => 'date',
    'order' => 'DESC',
    'post_status' => 'publish',
);

$quey = new WP_Query($args);
?>
<!-- Carrusel -->
<div id="ita-carousel-gov-co" class="carousel slide multiple-carrusel-govco carousel-fade carrusel-govco m-4"
    data-bs-ride="carousel">
    <div class="carousel-inner">
        <?php if ($quey->have_posts()): ?>
            <?php
                $active = true;
                while ($quey->have_posts()): $quey->the_post();
            ?>

                <div class="carousel-item multiple-carrusel-govco <?php if ($active) { echo 'active'; } ?>" data-bs-interval="2000">
                    <div class="carousel-caption">
                        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"
                            tabindex="<?php echo ($active) ? '0' : '-1'; ?>">
                            <p><?php the_title() ?></p>
                        </a>
                    </div>
                    <a 
                        href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"
                        tabindex="<?php echo ($active) ? '0' : '-1'; ?>"
                    >
                        <?php
                            $src = get_theme_file_uri('assets/images/fondo-gris-carrusel-multiple.jpg');
                            if (has_post_thumbnail()) {
                                $src = get_the_post_thumbnail_url(get_the_ID(), 'full');
                            }
                        ?>
                        <img 
                            src="<?= $src ?>"
                            alt="<?= the_title_attribute(); ?>"
                        >
                    </a>
                </div>
            <?php
                $active = false;
                endwhile;
            ?>
        <?php else: ?>
            <div class="carousel-item multiple-carrusel-govco active" data-bs-interval="2000">
                <div class="carousel-caption">
                    <a href="" title="..." tabindex="0">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                    </a>
                </div>
                <a href="/home" title="..." tabindex="0">
                    <img src="<?php echo get_theme_file_uri('assets/images/fondo-gris-carrusel-multiple.jpg') ?>" alt="...">
                </a>
            </div>
            <div class="carousel-item multiple-carrusel-govco" data-bs-interval="2000">
                <div class="carousel-caption">
                    <a href="" title="..." tabindex="-1">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                    </a>
                </div>
                <a href="" title="..." tabindex="-1">
                    <img src="<?php echo get_theme_file_uri('assets/images/fondo-gris-carrusel-multiple.jpg') ?>" alt="...">
                </a>
            </div>
            <div class="carousel-item multiple-carrusel-govco" data-bs-interval="2000">
                <div class="carousel-caption">
                    <a href="" title="..." tabindex="-1">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                    </a>
                </div>
                <a href="" title="..." tabindex="-1">
                    <img src="<?php echo get_theme_file_uri('assets/images/fondo-gris-carrusel-multiple.jpg') ?>" alt="...">
                </a>
            </div>
            <div class="carousel-item multiple-carrusel-govco" data-bs-interval="2000">
                <div class="carousel-caption">
                    <a href="" title="..." tabindex="-1">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                    </a>
                </div>
                <a href="" title="..." tabindex="-1">
                    <img src="<?php echo get_theme_file_uri('assets/images/fondo-gris-carrusel-multiple.jpg') ?>" alt="...">
                </a>
            </div>
        <?php endif; ?>
    </div>
    <button class="carousel-control-next" type="button" data-bs-target="#ita-carousel-gov-co" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Próxima imagen</span>
    </button>
    <button class="carousel-control-prev" type="button" data-bs-target="#ita-carousel-gov-co" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior imagén</span>
    </button>
    <div class="control-start-pause">
        <button class="controls start" type="button">
            <span>Reproducir</span>
        </button>
        <button class="controls pause active" type="button">
            <span>Pausar</span>
        </button>
    </div>
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#ita-carousel-gov-co" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#ita-carousel-gov-co" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#ita-carousel-gov-co" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#ita-carousel-gov-co" data-bs-slide-to="3" aria-label="Slide 4"></button>
    </div>
</div>
<!-- End Carrusel -->