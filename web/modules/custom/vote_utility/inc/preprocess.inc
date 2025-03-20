<?php

/**
 * @file
 * Defines custom preprocess hooks.
 */

/**
 * Implements template_preprocess_image_widget().
 */
function vote_utility_preprocess_image_widget(&$variables) {
  $variables['data']['alt']['#description'] .= t('
  <ul>
  <li>Describe, don’t interpret - Write what’s in the image without adding details a sighted person wouldn’t also have.</li>
  <li>Use neutral language - avoid describing the image using bias or emotion.</li>
  <li>Keep the alt text as short as possible without leaving out details.</li>
  <li>Don’t repeat information that is available in the caption or other surrounding text.</li>
  </ul>
  <p>See the <a href="https://webaim.org/techniques/alttext/" target="_blank">WebAIM images article</a> for examples.</p>
  ');
}
