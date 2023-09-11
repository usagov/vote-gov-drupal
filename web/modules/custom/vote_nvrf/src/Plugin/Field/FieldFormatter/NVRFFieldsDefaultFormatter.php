<?php

namespace Drupal\vote_nvrf\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;

/**
 * Plugin implementation of the 'field_nvrf_fields_default' formatter.
 *
 * @FieldFormatter(
 *   id = "field_nvrf_fields_default",
 *   label = @Translation("Default"),
 *   field_types = {"field_nvrf_fields"}
 * )
 */
class NVRFFieldsDefaultFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = [];

    foreach ($items as $delta => $item) {

      if ($item->nvrf_field) {
        $element[$delta]['nvrf_field'] = [
          '#type' => 'item',
          '#title' => $this->t('NVRF Field'),
          '#markup' => $item->nvrf_field,
        ];
      }

      $element[$delta]['required'] = [
        '#type' => 'item',
        '#title' => $this->t('Required'),
        '#markup' => $item->required ? $this->t('Yes') : $this->t('No'),
      ];

    }

    return $element;
  }

}
