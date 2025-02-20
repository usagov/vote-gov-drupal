import DoubleDeckCard from "./double-deck-card.html.twig";
import data from './double-deck-card.data.yml';

export default {
  title: "Double deck card",
  args: { ...data },
  component: DoubleDeckCard,
};

export const Default = {};
