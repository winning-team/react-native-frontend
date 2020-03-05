import React from "react";
import {
  Charmander,
  Dog,
  King,
  LinkSprite,
  Pikachu,
  Snorlax,
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
      return <Snorlax width={width} />;
    case 7:
      return <Sonic width={width} />;
    case 8:
      return <Trainer width={width} />;
    default:
      return <Sonic width={width} />;
  }
};
