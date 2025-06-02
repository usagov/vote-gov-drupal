<?php

namespace Drupal\vote_nvrf\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;
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
    $enabled_languages = ['en', 'es'];

    // Return a 404 response if language is disabled.
    if (!in_array($language, $enabled_languages)) {
      throw new NotFoundHttpException();
    }

    // Transform the state name string for comparison.
    $title = str_replace('-', ' ', $state_name);
    $title = preg_replace('/^us /', 'u.s. ', $title);
    // Query the nodes to find a match.
    $node_storage = \Drupal::entityTypeManager()->getStorage('node');
    $node = $node_storage->loadByProperties([
      'type' => 'state_territory',
      'status' => 1,
      'title' => $title,
    ]);

    if (empty($node)) {
      // Return a 404 response if no matches are found.
      throw new NotFoundHttpException();
    }
    else {
      // Get the state abbreviation.
      $node = reset($node);
      $abbrev = $node->get('field_state_abbreviation')->value;
      $return_path = $node->getTranslation($language)->toUrl()->toString();

      if ($node->get('field_accepts_nvrf')->value) {
        // Render the app in a custom page if a match was found.
        $build = [
          '#type' => 'inline_template',
          '#template' => '<div id="root" data-returnPath="{{ return_path }}" data-stateId="{{ abbrev }}" class="nvrf-app-container vote-block-margin-y--narrow">
            <img src="/themes/custom/votegov/dist/assets/img/loader.svg" width="80px" width="80px" class="display-block margin-x-auto" />
            </div>',
          '#context' => [
            'abbrev' => $abbrev,
            'return_path' => $return_path,
          ],
          '#attached' => [
            'library' => [
              'vote_nvrf/nvrf_assets',
            ],
          ],
        ];
      }
      else {
        // Redirect to the state page if the NVRF app isn't accepted.
        $build = new RedirectResponse($return_path);
      }
    }

    return $build;
  }

  /**
   * NVRF Page Controller which outputs disabled nvrf app state links.
   */
  public function disabledStateFormsContent() {
    // Get the current language.
    $current_language = \Drupal::languageManager()->getCurrentLanguage()->getId();

    // Get the default language.
    $default_language = \Drupal::languageManager()->getDefaultLanguage()->getId();

    // Check if the current language is not the default.
    if ($current_language !== $default_language) {
      // Return a 404 response if no matches are found.
      throw new NotFoundHttpException();
    }

    $node_storage = \Drupal::entityTypeManager()->getStorage('node');
    $nodes = $node_storage->loadByProperties([
      'type' => 'state_territory',
      'status' => 1,
      'field_accepts_nvrf' => FALSE,
    ]);

    $output = '<ul>';

    foreach ($nodes as $node) {
      $languages = [
        'en' => 'vote_nvrf.nvrf_page',
        'es' => 'vote_nvrf.nvrf_page_es',
      ];
      $title = $node->get('title')->value;
      $state_name = strtolower($title);
      $state_name = str_replace('.', '', $state_name);
      $state_name = str_replace(' ', '-', $state_name);

      foreach ($languages as $langcode => $route) {
        $url = Url::fromRoute($route, ['state_name' => $state_name])->toString();
        // Add language code to url for non-english pages.
        if ('en' !== $langcode) {
          $url = "/$langcode" . $url;
        }

        $output .= '<li><a href="' . $url . '">' . $title . '(' . $langcode . ')</a></li>';
      }
    }

    $output .= '</ul>';

    return [
      '#markup' => $output,
      '#attached' => ['library' => []],
      '#cache' => ['max-age' => 0],
    ];
  }

  /**
   * NVRF Page Controller which outputs state data endpoint links.
   */
  public function stateDataPointsIndex() {
    // Get the current language.
    $current_language = \Drupal::languageManager()->getCurrentLanguage()->getId();

    // Get the default language.
    $default_language = \Drupal::languageManager()->getDefaultLanguage()->getId();

    // Check if the current language is not the default.
    if ($current_language !== $default_language) {
      // Return a 404 response if no matches are found.
      throw new NotFoundHttpException();
    }

    $node_storage = \Drupal::entityTypeManager()->getStorage('node');
    $nodes = $node_storage->loadByProperties([
      'type' => 'state_territory',
      'status' => 1,
      'field_accepts_nvrf' => TRUE,
    ]);

    $output = '<ul>';

    foreach ($nodes as $node) {
      $languages = [
        'en',
        'es',
      ];
      $title = $node->get('title')->value;
      $abbrev = $node->get('field_state_abbreviation')->value;

      foreach ($languages as $langcode) {
        $url = '/nvrf/assets/state/' . $abbrev . '/data.json';
        // Add language code to url for non-english pages.
        if ('en' !== $langcode) {
          $url = "/$langcode" . $url;
        }

        $output .= '<li><a href="' . $url . '">' . $title . '(' . $langcode . ')</a></li>';
      }
    }

    $output .= '</ul>';

    return [
      '#markup' => $output,
      '#attached' => ['library' => []],
      '#cache' => ['max-age' => 0],
    ];
  }

}
