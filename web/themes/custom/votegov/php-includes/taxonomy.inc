use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;

/**
 * Implements hook_taxonomy_term_view_alter().
 */
function votegov_taxonomy_term_view_alter(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display) {
  //disable cache
  $build['#cache']['max-age'] = 0;
  \Drupal::service('page_cache_kill_switch')->trigger();
}
