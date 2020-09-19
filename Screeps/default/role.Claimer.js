module.exports = {
    run: function(creep,claimerNo) {

        const room23 = Game.rooms['W1S23'];
        const room22 = Game.rooms['W1S22'];
        var s_no = 0;
        // if(claimerNo > 1 ){
        //     s_no = 0;
        // }
        if(creep.store.getFreeCapacity() > 0) {
            // 如果不在目标房间就先往房间走
            if (creep.room != room23) {
                creep.moveTo(new RoomPosition(20, 49, 'W1S22'));
            }else{
                var sources = room23.find(FIND_SOURCES);
                if(creep.harvest(sources[s_no]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[s_no], {visualizePathStyle: {stroke: '#ffaa00'}});
                } 
            }
        }else{
            if (creep.room == room23) {
                creep.moveTo(new RoomPosition(20, 0, 'W1S23'));
            }else{
                var targets = room22.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    var tower = Game.getObjectById('5f5c4d1a73fd055335fb00f9');
                    if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};