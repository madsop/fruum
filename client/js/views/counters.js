/******************************************************************************
 Counters
*******************************************************************************/

(function() {
  'use strict';
  window.Fruum.require.push(function () {
    Fruum.views = Fruum.views || {};
    //libraries
    var $ = Fruum.libs.$,
        _ = Fruum.libs._,
        Backbone = Fruum.libs.Backbone,
        Marionette = Fruum.libs.Marionette;

    Fruum.views.CountersView = Marionette.ItemView.extend({
      template: '#fruum-template-counters',
      ui: {
        down: '.fruum-js-filter-down',
        up: '.fruum-js-filter-up',
        watch: '[data-action="watch"]',
        unwatch: '[data-action="unwatch"]',
        share: '[data-action="share"]'
      },
      modelEvents: {
        'change:total_entries change:viewing_from change:viewing_to change:viewing change:editing': 'render'
      },
      events: {
        'click @ui.down': 'onDown',
        'click @ui.up': 'onUp',
        'click @ui.watch': 'onWatch',
        'click @ui.unwatch': 'onUnwatch',
        'click @ui.share': 'onShare'
      },
      onDown: function() {
        Fruum.io.trigger('fruum:scroll_bottom');
      },
      onUp: function() {
        Fruum.io.trigger('fruum:scroll_top');
      },
      onWatch: function(event) {
        event.preventDefault();
        var viewing = this.model.get('viewing');
        if (viewing.id) Fruum.io.trigger('fruum:watch', { id: viewing.id });
      },
      onUnwatch: function(event) {
        event.preventDefault();
        var viewing = this.model.get('viewing');
        if (viewing.id) Fruum.io.trigger('fruum:unwatch', { id: viewing.id });
      },
      onShare: function(event) {
        event.preventDefault();
        Fruum.io.trigger('fruum:share', $(event.target));
      },
      templateHelpers: function() {
        var editing = this.model.get('editing');
        return {
          hide_actions: this.model.get('searching') ||
                        editing.type === 'thread' ||
                        editing.type === 'article'
        };
      }
    });
  });
})();
