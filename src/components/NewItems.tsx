import Display, { DisplayData, defaultDisplayData } from "./Display";

import AddIcon from "../widgets/AddIcon";
import Button from "../widgets/Button";
import DeleteIcon from "../widgets/DeleteIcon";
import TextBox from "../widgets/TextBox";
import { useState } from "react";

interface NewItemsProps {
  itemType: [string, string];
  onNext: (items: string[]) => void;
}

export default function NewItems(props: NewItemsProps) {
  const [items, setItems] = useState<string[]>(["", ""]);
  const [display, setDisplay] = useState<DisplayData>(defaultDisplayData());
  const [itemTypeS, itemTypeP] = props.itemType;

  function onAddOption() {
    if (items.length === 5) {
      setDisplay({ text: `connot compare more than 5 ${itemTypeP}`, status: "error" });
      return;
    }

    items.push("");
    setItems([...items]);
  }

  function onRemoveOption(index: number) {
    let newItems = [...items.filter((v, i) => i != index)];
    if (newItems.length == 1) {
      newItems.push("");
    }
    setItems(newItems);
  }

  function setOptionName(name: string, index: number) {
    items[index] = name;
    setItems([...items]);
  }

  function onNext() {
    const s = new Set<string>();

    // Number of items
    if (items.length < 2) {
      setDisplay({ text: `please input more than one ${itemTypeS}`, status: "error" });
      return;
    }

    // Invalid names
    if (items.some((item) => item == "")) {
      setDisplay({ text: `each ${itemTypeS} should have a valid name`, status: "error" });
      return;
    }

    // Item uniqueness
    for (let i = 0; i < items.length; i++) {
      if (s.has(items[i])) {
        setDisplay({ text: `each ${itemTypeS} should have a unique name`, status: "error" });
        return;
      }
      s.add(items[i]);
    }
    props.onNext(items);
  }

  return (
    <div className="mt-8">
      <div>
        {items.map((item, i) => (
          <div key={i}>
            <NewItem
              item={item}
              itemType={props.itemType}
              itemNumber={i + 1}
              onUpdate={(value) => setOptionName(value, i)}
              onRemove={() => onRemoveOption(i)}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 inline-block" onClick={onAddOption}>
        <div className="flex items-center hover:cursor-pointer">
          <AddIcon />
          <div className="ml-2 text-slate-500 hover:text-slate-700">another {itemTypeS}</div>
        </div>
      </div>
      <Display className="mt-8" data={display} />
      <Button className="mt-5" text="next" onClick={onNext} />
    </div>
  );
}

interface NewItemProps {
  item: string;
  itemType: [string, string];
  itemNumber: number;
  onUpdate: (value: string) => void;
  onRemove: () => void;
}

function NewItem(props: NewItemProps) {
  const [itemTypeS, itemTypeP] = props.itemType;

  return (
    <div className="flex items-center mt-2">
      <TextBox
        text={props.item}
        placeholder={`${itemTypeS} ${props.itemNumber}`}
        onUpdate={(value) => props.onUpdate(value)}
      />
      <div className="ml-2" onClick={props.onRemove}>
        <DeleteIcon />
      </div>
    </div>
  );
}
