// ***********************
// PLUGIN COMPONENT CODE
// src/YelpIntegrationPlugin.js
// ***********************
import { FlexPlugin } from 'flex-plugin';
import { Tab } from '@twilio/flex-ui';
import React from 'react';
import YelpDataList from './components/YelpDataList';

const PLUGIN_NAME = 'YelpIntegrationPlugin';

export default class YelpIntegrationPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  init(flex, manager) {
    // Add YelpDataList component to the
    flex.TaskCanvasTabs.Content.add(
      <Tab key="my-new-tab">
        <p>Hello World!</p>
        { <YelpDataList key="yelp-data" token={manager.store.getState().flex.session.ssoTokenPayload.token}/> }
      </Tab>
    );
  }
}
