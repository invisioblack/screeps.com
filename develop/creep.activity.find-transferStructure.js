'use strict';

module.exports = creep => {
  var transferStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      (
        structure.structureType == STRUCTURE_EXTENSION
        ||
        structure.structureType == STRUCTURE_SPAWN
        ||
        structure.structureType == STRUCTURE_TOWER
      )
      &&
      structure.energy < structure.energyCapacity
  });
  if (!transferStructure) {
    return true;
  }
  creep.memory.transferStructure = transferStructure.id;
  return true;
};