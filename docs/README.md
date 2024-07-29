# Vote.gov developer documentation

## Environments and git branches
List of development environments and their equivalent git branches.

| **Public (static)** | **CMS**            | **Cloud.gov environments** | **Git branch** | **Use case**                                             |
|---------------------|--------------------|----------------------------|----------------|----------------------------------------------------------|
| ssg-dev.vote.gov    | cms-dev.vote.gov   | vote-drupal-dev            | dev            | App work that is ready for testing in cloud.gov          |
| ssg-test.vote.gov   | cms-test.vote.gov  | vote-drupal-test           | test           | Pipeline development work ready for testing in cloud.gov |
| staging.vote.gov    | cms-stage.vote.gov | vote-drupal-stage          | stage          | All work that is ready for release/UAT testing           |
| vote.gov            | cms.vote.gov       | vote-drupal-prod           | prod           | All work that is approved and released                   |

## Table of Contents
- [Git standards](standards.md)
- [Git workflow](workflow.md)
- [Releases](releases.md)
- [DevOps](devops.md)
- [Backend](backend.md)
- [Frontend](frontend.md)
- [QA & Testing](testing.md)
- [Translations](translations.md)
