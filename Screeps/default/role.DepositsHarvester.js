/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role. DepositsHarvester');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep){
        if(creep.store.getFreeCapacity() > 0) {
            let tombstones = creep.room.find(FIND_TOMBSTONES, {
                filter: (TOMBSTONE) => {
                    return TOMBSTONE.store[RESOURCE_BIOMASS] > 0 || TOMBSTONE.store[RESOURCE_METAL] > 0;
                }
            });
            if(creep.withdraw(tombstones[0], RESOURCE_BIOMASS) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tombstones[0]);
            }
            creep.withdraw(tombstones[0], RESOURCE_METAL);

            if(creep.ticksToLive < 250 && creep.store.getUsedCapacity() == 0){
                creep.suicide();
            }

            
            if(creep.memory.workshop != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{stroke: '#ffffff'});
            }else{
                let deposits = creep.room.find(FIND_DEPOSITS);
                // var deposits = new Array();
                // deposits[0] = Game.getObjectById('5f9129593395d0e37acdcf5f');
                // let a = creep.room.find(LOOK_DEPOSITS);
                // console.log(a);
                
                if(deposits.length > 0 && deposits[0].lastCooldown < 5000000){
                    if(creep.harvest(deposits[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(deposits[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
        else {
            if(creep.memory.birthroom != creep.room.name){
                creep.moveTo(Game.rooms[creep.memory.birthroom].storage,{visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                var storage = creep.room.storage;
                if(creep.transfer(storage, RESOURCE_METAL) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                if(creep.transfer(storage, RESOURCE_BIOMASS) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};