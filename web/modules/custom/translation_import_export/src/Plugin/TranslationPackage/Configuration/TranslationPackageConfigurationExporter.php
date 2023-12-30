<?php

namespace Drupal\translation_import_export\Plugin\TranslationPackage\Configuration;

/**
 *
 */
class TranslationPackageConfigurationExporter {
  /**
   *
   */
  private $package;

  /**
   *
   */

  private $exportedData;
  /**
   *
   */
  private $packageForDelivery;

  /**
   *
   */
  public function export($package) {
    $this->package = $package;
    $data = $this->getDataFromSource();
    $this->setExportedData($data);
  }

  /**
   * Get data from provided source.
   */
  public function getDataFromSource() {
    // The source is the data in this case.
    return $this->package->getSource();
  }

  /**
   *
   */
  public function getExportedData() {
    return $this->exportedData;
  }

  /**
   *
   */
  public function getPackage() {
    $this->preparePackage();
    return $this->getPackageForDelivery($encoded = TRUE);
  }

  /**
   *
   */
  public function getPackageForDelivery($encoded = FALSE) {
    $data = $this->packageForDelivery;
    if ($encoded) {
      $data = json_encode($data);
    }

    return $data;
  }

  /**
   *
   */
  public function setExportedData($data) {
    $this->exportedData = $data;
  }

  /**
   *
   */
  public function setPackageForDelivery($data) {
    $this->packageForDelivery = $data;
  }

  /**
   *
   */
  public function prepareData($instructions) {
    // No instructions to alter data before packaging.
  }

  /**
   *
   */
  public function preparePackage() {
    // Use this to prepare the contents of the finalized
    // package for delivery.
    $data = [
      'Export Type' => 'Configuration',
      'Export Date' => date("m-d-Y h:i:s A"),
      'data_to_translate' => $this->getExportedData(),
    ];

    $this->setPackageForDelivery($data);
  }

}
