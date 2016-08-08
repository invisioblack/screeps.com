'use strict';

var memory = require('./memory');
var spawnController = require('./spawn.controller');
var creepController = require('./creep.controller');
var towerController = require('./tower.controller');
var time = require('./util.time');

var roles = {
  builder: require('./creep.role.builder'),
  miner: require('./creep.role.miner'),
  storeBuilder: require('./creep.role.storeBuilder'),
  storeTransferer: require('./creep.role.storeTransferer'),
  transferer: require('./creep.role.transferer'),
  upgrader: require('./creep.role.upgrader')
};

module.exports.loop = () => {
  if (time(100)) {
    memory();
  }
  if (time(10)) {
    _.each(Game.spawns, spawnController(roles));
  }
  _.each(Game.creeps, creepController(roles));
  _.each(Game.rooms, room => {
    var towers = room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType == STRUCTURE_TOWER
    });
    _.each(towers, towerController);
  });
};
