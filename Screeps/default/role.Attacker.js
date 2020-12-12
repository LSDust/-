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
            creep.moveTo(new RoomPosition(25,25, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
        }else{
            // creep.moveTo(new RoomPosition(15, 21, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
            // var target = Game.getObjectById('5f7e5283e99f958ed56fa5cd');
            var target = Game.getObjectById('5f916b8ea7868200353e9ad7');
            // var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target) {
                creep.moveTo(target);
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else{
                creep.moveTo(new RoomPosition(25,25, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
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