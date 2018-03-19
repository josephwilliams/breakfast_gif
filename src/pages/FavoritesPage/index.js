import React from 'react';

import Page from 'components/Page';
import Grid from 'components/Grid';

import { ROUTE_FAVORITES_PAGE } from 'pages/routes';


const FavoritesPage = () => (
  <Page>
    <Grid page={ROUTE_FAVORITES_PAGE} />
  </Page>
);

export default FavoritesPage;
