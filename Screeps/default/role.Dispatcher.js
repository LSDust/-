/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Dispatcher');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep){
        // if(creep.store.getFreeCapacity() > 0){

        // }
        var storage = Game.getObjectById('5f5dc09b38fab07bee3a37c4');
        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }
        // const linkFrom = creep.rooms.lookForAt('structure', 40, 35)[0];
        var linkFrom = Game.getObjectById('5f612959078c19100ca60f7b');
        if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(linkFrom, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};