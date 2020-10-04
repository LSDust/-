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
        // creep.moveTo(new RoomPosition(40, 34, 'W1S22'));
        // 5f5dc09b38fab07bee3a37c4
        let terminal = Game.getObjectById('5f676a1c19857e47e6ac5f7f');
        if(creep.transfer(terminal, RESOURCE_OXIDANT) == ERR_NOT_IN_RANGE) {
            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        // creep.transfer(terminal, RESOURCE_ENERGY);
        // if(creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(terminal);
        // }
        // 5f676a1c19857e47e6ac5f7f
        let storage = Game.getObjectById('5f5dc09b38fab07bee3a37c4');
        // if(creep.transfer(storage, RESOURCE_OXIDANT) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
        // }
        // if(creep.withdraw(storage, 'O') == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(storage);
        // }
        
        let factory = Game.getObjectById('5f733b28b3f4cb155d62e2d4');
        // if(creep.transfer(factory, 'O') == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(factory, {visualizePathStyle: {stroke: '#ffffff'}});
        // }
        if(creep.withdraw(factory, RESOURCE_OXIDANT) == ERR_NOT_IN_RANGE) {
            creep.moveTo(factory);
        }

        // const linkFrom = creep.rooms.lookForAt('structure', 40, 35)[0];
        // var linkFrom = Game.getObjectById('5f612959078c19100ca60f7b');
        // if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(linkFrom, {visualizePathStyle: {stroke: '#ffffff'}});
        // }
    }
};