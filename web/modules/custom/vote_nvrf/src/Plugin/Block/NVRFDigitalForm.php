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
    $build = [];
    $build['custom_plugin'] = [
      '#markup' => '<div id="root" class="nvrf-app-container vote-block-margin-y"></div>',
      '#attached' => [
        'library' => [
          'vote_nvrf/nvrf_assets',
        ],
      ],
    ];
    return $build;
  }

}