<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;

/**
 * Defines the 'vote_fields_state_content' field widget.
 *
 * @FieldWidget(
 *   id = "vote_fields_state_content",
 *   label = @Translation("State content"),
 *   field_types = {"vote_fields_state_content"},
 * )
 */
final class StateContentWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state): array {

    $element['heading'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Heading'),
      '#default_value' => $items[$delta]->heading ?? NULL,
    ];

    $element['text'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Text'),
      '#default_value' => $items[$delta]->text ?? NULL,
      '#format' => 'simple_html',
      '#allowed_formats' => ['simple_html'],
    ];

    $element['link_text'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Link text'),
      '#default_value' => $items[$delta]->link_text ?? NULL,
    ];

    $element['#theme_wrappers'] = ['container', 'form_element'];
    $element['#attributes']['class'][] = 'vote-fields-state-content-elements';
    $element['#attached']['library'][] = 'vote_fields/vote_fields_state_content';

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
      if ($value['heading'] === '') {
        $values[$delta]['heading'] = NULL;
      }
      if ($value['text'] === '') {
        $values[$delta]['text'] = NULL;
      }
      if ($value['link_text'] === '') {
        $values[$delta]['link_text'] = NULL;
      }

      // Prepare the data for the Text field before saving.
      if (isset($value['text'])) {
        $values[$delta]['text'] = $value['text']['value'];
      }
    }
    return $values;
  }

}
