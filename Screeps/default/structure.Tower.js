/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structure.Tower');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(tower){
        // var tower = Game.getObjectById('5f5c4d1a73fd055335fb00f9');
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }else{
            if(tower.store.getFreeCapacity(RESOURCE_ENERGY) < 500) {
                // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                //     filter: (structure) => structure.hits < structure.hitsMax
                //                         && structure.structureType != STRUCTURE_WALL
                //                         // && structure.structureType != STRUCTURE_RAMPART
                // });
                // if(closestDamagedStructure) {
                //     tower.repair(closestDamagedStructure);
                // }
                const repair_targets = tower.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax 
                                    && object.structureType != STRUCTURE_WALL
                                    && object.structureType != STRUCTURE_RAMPART
                });
                repair_targets.sort((a,b) => a.hits - b.hits);
                if(repair_targets.length > 0){
                    tower.repair(repair_targets[0]);
                }
            }
        }
    }
};