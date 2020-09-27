/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.RangAttacker');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep){
        creep.moveTo(new RoomPosition(34, 4, creep.memory.workshop));
        const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
        if(targets.length > 0) {
            creep.rangedAttack(targets[0]);
        }

        const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(target) {
            if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};