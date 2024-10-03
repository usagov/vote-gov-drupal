# Git standards
## Branch naming standards
All branch names should follow the guidelines below. The branch names should be assembled using the ticket number and a short description with the correct prefix based on the type of task. See examples below.

| **Type of task** | **Example**                        |
|------------------|------------------------------------|
| Standard task    | feature/VOTE-000-short-description |
| Bug task         | bug/VOTE-000-short-description     |
| Hotfix task      | hotfix/VOTE-000-short-description  |
**Note:** try to make the short description 4 words or less

## Commit standards
**Commit message:**
The message must include the ticket number and a brief message describing specifically what the modifications represent. Use present tense action verbs. For example, use “Add” instead of Adding and “Update” instead of updated.  (Example: “VOTE-375 Add new gulp task for compiling svg sprites”)

**Commit tips:**
- Only commit modified files related to the task.
- Don't change code formatting in the same commit as your modifications. Open a new ticket to reformat files as needed.
- Use the minimum amount of commits when possible.
- Avoid merges in your branch unless you need to resolve a merge conflict.
- Make sure complex code is sufficiently commented.

## Pull request standards
Follow the pull request template for instructions on the standards. Review the standards in this document here:
[https://github.com/usagov/vote-gov-drupal/blob/dev/.github/pull_request_template.md](https://github.com/usagov/vote-gov-drupal/blob/dev/.github/pull_request_template.md)

### Pull Request Checklist (Reference only)
Please ensure you have addressed all concerns below before marking a PR "ready for review".
- No merge conflicts exist with the target branch.
- Primary commit message follows the commit message standards.
- PR title is either of the format VOTE-### Add Short Description matching the associated Jira ticket (i.e. "VOTE-375 Add new gulp task for compiling svg sprites").
- Target branch is set correctly
- Automated pipeline tests have passed.
- At least one “Reviewer has been specified.


## Code review checklist
- Check that PR standards were followed
- Check the target branch of the PR to make sure it’s set correctly
- Review files modified tab and check that the modified files relate to the task.
- Make sure you only see authors commits in the commit list (if you see someone else's commits in the PR there might be something wrong).
- Check basic logic of the code.
- Check for coding best practices (to the best of your ability).
- Check for insufficiently commented code.

## Merge strategy guidance
- PRs merged into `dev` branch should use the "Squash and merge" method, ensuring that every commit starts with a ticket number followed by a brief description of changes.
  - **Special case**: A merge from the `stage` branch to the `dev` branch needs to maintain history and should use the "Create a merge commit" method instead.
- PRs merged into `stage` branch should use the "Create a merge commit" method, this is critical for maintaining commit history and ids in all environment branches.
- PRs merged into `prod` branch should also use the "Create a merge commit" method.
