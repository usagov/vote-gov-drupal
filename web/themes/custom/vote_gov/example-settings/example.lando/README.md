# Lando setup

[Lando](https://lando.dev/) is a self-contained local development environment powered by Docker desktop. For documentation, go to [https://docs.lando.dev/basics/](https://docs.lando.dev/basics/).

> Lando is for developers who want to:

* Quickly specify and painlessly spin up the services and tooling needed to develop all their projects.
* Ship these local development dependencies in a per-project, lives-in-git config file
* Automate complex build steps, testing setups, deployments or other repeated-more-than-once workflows

The files contained with this directory provide a basic scaffold for getting started with Lando. To get up and running:

1. Install the latest stable release of Lando here: https://github.com/lando/lando/releases/latest
2. This will also install Docker so if you have docker installed already, Lando's version will replace it as it needs to match the Lando release.
3. Copy `.lando.yml` from `vote_gov/example-settings/example.lando/.lando.yml` to the root of your project.
4. Copy the folder at `vote_gov/example-settings/example.lando/lando` to the root of your project. The `php. ini` file within contains everything you need to get up and running with Xdebug using PHPStorm. For VS Code, see web/`vote_gov/example-settings/example.vscode` directory's readme file.
5. To start your project, run `lando start`.
6. You can run the command `lando` to see help and `lando info` to see information with regard to your project.

