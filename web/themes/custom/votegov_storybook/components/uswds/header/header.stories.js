import Header from "./header.html.twig";
import data from './header.data.yml';

export default {
  title: "USWDS/Header",
  args: { ...data },
  component: Header,
};

export const Default = {};
