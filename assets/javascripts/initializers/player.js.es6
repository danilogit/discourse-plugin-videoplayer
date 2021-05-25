import loadScript from "discourse/lib/load-script";
import {withPluginApi} from "discourse/lib/plugin-api";
import {ajax} from "discourse/lib/ajax";


const lookupURL = function (short_url) {
  return ajax("/uploads/lookup-urls", {
    type: "POST",
    data: {
      short_urls: [short_url]
    }
  }).then((upload) => {
    console.log("url", upload)
    return upload[0];
  });
};


export default {
  name: "discourse-player",

  initialize(container) {
    withPluginApi("0.8.22", api => {
      api.decorateTopicTitle((topicModel, node, topicTitleType) => {
        //node.innerText = "ola"
      });

      api.decorateCooked($elem => {
        const $players = $elem.find(".player");
        const topicId = document.location.pathname.split('/')[3];
        console.log("user", api.getCurrentUser());


        if ($players.length) {

          videojs.getAllPlayers().forEach((p) => p.dispose());
          $(document).ready(async function () {
            for (var i = 0; i < $players.length; i++) {

              const id = "player-" + document.location.pathname.split('/')[3] + "-p-" + i;
              try {
                const data_value = $($players[i]).attr("data-value");
                const data = JSON.parse(decodeURIComponent(data_value));
                console.log("data", data);
                let sources = [];

                if (data.tagInfo.attrs['external'] === "true") {
                      sources.push({url: data.content.trim().split("\n")[0]});
                } else {
                  const short_url = data.content.match(/\((.*?)\)/)[1];
                  const upload = await lookupURL(short_url);
                  sources.push({url: upload['url']});
                }


                $players[i].innerHTML = "<video id=\"" + id + "\" class=\"video-js vjs-theme-fantasy\" controls preload=\"none\">" +
                  sources.map(s => {
                    return "<source src=\"" + s.url + "\" />"
                  }).join('')
                  + "</video>";

                videojs('#' + id, {fluid: true}).ready(function () {
                  this.on('timeupdate', function () {
                    console.log(id, this.currentTime());
                  });
                });
              } catch (e) {
                console.log(e.message);
              }
            }
          });

        }
      }, {onlyStream: true, id: "discourse-player"});
    });
  }
};
