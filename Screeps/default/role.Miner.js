module.exports = {

    run: function(creep) {
        if(creep.memory.workshop != creep.room.name){
            creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{reusePath: 50});
        }else{
            var mineral = creep.room.mineral;
            var sources = creep.room.sources;
            let targets = mineral.concat(sources);
            if(creep.harvest(targets[creep.memory.group]) == ERR_NOT_IN_RANGE) {
                
            }
            {
                if(creep.memory.workshop == 'W1S22' && creep.memory.group == 1){
                    creep.moveTo(new RoomPosition(34, 21, 'W1S22'));
                }else if(creep.memory.workshop == 'W1S23'){
                    if(creep.memory.group == 1){
                        creep.moveTo(new RoomPosition(15, 2, 'W1S23'));
                    }else if(creep.memory.group == 2){
                        creep.moveTo(new RoomPosition(20, 4, 'W1S23'));
                    }
                }else if(creep.memory.workshop == 'W2S22' && creep.memory.group == 1){
                    creep.moveTo(new RoomPosition(29, 34, 'W2S22'));
                }else if(creep.memory.workshop == 'W3S23' && creep.memory.group == 1){
                    creep.moveTo(new RoomPosition(36, 8, 'W3S23'));
                }else if(creep.memory.workshop == 'W3S23' && creep.memory.group == 2){
                    creep.moveTo(new RoomPosition(39, 17, 'W3S23'));
                }else{
                    creep.moveTo(targets[creep.memory.group],{reusePath: 50});
                }
            }
        }
	}
};