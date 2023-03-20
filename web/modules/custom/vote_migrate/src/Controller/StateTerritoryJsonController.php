<?php

namespace Drupal\vote_migrate\Controller;

use Drupal\Component\Serialization\Json;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Combining our JSON APIs.
 */
class StateTerritoryJsonController {

  /**
   * Callback for the API.
   */
  public function getJson() {
    $uri_arr = [
      'https://raw.githubusercontent.com/usagov/vote-gov/staging/data/states.json',
      'https://raw.githubusercontent.com/usagov/vote-gov/staging/data/translations/en/state-data.json',
    ];
    foreach ($uri_arr as $uri) {
      try {
        $response = \Drupal::httpClient()->get($uri, ['headers' => ['Accept' => 'application/json']]);
        $data[] = Json::decode($response->getBody());
      }
      catch (RequestException $e) {
        return FALSE;
      }
    }
    return new JsonResponse([
      'data' => $this->getResults($data),
      'method' => 'GET',
    ]);
  }

  /**
   * A helper function returning results.
   */
  public function getResults($data) {
    $json = [];
    foreach ($data as $data_set) {
      foreach ($data_set as $state_code => $state) {
        $json[$state_code] = isset($json[$state_code]) ? array_merge($json[$state_code], $state) : $state;
      }
    }
    return $json;
  }

}
