import FeatureCards from "./feature-cards.html.twig";
import data from './feature-cards.data.yml';

export default {
  title: "Feature cards",
  args: { ...data },
  component: FeatureCards,
};

export const Default = {};
