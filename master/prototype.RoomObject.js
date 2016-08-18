'use strict';

RoomObject.prototype.isEmpty = function (opts) {
  opts = opts || {};
  opts.resource = opts.resource || RESOURCE_ENERGY;
  opts.restAmount = opts.restAmount || 0;

  if (this.carryCapacity > 0) {
    return this.carry[opts.resource] <= opts.restAmount;
  }

  if (this.energyCapacity > 0) {
    return this.energy <= opts.restAmount;
  }

  if (this.storeCapacity > 0) {
    return this.store[opts.resource] <= opts.restAmount;
  }
};

RoomObject.prototype.isFull = function (opts) {
  opts = opts || {};
  opts.percentage = opts.percentage || 1;
  opts.restCapacity = opts.restCapacity || 0;

  var amount;
  var capacity;

  if (this.carryCapacity > 0) {
    amount = _.sum(this.carry);
    capacity = this.carryCapacity;
  }

  if (this.energyCapacity > 0) {
    amount = this.energy;
    capacity = this.energyCapacity;
  }

  if (this.storeCapacity > 0) {
    amount = _.sum(this.store);
    capacity = this.storeCapacity;
  }

  if (capacity > 0) {
    return (amount / capacity) >= opts.percentage
           ||
           (capacity - amount) < opts.restCapacity;
  }
};