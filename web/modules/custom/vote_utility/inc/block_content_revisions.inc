<?php

/**
 * @file
 * Defines custom block_content revisions behavior.
 */

use Drupal\Core\Entity\EntityInterface;

/**
 * Implements hook_ENTITY_TYPE_update().
 */
function vote_utility_block_content_update(EntityInterface $entity) {

  $query = \Drupal::database()->query('
    SELECT revision_id from block_content_revision
    WHERE id = :entity_id
	ORDER BY revision_created DESC
	LIMIT 10, 18446744073709551615', [
   ':entity_id' => $entity->id(),
 ]);
  foreach ($query->fetchAllAssoc('revision_id') as $version) {
    \Drupal::entityTypeManager()->getStorage('block_content')->deleteRevision($version->revision_id);
  }
}
