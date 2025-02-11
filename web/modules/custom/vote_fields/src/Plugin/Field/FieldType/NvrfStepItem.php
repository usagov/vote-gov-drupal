<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldType;

use Drupal\Component\Utility\Random;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Defines the 'nvrf_step' field type.
 *
 * @FieldType(
 *   id = "nvrf_step",
 *   label = @Translation("NVRF step"),
 *   description = @Translation("Some description."),
 *   default_widget = "nvrf_step",
 *   default_formatter = "nvrf_step_default",
 * )
 */
final class NvrfStepItem extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public function isEmpty(): bool {
    return $this->step_id === NULL && $this->step_label === NULL && $this->back_button_label === NULL && $this->next_button_label === NULL && $this->step_aria_label === NULL && $this->edit_aria_label === NULL;
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition): array {

    $properties['step_id'] = DataDefinition::create('string')
      ->setLabel(t('Step Id'));
    $properties['step_label'] = DataDefinition::create('string')
      ->setLabel(t('Step label'));
    $properties['back_button_label'] = DataDefinition::create('string')
      ->setLabel(t('Back button label'));
    $properties['next_button_label'] = DataDefinition::create('string')
      ->setLabel(t('Next button label'));
    $properties['step_aria_label'] = DataDefinition::create('string')
      ->setLabel(t('Step indicator aria label'));
    $properties['edit_aria_label'] = DataDefinition::create('string')
      ->setLabel(t('Edit button aria label'));

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function getConstraints(): array {
    $constraints = parent::getConstraints();

    $options['step_id']['NotBlank'] = [];

    $constraint_manager = \Drupal::typedDataManager()->getValidationConstraintManager();
    $constraints[] = $constraint_manager->create('ComplexData', $options);
    // @todo Add more constraints here.
    return $constraints;
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition): array {

    $columns = [
      'step_id' => [
        'type' => 'varchar',
        'length' => 255,
      ],
      'step_label' => [
        'type' => 'varchar',
        'length' => 255,
      ],
      'back_button_label' => [
        'type' => 'varchar',
        'length' => 255,
      ],
      'next_button_label' => [
        'type' => 'varchar',
        'length' => 255,
      ],
      'step_aria_label' => [
        'type' => 'varchar',
        'length' => 255,
      ],
      'edit_aria_label' => [
        'type' => 'varchar',
        'length' => 255,
      ],
    ];

    $schema = [
      'columns' => $columns,
      // @DCG Add indexes here if necessary.
    ];

    return $schema;
  }

  /**
   * {@inheritdoc}
   */
  public static function generateSampleValue(FieldDefinitionInterface $field_definition): array {

    $random = new Random();

    $values['step_id'] = $random->word(mt_rand(1, 255));

    $values['step_label'] = $random->word(mt_rand(1, 255));

    $values['back_button_label'] = $random->word(mt_rand(1, 255));

    $values['next_button_label'] = $random->word(mt_rand(1, 255));

    $values['step_aria_label'] = $random->word(mt_rand(1, 255));

    $values['edit_aria_label'] = $random->word(mt_rand(1, 255));

    return $values;
  }

}
