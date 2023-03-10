<?php

namespace Drupal\vote_migrate\Plugin\migrate\process;

use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;


/**
 * Perform custom value transformations.
 *
 * @MigrateProcessPlugin(
 *   id = "convert_state_territory_deadline"
 * )
 *
 * To do custom value conversion use the following:
 *
 * @code
 * field_text:
 *   plugin: convert_state_territory_deadline
 *   source: text
 * @endcode
 *
 */

class ConvertDeadlineStringToDouble extends ProcessPluginBase {
	/**
	 * {@inheritdoc}
	*/
	public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
        $value = preg_replace('/[^0-9]/', '', $value);
		return is_numeric($value) ? (double)$value : 0;
	}
}