<?php

namespace Drupal\vote_migrate\Plugin\migrate\process;

use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;


/**
 * Perform custom value transformations.
 *
 * @MigrateProcessPlugin(
 *   id = "convert_string_to_boolean"
 * )
 *
 * To do custom value conversion use the following:
 *
 * @code
 * field_text:
 *   plugin: convert_string_to_boolean
 *   source: text
 * @endcode
 *
 */

class ConvertStringToBoolean extends ProcessPluginBase {
	/**
	 * {@inheritdoc}
	*/
	public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
		return $value === 'true' ? true : false;
	}
}