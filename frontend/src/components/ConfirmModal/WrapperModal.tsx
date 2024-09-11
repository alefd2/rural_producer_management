import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogProps,
} from "@mui/material";

type WrapperModalProps = {
  proceed: (result: boolean) => void;
  open: boolean;
  title?: string;
  cancelLabel?: string;
  okLabel?: string;
  dialogProps?: DialogProps;
  [key: string]: any;
};

// DEFAULT COMPONENT
const WrapperModal = (Component: React.FC<any>) => {
  const ModalComponent: React.FC<WrapperModalProps> = ({
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
          <Component {...props} />
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
