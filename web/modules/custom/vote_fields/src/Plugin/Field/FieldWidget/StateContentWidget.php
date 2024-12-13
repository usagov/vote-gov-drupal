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
  public static function defaultSettings(): array {
    $settings['form_subfield_display'] = [
      'heading',
      'text',
      'link_text',
    ];
    $settings['form_subfield_text_help_text'] = '';
    $settings['form_subfield_link_text_help_text'] = '';

    return $settings + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state): array {
    $settings = $this->getSettings();

    $element['form_subfield_display'] = [
      '#type' => 'checkboxes',
      '#title' => $this->t('Fields to display in the form'),
      '#options' => [
        'heading' => 'Heading',
        'text' => 'Text',
        'link_text' => 'Link text',
      ],
      '#required' => TRUE,
      '#default_value' => $settings['form_subfield_display'],
      '#description' => $this->t('Select all subfields that you want to display in the form.'),
    ];

    $element['form_subfield_text_help_text'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Text subfield help text'),
      '#default_value' => $settings['form_subfield_text_help_text'],
    ];

    $element['form_subfield_link_text_help_text'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Link text subfield help text'),
      '#default_value' => $settings['form_subfield_link_text_help_text'],
    ];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state): array {
    $settings = $this->getSettings();

    $element['heading'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Heading'),
      '#default_value' => $items[$delta]->heading ?? NULL,
      '#access' => in_array('heading', $settings['form_subfield_display']),
      '#description' => $this->t('Write clear, succinct, and helpful headings that describe the content coming immediately after it. <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank">WCAG heading level guide</a>'),
    ];

    $element['text'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Text'),
      '#default_value' => $items[$delta]->text ?? NULL,
      '#format' => 'simple_html',
      '#allowed_formats' => ['simple_html'],
      '#access' => in_array('text', $settings['form_subfield_display']),
      '#description' => $settings['form_subfield_text_help_text'],
    ];

    $element['link_text'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Link text'),
      '#default_value' => $items[$delta]->link_text ?? NULL,
      '#access' => in_array('link_text', $settings['form_subfield_display']),
      '#description' => $this->t("Use clear, descriptive text for links that explain their purpose, avoiding generic phrases like 'click here' or 'read more.'") . ' ' . $settings['form_subfield_link_text_help_text'],
    ];

    $element['#theme_wrappers'] = [
      'details' => [
        '#description' => [
          '#markup' => 'Use the placeholder <strong>@state_name</strong> to dynamically add the state name on the state page.',
        ],
        '#summary_attributes' => [],
      ],
    ];
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
