module.exports = {
    run: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 back');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
            creep.say('🚧 build');
        }
        
        if(!creep.memory.building){
            if(creep.room.name == creep.memory.birthroom){
                var storage = creep.room.storage;
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                if(Game.spawns['Spawn_W2S21_1'].recycleCreep(creep) == -9){
                    creep.moveTo(Game.spawns['Spawn_W2S21_1']);
                };
            }
        }else{
            if(creep.room.name != creep.memory.workshop){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                var storage = creep.room.storage;
                if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};