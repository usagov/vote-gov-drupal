<?php

namespace Drupal\vote_nvrf\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Defines the 'field_nvrf_fields' field type.
 *
 * @FieldType(
 *   id = "field_nvrf_fields",
 *   label = @Translation("NVRF Fields"),
 *   category = @Translation("General"),
 *   default_widget = "field_nvrf_fields",
 *   default_formatter = "field_nvrf_fields_default"
 * )
 */
class NVRFFieldsItem extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    if ($this->nvrf_field !== NULL) {
      return FALSE;
    }
    elseif ($this->required == 1) {
      return FALSE;
    }
    return TRUE;
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {

    $properties['nvrf_field'] = DataDefinition::create('integer')
      ->setLabel(t('NVRF Field'));
    $properties['required'] = DataDefinition::create('boolean')
      ->setLabel(t('Required'));

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function getConstraints() {
    $constraints = parent::getConstraints();

    $options['nvrf_field']['NotBlank'] = [];

    $constraint_manager = \Drupal::typedDataManager()->getValidationConstraintManager();
    $constraints[] = $constraint_manager->create('ComplexData', $options);
    // @todo Add more constraints here.
    return $constraints;
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {

    $columns = [
      'nvrf_field' => [
        'type' => 'int',
        'unsigned' => TRUE,
        'not null' => TRUE,
      ],
      'required' => [
        'type' => 'int',
        'size' => 'tiny',
        'default' => 0,
        'not null' => TRUE,
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
  public static function generateSampleValue(FieldDefinitionInterface $field_definition) {

    $min = $field_definition->getSetting('min') ?: 0;
    $max = $field_definition->getSetting('max') ?: 999;
    $values['nvrf_field'] = mt_rand($min, $max);

    $values['required'] = (bool) mt_rand(0, 1);

    return $values;
  }

}
