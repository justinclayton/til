import { InMemoryCache } from 'apollo-cache-inmemory';
import AWSAppSyncClient from 'aws-appsync';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import appSyncConfig from './AppSync';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

const appSyncClient = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
  },
  cache: new InMemoryCache(),
  disableOffline: true, // <--- breaking stuff
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={appSyncClient}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
