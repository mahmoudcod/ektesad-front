import icons from '~/assets/data/icons.json';
import gql from 'graphql-tag';

const GET_SETTINGS = gql`
  query getSettings {
    Settings: settings {
      appLogo
    }
  }
`;

export default {
  name: 'AppIcon',
  functional: true,
  inheritAttrs: true,
  props: {
    name: {
      type: String,
      required: true,
      validator: val => val in icons || val === 'appLogo',
    },
  },
  render(createElement, { props, parent }) {
    const client = parent.$client;

    let icon = icons[props.name];

    // Check if the icon name is 'appLogo' and if not already fetched, initiate the query
    if (props.name === 'appLogo') {
      const queryResult = client.query({ query: GET_SETTINGS });

      queryResult.then(({ data }) => {
        const appLogoPath = data.Settings.appLogo;
        if (appLogoPath) {
          icon = {
            path: appLogoPath,
            viewBox: '0 0 24 24',
          };
        } else {
          icon = 'empty'; // Set to 'empty' if appLogoPath is empty
        }
        parent.$forceUpdate();
      }).catch(error => {
        console.error('Error fetching appLogo:', error);
        icon = 'empty'; // Set to 'empty' in case of an error
        parent.$forceUpdate();
      });
    }

    if (icon === 'empty') {
      return createElement(
        'span',
        {
          attrs: {
            class: 'icon-empty',
          },
        },
        'empty'
      );
    }

    if (!icon) {
      return null; // Or some fallback element
    }

    if (typeof icon === 'string') {
      icon = {
        path: icon,
        viewBox: '0 0 24 24',
      };
    }

    const children = [];
    if (icon.viewBox === '0 0 24 24') {
      children.push(
        createElement('path', {
          attrs: {
            d: 'M0 0h24v24H0z',
            fill: 'none',
          },
        })
      );
    }

    children.push(
      createElement('path', {
        attrs: {
          d: icon.path,
        },
      })
    );

    return createElement(
      'svg',
      {
        attrs: {
          version: '1.1',
          xmlns: 'http://www.w3.org/2000/svg',
          class: `icon icon-${props.name}`,
          viewBox: icon.viewBox,
          id: `icon-${props.name}`,
        },
      },
      children
    );
  },
};
