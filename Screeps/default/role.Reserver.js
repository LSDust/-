module.exports = {
    run: function(creep){
        const room23 = Game.rooms['W1S23'];
        if (creep.room != room23) {
            creep.moveTo(new RoomPosition(20, 49, 'W1S22'));
        }else{
            if(creep.room.controller) {
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};