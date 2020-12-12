/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Carrier_lab');
 * mod.thing == 'a thing'; // true
 */

module.exports = class Carrier_lab{
    constructor(){

    }

    CarrierWork(creep){
        var source_lab = creep.room.source_lab;
        var result_lab = creep.room.result_lab;
        let labs = source_lab.concat(result_lab);

        if(labs[creep.memory.group].status == 0 && creep.memory.taking != 'll' && creep.store.getUsedCapacity() == 0) {
            creep.memory.taking = 'll';
            creep.say('领料');
	    }
	    if(labs[creep.memory.group].status == 0 && creep.memory.taking != 'tl' && creep.store.getUsedCapacity() != 0) {
	        creep.memory.taking = 'tl';
            creep.say('投料');
        }
	    if(labs[creep.memory.group].status == 2 && creep.memory.taking != 'hs' && creep.store.getUsedCapacity() == 0) {
	        creep.memory.taking = 'hs';
            creep.say('回收');
        }
	    if(labs[creep.memory.group].status == 2 && creep.memory.taking != 'cc' && creep.store.getUsedCapacity() != 0) {
	        creep.memory.taking = 'cc';
            creep.say('储藏');
        }



        if(creep.room.memory.lab_info.lab_status == 'hc'){
            this.fillLab(creep,labs[creep.memory.group]);
        }
    }

    fillLab(creep,lab){

        if(creep.memory.taking == 'll'){
            // let terminal = creep.room.terminal;
            // let factory = creep.room.factory;
            // let storage = creep.room.storage;
            console.log(lab.need_source);
            var storage = creep.room.storage;
            if(creep.withdraw(storage, lab.need_source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        if(creep.memory.taking == 'tl'){
            if(creep.transfer(lab, lab.need_source) != OK) {
                creep.moveTo(lab, {visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                creep.memory.group = (creep.memory.group + 1) % 2;
            }
        }
        // let source_lab = creep.room.source_lab;

        // console.log(Object.keys(source_lab[0].store));
        // console.log(source_lab[0].store[0]);
        // if(source_lab[0].store){

        // }

        // let storage = creep.room.storage;
        // if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
        // }
    }
};