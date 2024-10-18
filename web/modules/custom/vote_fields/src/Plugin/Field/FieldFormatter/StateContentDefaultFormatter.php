<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;

/**
 * Plugin implementation of the 'vote_fields_state_content_default' formatter.
 *
 * @FieldFormatter(
 *   id = "vote_fields_state_content_default",
 *   label = @Translation("Default"),
 *   field_types = {"vote_fields_state_content"},
 * )
 */
final class StateContentDefaultFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $element = [];

    foreach ($items as $delta => $item) {

      if ($item->heading) {
        $element[$delta]['heading'] = [
          '#markup' => $item->heading,
        ];
      }

      if ($item->text) {
        $element[$delta]['text'] = [
          '#markup' => $item->text,
        ];
      }

      if ($item->link_text) {
        $element[$delta]['link_text'] = [
          '#markup' => $item->link_text,
        ];
      }

    }

    return $element;
  }

}
