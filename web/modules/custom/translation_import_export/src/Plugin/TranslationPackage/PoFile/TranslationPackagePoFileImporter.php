<?php

namespace Drupal\translation_import_export\Plugin\TranslationPackage\PoFile;

use Drupal\Component\Gettext\PoStreamWriter;
use Drupal\translation_import_export\PoTranslationPackageReader;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 *
 */
class TranslationPackagePoFileImporter {
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
    return 'translation_' . $this->getLangcode() . '.po';
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
    // Will need to write a custom POWriter
    // to output text for the POReader.
    return '';
  }

  /**
   *
   */
  public function getImporterResponse() {

    $package = $this->getReceivedPackage();
    $package_data = $package['data_to_translate'];
    $langcode = $this->getLangcode();
    $download_filename = $this->getDownloadFilename();
    $reader = new PoTranslationPackageReader();
    $reader->setPackage($package_data);

    $item = $reader->readItem();

    if (!empty($item)) {
      $filesystem = \Drupal::service('file_system');
      $uri = $filesystem->tempnam('temporary://', 'po_');
      $header = $reader->getHeader();
      // $header->setProjectName('Default Project Name');
      $header->setLanguageName(\Drupal::languageManager()->getLanguageName($langcode));

      $writer = new PoStreamWriter();
      $writer->setURI($uri);
      $writer->setHeader($header);

      $writer->open();
      $writer->writeItem($item);
      $writer->writeItems($reader);
      $writer->close();

      $response = new BinaryFileResponse($uri);
      $response->setContentDisposition('attachment', $download_filename);

      return $response;
    }
    else {
      $this->messenger()->addStatus($this->t('Nothing to export.'));
    }

  }

}
