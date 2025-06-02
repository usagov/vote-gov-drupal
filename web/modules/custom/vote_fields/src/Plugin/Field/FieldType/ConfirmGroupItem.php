<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldType;

use Drupal\Component\Utility\Random;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Defines the 'confirm_group' field type.
 *
 * @FieldType(
 *   id = "confirm_group",
 *   label = @Translation("Confirm group"),
 *   description = @Translation("Custom: Stores NVRF confirm group data."),
 *   default_widget = "confirm_group",
 *   default_formatter = "confirm_group_default",
 * )
 */
final class ConfirmGroupItem extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public function isEmpty(): bool {
    return $this->confirm_group_id === NULL && $this->confirm_group_label === NULL && $this->confirm_group_message === NULL;
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition): array {

    $properties['confirm_group_id'] = DataDefinition::create('string')
      ->setLabel(t('Confirm group id'));
    $properties['confirm_group_label'] = DataDefinition::create('string')
      ->setLabel(t('Confirm group label'));
    $properties['confirm_group_message'] = DataDefinition::create('string')
      ->setLabel(t('Confirm group message'));

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function getConstraints(): array {
    $constraints = parent::getConstraints();

    $options['confirm_group_id']['NotBlank'] = [];

    $options['confirm_group_label']['NotBlank'] = [];

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
      'confirm_group_id' => [
        'type' => 'varchar',
        'length' => 255,
      ],
      'confirm_group_label' => [
        'type' => 'varchar',
        'length' => 255,
      ],
      'confirm_group_message' => [
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

    $values['confirm_group_id'] = $random->word(mt_rand(1, 255));

    $values['confirm_group_label'] = $random->word(mt_rand(1, 255));

    $values['confirm_group_message'] = $random->word(mt_rand(1, 255));

    return $values;
  }

}
