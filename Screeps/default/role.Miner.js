module.exports = {

    run: function(creep) {
        creep.moveTo(new RoomPosition(34, 21, 'W1S22'))
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
	}
};