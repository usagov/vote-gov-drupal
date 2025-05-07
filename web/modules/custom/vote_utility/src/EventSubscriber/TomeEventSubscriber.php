<?php

namespace Drupal\vote_utility\EventSubscriber;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Site\Settings;
use Drupal\tome_static\Event\CollectPathsEvent;
use Drupal\tome_static\Event\PathPlaceholderEvent;
use Drupal\tome_static\Event\TomeStaticEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * This event subscriber modifies static site generation.
 *
 *  - During path collection, removes excluded directories -- allowing us to
 *    specify the omission of entire directories like jsonapi, node, etc.
 *
 * @internal
 */
class TomeEventSubscriber implements EventSubscriberInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The language manager.
   *
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * Constructs the EntityPathSubscriber object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\Core\Language\LanguageManagerInterface $language_manager
   *   The language manager.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, LanguageManagerInterface $language_manager) {
    $this->entityTypeManager = $entity_type_manager;
    $this->languageManager = $language_manager;
  }

  /**
   * Reacts to a collect paths event.
   *
   * Excludes entire directories by deleting any paths that match the specified
   * string, or that start with the string and a /.
   *
   * Such directories come from the setting
   * usagov_tome_static_path_exclude_directories.
   *
   * (To exclude individual paths, set tome_static_path_exclude -- it's
   * built in.)
   *
   * @param \Drupal\tome_static\Event\CollectPathsEvent $event
   *   The collect paths event.
   */
  public function excludeDirectories(CollectPathsEvent $event): void {
    $excluded_directories = self::getExcludedDirectories();
    $paths = $event->getPaths(TRUE);
    foreach ($paths as $path => $metadata) {
      /*
       * We are going to spend the time here to get the "real" paths for any
       * placeholder-ed paths, so we can identify and exclude what we want to
       * skip.
       * Tome would normally do this later in its process.
       */
      $path_parts = explode(':', $path);
      if ($path_parts[0] == '_entity') {
        $entity_type = $path_parts[1];
        $langcode = $path_parts[2];
        $entity_id = $path_parts[3];

        $entity = $this->entityTypeManager->getStorage($entity_type)->load($entity_id);
        // ContentEntityBase interface require the
        // getTranslation()/hasTranslation() methods.
        if (!$entity || (!$entity instanceof ContentEntityBase) || !$entity->hasTranslation($langcode)) {
          continue;
        }
        $entity = $entity->getTranslation($langcode);
        $url = $entity->toUrl('canonical');
        if (!$entity->access('view') || ($entity->isDefaultTranslation() && !$url->access())) {
          continue;
        }
        if ($newpath = parse_url($url->toString(), PHP_URL_PATH)) {
          unset($paths[$path]);
          $metadata['original_path'] = $path;
          // Next block tests $path against excluded directories.
          $path = $newpath;
          $paths[$path] = $metadata;
        }
      }

      // Clean up base path.
      $base_path = rtrim(trim(base_path()), '/');

      foreach ($excluded_directories as $excluded_directory_path) {
        // Append trailing slash.
        $excluded_directory = $excluded_directory_path . '/';
        // Create translated path pattern to exclude all translated paths for a
        // given path exclusion.
        $pattern = '/^(\/[a-z]+(-[a-z]+)?)?' . preg_quote($excluded_directory_path, '/') . '\//';
        // Check if the path matches the excluded directory or its translated
        // version.
        if ((
          // Exact match with excluded path.
          $path == $excluded_directory_path) ||
          // Exact match with base + excluded path.
          ($path == $base_path . $excluded_directory_path) ||
          // Metadata exact match.
          (isset($metadata['original_path']) && $metadata['original_path'] == $excluded_directory_path) ||
          // Exlude translated excluded path.
          (preg_match($pattern, $path))) {
          // Remove the path if it matches any condition.
          unset($paths[$path]);
        }
        elseif (
          // Path starts with excluded directory.
          str_starts_with($path, $excluded_directory) ||
          // Path starts with base + excluded directory.
          str_starts_with($path, $base_path . $excluded_directory) ||
          // Metadata starts with excluded directory.
          (isset($metadata['original_path']) && str_starts_with($metadata['original_path'], $excluded_directory))
        ) {
          // Remove the path if it starts with an excluded directory.
          unset($paths[$path]);
        }
      }
    }

    $event->replacePaths($paths);
  }

  /**
   * Returns per-site excluded directory paths.
   *
   * @return array<mixed>
   *   An array of excluded paths.
   */
  public static function getExcludedDirectories(): array {
    $excluded_paths = [];
    $site_paths = Settings::get('vote_tome_static_path_exclude_directories', []);

    if (is_array($site_paths)) {
      foreach ($site_paths as $path) {
        $excluded_paths[] = $path;
      }
    }
    return $excluded_paths;
  }

  /**
   * Prevent exporting paths Tome might discover after the collect paths event.
   */
  public function excludeInvalidPaths(PathPlaceholderEvent $event) {
    $path = $event->getPath();

    if ($path !== '/' && str_ends_with($path, '/')) {
      // Tome should never request a translated homepage or any other local path
      // with a trailing-slash. If it does request it, that is because the path
      // was found in the content of a node or term.
      // For example, when tome runs and it finds a link to `/es/`, Drupal will
      // redirect the request for `/es/` to `/es`. The response causes Tome to
      // save it in the contents of `es/index.html` with an refresh redirect.
      $event->setInvalid();
      return;
    }

    if (preg_match('/([a-z]+(-[a-z]+)?\/)?node\/\d+$/', $path)) {
      $event->setInvalid();
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[TomeStaticEvents::COLLECT_PATHS][] = ['excludeDirectories'];
    $events[TomeStaticEvents::PATH_PLACEHOLDER][] = ['excludeInvalidPaths'];
    return $events;
  }

}
