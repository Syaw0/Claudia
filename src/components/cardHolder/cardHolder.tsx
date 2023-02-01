import Card from "../card/card";
import style from "./cardHolder.module.css";

interface CardHolderPropsType {
  cards: CardPropsType[];
}

const CardHolder = ({ cards }: CardHolderPropsType) => {
  return (
    <div data-testid="cardHolder" className={style.holder}>
      {cards.map((card) => {
        return <Card {...card} key={card.name} />;
      })}
    </div>
  );
};

export default CardHolder;
