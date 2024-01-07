<?php

namespace Drupal\translation_import_export\Plugin\TranslationPackage\View;


/**
 *
 */
class TranslationPackageViewImporter {

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
    return '';
  }

  /**
   *
   */
  public function getImporterResponse() {

    $package = $this->getReceivedPackage();
    $package_data = $package['data_to_translate'];
    $configuration = $package_data['configuration'];
    $langcode = $this->getLangcode();


    if (TRUE) {
      $response = '';
      return $response;
    }
    else {
      $this->messenger()->addStatus($this->t('Nothing to export.'));
    }

  }

}
