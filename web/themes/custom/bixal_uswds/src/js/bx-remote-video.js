/**
 * Misc Remove Video JS functions.
 * @file
 */
// Always use "use strict";
"use strict";

(function (Drupal, drupalSettings, once) {
  Drupal.behaviors.uswdsRemoteVideo = {
    attach: function (context, settings) {
      /**
       * The code in this file enhances the remote video
       * experience by making the iframe title unique as
       * YouTube has 2 iframes with the same title and thus
       * it gets flagged by a11y checks.
       * This also adds an inline style for each iframe with the
       * aspect ratio which is important for responsive video.
       */

      // Aspect ratio function for inline style CSS.
      const aspectRatio = (width, height) => {
        // Put the width over the height to be
        // rendered later as an inline style.
        // e.g. <div style="aspect-ratio: 16 / 9;"></div>
        // e.g. <div style="aspect-ratio: 4 / 3;"></div>
        return `${width} / ${height}`;
      };

      // Get all video wrap elements.
      const iframeVideos = once(
        "iframe-videos",
        context.querySelectorAll(".video-wrap")
      );
      // Spread the array to get all iterable items.
      const iframeVideo = [...iframeVideos];
      // Loop each.
      iframeVideo.forEach((item) => {
        // Get the data element for the video provider.
        const videoProvider = item.dataset.videoProvider;
        // Get the iframe.
        const iframeItem = item.querySelector("iframe");
        // Reset the iframe title with the provider appended.
        const iframeTitle = iframeItem.getAttribute("title");
        // Set the new title with the data added.
        iframeItem.setAttribute(
          "title",
          videoProvider + Drupal.t(" Video: ") + iframeTitle
        );

        // Get width and height of the iframe so we can set the aspect ratio.
        const iframeWidth = iframeItem.getAttribute("width");
        const iframeHeight = iframeItem.getAttribute("height");
        // Call the custom function and implement as an inline style.
        item.style.aspectRatio = aspectRatio(iframeWidth, iframeHeight);
      });
    },
  };
})(Drupal, drupalSettings, once);
