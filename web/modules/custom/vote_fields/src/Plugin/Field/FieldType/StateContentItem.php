<?php

declare(strict_types=1);

namespace Drupal\vote_fields\Plugin\Field\FieldType;

use Drupal\Component\Utility\Random;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Defines the 'vote_fields_state_content' field type.
 *
 * @FieldType(
 *   id = "vote_fields_state_content",
 *   label = @Translation("State content"),
 *   description = @Translation("Some description."),
 *   default_widget = "vote_fields_state_content",
 *   default_formatter = "vote_fields_state_content_default",
 * )
 */
final class StateContentItem extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public function isEmpty(): bool {
    return $this->heading === NULL && $this->text === NULL && $this->link_text === NULL;
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition): array {

    $properties['heading'] = DataDefinition::create('string')
      ->setLabel(t('Heading'));
    $properties['text'] = DataDefinition::create('string')
      ->setLabel(t('Text'));
    $properties['link_text'] = DataDefinition::create('string')
      ->setLabel(t('Link text'));

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function getConstraints(): array {
    $constraints = parent::getConstraints();

    // @todo Add more constraints here.
    return $constraints;
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition): array {

    $columns = [
      'heading' => [
        'type' => 'varchar',
        'length' => 255,
      ],
      'text' => [
        'type' => 'text',
        'size' => 'big',
      ],
      'link_text' => [
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

    $values['heading'] = $random->word(mt_rand(1, 255));

    $values['text'] = $random->paragraphs(5);

    $values['link_text'] = $random->word(mt_rand(1, 255));

    return $values;
  }

}
