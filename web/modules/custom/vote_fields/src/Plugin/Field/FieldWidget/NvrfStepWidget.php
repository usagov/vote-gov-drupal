<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;

/**
 * Defines the 'nvrf_step' field widget.
 *
 * @FieldWidget(
 *   id = "nvrf_step",
 *   label = @Translation("NVRF step"),
 *   field_types = {"nvrf_step"},
 * )
 */
final class NvrfStepWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state): array {

    $element['step_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Step Id'),
      '#default_value' => $items[$delta]->step_id ?? NULL,
      '#size' => 60,
      '#description' => $this->t('This field value must be the same for all languages.'),
    ];

    $element['step_label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Step label'),
      '#default_value' => $items[$delta]->step_label ?? NULL,
      '#size' => 60,
    ];

    $element['back_button_label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Back button label'),
      '#default_value' => $items[$delta]->back_button_label ?? NULL,
      '#size' => 60,
    ];

    $element['next_button_label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Next button label'),
      '#default_value' => $items[$delta]->next_button_label ?? NULL,
      '#size' => 60,
    ];

    $element['#theme_wrappers'] = ['container', 'form_element'];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function errorElement(array $element, ConstraintViolationInterface $error, array $form, FormStateInterface $form_state): array|bool {
    $element = parent::errorElement($element, $error, $form, $form_state);
    if ($element === FALSE) {
      return FALSE;
    }
    $error_property = explode('.', $error->getPropertyPath())[1];
    return $element[$error_property];
  }

  /**
   * {@inheritdoc}
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state): array {
    foreach ($values as $delta => $value) {
      if ($value['step_id'] === '') {
        $values[$delta]['step_id'] = NULL;
      }
      if ($value['step_label'] === '') {
        $values[$delta]['step_label'] = NULL;
      }
      if ($value['back_button_label'] === '') {
        $values[$delta]['back_button_label'] = NULL;
      }
      if ($value['next_button_label'] === '') {
        $values[$delta]['next_button_label'] = NULL;
      }
    }
    return $values;
  }

}
