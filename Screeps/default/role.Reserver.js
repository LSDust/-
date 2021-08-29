// require('lib.SuperMove');
module.exports = {
    run: function(creep){
        if(creep.memory.workshop != creep.room.name){
            creep.travelTo(new RoomPosition(25, 25, creep.memory.workshop));
        }else{
            if(creep.room.controller) {
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};