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
  admin_label: new TranslatableMarkup("NVRF App Embed"),
  category: new TranslatableMarkup("Custom module")
)]

class nvrfapp extends BlockBase {
/**
 * {@inheritdoc}
 */
public function build() {
  $build = [];
  $build['custom_plugin'] = [
  '#markup' => '<div id="root"></div>',
  '#attached' => [
    'library' => [
      'nvrf_app/nvrf_assets'
    ]
  ]
    ];
  return $build;

}
}

