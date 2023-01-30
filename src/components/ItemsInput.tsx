import Display, { DisplayData, defaultDisplayData } from "./Display";

import AddIcon from "../widgets/AddIcon";
import Button from "../widgets/Button";
import DeleteIcon from "../widgets/DeleteIcon";
import TextBox from "../widgets/TextBox";
import { useState } from "react";

interface ItemsInputProps {
  itemType: string;
  onUpdateItems: (items: string[]) => void;
  onDone: () => void;
}

export default function ItemsInput(props: ItemsInputProps) {
  const [items, setItems] = useState<string[]>([""]);
  const [display, setDisplay] = useState<DisplayData>(defaultDisplayData());

  function onAddOption() {
    items.push("");
    setItems([...items]);
  }

  function onRemoveOption(index: number) {
    if (items.length == 1) {
      setItems([""]);
    } else {
      setItems([...items.filter((v, i) => i != index)]);
    }
  }

  function setOptionName(name: string, index: number) {
    items[index] = name;
    setItems([...items]);
  }

  function onDone() {
    const s = new Set<string>();

    // Number of items
    if (items.length < 2) {
      setDisplay({ text: `please input more than one ${props.itemType}`, status: "error" });
      return;
    }

    // Invalid names
    if (items.some((item) => item == "")) {
      setDisplay({ text: `each ${props.itemType} should have a valid name`, status: "error" });
      return;
    }

    // Item uniqueness
    for (let i = 0; i < items.length; i++) {
      if (s.has(items[i])) {
        setDisplay({ text: `each ${props.itemType} should have a unique name`, status: "error" });
        return;
      }
      s.add(items[i]);
    }
    props.onUpdateItems(items);
    props.onDone();
  }

  return (
    <div>
      <div className="mt-8">
        {items.map((item, i) => (
          <div key={i}>
            <ItemInput
              item={item}
              itemType={props.itemType}
              onUpdate={(value) => setOptionName(value, i)}
              onRemove={() => onRemoveOption(i)}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center mt-3 hover:cursor-pointer" onClick={onAddOption}>
        <AddIcon />
        <div className="ml-2 text-slate-500 hover:text-slate-600">another {props.itemType}</div>
      </div>
      <Button className="mt-8 w-48 flex justify-center" text="done" onClick={onDone} />
      <Display className="mt-5" data={display} />
    </div>
  );
}

interface ItemInputProps {
  item: string;
  itemType: string;
  onUpdate: (value: string) => void;
  onRemove: () => void;
}

function ItemInput(props: ItemInputProps) {
  return (
    <div className="flex items-center mt-2">
      <TextBox text={props.item} placeholder={`${props.itemType} name`} onUpdate={(value) => props.onUpdate(value)} />
      <div className="ml-2" onClick={props.onRemove}>
        <DeleteIcon />
      </div>
    </div>
  );
}
