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
            creep.moveTo(new RoomPosition(12, 23, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'},reusePath: 50});
        }else{
            // creep.moveTo(new RoomPosition(15, 21, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'},reusePath: 50});
            // var target = Game.getObjectById('5f7e5283e99f958ed56fa5cd');
            var target = Game.getObjectById('5f82a15bb635f62248439713');
            // var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target) {
                creep.moveTo(target);
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        // creep.moveTo(new RoomPosition(25, 25, 'E0S22')); 
    }
};