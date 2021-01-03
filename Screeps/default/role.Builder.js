// require('lib.SuperMove');
var roleBuilder = class Builder{

    constructor(){

    }

    BuilderWork(creep) {

        this.statusChang(creep);

	    if(creep.memory.building) {
            if(creep.memory.workshop != creep.room.name){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
            }
            else
            {
                if(this.fillEx(creep) == 0){
                    if(this.fillTower(creep) == 0){
                        if(this.build(creep) == 0){
                            // if(this.reuse(creep) == 0){
                                if(this.repair(creep) == 0){
                                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                                    }else{
                                        // creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'},range:1});
                                        // if(creep.room.name == "W2S21"){
                                        //     if(creep.signController(creep.room.controller, "四方□□谓之宇，古往今来谓之宙") == ERR_NOT_IN_RANGE) {
                                        //         creep.moveTo(creep.room.controller);
                                        //     }
                                        // }
                                    }
                                }
                            // }
                        }
                    }
                }
            }
	    } else {
            if(creep.room.name == creep.memory.birthroom){
                // var storage = Game.getObjectById('5f5dc09b38fab07bee3a37c4');
                let spawns = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_SPAWN && structure.spawning == null);
                        }
                });
                if(creep.ticksToLive < 300 && spawns.length > 0 && false){
                    creep.moveTo(spawns[0],{visualizePathStyle: {stroke: '#ffffff'}});
                    spawns[0].renewCreep(creep);
                }else{
                    //不需要renew,拿取资源
                    if(true || spawns.length == 0 || spawns[0].renewCreep(creep) == ERR_FULL || spawns[0].renewCreep(creep) == ERR_NOT_IN_RANGE && true)
                    {
                        var storage = creep.room.storage;
                        if(creep.room.name == 'E3S190'){
                            storage = creep.room.tower[0];
                        }
                        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }else{
                const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                if(target) {
                    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }else{
                    var container = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER 
                                     && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                            }
                    });
                    container.sort((a,b) => b.store.getUsedCapacity() - a.store.getUsedCapacity());
                    if(creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container[0],{visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
	    }
    }
    
    statusChang(creep){
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            // creep.memory.dontPullMe = false;
            creep.say('🔄 back');
            //援建
            // if(creep.room.name == 'W1S25' && creep.memory.birthroom == 'W1S22'){
            //     creep.memory.role = 'Harvester';
            // }
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
            // creep.memory.dontPullMe = false;
            creep.say('🚧 build');
	    }
    }

    fillTower(creep){
        let fill_tower = creep.pos.findClosestByRange(creep.room.tower, {
            filter: function(tower) {
                return tower.store.getFreeCapacity(RESOURCE_ENERGY) >= 400;
            }
        });
        if(fill_tower){
            if(creep.transfer(fill_tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(fill_tower, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return 1;
        }else{
            return 0;
        }
    }

    fillEx(creep){
        var target = creep.pos.findClosestByRange(creep.room.fill_targets);
        if(creep.room.fill_targets.length > 0 && creep.room.name != 'E3S19') {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return 1;
        }else{
            return 0;
        }
    }

    build(creep){
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length > 0) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'},range: 3});
            }else{
                // creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'},range: 2});
            }
            return 1;
        }else{
            return 0;
        }
    }

    fillLab(creep){
        var storage = creep.room.storage;
        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

    repair(creep){
        const repair_targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax 
                && object.hitsMax - object.hits >= 1000
                && object.structureType != STRUCTURE_WALL
                && object.structureType != STRUCTURE_RAMPART
                // && object.structureType != STRUCTURE_ROAD
        });
        // repair_targets.sort((a,b) => a.hits - b.hits);
        if(repair_targets.length > 0) {
            if(creep.repair(repair_targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repair_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return 1;
        }else{
            return 0;
        }
    }

    reuse(creep){

        // let target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        // if(target) {
        //     if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
        //         // creep.moveTo(target);
        //     }
        // }

        let tombstones = creep.room.find(FIND_TOMBSTONES, {
            filter: object => object.store['energe'] != 0 
        });
        // console.log(tombstones);
        if(tombstones.length > 0 && creep.store.getFreeCapacity > 100){
            if(creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tombstones[0],{visualizePathStyle: {stroke: '#ffffff'}});
            }
            return 1;
        }else{
            return 0;
        }
        
    }
};

module.exports = roleBuilder;