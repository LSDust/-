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
            // let tombstones = creep.room.find(FIND_TOMBSTONES, {
            //     filter: (TOMBSTONE) => {
            //         return TOMBSTONE.store.getUsedCapacity() > 0;
            //     }
            // });
            // if(creep.withdraw(tombstones[0], RESOURCE_BIOMASS) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(tombstones[0]);
            // }
            if(creep.ticksToLive < 150 && creep.store.getUsedCapacity() == 0){
                creep.suicide();
            }
            if(creep.memory.workshop != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{reusePath: 50});
            }else{
                var deposits = new Array();
                deposits[0] = Game.getObjectById('5f89c932839c451594e8eea9');
                // let a = creep.room.find(LOOK_DEPOSITS);
                // console.log(a);
                if(creep.harvest(deposits[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(deposits[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            if(creep.memory.birthroom != creep.room.name){
                creep.moveTo(Game.rooms[creep.memory.birthroom].storage,{visualizePathStyle: {stroke: '#ffffff'},reusePath: 40});
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