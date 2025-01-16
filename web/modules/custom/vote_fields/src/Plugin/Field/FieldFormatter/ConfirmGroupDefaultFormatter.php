<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\rest_views\SerializedData;

/**
 * Plugin implementation of the 'confirm_group_default' formatter.
 *
 * @FieldFormatter(
 *   id = "confirm_group_default",
 *   label = @Translation("Default"),
 *   field_types = {"confirm_group"},
 * )
 */
final class ConfirmGroupDefaultFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $element = [];

    foreach ($items as $delta => $item) {

      $data_array = [];

      if ($item->confirm_group_id) {
        $data_array['confirm_group_id'] = $item->confirm_group_id;
      }

      if ($item->confirm_group_label) {
        $data_array['confirm_group_label'] = $item->confirm_group_label;
      }

      if ($item->confirm_group_message) {
        $data_array['confirm_group_message'] = $item->confirm_group_message;
      }

      $element[$delta] = [
        '#type' => 'data',
        '#data' => SerializedData::create($data_array),
      ];

    }

    return $element;
  }

}
