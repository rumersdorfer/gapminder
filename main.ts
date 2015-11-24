/**
 * Created by Samuel Gratzl on 15.12.2014.
 */
import C = require('../caleydo_core/main');
import datas = require('../caleydo_core/data');
import template = require('../clue_demo/template');
import cmode = require('../caleydo_provenance/mode');
import databrowser = require('../caleydo_d3/databrowser');
import gapminder = require('./gapminder');


import d3 = require('d3');


//create main
//scoping let --> function level scope in js vs java global, local
let helper = document.querySelector('div.gapminder');

const elems = template.create(document.body, {
  app: 'GapMinder',
  application: '/gapminder',
  id: 'clue_gapminder'
});
{
  while(helper.firstChild) {
    (<Node>elems.$main.node()).appendChild(helper.firstChild);
  }
}

elems.graph.then((graph) => {
  const app = gapminder.create(<Element>elems.$main.node(), graph);

  if (graph.states.length === 1) {
    //initialize gap minder the first time
    // get list of datasets then setX
    datas.list((d) => /.*gapminder.*/.test(d.desc.fqname)).then((list) => {
      app.setXAttribute(<any>list[0]).then(() => {
        app.setYAttribute(<any>list[1]);
          })
        });
  }

    const dd = d3.select('aside.left').append('section').classed('databrowser', true);
    dd.append('h1').text('Datasets');
    databrowser.create(<Element>dd.node(), {
    filter: (d) => /.*gapminder.*!/.test(d.desc.fqname),
    layout: 'list'
  });

  function updateBounds() {
    var bounds = C.bounds(document.querySelector('div.gapminder_i'));
    app.setBounds(bounds.x, bounds.y, bounds.w - 30, bounds.h - 60);
  }

  elems.on('modeChanged', function (event, new_) {
    app.setInteractive(new_.exploration >= 0.8);
    //for the animations to end
    setTimeout(updateBounds, 700);
  });

  $(window).on('resize', updateBounds);
  updateBounds();

  app.setInteractive(cmode.getMode().exploration >= 0.8);

  elems.jumpToStored();
});
