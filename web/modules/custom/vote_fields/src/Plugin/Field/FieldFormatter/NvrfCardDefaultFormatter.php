<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\rest_views\SerializedData;

/**
 * Plugin implementation of the 'nvrf_card_default' formatter.
 *
 * @FieldFormatter(
 *   id = "nvrf_card_default",
 *   label = @Translation("Default"),
 *   field_types = {"nvrf_card"},
 * )
 */
final class NvrfCardDefaultFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $element = [];

    foreach ($items as $delta => $item) {

      $data_array = [];

      if ($item->nvrf_card_id) {
        $data_array['nvrf_card_id'] = $item->nvrf_card_id;
      }

      if ($item->nvrf_card_heading) {
        $data_array['nvrf_card_heading'] = $item->nvrf_card_heading;
      }

      if ($item->nvrf_card_text) {
        $data_array['nvrf_card_text'] = check_markup($item->nvrf_card_text, 'simple_html');
      }

      if ($item->nvrf_card_button_label) {
        $data_array['nvrf_card_button_label'] = $item->nvrf_card_button_label;
      }

      $element[$delta] = [
        '#type' => 'data',
        '#data' => SerializedData::create($data_array),
      ];

    }

    return $element;
  }
}
