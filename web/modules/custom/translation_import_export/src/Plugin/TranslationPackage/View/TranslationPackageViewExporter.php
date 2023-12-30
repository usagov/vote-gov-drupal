<?php

namespace Drupal\translation_import_export\Plugin\TranslationPackage\View;

use Drupal\views\Views;

/**
 *
 */
class TranslationPackageViewExporter {

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
   *
   */
  public function getDataFromSource() {

    $langcode = $this->package->getLangCode();
    $view_name = $this->package->getViewName();
    $display_id = $this->package->getViewDisplayId();

    // Get the view object.
    $view = Views::getView($view_name);
    $decoded_data = [];
    // Check if the view exists.
    if ($view) {
      // Set the display for the view.
      $view->setDisplay($display_id);

      // Execute the view and get the results.
      $result = $view->executeDisplay();
      $decoded_data = json_decode($result['#markup']->__toString(), TRUE);
    }

    return $decoded_data;
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
      'Export Type' => 'View',
      'Export Date' => date("m-d-Y h:i:s A"),
      'data_to_translate' => $this->getExportedData(),
    ];

    $this->setPackageForDelivery($data);
  }

}
