import { useEffect, RefObject } from "react";

const events: string[] = [`mousedown`, `touchstart`];

export default function useClickOutside(
  refs: RefObject<HTMLElement>[],
  onClickOutside: () => void,
): void {
  const isOutside = (element: EventTarget | null): boolean =>
    refs.every((ref) => !ref.current || !ref.current.contains(element as Node));

  const onClick = (event: MouseEvent | TouchEvent): void => {
    if (isOutside(event.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    events.forEach((event) => document.addEventListener(event, onClick as EventListener));

    return () => {
      events.forEach((event) => document.removeEventListener(event, onClick as EventListener));
    };
  }, [onClickOutside, refs]);
}
