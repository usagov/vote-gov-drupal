<?php

namespace Drupal\vote_migrate\Plugin\migrate\process;

use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;


/**
 * Perform custom value transformations.
 *
 * @MigrateProcessPlugin(
 *   id = "assign_state_territory_registration_type"
 * )
 *
 * To do custom value conversion use the following:
 *
 * @code
 * field_text:
 *   plugin: assign_state_territory_registration_type
 *   source: text
 * @endcode
 *
 */

class AssignStateTerritoryRegistrationType extends ProcessPluginBase {
	/**
	 * {@inheritdoc}
	*/
	public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
        switch ($value) {
            case 'online':
                return ['online', 'by-mail', 'in-person'];
                break;
            case 'by-mail':
                return ['by-mail', 'in-person'];
                break;
            default:
                return $value;
                break;
        }
	}
}