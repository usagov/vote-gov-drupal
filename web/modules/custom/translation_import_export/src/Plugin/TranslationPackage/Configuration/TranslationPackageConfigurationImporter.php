<?php

namespace Drupal\translation_import_export\Plugin\TranslationPackage\Configuration;

use Drupal\Component\Serialization\Yaml;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 *
 */
class TranslationPackageConfigurationImporter {

  private $package;

  private $receivedPackage;

  private $importedData;

  private $filename;

  private $langcode;

  /**
   *
   */
  public function setup() {
    $package = $this->getPackage();
    // Set the Langcode.
    $this->setLangcode($package->getLangcode());
    // Setup the download file name.
  }

  /**
   *
   */
  public function getDownloadFilename() {
    $received_package = $this->getReceivedPackage();
    $configuration_id = $received_package['data_to_translate']['configuration_id'];
    return $configuration_id . '.yaml';
  }

  /**
   *
   */
  public function setPackage($package) {
    $this->package = $package;
  }

  /**
   *
   */
  public function getPackage() {
    return $this->package;
  }

  /**
   *
   */
  public function setReceivedPackage($received_package) {
    $this->receivedPackage = $received_package;
  }

  /**
   *
   */
  public function getReceivedPackage() {
    return $this->receivedPackage;
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
  public function getImporterPreview() {
    $package = $this->getReceivedPackage();
    $package_data = $package['data_to_translate'];
    $yaml_configuration = $package_data['configuration'];
    // Encode the YAML data.
    $encoded_yaml_configuration = YAML::encode($yaml_configuration);
    return $encoded_yaml_configuration;
  }

  /**
   *
   */
  public function getImporterResponse() {

    $package = $this->getReceivedPackage();
    $package_data = $package['data_to_translate'];
    $yaml_configuration = $package_data['configuration'];
    // Encode the YAML data.
    $encoded_yaml_configuration = YAML::encode($yaml_configuration);

    $langcode = $this->getLangcode();
    $download_filename = $this->getDownloadFilename();

    if (!empty($encoded_yaml_configuration)) {
      $filesystem = \Drupal::service('file_system');
      $uri = $filesystem->tempnam('temporary://', 'configuration_');
      file_put_contents($uri, $encoded_yaml_configuration);
      $response = new BinaryFileResponse($uri);
      $response->setContentDisposition('attachment', $download_filename);

      return $response;
    }
    else {
      $this->messenger()->addStatus($this->t('Nothing to export.'));
    }

  }

}
