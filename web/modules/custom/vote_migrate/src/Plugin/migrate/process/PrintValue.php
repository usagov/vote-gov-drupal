<?php

namespace Drupal\vote_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Perform custom value transformations.
 *
 * @MigrateProcessPlugin(
 *   id = "printval"
 * )
 *
 * To do custom value conversion use the following:
 *
 * @code
 * field_text:
 *   plugin: printval
 *   source: text
 * @endcode
 */
class PrintValue extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    print_r("Value: " . $value . "\n");
  }

}
