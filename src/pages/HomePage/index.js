import React from 'react';

import Page from 'components/Page';
import Grid from 'components/Grid';

import { ROUTE_HOME_PAGE } from 'pages/routes';


const HomePage = () => (
  <Page>
    <Grid page={ROUTE_HOME_PAGE} />
  </Page>
);

export default HomePage;
