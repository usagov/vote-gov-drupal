# Bixal USWDS v3 Theme

## General methodology

The idea behind this theme is to present a basis for using USWDS 3 in Drupal while at the same time following all the best practices that USWDS suggests to be followed with the advent of version 3 being released during the summer of 2022.

## Follow USWDS 3 best practices

More information is provided below but as a general rule, the idea here is to not write custom CSS unless you are building a custom component. There are few exceptions, for example in `bixal_uswds/src/sass/uswds-overrides` where there were a few cases of there not being a specific setting from USWDS. Even so, these files use USWDS mixins and functions.

## Use Lando and USWDS Compile!

It's imperative that you at least use USWDS compile which is in the `package.json` file and for an enhanced experience, use the provided Lando file in the `example-settings` folder. Then, you can run lando gulp and everything should just work. This theme was built with all that in mind so as to give everyone a uniform experience. If you go off the rails and do your own thing with the front-end build, it may be hard to provide support.

## Get Started

Once you setup Lando with the Lando file provided in the `example-settings` folder, cd into the theme folder and run `lando gulp`. That is all you need to do to start making CSS and USWDS theme updates.

When you run lando gulp you will see 2 URLs that come up in terminal with a port number appended. If you visit one of these URLs, you will get automatic reloading on save via BrowserSync. Note that compiling USWDS CSS can take up to 30 seconds.

## Overview of things to keep in mind.

Keep theme Sass files lean and simple. That is to say, think before you write custom css. There may be a setting for what you are trying to change. In fact there are hundreds of settings that can be used to override something in USWDS core listed on [the USWDS settings page](https://designsystem.digital.gov/documentation/settings/). And by core, we mean whatever is within `bixal_uswds/node_modules/@uswds/uswds`.

## The old vs the new method

The old method in version 2 seemed to be to copy all those sass files from the `node_modules` folder and then modify those as you liked. There were many downsides to that method but now with USWDS 3, we do not need to do that anymore.

At the heart of the theme is the file, `bixal_uswds/src/sass/_uswds-theme.scss`. This is where you will do any overrides from known settings from the aforementioned USWDS settings page. If you cannot find a setting for what you’d like to override, there are a few options in order of importance.

- Search the USWDS documentation

  1.  [Components overview](https://designsystem.digital.gov/components/overview/)
  2.  [Design Tokens](https://designsystem.digital.gov/design-tokens/)
  3.  [Utilities](https://designsystem.digital.gov/utilities/)
  4.  [Settings](https://designsystem.digital.gov/documentation/settings/)

If there is not an explicit setting for what you need to do, it may be that the maintainers of USWDS do not want you to change whatever you are trying to change. You may need to check with them to clarify things.

## Drupal USWDS theming principles

Here is a list of best practices for theming USWDS within Drupal

- Use Twig field Value and Twig Tweak within entity templates. By using these theming helper modules, you can remove drupal field templates. This is a good thing as field templates will often get in the way of adhering to USWDS markup. For example, in a Paragraphs template, you might have a field called `field_bx_title_eyebrow`. Using Twig field value, you would write that as `{{ content.field_bx_title_eyebrow | field_value }}`.

```twig
{% if content.field_bx_title_eyebrow %}
    <span class="usa-hero__heading--alt">
    {{ content.field_bx_title_eyebrow | field_value }}
    </span>
    {{ content.field_bx_title | field_value }}
{% endif %}
```

This method generally cuts out Drupal field templates and greatly simplifies the HTML markup as well as reducing the DOM load.

## Custom USWDS CSS examples

If you do get to the point of needing to write custom CSS, you will have built in tools to help. You can first search the node modules folder for a mixin or other function to use which will most likely work inside the `bixal_uswds` theme. So for example, let’s say you wanted to change the font size of `usa-hero__heading`.

Rather than this:

```css
.usa-hero__heading {
  font-size: 22px;
}
```

Do one of these below:

```css
.usa-hero__heading {
  @include typeset-h3;
}
```

Or:

```css
.usa-hero__heading {
  font-size: font-size($theme-header-font-family, 7);
}
```

Or:

```css
.usa-hero__heading {
  font-size: font-size($theme-header-font-family, "lg");
}
```

## Custom USWDS CSS mixin examples

Here is an example of using USWDS mixins, the example below is a bit nonsensical but it shows off the capabilities of the mixins.

```css
.my-element {
  @include u-display("flex");
  @include u-flex("column", "wrap");
  @include u-border-bottom(2px, "solid", "primary");
  @include u-text("primary");
  @include u-bg("white");
  @include u-padding-top(3);
  @include u-margin-bottom(3);
}
```

You can view the USWDS documentation for utilities to see more examples at [https://designsystem.digital.gov/utilities/](https://designsystem.digital.gov/utilities/). Each page within this section has documentation for mixins. You can also look in USWDS core for other examples.

## Resources

- [USWDS](https://designsystem.digital.gov/)
- [Components overview](https://designsystem.digital.gov/components/overview/)
- [Design Tokens](https://designsystem.digital.gov/design-tokens/)
- [Utilities](https://designsystem.digital.gov/utilities/)
- [Settings](https://designsystem.digital.gov/documentation/settings/)
