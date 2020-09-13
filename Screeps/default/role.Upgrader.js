var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 back');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            creep.moveTo(new RoomPosition(38, 25, 'W1S22'));
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            // var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // if(targets.length) {
            //     if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }
        }
        else {
            var tower = Game.getObjectById('5f5c4d1a73fd055335fb00f9');
            if(creep.withdraw(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tower,{visualizePathStyle: {stroke: '#ffffff'}});
            }
            
            // var targets = creep.room.find(FIND_STRUCTURES, {
            //         filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER;}
            // });
            // if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#ffffff'}});
            // }
            
            
            // const targets = creep.room.find(FIND_STRUCTURES, {
            //     filter: object => object.hits < object.hitsMax
            // });
            
            // targets.sort((a,b) => a.hits - b.hits);
            
            // if(targets.length > 0) {
            //     if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(targets[0]);
            //     }
            // }
        }
	}
};

module.exports = roleUpgrader;