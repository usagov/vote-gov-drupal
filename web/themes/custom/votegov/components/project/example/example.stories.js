import Example from "./example.html.twig";
import data from './example.data.yml';
import "./src/example.style.scss";
import "./src/example.behavior.js";

export default {
  title: "Project/Example",
  args: { ...data },
  component: Example,
};

export const Default = {};
