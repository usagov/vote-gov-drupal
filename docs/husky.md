# Husky
Husky provides a means of leveraging githooks to include tools such as linting, git-secrets, etc. to provide quality control and increased security measures amoungst other potential reasons.

## Installed Tools/Packages
- Git Secrets

## Installing Husky
To install Husky run `npm install` outside of any Docker container. Run it directly in your naitive OS.

## Git Secrets
The git secrets tool will be used to prevent AWS secrets from being committed within a file or a commit message.

### Installing Git Secrets
You will need to install git-secrets before the commit hooks can execute the git secrets commands. Use the Git Secrets resource link for installation instructions.

## Resources
- Husky - https://typicode.github.io/husky/getting-started.html
- Git Secrets - https://github.com/awslabs/git-secrets