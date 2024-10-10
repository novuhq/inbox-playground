import { useCallback } from 'react';

// Define the shape of the window object with plausible
interface WindowWithPlausible extends Window {
  plausible?: (eventName: string, options: { props: Record<string, any> }) => void;
}

declare const window: WindowWithPlausible;

const useLandingSimpleTracking = (): (() => void) =>
  useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const converted = localStorage.getItem('converted');
    const url = localStorage.getItem('conversion');

    if (converted) {
      return;
    }

    localStorage.setItem('converted', 'true');
    window.plausible?.('SignupClick', {
      props: {
        landing: url,
      },
    });
  }, []);

export const buttonClick = (event: string, moreProps: Record<string, any> = {}): void => {
  const url = localStorage.getItem('conversion');

  window.plausible?.(event, {
    props: {
      landing: url,
      ...moreProps,
    },
  });
};

export const useButtonClick = (event: string, moreProps: Record<string, any> = {}): (() => void) =>
  useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    buttonClick(event, moreProps);
  }, [event, moreProps]);

export default useLandingSimpleTracking;
