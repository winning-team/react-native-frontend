import React from "react";
import {
  Charmander,
  Dog,
  King,
  LinkSprite,
  Pikachu,
  Sonic,
  Trainer
} from "../assets";

export const getSprite = (spriteId, width) => {
  switch (spriteId) {
    case 1:
      return <Charmander width={width} />;
    case 2:
      return <Dog width={width} />;
    case 3:
      return <King width={width} />;
    case 4:
      return <LinkSprite width={width} />;
    case 5:
      return <Pikachu width={width} />;
    case 6:
      return <Sonic width={width} />;
    default:
      return <Sonic width={width} />;
  }
};
