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
            creep.moveTo(new RoomPosition(25,25, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
        }else{
            creep.moveTo(new RoomPosition(25,2, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
        }
        {
            const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
            if(targets.length > 0) {
                // creep.rangedAttack(targets[0]);
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
                    return object.hits < object.hitsMax ;
                }
            });
            console.log(target);
            if(target) {
                creep.moveTo(target);
                if(creep.pos.isNearTo(target)) {
                    creep.heal(target);
                }
                else {
                    creep.rangedHeal(target);
                }
            }

            // let spawns = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return (structure.structureType == STRUCTURE_SPAWN && structure.spawning == null);
            //     }
            // });
            // if(creep.ticksToLive < 1450 && spawns.length > 0){
            //     creep.moveTo(spawns[0],{visualizePathStyle: {stroke: '#ffffff'}});
            //     spawns[0].renewCreep(creep);
            // }
        }
    }
};