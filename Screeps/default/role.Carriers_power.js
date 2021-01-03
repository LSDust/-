//一个房间不能有两个
// require('lib.SuperMove');
module.exports = {
    run: function(creep) {
        if(!creep.memory.taking && creep.store.getUsedCapacity() == 0) {
            if(creep.ticksToLive < 50){
                creep.suicide();
            }
            creep.memory.taking = true;
            creep.say('拿取');
	    }
	    if(creep.memory.taking && creep.store.getFreeCapacity() == 0) {
	        creep.memory.taking = false;
            creep.say('发放');
        }
        //多个会出现过量拿取情况
        if(creep.room.powerSpawn.store['power'] == 0){
            creep.memory.taketype = 'power';
        }else{
            creep.memory.taketype = 'energy';
        }
        
        if(creep.memory.taking) {
            if(creep.memory.workshop != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop));
            }else{
                if(creep.memory.workshop == creep.memory.birthroom){
                    //主房搬运
                    var storage = creep.room.storage;
                    if(creep.memory.taketype == 'power' && creep.store['power'] == 0){
                        if(creep.withdraw(storage, 'power',100) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else if(creep.memory.taketype = 'energy'){
                        if(creep.withdraw(storage, 'energy') == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }else{
                    //过道采集
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop ));
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
            if(creep.memory.birthroom != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.birthroom));
            }else{
                if(creep.room.fill_targets.length > 0 && creep.store[RESOURCE_ENERGY] > 0) {
                    var target = creep.pos.findClosestByRange(creep.room.fill_targets);
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                if(creep.room.powerSpawn.store['energy'] < 5000){
                    if(creep.transfer(creep.room.powerSpawn, 'energy') == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.powerSpawn, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                if(creep.room.powerSpawn.store['power'] < 100){
                    if(creep.transfer(creep.room.powerSpawn, 'power') == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.powerSpawn, {visualizePathStyle: {stroke: '#ffffff'}});
                    } 
                }
                if(creep.memory.workshop != creep.memory.birthroom)
                {
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
};