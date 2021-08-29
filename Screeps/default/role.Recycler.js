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
            if(creep.ticksToLive < 100){
                creep.suicide();
            }
            if(creep.room.name == creep.memory.birthroom){
                var storage = creep.room.storage;
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                if(creep.memory.workshop == 'E2S17'){
                    creep.travelTo(new RoomPosition(25, 25, creep.memory.birthroom),{visualizePathStyle: {stroke: '#ffffff'}});
                }else{
                    if(Game.spawns['Spawn_E3S19'].recycleCreep(creep) == -9){
                        creep.moveTo(Game.spawns['Spawn_E3S19']);
                    };
                }
            }
        }else{
            if(creep.room.name != creep.memory.workshop){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                var storage = creep.room.storage;
                if(creep.memory.workshop == 'E2S17'){
                    let container = creep.room.container;
                    container.sort((a,b) => a.store.getUsedCapacity() - b.store.getUsedCapacity());
                    storage = container[0];
                }
                if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};