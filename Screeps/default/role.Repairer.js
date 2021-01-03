/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep){
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 back');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            let repair_walls = creep.room.repair_walls;
            repair_walls.sort((a,b) => a.hits - b.hits);
            creep.memory.repair_wall = repair_walls[0].id;
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building){
            let repair_wall = Game.getObjectById(creep.memory.repair_wall);
            // repair_targets.sort((a,b) => a.hits - b.hits);
            if(repair_wall) {
                if(creep.repair(repair_wall) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repair_wall, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }else{
            var storage = creep.room.storage;
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
    
};