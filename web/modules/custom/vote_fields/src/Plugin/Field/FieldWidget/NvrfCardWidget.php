<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;

/**
 * Defines the 'nvrf_card' field widget.
 *
 * @FieldWidget(
 *   id = "nvrf_card",
 *   label = @Translation("NVRF card"),
 *   field_types = {"nvrf_card"},
 * )
 */
final class NvrfCardWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state): array {

    $element['nvrf_card_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('NVRF Card ID'),
      '#default_value' => $items[$delta]->nvrf_card_id ?? NULL,
      '#size' => 60,
      '#description' => $this->t('This field value must be the same for all languages.'),
    ];

    $element['nvrf_card_heading'] = [
      '#type' => 'textfield',
      '#title' => $this->t('NVRF Card heading'),
      '#default_value' => $items[$delta]->nvrf_card_heading ?? NULL,
      '#description' => $this->t("Use the placeholder <b>@state_name</b> to dynamically insert the state name."),
      '#size' => 60,
    ];

    $element['nvrf_card_text'] = [
      '#type' => 'text_format',
      '#title' => $this->t('NVRF card text'),
      '#default_value' => $items[$delta]->nvrf_card_text ?? NULL,
      '#format' => 'simple_html',
      '#allowed_formats' => ['simple_html'],
    ];

    $element['nvrf_card_button_label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('NVRF Card button label'),
      '#default_value' => $items[$delta]->nvrf_card_button_label ?? NULL,
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

      if ($value['nvrf_card_id'] === '') {
        $values[$delta]['nvrf_card_id'] = NULL;
      }
      if ($value['nvrf_card_heading'] === '') {
        $values[$delta]['nvrf_card_heading'] = NULL;
      }
      if ($value['nvrf_card_text']['value'] === '') {
        $values[$delta]['nvrf_card_text'] = NULL;
      } else {
        // Prepare the data for the Text field before saving.
        $values[$delta]['nvrf_card_text'] = $value['nvrf_card_text']['value'];
      }
      if ($value['nvrf_card_button_label'] === '') {
        $values[$delta]['nvrf_card_button_label'] = NULL;
      }
    }

    return $values;
  }

}
