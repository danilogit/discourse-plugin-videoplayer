
export function setup(helper, siteSettings, state) {

  helper.allowList(["div.player"]);

  helper.registerPlugin(md => {

    md.renderer.rules.link_open = helper.engine;


    md.inline.bbcode.ruler.push("player",{
      tag: "player",

      replace: function(state, tagInfo, content) {

        const token = state.push("html_raw", '', 0);
        const escaped = state.md.utils.escapeHtml(content);
        const data = encodeURIComponent(JSON.stringify({content, tagInfo}));
        token.content = `<div class="player" data-value="${data}">[VIDEO]</div>`;
        return true;
      }
    });
  });
}
