<?php

namespace Drupal\vote_nvrf\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * An NVRF page controller.
 */
class NvrfPageController extends ControllerBase {

  /**
   * Returns a renderable array for the nvrf app.
   */
  public function content(string $state_name) {
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $enabled_languages = ['en'];

    // Return a 404 response if language is disabled.
    if (!in_array($language, $enabled_languages)) {
      throw new NotFoundHttpException();
    }

    // Transform the state name string for comparison.
    $title = str_replace('-', ' ', $state_name);
    // Query the nodes to find a match.
    $node_storage = \Drupal::entityTypeManager()->getStorage('node');
    $node = $node_storage->loadByProperties([
      'type' => 'state_territory',
      'status' => 1,
      'field_accepts_nvrf' => TRUE,
      'title' => $title
    ]);

    if (empty($node)) {
      // Return a 404 response if no matches are found.
      throw new NotFoundHttpException();
    }
    else {
      // Get the state abbreviation.
      $node = reset($node);
      $abbrev = $node->get('field_state_abbreviation')->value;

      // Render the app in a custom page if a match was found.
      $build = [
        '#type' => 'inline_template',
        '#template' => '<div id="root" data-stateId="{{ abbrev }}" class="nvrf-app-container vote-block-margin-y"></div>',
        '#context' => [
          'abbrev' => $abbrev,
        ],
        '#attached' => [
          'library' => [
            'vote_nvrf/nvrf_assets',
          ],
        ],
      ];
    }

    return $build;
  }

}
