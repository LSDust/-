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
    //         //待测试
    //         // const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    //         // if(target) {
    //         //     var a = creep.pickup(target);
    //         //     console.log('状态' + a);
    //         //     console.log('存量' + creep.store[RESOURCE_ENERGY]);
    //         // }
            // if(creep.memory.workshop != creep.room.name){
                creep.moveTo(new RoomPosition(15, 42, 'E0S21'));
            // }
            // else{
    //         //     var targets = creep.room.find(FIND_STRUCTURES, {
    //         //         filter: (structure) => {return structure.structureType == STRUCTURE_TOMBSTONE;}
    //         //     });
    //         //     if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //         //         creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#ffffff'}});
    //         //     }
    //         //     creep.withdraw(targets[0], 'O');
    //         // }
    //         //是否为栈顺序执行
    //         if(creep.memory.workshop != creep.room.name){
    //             creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop));
    //         }else{
                // var tower = Game.getObjectById('5f779e3d5acb157a3f77681c');
                // if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffffff'}});
                // }
                // if(creep.memory.workshop == creep.room.name){
                    const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                    if(target) {
                        if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                // }
    //         }
        }
        else {
            if(creep.memory.birthroom != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.birthroom));
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
};