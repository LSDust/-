/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('decision.Logistics');
 * mod.thing == 'a thing'; // true
 */

module.exports = class Logistics{
    constructor(){
        for(var name in Game.rooms){
            var room = Game.rooms[name];
            // var mineral = room.find(FIND_MINERALS);
            room.sources = room.find(FIND_SOURCES);
            room.mineral = room.find(FIND_MINERALS);
            room.fill_targets = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
        }
        // delete Memory.rooms;
        // console.log(Game.rooms['W1S22'].mineral);
    }
};