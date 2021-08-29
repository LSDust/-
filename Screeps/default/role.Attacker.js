module.exports = {
    run: function(creep){
        // const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop));
        // var target = Game.getObjectById('5f60d0824e076f607e0da006');
        // if(target) {
        //     if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(target);
        //     }
        // }
        var target = '';
        // console.log(123);
        if(creep.room.name != creep.memory.workshop){
            // creep.moveTo(new RoomPosition(25,25, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
            {
                creep.moveTo(new RoomPosition(18, 34, creep.memory.workshop),{stroke: '#ffffff'});
            }
        }else{
            // creep.moveTo(new RoomPosition(15, 21, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
            // var target = Game.getObjectById('60eaaf9b5b87ba3f7f29c70e');
            // var target = Game.getObjectById('60eda966ad2950a5361aa8fd');
            // var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            // creep.moveTo(new RoomPosition(23, 28, creep.memory.workshop),{stroke: '#ffffff'});
            // var target = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return structure.structureType == STRUCTURE_INVADER_CORE ;
            //             // || (structure.room.name == 'W1S22' && structure.structureType == STRUCTURE_LAB)
            //     }
            // })[0];
            
            var target = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType != STRUCTURE_WALL 
                       &&  structure.structureType != STRUCTURE_ROAD 
                       && structure.structureType != STRUCTURE_CONTAINER 
                    //   && structure.structureType != STRUCTURE_RAMPART 
                       &&  structure.structureType != STRUCTURE_CONTROLLER;
                }
            })[0];
            if(target) {
                creep.moveTo(target,{visualizePathStyle: {stroke: '#ffffff'}});
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }else{
                    // creep.moveTo(11,47);
                }
            }

            // let spawns = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return (structure.structureType == STRUCTURE_SPAWN && structure.spawning == null);
            //     }
            // });
            // if(creep.ticksToLive < 1450 && spawns.length > 0){
            //     creep.moveTo(spawns[0],{visualizePathStyle: {stroke: '#ffffff'}});
            //     spawns[0].renewCreep(creep);
            // }
        }
        // creep.moveTo(new RoomPosition(25, 25, 'E0S22')); 
    }
};