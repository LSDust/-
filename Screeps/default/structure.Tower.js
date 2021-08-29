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
        // var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(tower.room.hostileCreeps.length > 0) {
            tower.attack(tower.room.hostileCreeps[0]);
        }else{
            //容量大于400执行修复
            if(tower.store.getFreeCapacity(RESOURCE_ENERGY) < 600) {
                // const repair_targets = tower.room.find(FIND_STRUCTURES, {
                //     filter: object => object.hits < object.hitsMax 
                //                     && (object.structureType != STRUCTURE_WALL || object.room.name == 'W0S00')
                //                     && (object.structureType != STRUCTURE_RAMPART || object.room.name == 'W0S00')
                //                     && object.hitsMax - object.hits >= 1000
                // });
                let repair_targets = tower.room.repair_targets;
                repair_targets.sort((a,b) => a.hits - b.hits);

                // const repair_creeps = tower.room.find(FIND_MY_CREEPS, {
                //     filter: object => object.hits < object.hitsMax 
                // });
                // if(repair_creeps.length > 0){
                //     tower.heal(repair_creeps[0]);
                // }else if(repair_targets.length > 0){
                    tower.repair(repair_targets[0]);
                // }
            }
        }
    }
};