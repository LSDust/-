module.exports = {
    run: function(creep) {
        if(!creep.memory.taking && creep.store.getUsedCapacity() == 0) {
            creep.memory.taking = true;
            creep.say('拿取');
	    }
	    if(creep.memory.taking && creep.store.getFreeCapacity() == 0) {
	        creep.memory.taking = false;
            creep.say('发放');
        }
        
        if(creep.memory.taking) {
            //是否为栈顺序执行
            const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    // creep.moveTo(target);
                }
            }

            if(Memory.Defense.war_room.indexOf(creep.memory.workshop) == -1){
                if(creep.memory.workshop != creep.room.name){
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{reusePath: 45});
                }else{
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER;}
                    });
                    if(creep.withdraw(targets[creep.memory.group - 1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[creep.memory.group - 1],{visualizePathStyle: {stroke: '#ffffff'}});
                    }else{
                        creep.moveTo(target);
                    }
                    creep.withdraw(targets[creep.memory.group - 1], 'O');
                    creep.withdraw(targets[creep.memory.group - 1], 'L');
                    creep.withdraw(targets[creep.memory.group - 1], 'GO');
                    creep.withdraw(targets[creep.memory.group - 1], 'KO');
                    creep.withdraw(targets[creep.memory.group - 1], 'ZH');
                    creep.withdraw(targets[creep.memory.group - 1], 'UH');
                }
            }else{
                if(creep.memory.birthroom != creep.room.name){
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.birthroom),{reusePath: 30});
                }else{
                    var storage = creep.room.storage;
                    if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {
            if(creep.memory.birthroom != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.birthroom),{visualizePathStyle: {stroke: '#ffffff'},reusePath: 30});
            }else{
                // var targets = Game.rooms[creep.memory.birthroom].find(FIND_STRUCTURES, {
                //         filter: (structure) => {
                //             return (structure.structureType == STRUCTURE_EXTENSION ||
                //                     structure.structureType == STRUCTURE_SPAWN ) && 
                //                     structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                //         }
                // });
                var target = creep.pos.findClosestByRange(creep.room.fill_targets);
                if(creep.room.fill_targets.length > 1 && creep.store[RESOURCE_ENERGY] > 0) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    // var tower = Game.getObjectById('5f5c4d1a73fd055335fb00f9');
                    var towers = Game.rooms[creep.memory.birthroom].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_TOWER && 
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200;
                        }
                    });
                    if(towers.length > 0 && creep.store[RESOURCE_ENERGY] > 0){
                        if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        var storage = creep.room.storage;
                        if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                        creep.transfer(storage, 'O');
                        creep.transfer(storage, 'L');
                        creep.transfer(storage, 'GO');
                        creep.transfer(storage, 'KO');
                        creep.transfer(storage, 'ZH');
                        creep.transfer(storage, 'UH');
                        creep.transfer(storage, 'power');
                    }
                }
            }
        }
    }
};