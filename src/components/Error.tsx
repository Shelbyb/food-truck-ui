import { Alert, Snackbar } from '@mui/material';

export interface ErrorProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}
export const Error = ({ isOpen, setIsOpen }: ErrorProps): JSX.Element => (
  <Snackbar
    open={isOpen}
    autoHideDuration={6000}
    onClose={() => setIsOpen(!isOpen)}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
  >
    <Alert onClose={() => setIsOpen(!isOpen)} severity="error" sx={{ width: '100%' }}>
      There was an error communicating with the server, try again later.
    </Alert>
  </Snackbar>
);
