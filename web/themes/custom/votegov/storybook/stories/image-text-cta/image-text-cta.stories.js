import ImageTextCta from "./image-text-cta.html.twig";
import data from './image-text-cta.data.yml';

export default {
  title: "Image + text CTA",
  args: { ...data },
  component: ImageTextCta,
};

export const Default = {};
