<?php

namespace Drupal\vote_nvrf\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;

/**
 * Defines the 'field_nvrf_fields' field widget.
 *
 * @FieldWidget(
 *   id = "field_nvrf_fields",
 *   label = @Translation("NVRF Fields"),
 *   field_types = {"field_nvrf_fields"},
 * )
 */
class NVRFFieldsWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {

    $element['nvrf_field'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('NVRF Field'),
      '#target_type' => 'taxonomy_term',
      '#default_value' => isset($items[$delta]->nvrf_field) ? \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($items[$delta]->nvrf_field) : NULL,
      '#step' => 0.01,
      '#selection_settings' => [
        'include_anonymous' => FALSE,
        'target_bundles' => ['nvrf_field'],
      ],
    ];

    $element['required'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Required'),
      '#default_value' => $items[$delta]->required ?? NULL,
    ];

    $element['#theme_wrappers'] = ['container', 'form_element'];
    $element['#attributes']['class'][] = 'field-nvrf-fields-elements';
    $element['#attached']['library'][] = 'vote_nvrf/field_nvrf_fields';

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function errorElement(array $element, ConstraintViolationInterface $violation, array $form, FormStateInterface $form_state) {
    return isset($violation->arrayPropertyPath[0]) ? $element[$violation->arrayPropertyPath[0]] : $element;
  }

  /**
   * {@inheritdoc}
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state) {
    foreach ($values as $delta => $value) {
      if ($value['nvrf_field'] === '') {
        $values[$delta]['nvrf_field'] = NULL;
      }
      if ($value['required'] === '') {
        $values[$delta]['required'] = NULL;
      }
    }
    return $values;
  }

}
