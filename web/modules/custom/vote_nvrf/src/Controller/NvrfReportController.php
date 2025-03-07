<?php

declare(strict_types=1);

namespace Drupal\vote_nvrf\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for NVRF report routes.
 */
final class NvrfReportController extends ControllerBase {

  /**
   * Builds the response.
   */
  public function __invoke(): array {

    $build['content'] = [
      '#type' => 'inline_template',
      '#template' => '
<dl class="admin-list">
<div class="admin-item">
<dt class="admin-item__title">
<a href="/admin/nvrf-state-report" class="admin-item__link">NVRF State report</a>
</dt>
<dd class="admin-item__description">
State specific NVRF data coming from the state content type.
</dd>
</div>

<div class="admin-item">
<dt class="admin-item__title">
<a href="/admin/nvrf-state-report/fields" class="admin-item__link">NVRF State field report</a>
</dt>
<dd class="admin-item__description">
State specific NVRF form field settings data coming from the state content type.
</dd>
</div>

<div class="admin-item">
<dt class="admin-item__title">
<a href="/admin/nvrf-fields" class="admin-item__link">NVRF form field report</a>
</dt>
<dd class="admin-item__description">
NVRF form field data coming from the NVRF field taxonomy type.
</dd>
</div>

<div class="admin-item">
<dt class="admin-item__title">
<a href="/admin/content?title=&type=nvrf_page&status=1&langcode=en" class="admin-item__link">NVRF page display content</a>
</dt>
<dd class="admin-item__description">
NVRF display content rendered in the app that is used for different steps of the form.
</dd>
</div>

<div class="admin-item">
<dt class="admin-item__title">
<a href="/admin/content/block/27" class="admin-item__link">NVRF display content</a>
</dt>
<dd class="admin-item__description">
NVRF display content rendered in the app that may been specific to steps or other labels.
</dd>
</div>
            </dl>',
    ];

    return $build;
  }

}
