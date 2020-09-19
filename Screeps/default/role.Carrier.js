module.exports = {
    run: function(creep) {
        const room22 = Game.rooms['W1S22'];
        if(!creep.memory.taking && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.taking = true;
            creep.say('拿取');
	    }
	    if(creep.memory.taking && creep.store.getFreeCapacity() == 0) {
	        creep.memory.taking = false;
            creep.say('发放');
        }
        
        if(creep.memory.taking) {
            //待测试
            // const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            // if(target) {
            //     var a = creep.pickup(target);
            //     console.log('状态' + a);
            //     console.log('存量' + creep.store[RESOURCE_ENERGY]);
            // }
            if(creep.memory.workshop != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop));
            }else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER;}
                });
                if(creep.withdraw(targets[creep.memory.group - 1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[creep.memory.group - 1],{visualizePathStyle: {stroke: '#ffffff'}});
                }else{
                    const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                    if(target) {
                        if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                }
            }
        }
        else {
            var targets = room22.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 2) {
                if(creep.transfer(targets[creep.memory.group], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[creep.memory.group], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                // var tower = Game.getObjectById('5f5c4d1a73fd055335fb00f9');
                var towers = room22.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200;
                    }
                });
                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }else{
                    var storage = Game.getObjectById('5f5dc09b38fab07bee3a37c4');
                    if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};