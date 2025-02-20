import Hero from "./hero.html.twig";
import data from './hero.data.yml';
import data_homepage from './hero-homepage.data.yml';

export default {
  title: "Hero",
  component: Hero,
};

export const Homepage = {
  args: { ...data_homepage },
}

export const Dark = {
  args: { ...data },
}