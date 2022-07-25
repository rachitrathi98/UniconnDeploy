/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, createRef } from "react";
import ContentEditable from "react-contenteditable";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { Table, Input, InputGroup, InputGroupAddon } from "reactstrap";

import gripVerticalIcon from "../../assets/icons/grip-vertical-solid.svg";
import gripVerticalIconWhite from "../../assets/icons/grip-vertical-solid-white.svg";
import plusIcon from "../../assets/icons/plus.svg";
import cancelIcon from "../../assets/icons/cancel-circle.svg";

// refer : https://reactstrap.github.io/components

// Requires the parent to pass the items,setItems, and placeholder.
const delay = 300;

// Sortable Item in the list
const SortableItem = SortableElement(
  ({ value, state: { items, setItems, index } }) => {
    const [hover, setHover] = useState(false);
    const deleteItem = () => {
      setItems(items.filter((_, i) => index !== i));
    };

    const editItem = (e) => {
      setItems(items.map((item, i) => (i === index ? e.target.value : item)));
      console.log("ITEM : ", items);
    };

    return (
      <tr
        onMouseEnter={() => {
          setHover(!hover);
        }}
        onMouseLeave={() => {
          console.log(hover);
          setHover(!hover);
        }}
      >
        <td className="text-left">
          <img
            alt="grip"
            src={hover ? gripVerticalIcon : gripVerticalIconWhite}
            id="grip"
          />
        </td>
        <td className="text-left" style={{ width: "100%" }}>
          <ContentEditable
            innerRef={createRef()}
            html={value}
            disabled={false}
            onChange={editItem}
          />
        </td>

        <td className="text-right">
          <a
            className={"text-primary"}
            onClick={() => {
              deleteItem();
            }}
          >
            <img alt="cancel" src={cancelIcon} />
          </a>
        </td>
      </tr>
    );
  },
);

// The structure for the list itself
const SortableList = SortableContainer(
  ({ placeholder, state: { items, setItems, newItem, setNewItem } }) => {
    const updateItems = (e) => {
      e.preventDefault();
      if (newItem) setItems([...items, newItem]);
      setNewItem("");
    };

    return (
      <>
        <Table hover>
          <tbody>
            {items.map((value, index) => (
              <SortableItem
                key={`item-${index}`}
                index={index}
                value={value}
                state={{
                  items,
                  setItems,
                  index,
                }}
              />
            ))}
          </tbody>
        </Table>
        <InputGroup>
          <Input
            type="text"
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
            placeholder={placeholder}
            value={newItem}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateItems(e);
            }}
          />

          <InputGroupAddon addonType="append">
            <button
              className="btn btn-primary"
              style={{ zIndex: 1 }}
              onClick={(e) => updateItems(e)}
            >
              <img alt="plus" style={{}} src={plusIcon} />
            </button>
          </InputGroupAddon>
        </InputGroup>
      </>
    );
  },
);

const DynamicList = (props) => {
  const [newItem, setNewItem] = useState(""); //NewItem
  const onSortEnd = ({ oldIndex, newIndex }) => {
    props.setItems(arrayMove(props.items, oldIndex, newIndex));
  };

  return (
    <SortableList
      onSortEnd={onSortEnd}
      state={{
        items: props.items,
        setItems: props.setItems,
        newItem,
        setNewItem,
      }}
      pressDelay={delay}
      placeholder={props.placeholder}
    />
  );
};

export default DynamicList;
