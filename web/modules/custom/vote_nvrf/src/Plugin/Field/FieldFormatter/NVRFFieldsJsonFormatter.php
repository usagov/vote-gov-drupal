<?php

namespace Drupal\vote_nvrf\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\rest_views\SerializedData;
use Drupal\taxonomy\Entity\Term;

/**
 * Plugin implementation of the 'field_nvrf_fields_json' formatter.
 *
 * @FieldFormatter(
 *   id = "field_nvrf_fields_json",
 *   label = @Translation("JSON Format"),
 *   field_types = {"field_nvrf_fields"}
 * )
 */
class NVRFFieldsJsonFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $elements = [];
    foreach ($items as $delta => $item) {

      $nvrf_field_tid = $item->get('nvrf_field')->getValue();
      $required = $item->get('required')->getValue();
      $term = Term::load($nvrf_field_tid)->hasTranslation($langcode) ? Term::load($nvrf_field_tid)->getTranslation($langcode) : Term::load($nvrf_field_tid);

      $uuid = !empty($term->get('uuid')->getValue()) ? $term->get('uuid')->get(0)->getValue()['value'] : '';

      $term_data_array = [
        'uuid' => $uuid,
        'required' => $required,
      ];

      $elements[$delta] = [
        '#type' => 'data',
        '#data' => SerializedData::create($term_data_array),
      ];

      // Unset just in case.
      unset($elements[$delta]['#plain_text']);
    }
    return $elements;
  }

}
