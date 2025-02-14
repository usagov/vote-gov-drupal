import Quicklinks from "./quicklinks.html.twig";
import data from './quicklinks.data.yml';

export default {
  title: "Quicklinks",
  args: { ...data },
  component: Quicklinks,
};

export const Default = {};
