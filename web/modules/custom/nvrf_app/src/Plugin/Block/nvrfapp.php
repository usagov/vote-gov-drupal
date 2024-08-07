<?php
namespace Drupal\nvrf_app\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Provides a 'NVRFApp' block.
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
  admin_label: new TranslatableMarkup("NVRF app block label"),
  category: new TranslatableMarkup("NVRF app example block")
)]

class nvrfapp extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['nvrf_app'] = [
      '#markup' => '<div id="react-app"></div>',
      '#attached' => [
        'library' => 'votegov/nvrf_app'
      ],
    ];
    return $build;
  }
}
