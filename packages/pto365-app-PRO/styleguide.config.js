var path = require("path")
module.exports = {
    components: 'src/.v2/components/**/*.js',
    require: [
    
      path.join(__dirname, 'styleguide.setup.js')
    ]
  }