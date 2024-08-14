<?php

namespace Drupal\vote_nvrf\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Provides a 'NVRFDigitalForm' block.
 *
 * @Block(
 *  id = "nvrf_app",
 *  admin_label = @Translation("NVRF app"),
 * )
 */

/**
 * Provides a block with NVRF react app's root id.
 */
#[Block(
  id: "nvrf_app",
  admin_label: new TranslatableMarkup("NVRF Digital Form"),
  category: new TranslatableMarkup("Custom module")
)]

class NVRFDigitalForm extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $return_path = \Drupal::request()->headers->get('referer');
    $root_div = str_replace("%return_path%", $return_path, "<div id='root' data-returnPath='%return_path%' class='nvrf-app-container vote-block-margin-y'></div>");
    $build = [];
    $build['custom_plugin'] = [
      '#markup' => $root_div,
      '#attached' => [
        'library' => [
          'vote_nvrf/nvrf_assets',
        ],
      ],
      '#return_path' => \Drupal::request()->headers->get('referer'),
    ];
    return $build;
  }

}
