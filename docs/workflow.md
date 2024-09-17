# Git workflow guidelines

These are the workflow guidelines that are being used to develop and maintain the vote.gov website.

## Application development task
1. Checkout and pull the latest commits from `dev`
2. Create new branch off `dev` following the [branch name standards](standards.md)
3. Complete changes and add a commit message following [commit standards](standards.md)
4. Create a new PR using `dev` as the target branch following the [PR standards](standards.md)
5. Code Reviewer follows the [Code Review checklist](standards.md) to make sure the code meets the standards and expectations of the task
6. Code Reviewer follows the testing instructions included in the PR description
7. Additionally, QA Engineer runs any manual tests using the [Testing](testing.md) documentation
8. Meanwhile, automated tests run in the pipeline
9. Code Reviewer approves PR or requests revisions
10. QA Engineer approves PR or requests revisions
11. If the PR is approved, the designated code maintainer merges the PR into the target branch using the appropriate [merge strategy](standards.md)
12. Code is deployed to DEV for testing in the cloud.gov environment
13. Approved code marked ready to release will be deployed to STAGE for final testing and approval
15. Work in STAGE will be deployed to PROD in the next scheduled release as a [standard release](releases.md)

## Hotfix development task
1. Checkout and pull the latest commits from `stage`
2. Create new branch off `stage` following the [branch name standards](standards.md)
3. Complete changes and add a commit message following [commit standards](standards.md)
4. Create a new PR using `stage` as the target branch following the [PR standards](standards.md)
5. Code Reviewer follows the [Code Review checklist](standards.md) to make sure the code meets the expectations of the task
6. Code Reviewer follows the testing instructions included in the PR description
7. Additionally, QA Engineer runs any manual tests using the [Testing](testing.md) documentation
8. Meanwhile, automated tests run in the pipeline
9. Code Reviewer approves PR or requests revisions
10. QA Engineer approves PR or requests revisions
11. If the PR is approved, the designated code maintainer merges the PR into the target branch using the appropriate [merge strategy](standards.md)
12. Approved code marked ready to release will be deployed to STAGE for final testing and approval
13. Designated code maintainer creates a PR from STAGE to DEV to sync changes down using appropriate [merge strategy](standards.md)
14. Work in STAGE is deployed to PROD as a [hotfix release](releases.md)

## Infrastructure development task
1. Checkout and pull the latest commits from `stage`
2. Create new branch off `stage` using the [branch name standards](standards.md)
3. Complete changes and add a commit message using [commit standards](standards.md)
4. Create a new PR using `devops` as the target branch using the [PR standards](standards.md)
5. Code Reviewer follows the [Code Review checklist](standards.md) to make sure the code meets the expectations of the task
6. QA Engineer runs any manual tests using the [Testing](testing.md) documentation
7. Meanwhile, automated tests run in the pipeline
8. Code Reviewer approves PR or requests revisions
9. QA Engineer approves PR or requests revisions
10. If the PR is approved, the designated code maintainer merges the PR into the target branch using appropriate [merge strategy](standards.md)
11. Code is deployed to DEVOPS for testing in the cloud.gov environment
12. Approved code deemed ready to release will be deployed to STAGE for final testing and approval
13. Designated code maintainer creates a PR from STAGE to DEV to sync changes down using appropriate [merge strategy](standards.md)
14. Work in STAGE will be deployed to PROD as a [infrastructure release](releases.md)
