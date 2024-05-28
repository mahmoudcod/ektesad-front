import icons from '~/assets/data/icons.json';

export default {
  name: 'AppIcon',
  functional: true,
  inheritAttrs: true,
  props: {
    name: {
      type: String,
      required: true,
      validator: val => val in icons,
    },
  },
  render(createElement, { props }) {
    let icon = icons[props.name];
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
