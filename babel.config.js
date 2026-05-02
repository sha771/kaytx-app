module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { targets: { node: 'current' } }]
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
