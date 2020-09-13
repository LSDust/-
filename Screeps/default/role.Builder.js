var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const room23 = Game.rooms['W1S23'];
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 back');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
            creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
            if(creep.memory.workshop != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop));
            }
            else
            {
                // creep.moveTo(new RoomPosition(18, 2, 'W1S23'));
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    // creep.moveTo(new RoomPosition(30, 41, 'W1S22'));
                    const repair_targets = creep.room.find(FIND_STRUCTURES, {
                        // filter: object => object.hits < object.hitsMax && object.structureType != STRUCTURE_WALL
                        filter: object => object.hits < object.hitsMax
                    });
                    
                    repair_targets.sort((a,b) => a.hits - b.hits);
                    // console.log(repair_targets.length);
                    if(repair_targets.length > 0) {
                        if(creep.repair(repair_targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(repair_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }

            // var repair_targets = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {return structure.structureType == STRUCTURE_ROAD;}
            // });

            // repair_targets.sort((a,b) => a.hits - b.hits);

            // if(repair_targets.length > 0 ) {
            //     if(creep.repair(repair_targets[0]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(repair_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }
	    }
	    else {
            var storage = Game.getObjectById('5f5c4d1a73fd055335fb00f9');
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
	}
};

module.exports = roleBuilder;