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
            if(creep.memory.workshop != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop));
            }else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // creep.moveTo(new RoomPosition(38, 25, 'W1S22'));
        }
        else {
            // var tower = Game.getObjectById('5f5c4d1a73fd055335fb00f9');
            // if(creep.withdraw(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(tower,{visualizePathStyle: {stroke: '#ffffff'}});
            // }
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {return structure.structureType == STRUCTURE_STORAGE;}
            });
            if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleUpgrader;