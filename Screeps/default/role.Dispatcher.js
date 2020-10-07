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
        try{
            let terminal = creep.room.terminal;
            let factory = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_FACTORY;}})[0];
            let storage = creep.room.storage;

            //terminal

            // creep.transfer(terminal, RESOURCE_ENERGY);

            // if(creep.withdraw(terminal, RESOURCE_BATTERY) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(terminal);
            // }
            //storage

            // if(creep.withdraw(storage, 'L') == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(storage);
            // }
            // if(factory.store[RESOURCE_ENERGY] < 2000){
            //     creep.withdraw(storage, RESOURCE_ENERGY);
            //     creep.transfer(factory, RESOURCE_ENERGY);
            // }
            // //factory
            // if(creep.transfer(factory, 'O') == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(factory, {visualizePathStyle: {stroke: '#ffffff'}});
            // }

            // if(creep.withdraw(factory, RESOURCE_OXIDANT) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(factory);
            // }

            // const linkFrom = creep.rooms.lookForAt('structure', 40, 35)[0];
            // var linkFrom = Game.getObjectById('5f612959078c19100ca60f7b');
            // if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(linkFrom, {visualizePathStyle: {stroke: '#ffffff'}});
            // }
            //Link


            
            {
                if(creep.withdraw(storage, 'L') == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
                if(factory.store.getFreeCapacity() > 30000){
                    if(creep.withdraw(terminal, RESOURCE_BATTERY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal);
                    }
                }
                if(creep.withdraw(factory, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(factory);
                }
                if(creep.room.central_link[0].store[RESOURCE_ENERGY] > 0){
                    if(creep.withdraw(creep.room.central_link[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.central_link[0]);
                    }
                }
            }
            {
                if(creep.transfer(terminal, 'L') == ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                if(creep.transfer(factory, RESOURCE_BATTERY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(factory, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }catch{
            console.log('Dispatcher:' + creep + '方法执行失败');
        }
        
    }
};