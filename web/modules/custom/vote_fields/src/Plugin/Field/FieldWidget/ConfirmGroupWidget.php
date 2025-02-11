<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;

/**
 * Defines the 'confirm_group' field widget.
 *
 * @FieldWidget(
 *   id = "confirm_group",
 *   label = @Translation("Confirm Group"),
 *   field_types = {"confirm_group"},
 * )
 */
final class ConfirmGroupWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state): array {

    $element['confirm_group_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Confirm group id'),
      '#default_value' => $items[$delta]->confirm_group_id ?? NULL,
      '#size' => 60,
      '#description' => $this->t('This field value must be the same for all languages.'),
    ];

    $element['confirm_group_label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Confirm group label'),
      '#default_value' => $items[$delta]->confirm_group_label ?? NULL,
      '#size' => 60,
    ];

    $element['confirm_group_message'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Confirm group message'),
      '#default_value' => $items[$delta]->confirm_group_message ?? NULL,
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
      if ($value['confirm_group_id'] === '') {
        $values[$delta]['confirm_group_id'] = NULL;
      }
      if ($value['confirm_group_label'] === '') {
        $values[$delta]['confirm_group_label'] = NULL;
      }
      if ($value['confirm_group_message'] === '') {
        $values[$delta]['confirm_group_message'] = NULL;
      }
    }
    return $values;
  }

}
