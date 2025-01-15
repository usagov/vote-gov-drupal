<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\rest_views\SerializedData;

/**
 * Plugin implementation of the 'nvrf_step_default' formatter.
 *
 * @FieldFormatter(
 *   id = "nvrf_step_default",
 *   label = @Translation("Default"),
 *   field_types = {"nvrf_step"},
 * )
 */
final class NvrfStepDefaultFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $element = [];

    foreach ($items as $delta => $item) {

      $data_array = [];

      if ($item->step_id) {
        $data_array['step_id'] = $item->step_id;
      }

      if ($item->step_label) {
        $data_array['step_label'] = $item->step_label;
      }

      if ($item->back_button_label) {
        $data_array['back_button_label'] = $item->back_button_label;
      }

      if ($item->next_button_label) {
        $data_array['next_button_label'] = $item->next_button_label;
      }

      $element[$delta] = [
        '#type' => 'data',
        '#data' => SerializedData::create($data_array),
      ];

    }

    return $element;
  }

}
