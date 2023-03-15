<?php

namespace Drupal\vote_migrate\Controller;

use Drupal\Component\Serialization\Json;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Combining our JSON APIs.
 */
class StateTerritoryTranslationJsonController {

  /**
   * Callback for the API.
   */
  public function getJson(string $langcode) {

    $uri_arr = [
      'https://raw.githubusercontent.com/usagov/vote-gov/staging/data/translations/' . $langcode . '/state-data.json',
    ];

    foreach($uri_arr as $uri) {
      try {
        $response = \Drupal::httpClient()->get($uri, array('headers' => array('Accept' => 'application/json')));
        $data[] = Json::decode($response->getBody());
      }
      catch  (RequestException $e) {
        return FALSE;
      }
    }

    return new JsonResponse([
      'data' => $this->getResults($data, $langcode),
      'method' => 'GET',
    ]);
  }

  /**
   * A helper function returning results.
   */
  public function getResults($data, $langcode) {
    $json = [];
    foreach($data as $data_set) {
      foreach($data_set as $state_code => $state) {
        $json[$state_code] = isset($json[$state_code]) ? array_merge($json[$state_code], $state) : $state;
        $json[$state_code]['migration_id'] = $state_code . '_' . $langcode;
        $json[$state_code]['state_abbreviation'] = $state_code; 
        $json[$state_code]['langcode'] = $langcode; 
      }
    }
    return $json;
  }
}