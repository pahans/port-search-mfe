import { useEffect, RefObject } from 'react';

/**
 * Hook that handles outside click event of the passed refs
 *
 * @param ref ref
 * @param handler a handler function to be called when clicked outside
 */
export default function useOutsideClick(
  ref: RefObject<HTMLElement>,
  handler?: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!handler) return;
      if (
        !ref ||
        !ref.current ||
        !ref.current.contains(event.target as Element)
      ) {
        handler();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}
