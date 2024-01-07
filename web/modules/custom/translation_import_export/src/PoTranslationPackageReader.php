<?php

namespace Drupal\translation_import_export;

use Drupal\Component\Gettext\PoHeader;
use Drupal\Component\Gettext\PoItem;
use Drupal\Component\Gettext\PoReaderInterface;

/**
 * Gettext PO reader working with the locale module database.
 */
class PoTranslationPackageReader implements PoReaderInterface {

  /**
   * An associative array indicating which type of strings should be read.
   *
   * Elements of the array:
   *  - not_customized: boolean indicating if not customized strings should be
   *    read.
   *  - customized: boolean indicating if customized strings should be read.
   *  - no_translated: boolean indicating if non-translated should be read.
   *
   * The three options define three distinct sets of strings, which combined
   * cover all strings.
   *
   * @var array
   */
  private $options;

  /**
   * Language code of the language being read from the database.
   *
   * @var string
   */
  private $langcode;

  /**
   * Store the result of the query so it can be iterated later.
   *
   * @var resource
   */
  private $packageData;

  /**
   * Constructor, initializes with default options.
   */
  public function __construct() {
    $this->setOptions([]);
  }

  /**
   *
   */
  public function setPackage($package_data) {
    $this->packageData = $package_data;
    $this->formatPackage();
  }

  /**
   *
   */
  public function formatPackage() {
    $package_data = $this->packageData;
    $formatted_data = [];

    foreach ($package_data as $context => $data) {

      if (empty($context) && is_array($data)) {

        foreach ($data as $source_string => $translation) {

          $formatted_data[] = [
            'source' => $source_string,
            'translation' => $translation,
          ];
        }
      }
      elseif (!empty($context) && is_array($data)) {
        foreach ($data as $source_string => $translation) {
          $formatted_data[] = [
            'context' => $context,
            'source' => $source_string,
            'translation' => $translation,
          ];
        }
      }
    }
    $this->packageData = $formatted_data;
  }

  /**
   * {@inheritdoc}
   */
  public function getLangcode() {
    return $this->langcode;
  }

  /**
   * {@inheritdoc}
   */
  public function setLangcode($langcode) {
    $this->langcode = $langcode;
  }

  /**
   * Get the options used by the reader.
   */
  public function getOptions() {
    return $this->options;
  }

  /**
   * Set the options for the current reader.
   */
  public function setOptions(array $options) {
    $options += [
      'customized' => FALSE,
      'not_customized' => FALSE,
      'not_translated' => FALSE,
    ];
    $this->options = $options;
  }

  /**
   * {@inheritdoc}
   */
  public function getHeader() {
    return new PoHeader($this->getLangcode());
  }

  /**
   * Implements Drupal\Component\Gettext\PoMetadataInterface::setHeader().
   *
   * @throws \Exception
   *   Always, because you cannot set the PO header of a reader.
   */
  public function setHeader(PoHeader $header) {
    throw new \Exception('You cannot set the PO header in a reader.');
  }



  /**
   * Get the database result resource for the given language and options.
   */
  private function readPackageData() {
    return array_shift($this->packageData);
  }

  /**
   * {@inheritdoc}
   */
  public function readItem() {
    if ($item = $this->readPackageData()) {
      $po_item = new PoItem();
      $po_item->setFromArray($item);
      return $po_item;
    }
  }

}
