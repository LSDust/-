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
            
            if(creep.ticksToLive < 50){
                creep.suicide();
            }

            const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    // creep.moveTo(target);
                }
            }

            if(true || Memory.Defense.war_room.indexOf(creep.memory.workshop) == -1){
                //正常拿取
                if(creep.memory.workshop != creep.room.name){
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{stroke: '#ffffff'});
                }else{
                    var targets = creep.room.container;
                    // if(creep.memory.workshop == creep.memory.birthroom){
                    //     if(creep.withdraw(targets[creep.memory.group - 1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //         creep.moveTo(targets[creep.memory.group - 1],{visualizePathStyle: {stroke: '#ffffff'}});
                    //     }else{
                    //         if(target){
                    //             creep.moveTo(target);
                    //         }
                    //     }
                    //     creep.withdraw(targets[creep.memory.group - 1], 'O');
                    //     creep.withdraw(targets[creep.memory.group - 1], 'L');
                    //     creep.withdraw(targets[creep.memory.group - 1], 'GO');
                    //     creep.withdraw(targets[creep.memory.group - 1], 'KO');
                    //     creep.withdraw(targets[creep.memory.group - 1], 'ZH');
                    //     creep.withdraw(targets[creep.memory.group - 1], 'UH');
                    // }else
                    {
                        targets.sort((a,b) => b.store.getUsedCapacity() - a.store.getUsedCapacity());
                        if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#ffffff'}});
                        }else{
                            // creep.moveTo(target);
                        }
                        creep.withdraw(targets[0], 'O');
                        creep.withdraw(targets[0], 'L');
                        creep.withdraw(targets[0], 'GO');
                        creep.withdraw(targets[0], 'KO');
                        creep.withdraw(targets[0], 'ZH');
                        creep.withdraw(targets[0], 'UH');
                        creep.withdraw(targets[0], 'X');
                        creep.withdraw(targets[0], 'U');
                    }
                }
            }else{
                //战备状态
                if(creep.memory.birthroom != creep.room.name){
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.birthroom),{stroke: '#ffffff'});
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
                // creep.moveTo(Game.rooms[creep.memory.birthroom].receive_link[0],{visualizePathStyle: {stroke: '#ffffff'},reusePath: 40});
                let goals = _.map(Game.rooms[creep.memory.birthroom].receive_link, function(receive_link) {
                    return { pos: receive_link.pos, range: 1 };
                });
                let ret = PathFinder.search(creep.pos, goals,
                                {
                                    plainCost: 2,
                                    swampCost: 10,
                            
                                    roomCallback: function(roomName) {
                            
                                    let room = Game.rooms[roomName];
                                    // 在这个示例中，`room` 始终存在
                                    // 但是由于 PathFinder 支持跨多房间检索
                                    // 所以你要更加小心！
                                    if (!room) return;
                                    let costs = new PathFinder.CostMatrix;
                            
                                    room.find(FIND_STRUCTURES).forEach(function(struct) {
                                        if (struct.structureType === STRUCTURE_ROAD) {
                                        // 相对于平原，寻路时将更倾向于道路
                                        costs.set(struct.pos.x, struct.pos.y, 1);
                                        } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                                                (struct.structureType !== STRUCTURE_RAMPART ||
                                                    !struct.my)) {
                                        // 不能穿过无法行走的建筑
                                        costs.set(struct.pos.x, struct.pos.y, 0xff);
                                        }
                                    });
                            
                                    // 躲避房间中的 creep
                                    room.find(FIND_CREEPS).forEach(function(creep) {
                                        costs.set(creep.pos.x, creep.pos.y, 0xff);
                                    });
                            
                                    return costs;
                                    },
                                });
                
                // let pos = creep.memory.path[creep.memory.path_i++];
                // creep.move(creep.pos.getDirectionTo(pos));
                // console.log(creep.memory.path[creep.memory.path_i]);
                // console.log(creep.name + creep.moveByPath(creep.memory.path));
                // creep.moveByPath(creep.memory.path);
                creep.moveByPath(ret.path);

                if(creep.memory.workshop == 'W3S22'){
                    let repair_targets = creep.pos.findInRange(creep.room.repair_targets, 3);
                    if(repair_targets.length > 0) {
                        creep.repair(repair_targets[0]);
                    }
                }
            }else{
                var receive_links = creep.pos.findInRange(creep.room.receive_link, 4);
                if(receive_links){
                    receive_links.sort((a,b) => a.cooldown - b.cooldown);
                    receive_links.sort((a,b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));
                }
                // console.log(receive_links);
                if(creep.memory.birthroom != creep.memory.workshop && creep.memory.workshop != 'W2S23' 
                    && (receive_links[0] && receive_links[0].store.getFreeCapacity(RESOURCE_ENERGY) != 0 && creep.pos.inRangeTo(receive_links[0], 4))
                    && creep.store[RESOURCE_ENERGY] > 0){
                    //外矿
                    if(creep.transfer(receive_links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(receive_links[0], {visualizePathStyle: {stroke: '#ffffff'}});
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
                    if(creep.room.fill_targets.length > 0 && creep.store[RESOURCE_ENERGY] > 0) {
                        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        // var tower = Game.getObjectById('5f5c4d1a73fd055335fb00f9');
                        var towers = Game.rooms[creep.memory.birthroom].find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return structure.structureType == STRUCTURE_TOWER && 
                                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 300;
                            }
                        });
                        if(towers.length > 0 && creep.store[RESOURCE_ENERGY] > 0){
                            if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }else{
                            var storage = creep.room.storage;
                            if(creep.room.name == 'E3S190'){
                                storage = creep.room.tower[0];
                            }
                            if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                            creep.transfer(storage, 'O');
                            creep.transfer(storage, 'L');
                            creep.transfer(storage, 'GO');
                            creep.transfer(storage, 'KO');
                            creep.transfer(storage, 'ZH');
                            creep.transfer(storage, 'UH');
                            creep.transfer(storage, RESOURCE_BIOMASS);
                            creep.transfer(storage, 'power');
                            creep.transfer(storage, 'X');
                            creep.transfer(storage, 'U');
                        }
                    }
                }
            }
        }
    }
};