import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  DialogProps,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface BasicModalProps {
  okLabel?: string;
  cancelLabel?: string;
  title?: string;
  description?: string;
  okFunction?: () => void;
  open: boolean;
  proceed: (result: boolean) => void;
  dialogProps?: DialogProps;
  cancel: (result: boolean) => void;
}

const BasicModal: React.FC<BasicModalProps> = ({
  okLabel = "Ok",
  cancelLabel,
  title = "",
  description = "",
  okFunction,
  open,
  proceed,
  dialogProps,
  cancel,
}) => {
  const theme = useTheme<Theme>();

  return (
    <Dialog open={open} onClose={() => cancel(false)} {...dialogProps}>
      <DialogTitle variant="h6" color="primary" textAlign="start">
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText
          component="div"
          sx={
            {
              paddingTop: theme.spacing(5),
              paddingBottom: theme.spacing(5),
            } as SxProps<Theme>
          }
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions
        sx={
          {
            padding: theme.spacing(3),
          } as SxProps<Theme>
        }
      >
        {cancelLabel && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => proceed(false)}
          >
            {cancelLabel}
          </Button>
        )}
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            if (okFunction) {
              okFunction();
            }
            proceed(true);
          }}
        >
          {okLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BasicModal;
