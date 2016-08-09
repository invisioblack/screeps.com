'use strict';

var harvest = 'harvestEnergyStorage';
module.exports = {
  'builder': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestEnergyStorage') ('buildConstructionSite', harvest),
      require('./creep.activity.buildConstructionSite')('upgradeController',     harvest),
      require('./creep.activity.upgradeController')    ('upgradeController',     harvest)
    ),
    roomConditions: room => room.find(FIND_CONSTRUCTION_SITES).length > 0
  }
};
