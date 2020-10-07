var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 back');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
            creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
            // if(creep.ticksToLive < 20){
            //     var spawns = creep.room.find(FIND_STRUCTURES, {
            //             filter: (structure) => {
            //                 return (structure.structureType == STRUCTURE_SPAWN 
            //                      && structure.spawning == null);
            //             }
            //     });
                
            //     if(spawns.length > 0){
            //         // if(spawns[0].renewCreep(creep) == ERR_NOT_IN_RANGE){
            //         //     creep.moveTo(spawns[0],{visualizePathStyle: {stroke: '#ffffff'}});
            //         // }
            //     }
            // }
            if(creep.memory.workshop != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{reusePath: 50});
            }
            else
            {
                //creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop));
                //运输
                // var targets = creep.room.find(FIND_STRUCTURES, {
                //         filter: (structure) => {
                //             return (structure.structureType == STRUCTURE_EXTENSION ||
                //                     structure.structureType == STRUCTURE_SPAWN ) && 
                //                     structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                //         }
                // });
                var target = creep.pos.findClosestByRange(creep.room.fill_targets);
                if(creep.room.fill_targets.length > 0) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    //塔告急
                    var towers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_TOWER && 
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 500;
                        }
                    });
                    if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }else{
                        //建造
                        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                        if(targets.length > 0) {
                            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }else{
                            //维修
                            const repair_targets = creep.room.find(FIND_STRUCTURES, {
                                filter: object => object.hits < object.hitsMax 
                                    && object.hitsMax - object.hits >= 1000
                                    && object.structureType != STRUCTURE_WALL
                                    && object.structureType != STRUCTURE_RAMPART
                                    // && object.structureType != STRUCTURE_ROAD
                            });
                            // repair_targets.sort((a,b) => a.hits - b.hits);
                            if(repair_targets.length > 0) {
                                if(creep.repair(repair_targets[0]) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(repair_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                                }
                            }else{
                                //升级
                                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                                }
                            }
                        }
                    }
                }
            }
	    } else {
            if(creep.room.name == creep.memory.birthroom){
                // var storage = Game.getObjectById('5f5dc09b38fab07bee3a37c4');
                let spawns = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_SPAWN && structure.spawning == null);
                        }
                });
                if(creep.ticksToLive < 300 && spawns.length > 0){
                    creep.moveTo(spawns[0],{visualizePathStyle: {stroke: '#ffffff'}});
                    spawns[0].renewCreep(creep);
                }else{
                    if(spawns.length == 0 || spawns[0].renewCreep(creep) == ERR_FULL || spawns[0].renewCreep(creep) == ERR_NOT_IN_RANGE || true)
                    {
                        var storage = creep.room.storage;
                        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }else{
                const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                if(target) {
                    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }else{
                    var container = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER 
                                     && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100);
                            }
                    });
                    if(creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container[0],{visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
	    }
	}
};

module.exports = roleBuilder;