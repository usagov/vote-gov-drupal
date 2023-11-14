<?php

namespace Drupal\vote_nvrf\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\rest_views\SerializedData;

/**
 * Plugin implementation of the 'field_nvrf_double_fields_json_key_value' formatter.
 *
 * @FieldFormatter(
 *   id = "field_nvrf_double_fields_json_key_value",
 *   label = @Translation("JSON Format: Key Value"),
 *   field_types = {"double_field"}
 * )
 */
class NVRFDoubleFieldsJsonKeyValueFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $elements = [];

    foreach ($items as $delta => $item) {

      $first = !empty($item->get('first')->getValue()) ? $item->get('first')->getValue() : '';
      $second = !empty($item->get('second')->getValue()) ? $item->get('second')->getValue() : '';

      $data_array = [
        'key' => $first,
        'value' => $second,
      ];

      $elements[$delta] = [
        '#type' => 'data',
        '#data' => SerializedData::create($data_array),
      ];

      // Unset just in case.
      unset($elements[$delta]['#plain_text']);
    }
    return $elements;
  }

}
