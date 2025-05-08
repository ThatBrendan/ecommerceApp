import Image from "next/image";

type ItemType = { name: string; price: number; color: string; img: string };

interface BasketItemProps {
  item: ItemType;
  onRemove: (name: string) => void;
}

export default function BasketItem({ item, onRemove }: BasketItemProps) {
  return (
    <div className="row no-gutter checkout-product-box">
      <div className="col-2">
        <Image
          src={item.img}
          alt={`${item.name}`}
          width={50}
          height={50}
          className="checkout-image"
        />
      </div>
      <div className="col-9 checkout-product-text">
        <span className="green-text bold">{item.name}</span>
        <span>
          {item.color} <br /> £{item.price}
        </span>
      </div>
      <div className="col-1 remove-button-container">
        <button onClick={() => onRemove(item.name)} className="remove-button">
          x
        </button>
      </div>
    </div>
  );
}
