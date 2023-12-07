<?php

namespace Drupal\vote_nvrf\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\taxonomy\Entity\Term;

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

    // Add a row for the labels.
    $element[]['nvrf_fields'] = [
      '#type' => 'inline_template',
      '#template' => "<div style=\"display: flex\"><span style=\"flex: 1\"><strong>{{ 'Field name' | t }}:</strong></span><span style=\"flex: 1\"><strong>{{ 'Required' | t }}:</strong></span></div>",
    ];

    // Add a row for each property value.
    foreach ($items as $delta => $item) {
      $term = Term::load($item->nvrf_field);
      $field = $term->getName();
      $required = $item->required ? 'Yes' : 'No';

      $element[$delta + 1]['nvrf_fields'] = [
        '#type' => 'inline_template',
        '#template' => "<div style=\"display: flex\"><span style=\"flex: 1\">{{ field | t }}</span><span style=\"flex: 1\">{{ required | t }}</span></div>",
        '#context' => [
          'field' => $field,
          'required' => $required,
        ],
      ];
    }

    return $element;
  }

}
