module.exports = {
    run: function(creep) {
        if(!creep.memory.taking && creep.store.getUsedCapacity() == 0) {
            creep.memory.taking = true;
            creep.say('拿取');
	    }
	    if(creep.memory.taking && creep.store.getFreeCapacity() == 0) {
	        creep.memory.taking = false;
            creep.say('发放');
            // let goals = _.map(Game.rooms[creep.memory.birthroom].receive_link, function(receive_link) {
            //     return { pos: receive_link.pos, range: 1 };
            // });
            // let ret = PathFinder.search(creep.pos, goals,
            //                 {
            //                     plainCost: 2,
            //                     swampCost: 10,
                        
            //                     roomCallback: function(roomName) {
                        
            //                     let room = Game.rooms[roomName];
            //                     // 在这个示例中，`room` 始终存在
            //                     // 但是由于 PathFinder 支持跨多房间检索
            //                     // 所以你要更加小心！
            //                     if (!room) return;
            //                     let costs = new PathFinder.CostMatrix;
                        
            //                     room.find(FIND_STRUCTURES).forEach(function(struct) {
            //                         if (struct.structureType === STRUCTURE_ROAD) {
            //                         // 相对于平原，寻路时将更倾向于道路
            //                         costs.set(struct.pos.x, struct.pos.y, 1);
            //                         } else if (struct.structureType !== STRUCTURE_CONTAINER &&
            //                                 (struct.structureType !== STRUCTURE_RAMPART ||
            //                                     !struct.my)) {
            //                         // 不能穿过无法行走的建筑
            //                         costs.set(struct.pos.x, struct.pos.y, 0xff);
            //                         }
            //                     });
                        
            //                     // 躲避房间中的 creep
            //                     room.find(FIND_CREEPS).forEach(function(creep) {
            //                         costs.set(creep.pos.x, creep.pos.y, 0xff);
            //                     });
                        
            //                     return costs;
            //                     },
            //                 });
            // creep.memory.path = ret.path;
            // creep.memory.path_i = 0;
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
                //正常拿取
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
                //战备状态
                if(creep.memory.birthroom != creep.room.name){
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.birthroom),{reusePath: 25});
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
                creep.moveTo(Game.rooms[creep.memory.birthroom].receive_link[0],{visualizePathStyle: {stroke: '#ffffff'},reusePath: 40});
                // let pos = creep.memory.path[creep.memory.path_i++];
                // creep.move(creep.pos.getDirectionTo(pos));
                // console.log(creep.memory.path[creep.memory.path_i]);
                // console.log(creep.name + creep.moveByPath(creep.memory.path));
                // creep.moveByPath(creep.memory.path);
                // creep.moveByPath(ret.path);
            }else{
                if(creep.memory.birthroom != creep.memory.workshop && creep.memory.workshop != 'W2S23'
                    && creep.room.receive_link[0].store.getFreeCapacity(RESOURCE_ENERGY) != 0
                    && Math.abs(creep.pos.y - 25) >= 22){
                    //外矿
                    var receive_link = creep.room.receive_link[0];
                    if(creep.transfer(receive_link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(receive_link, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
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
    }
};