<?php

namespace Drupal\vote_nvrf\Plugin\Field\FieldFormatter;

use Drupal\Core\Datetime\DateFormatterInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\rest_views\SerializedData;

/**
 * Plugin implementation of the 'field_nvrf_double_fields_json' formatter.
 *
 * @FieldFormatter(
 *   id = "field_nvrf_double_fields_json",
 *   label = @Translation("JSON Format"),
 *   field_types = {"double_field"}
 * )
 */
class NVRFDoubleFieldsJsonFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $elements = [];
    $date_formatter = static::getDateFormatter();

    foreach ($items as $delta => $item) {

      $first = !empty($item->get('first')->getValue()) ? $item->get('first')->getValue() : '';
      $second = !empty($item->get('second')->getValue()) ? $item->get('second')->getValue() : '';

      $data_array = [
        'date' => $date_formatter->format(strtotime($first), 'long_date'),
        'time' => $second,
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

  /**
   * Returns date formatter.
   */
  protected static function getDateFormatter(): DateFormatterInterface {
    return \Drupal::service('date.formatter');
  }

}
