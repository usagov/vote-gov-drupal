<?php

namespace Drupal\translation_import_export\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;

/**
 * Defines the Translation Package Request entity.
 *
 * @ContentEntityType(
 *   id = "translation_package_request",
 *   label = @Translation("Translation Package Request"),
 *   base_table = "translation_package_request",
 *   entity_keys = {
 *     "id" = "tprid",
 *     "uuid" = "uuid",
 *   },
 *   handlers = {
 *     "list_builder" = "Drupal\translation_import_export\TranslationPackageRequestListBuilder",
 *     "form" = {
 *       "default" = "Drupal\translation_import_export\Form\TranslationPackageRequestForm",
 *       "add" = "Drupal\translation_import_export\Form\TranslationPackageRequestForm",
 *       "edit" = "Drupal\translation_import_export\Form\TranslationPackageRequestForm",
 *       "preview" = "Drupal\translation_import_export\Form\TranslationPackageRequestPreviewForm",
 *       "delete" = "Drupal\translation_import_export\Form\TranslationPackageRequestDeleteForm",
 *     },
 *   },
 *   links  = {
 *     "add-form" = "/admin/config/translation-import-export/add/{plugin_type}",
 *     "canonical" = "/admin/config/translation-import-export",
 *     "collection" = "/admin/config/translation-import-export",
 *     "delete-form" = "/admin/config/translation-import-export/delete/{translation_package_request}",
 *     "edit-form" = "/admin/config/translation-import-export/edit/{translation_package_request}",
 *     "preview" = "/admin/config/translation-import-export/preview/{translation_package_request}",
 *   },
 *   translatable = FALSE,
 * )
 */
class TranslationPackageRequest extends ContentEntityBase implements ContentEntityInterface {

  /**
   * ...
   */
  public function id() {
    return $this->get('tprid')->value;
  }

  /**
   *
   */
  public function label() {
    return $this->get('admin_name')->value;
  }

  /**
   *
   */
  public function getAdminName() {
    return $this->get('admin_name')->value;
  }

  /**
   *
   */
  public function getDescription() {
    return $this->get('description')->value;
  }

  /**
   *
   */
  public function getType() {
    return $this->get('type')->value;
  }

  /**
   *
   */
  public function getRequestSettings() {
    return $this->get('request_settings')->value;
  }

  /**
   *
   */
  public function getDecodedRequestSettings() {
    $value = [];
    if (!$this->get('request_settings')->isEmpty()) {
      $value = json_decode($this->get('request_settings')->value, TRUE);
    }

    return $value;
  }

  /**
   *
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {

    // Standard field, used as unique if primary index.
    $fields['tprid'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('ID'))
      ->setDescription(t('The ID of the Translation Package Request entity.'))
      ->setReadOnly(TRUE);

    // Standard field, unique outside of the scope of the current project.
    $fields['uuid'] = BaseFieldDefinition::create('uuid')
      ->setLabel(t('UUID'))
      ->setDescription(t('The UUID of the Translation Package Request entity.'))
      ->setReadOnly(TRUE);

    $fields['type'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Type'))
      ->setDescription(t('The type of the Translation Package Request entity.'))
      ->setReadOnly(FALSE)
      ->setSettings(
              [
    // Set the maximum length as needed.
                'max_length' => 255,
    // Disable text processing if not needed.
                'text_processing' => 0,
              ]
          );

    $fields['admin_name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Admin Name'))
      ->setDescription(t('The admin name of the Translation Package Request entity.'))
      ->setReadOnly(FALSE)
      ->setSettings(
              [
    // Set the maximum length as needed.
                'max_length' => 255,
    // Disable text processing if not needed.
                'text_processing' => 0,
              ]
          );

    $fields['description'] = BaseFieldDefinition::create('text')
      ->setLabel(t('Description'))
      ->setDescription(t('The description of the Translation Package Request entity.'))
      ->setReadOnly(FALSE);

    $fields['request_settings'] = BaseFieldDefinition::create('text_long')
      ->setLabel(t('Request Setting'))
      ->setDescription(t('The JSON request setting of the Translation Package Request entity.'))
      ->setReadOnly(FALSE);

    $fields['uid'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('User ID'))
      ->setDescription(t('The user ID of the node author.'))
      ->setSettings(
              [
                'target_type' => 'user',
                'default_value' => 0,
              ]
          );

    // The changed field type automatically updates the timestamp every time the
    // entity is saved.
    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the node was last edited.'));

    return $fields;
  }

}
