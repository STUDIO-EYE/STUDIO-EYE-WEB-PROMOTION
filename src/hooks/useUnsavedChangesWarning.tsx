import { unstable_usePrompt as usePrompt, useBeforeUnload } from 'react-router-dom';

export function useUnsavedChangesWarning(message: string, when: boolean) {
  usePrompt({ when, message });

  useBeforeUnload(
    (event) => {
      if (when) {
        event.preventDefault();
        event.returnValue = message;
      }
    },
    { capture: when },
  );
}
