import CallToAction from "./call-to-action.html.twig";
import data from './call-to-action.data.yml';

export default {
  title: "Bixal/Call to action",
  args: { ...data },
  component: CallToAction,
};

export const Default = {};
