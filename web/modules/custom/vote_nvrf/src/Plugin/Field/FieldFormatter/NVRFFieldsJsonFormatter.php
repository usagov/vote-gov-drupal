<?php

namespace Drupal\vote_nvrf\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\rest_views\SerializedData;
use Drupal\taxonomy\Entity\Term;
/**
 * Plugin implementation of the 'field_nvrf_fields_json' formatter.
 *
 * @FieldFormatter(
 *   id = "field_nvrf_fields_json",
 *   label = @Translation("JSON Format"),
 *   field_types = {"field_nvrf_fields"}
 * )
 */
class NVRFFieldsJsonFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $element = [];
    foreach ($items as $delta => $item) {
        
        $nvrf_field_tid = $item->get('nvrf_field')->getValue();
        $required = $item->get('required')->getValue();
        $term = Term::load($nvrf_field_tid);
        //kint($term);

        $tid = 11;
        $data = ['req' => '1', 'title'=>'name', 'ext'=>'art'];
        $element[$delta] = [
            '#type' => 'data',
            '#data' => SerializedData::create($term),
          ];
        unset($element[$delta]['#plain_text']);
          
        
        // Render each element as markup.
        //$element[$delta] = ['#markup' => '"links":"test", "ter":0'];
    }
    //kint($element);
    return $element;
  }

}
