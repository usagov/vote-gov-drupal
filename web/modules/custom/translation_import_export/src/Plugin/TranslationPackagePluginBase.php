<?php

namespace Drupal\translation_import_export\Plugin;

use Drupal\Component\Plugin\PluginBase;

/**
 * Provides a base class for your plugin type.
 */
abstract class TranslationPackagePluginBase extends PluginBase {
    // Your plugin type logic here.
    // What are common methods needed for each Package Plugin?
    private $langcode;

    private $source;

    private $requestType;

    public function __construct($plugin_data, $plugin_id, $plugin_definition) {
      if (!empty($plugin_data['request_type'])) {
        // Add validation for the input.
        $this->setRequestType($plugin_data['request_type']);
      }
  
      if (!empty($plugin_data['request']['source'])) {
        // Add validation for the input.
        $this->setSource($plugin_data['request']['source']);
      }
    }

    public function getRequestType() {
      return $this->requestType;
    }
  
    public function getSource() {
      return $this->source;
    }
  
    public function getLangCode() {
      return $this->langcode;
    }

    public function setRequestType($type) {
      $this->requestType = $type;
    }
  
    public function setSource($source) {
      $this->source = $source;
    }

  }