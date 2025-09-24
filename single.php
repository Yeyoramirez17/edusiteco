<?php get_header(); ?>

<main class="edusiteco-main container">
  <article class="ita_single__article-container">
    <div class="ita_single__post-header">
      <?php if (has_post_thumbnail()): ?>
        <?php the_post_thumbnail(); ?>
      <?php endif; ?>
      <h2><?php single_post_title(); ?></h2>
      <p>By: <?php the_author(); ?> on <?php the_time('F j, Y'); ?></p>
    </div>
    <?php the_content(); ?>
  </article>
  <section class="ita_single__post">
    <?php get_sidebar() ?>
  </section>
</main>

<?php get_footer(); ?>