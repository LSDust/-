module.exports = class PowerCreep{
    constructor(){

    }

    PCWork(powercreep){
        if(powercreep.room.controller && powercreep.room.controller.my){
            if(powercreep.ticksToLive < 1000){
                this.renewPC(powercreep);
            }else{
                this.fillEnergy(powercreep);
            }
            this.fillLab(powercreep);
        }
    }

    renewPC(powercreep){
        if(powercreep.renew(powercreep.room.power_spawn) == ERR_NOT_IN_RANGE){
            powercreep.moveTo(powercreep.room.power_spawn,{visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

    fillEnergy(creep){
        if(creep.memory.taking == 0 && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.taking = 1;
            creep.say('拿取能量');
	    }
	    if(creep.memory.taking != 0 && creep.store.getFreeCapacity() < 50) {
	        creep.memory.taking = 0;
            creep.say('发放');
        }

        if(creep.memory.taking == 0){
            let fill_tower = creep.pos.findClosestByRange(creep.room.towers, {
                filter: function(tower) {
                    return tower.store.getFreeCapacity(RESOURCE_ENERGY) >= 200;
                }
            });
            if(fill_tower){
                //填充塔
                if(creep.transfer(fill_tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(fill_tower, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                //填充ex(逛街)
                if(creep.room.fill_targets.length > 0) {
                    creep.moveTo(creep.room.fill_targets[3], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

            //持续查找
            const targets = creep.pos.findInRange(creep.room.fill_targets, 1);
            if(targets.length > 0) {
                creep.transfer(targets[0], RESOURCE_ENERGY);
            }
        }else if(creep.memory.taking == 1){
            let take_target = "";
            for(let i = 0;creep.room.front_link.length > i;i++){
                if(creep.room.front_link[i].store.getUsedCapacity(RESOURCE_ENERGY) > 0 && creep.pos.inRangeTo(creep.room.front_link[i], 2)){
                    take_target = creep.room.front_link[i];
                    break;
                }
            }
            if(take_target == ""){
                take_target = creep.room.storage;
            }

            if(creep.withdraw(take_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(take_target,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }

    
    fillLab(creep){
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