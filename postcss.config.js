const isDevMode = process.env.NODE_ENV !== 'production'

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker'),
    () => {
      if (!isDevMode) {
        return require('cssnano')({
          preset: [
            'default', {
              discardComments: {
                removeAll: true
              }
            }
          ]
        })
      }
    }
  ]
}