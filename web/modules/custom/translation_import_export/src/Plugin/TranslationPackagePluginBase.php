<?php

namespace Drupal\translation_import_export\Plugin;

use Drupal\Component\Plugin\PluginBase;

/**
 * Provides a base class for your plugin type.
 */
abstract class TranslationPackagePluginBase extends PluginBase {
  // Your plugin type logic here.
  /**
   * What are common methods needed for each Package Plugin?
   */
  private $langcode;

  private $source;

  private $requestType;

  private $receivedPackage;

  /**
   *
   */
  public function __construct($plugin_data, $plugin_id, $plugin_definition) {
    if (!empty($plugin_data['request_type'])) {
      // Add validation for the input.
      $this->setRequestType($plugin_data['request_type']);
    }

    if (!empty($plugin_data['request']['source'])) {
      // Add validation for the input.
      $this->setSource($plugin_data['request']['source']);
    }

    if (!empty($plugin_data['received_package'])) {
      // Add validation for the input.
      $this->setReceivedPackage($plugin_data['received_package']);
    }
  }

  /**
   *
   */
  public function getRequestType() {
    return $this->requestType;
  }

  /**
   *
   */
  public function getSource() {
    return $this->source;
  }

  /**
   *
   */
  public function setLangcode($langcode) {
    $this->langcode = $langcode;
  }

  /**
   *
   */
  public function getLangcode() {
    return $this->langcode;
  }

  /**
   *
   */
  public function setRequestType($type) {
    $this->requestType = $type;
  }

  /**
   *
   */
  public function setSource($source) {
    $this->source = $source;
  }

  /**
   *
   */
  public function setReceivedPackage($package) {
    $this->receivedPackage = $package;
  }

  /**
   *
   */
  public function getReceivedPackage() {
    return $this->receivedPackage;
  }

}
