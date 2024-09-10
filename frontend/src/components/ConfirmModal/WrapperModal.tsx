/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogProps,
} from "@mui/material";

interface WrapperModalProps<T> {
  proceed: (result: boolean) => void;
  open: boolean;
  title?: string;
  cancelLabel?: string;
  okLabel?: string;
  dialogProps?: DialogProps;
  [key: string]: any;
}

// DEFAULT COMPONENT
const WrapperModal = <T extends object>(Component: React.FC<T>) => {
  const ModalComponent: React.FC<WrapperModalProps<T>> = ({
    proceed,
    open,
    title,
    cancelLabel = "Cancelar",
    okLabel = "Ok",
    dialogProps,
    ...props
  }) => {
    return (
      <Dialog open={open} onClose={() => proceed(false)} {...dialogProps}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <Component {...(props as T)} />
        </DialogContent>
        <DialogActions>
          {cancelLabel && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => proceed(false)}
            >
              {cancelLabel}
            </Button>
          )}
          {okLabel && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => proceed(true)}
            >
              {okLabel}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  return ModalComponent;
};

export default WrapperModal;
