import { ReactNode } from "react";

export interface SettingsInterface {
  gap: number;
  padding: number;
  cardsToShow: number;
  transitionSpeed: number;

  // Control settings
  centerMode: boolean;
  yieldToImages: boolean;
  pagination: boolean;
  touchControls: boolean;
  arrows: boolean;
  nextArrow?: null | ReactNode | HTMLElement;
  prevArrow?: null | ReactNode | HTMLElement;

  // Event hooks
  beforeChange?: (currentIndex: number, nextIndex: number) => void;
  afterChange?: (nextIndex: number) => void;
  onTouchStart?: (startX: number) => void;
  onTouchMove?: (moveX: number) => void;
  onTouchEnd?: () => void;
}

export interface PropsInterface {
  children: null | ReactNode[] | HTMLElement[];
  settings: SettingsInterface;
}

export interface ImperitiveHandleInterface {
  nextCard: () => void;
  prevCard: () => void;
  goToCard: (index: number) => void;
  getCurrentIndex: () => number;
}

export interface PaginationPropsInterface {
  currentIndex: number;
  itemCount: number;
  goToCard: ImperitiveHandleInterface["goToCard"];
}

export interface ArrowPropsInterface {
  nextArrow?: SettingsInterface["nextArrow"];
  prevArrow?: SettingsInterface["prevArrow"];
  currentIndex: number;
  itemCount: number;
  prevCard: ImperitiveHandleInterface["prevCard"];
  nextCard: ImperitiveHandleInterface["nextCard"];
}

export interface getMoveValReturnObj {
  moveVal: number;
  atStart: boolean;
  atEnd: boolean;
}
