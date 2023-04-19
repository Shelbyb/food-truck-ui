import { Status, Wrapper } from '@googlemaps/react-wrapper';
import {
  Backdrop, Box, CircularProgress, Container,
} from '@mui/material';
import { ReactElement } from 'react';
import { GoogleMaps } from '@/components/googleMaps/GoogleMaps';

// Wrapper Component for loading the map.
export const GoogleMapsWrapper = (): JSX.Element => {
  // When loading, use a loading screen
  const render = (status: Status): ReactElement => {
    if (status === Status.FAILURE) { return <></>; }

    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={status === Status.LOADING}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };

  return (
    <Wrapper
      apiKey=""
      url="https://maps.googleapis.com/maps/api/js"
      id="google-maps"
      render={render}
    >
      <Container maxWidth={false} disableGutters>
        <Box>
          <GoogleMaps />
        </Box>
      </Container>
    </Wrapper>
  );
};
