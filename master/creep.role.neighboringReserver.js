'use strict';

module.exports = {
  activities: {
    'moveToFlag':        require('./creep.activity.moveToFlag')       ('reserveController', 'moveToFlag'),
    'reserveController': require('./creep.activity.reserveController')('reserveController')
  },
  spawn: room => {
    const spawns = [];
    const exits = Game.map.describeExits(room.name);
    _.each(exits, roomName => {
      const neighboringRoom = Game.rooms[roomName];
      if (neighboringRoom && neighboringRoom.isMy()) {
        return;
      }
      _.each(Game.flags, flag => {
        if (flag.pos.roomName !== roomName || !/^reserve/.test(flag.name)) {
          return;
        }
        let mapAmount = 2;
        const reservation = neighboringRoom.getMyReservation();
        if (reservation && reservation.ticksToEnd >= 1000) {
          mapAmount = 1;
        }
        spawns.push({
          body: { move: 1, claim: 1 },
          mapAmount: mapAmount,
          memory: { flagName: flag.name },
          filter: creep => creep.memory.flagName === flag.name
        });
      });
    });
    return spawns;
  }
};