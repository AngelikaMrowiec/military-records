import { useRef, useEffect, ReactElement } from "react";
import { createPortal } from "react-dom";

type Props = {
    children: ReactElement;
    open: boolean;
    onClose: () => void;
};

export default function Modal({ children, open, onClose }: Props) {
    const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;

    if (modal && open) {
      modal.showModal();
    }

    return () => {
        if (modal) {
          modal.close();
        }
      };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} onClose={onClose} className="bg-gravelgray rounded-lg shadow-xl p-4 mx-auto">
      <div onClick={(e) => e.stopPropagation()}>
        {open ? children : null}
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
}
