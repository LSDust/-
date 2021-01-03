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
            if(creep.room.name == 'W45S15'){
                creep.memory.group = 2;
            }
            if(creep.pos.isEqualTo(Game.flags.move1)){
                creep.move(RIGHT);
            }
            if(creep.pos.isEqualTo(Game.flags.move2)){
                creep.memory.group = 3;
            }
            if(creep.pos.isEqualTo(Game.flags.move3)){
                creep.memory.group = 4;
            }
            if(creep.memory.group == 1){
                creep.moveTo(Game.flags.move1);
            }else if(creep.memory.group == 2){
                creep.moveTo(Game.flags.move2);
            }else if(creep.memory.group == 3){
                creep.moveTo(Game.flags.move3);
            }
            else{
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{stroke: '#ffffff'});
            }
        }else{
            // creep.moveTo(new RoomPosition(15, 21, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
            // var target = Game.getObjectById('5f7e5283e99f958ed56fa5cd');
            // var target = Game.getObjectById('5fa53ade3e0d58d1a6ec180e');
            // var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var target = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_INVADER_CORE ;
                        // || (structure.room.name == 'W1S22' && structure.structureType == STRUCTURE_LAB)
                }
            })[0];

            if(target) {
                creep.moveTo(target);
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }else{
                    // creep.moveTo(11,47);
                }
            }else{
                creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffffff'},range:3});
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