var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 back');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
            creep.say('🚧 build');
	    }

        if(creep.room.name != creep.memory.workshop){
            // creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{visualizePathStyle: {stroke: '#ffffff'}});
            {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{stroke: '#ffffff'});
            }
        }else{
            if(creep.memory.building){
                //填充
                var target = creep.pos.findClosestByRange(creep.room.fill_targets);
                if(creep.room.fill_targets.length > 0) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    //填充塔
                    var fill_tower = creep.pos.findClosestByRange(creep.room.towers, {
                        filter: function(tower) {
                            return tower.store.getFreeCapacity(RESOURCE_ENERGY) >= 200;
                        }
                    });
                    if(fill_tower){
                        if(creep.transfer(fill_tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(fill_tower, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        //建筑
                        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                        if(targets.length > 0) {
                            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'},range: 1});
                            }
                        }else{
                            //升级
                            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'},range : 3});
                            }
                        }
                    }
                }
                let repair_targets = creep.pos.findInRange(creep.room.repair_targets, 3);
                if(repair_targets.length > 0) {
                    creep.repair(repair_targets[0]);
                }
            }else{
                const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                if(target) {
                    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        // creep.moveTo(target);
                    }
                }
                var source = creep.room.source;
                if(creep.harvest(source[creep.memory.group-1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source[creep.memory.group-1], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;