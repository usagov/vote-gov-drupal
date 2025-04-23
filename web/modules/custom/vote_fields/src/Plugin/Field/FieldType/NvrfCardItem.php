<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldType;

use Drupal\Component\Utility\Random;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Defines the 'nvrf_card' field type.
 *
 * @FieldType(
 *   id = "nvrf_card",
 *   label = @Translation("NVRF card"),
 *   description = @Translation("Custom: Stores NVRF card data."),
 *   default_widget = "nvrf_card",
 *   default_formatter = "nvrf_card_default",
 * )
 */
final class NvrfCardItem extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public function isEmpty(): bool {
    return $this->nvrf_card_id === NULL && $this->nvrf_card_heading === NULL && $this->nvrf_card_text === NULL && $this->nvrf_card_button_label === NULL;
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition): array {

    $properties['nvrf_card_id'] = DataDefinition::create('string')
      ->setLabel(t('NVRF Card ID'));
    $properties['nvrf_card_heading'] = DataDefinition::create('string')
      ->setLabel(t('NVRF card heading'));
    $properties['nvrf_card_text'] = DataDefinition::create('string')
      ->setLabel(t('NVRF Card text'));
    $properties['nvrf_card_button_label'] = DataDefinition::create('string')
      ->setLabel(t('NVRF Card Button label'));

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function getConstraints(): array {
    $constraints = parent::getConstraints();

    $options['nvrf_card_id']['NotBlank'] = [];

    $options['nvrf_card_heading']['NotBlank'] = [];

    $options['nvrf_card_button_label']['NotBlank'] = [];

    $constraint_manager = \Drupal::typedDataManager()->getValidationConstraintManager();
    $constraints[] = $constraint_manager->create('ComplexData', $options);
    return $constraints;
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition): array {

    $columns = [
      'nvrf_card_id' => [
        'type' => 'varchar',
        'length' => 255,
      ],
      'nvrf_card_heading' => [
        'type' => 'varchar',
        'length' => 255,
      ],
      'nvrf_card_text' => [
        'type' => 'text',
        'size' => 'big',
      ],
      'nvrf_card_button_label' => [
        'type' => 'varchar',
        'length' => 255,
      ],
    ];

    $schema = [
      'columns' => $columns,
    ];

    return $schema;
  }

  /**
   * {@inheritdoc}
   */
  public static function generateSampleValue(FieldDefinitionInterface $field_definition): array {

    $random = new Random();

    $values['nvrf_card_id'] = $random->word(mt_rand(1, 255));

    $values['nvrf_card_heading'] = $random->word(mt_rand(1, 255));

    $values['nvrf_card_text'] = $random->paragraphs(2);

    $values['nvrf_card_button_label'] = $random->word(mt_rand(1, 255));

    return $values;
  }

}
