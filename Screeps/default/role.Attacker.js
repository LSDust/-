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
        const target = Game.getObjectById('5f636759c8c4f2c02678bc3d');
        // console.log(creep.moveTo(target));
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};