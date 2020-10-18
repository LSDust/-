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
        if(creep.room.name != creep.memory.workshop){
            creep.moveTo(new RoomPosition(30, 48, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'},reusePath: 50});
        }else{
            creep.moveTo(new RoomPosition(18, 23, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'},reusePath: 50});
        }
        {
            const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
            if(targets.length > 0) {
                creep.rangedAttack(targets[0]);
            }else{
                // creep.moveTo(new RoomPosition(24, 16, creep.memory.workshop));
            }
            // creep.rangedAttack(Game.getObjectById('5f6661255a3e3e98f49e0c3a'));
            // const targets = Game.getObjectById('5f6661255a3e3e98f49e0c3a');
            // creep.rangedAttack(targets);
    
            // if( creep.memory.workshop == 'E0S22'){
            //     creep.moveTo(new RoomPosition(25, 25, 'E0S22')); 
            // }else{
            //     creep.moveTo(new RoomPosition(41, 42, 'W2S20')); 
            // }
    
            const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax 
                    && object.hitsMax - object.hits > 1100;
                }
            });
            if(target) {
                creep.moveTo(target);
                if(creep.pos.isNearTo(target)) {
                    creep.heal(target);
                }
                else {
                    creep.rangedHeal(target);
                }
            }
        }
    }
};