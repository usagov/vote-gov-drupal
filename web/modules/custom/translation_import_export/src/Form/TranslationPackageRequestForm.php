<?php
namespace Drupal\translation_import_export\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\translation_import_export\Entity\TranslationPackageRequest;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Session\AccountInterface;

class TranslationPackageRequestForm extends ContentEntityForm {

    private $plugin_type;
    private $translation_package_manager;

    /**
     * @inheritdoc
     */
    public function getFormId() {
        return 'translation_package_request_form';
    }

    /**
     * @inheritdoc
     */
    public function buildForm(array $form, FormStateInterface $form_state, $plugin_type = NULL) {
        $this->plugin_type = $plugin_type;
        if (!$this->entity->isNew()) {
            $this->plugin_type = $this->entity->getType();
        }
        return parent::buildForm($form, $form_state);
    }

    /**
     * @inheritdoc
     */
    public function form(array $form, FormStateInterface $form_state) {
        
        $form = parent::form($form, $form_state);
        $entity = $this->entity;
        $plugin_type = $this->plugin_type;
        $request = $entity->getDecodedRequestSettings();
        
        $this->translation_package_manager = \Drupal::service('plugin.manager.translation_package');
        $package = $this->translation_package_manager->createInstance($plugin_type, ['request' => $request]);
        
        $form['admin_name'] = [
            '#type' => 'textfield',
            '#title' => $this->t('Admin Name'),
            '#required' => TRUE,
            '#default_value' => $entity->getAdminName(),
        ];

        $form['description'] = [
            '#type' => 'textarea',
            '#title' => $this->t('Description'),
            '#default_value' => $entity->getDescription(),
        ];

        $package->getFormFields($form, $form_state, $entity);

        return $form;
    }

    /**
     * @inheritdoc
     */
    public function save(array $form, FormStateInterface $form_state) {
        $entity = $this->entity;
        
        $plugin_type = $form_state->getValue('plugin_type');
        $package = $this->translation_package_manager->createInstance($this->plugin_type, []);
        $request_settings = $package->prepFormFieldData($form_state);
        
        $entity->set('type', $this->plugin_type);
        $entity->set('request_settings', $request_settings);
        $entity->save();

        // Provide a message that the record has been saved.
        \Drupal::messenger()->addStatus(t('Record has been saved.'));
    }
}
