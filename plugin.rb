# frozen_string_literal: true

# name: my-plugin
# about: This is a test using videojs as a video player
# version: 1.0.0
# authors: Danilo Lima
# url: https://github.com/discourse/discourse/tree/master/plugins/lazy-yt

hide_plugin if self.respond_to?(:hide_plugin)

# javascript
register_asset "javascripts/lib/videojs/video.min.js"

# stylesheet
register_asset "stylesheets/common/video-js.css"

after_initialize do

  on(:reduce_cooked) do |fragment|

  end

end
