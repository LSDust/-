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
        if( creep.memory.workshop != 'E0S22'){
            creep.moveTo(new RoomPosition(43, 43, 'E0S22')); 
            var target = Game.getObjectById('5f7769c855d6fb474a0eb493');
        }else{
            creep.moveTo(new RoomPosition(25, 25, 'E0S22')); 
            var target = Game.getObjectById('5f7775f3e479d12c56e1a0f0');
        }
        // console.log(creep.moveTo(target));
        // if(target) {
        //     creep.moveTo(target);
        //     if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(target);
        //     }
        // }
        creep.moveTo(new RoomPosition(25, 25, 'E0S22')); 
    }
};