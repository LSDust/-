module.exports = class PowerCreep{
    constructor(){

    }

    PCWork(powercreep){
        if(powercreep.room.controller && powercreep.room.controller.my){
            if(powercreep.ticksToLive < 500){
                this.renewPC(powercreep);
            }else if(this.regenSource(powercreep) == 1){}
            else if(this.fillEnergy(powercreep) == 1){}
            else if(this.stockops(powercreep) == 1){}
            else {powercreep.moveTo(32,31);}
            // this.fillLab(powercreep);
            Game.powerCreeps['PC1'].usePower(PWR_GENERATE_OPS);
            
        }
        // if(powercreep.enableRoom(powercreep.room.controller) == ERR_NOT_IN_RANGE){
        //     powercreep.moveTo(powercreep.room.controller);
        // }
        if(powercreep.room.name == 'W1S23'){
            // if(powercreep.enableRoom(powercreep.room.controller) == ERR_NOT_IN_RANGE){
            //     powercreep.moveTo(powercreep.room.controller);
            // }
            if(powercreep.room.source[0].effects == null || powercreep.room.source[0].effects.length == 0 || powercreep.room.source[0].effects[0].ticksRemaining <= 40){
                if(powercreep.pos.inRangeTo(powercreep.room.source[0], 3)) {
                    if(powercreep.room.source[0].effects == null || powercreep.room.source[0].effects.length == 0 || powercreep.room.source[0].effects[0].ticksRemaining <= 15){
                        powercreep.usePower(PWR_REGEN_SOURCE, powercreep.room.source[0]);
                    }
                }else{
                    powercreep.moveTo(powercreep.room.source[0],{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else if(powercreep.room.source[1].effects == null || powercreep.room.source[1].effects.length == 0 || powercreep.room.source[1].effects[0].ticksRemaining <= 40){
                if(powercreep.pos.inRangeTo(powercreep.room.source[1], 3)) {
                    if(powercreep.room.source[1].effects == null || powercreep.room.source[1].effects.length == 0 || powercreep.room.source[1].effects[0].ticksRemaining <= 15){
                        powercreep.usePower(PWR_REGEN_SOURCE, powercreep.room.source[1]);
                    }
                }else{
                    powercreep.moveTo(powercreep.room.source[1],{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                powercreep.moveTo(new RoomPosition(25, 25, 'W1S22'),{stroke: '#ffffff'});
            }
        }
    }

    stockops(powercreep){
        if(powercreep.store['ops'] >= 200){
            if(powercreep.transfer(powercreep.room.storage, 'ops',100) == ERR_NOT_IN_RANGE) {
                powercreep.moveTo(powercreep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
                return 1;
            }
        }
        return 0;
    }

    renewPC(powercreep){
        if(powercreep.renew(powercreep.room.powerSpawn) == ERR_NOT_IN_RANGE){
            powercreep.moveTo(powercreep.room.powerSpawn,{visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

    regenSource(powercreep){
        if(powercreep.powers[PWR_REGEN_SOURCE].cooldown < 45){
            if(powercreep.room.source[0].effects.length == 0 || powercreep.room.source[0].effects[0].ticksRemaining <= 40){
                if(powercreep.room.source[0].effects.length == 0 || powercreep.room.source[0].effects[0].ticksRemaining <= 15){
                    if(powercreep.pos.inRangeTo(powercreep.room.source[0], 3)) {
                        if(powercreep.room.source[0].effects == null || powercreep.room.source[0].effects.length == 0 || powercreep.room.source[0].effects[0].ticksRemaining <= 15){
                            powercreep.usePower(PWR_REGEN_SOURCE, powercreep.room.source[0]);
                            return 1;
                        }else{
                            return 1;
                        }
                    }else{
                        powercreep.moveTo(powercreep.room.source[0],{visualizePathStyle: {stroke: '#ffffff'}});
                        return 1;
                    }
                }
            }else{
                powercreep.moveTo(new RoomPosition(25, 25, 'W1S23'),{stroke: '#ffffff'});
                return 1;
            }
        }
        return 0;
    }

    // asdf(powercreep){
    //     for(let i = 0;i < powercreep.room.source.length;i++){
    //         if(powercreep.room.source[i]){

    //         }
    //     }
    // }

    fillEnergy(creep){
        if(creep.memory.taking == null){
            creep.memory.taking = 1;
        }
        if(creep.memory.taking == 0 && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.taking = 1;
            creep.say('拿取能量');
	    }
	    if(creep.memory.taking != 0 && creep.store.getUsedCapacity() > 800) {
	        creep.memory.taking = 0;
            creep.say('发放');
        }

        if(creep.memory.taking == 0){
            let fill_tower = creep.pos.findClosestByRange(creep.room.tower, {
                filter: function(tower) {
                    return tower.store.getFreeCapacity(RESOURCE_ENERGY) >= 200;
                }
            });

            //持续查找
            const targets = creep.pos.findInRange(creep.room.fill_targets, 1);
            if(targets.length > 0) {
                creep.transfer(targets[0], RESOURCE_ENERGY);
            }
            
            if(fill_tower){
                //填充塔
                if(creep.transfer(fill_tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(fill_tower, {visualizePathStyle: {stroke: '#000000'}});
                    return 1;
                }
            }else{
                //填充ex(逛街)
                if(creep.room.fill_targets.length > 0) {
                    creep.moveTo(creep.room.fill_targets[1], {visualizePathStyle: {stroke: '#000000'}});
                    return 1;
                }
            }
        }else if(creep.memory.taking == 1){
            let take_target = "";
            // for(let i = 0;creep.room.front_link.length > i;i++){
            //     if(creep.room.front_link[i].store.getUsedCapacity(RESOURCE_ENERGY) > 0 && creep.pos.inRangeTo(creep.room.front_link[i], 2)){
            //         take_target = creep.room.front_link[i];
            //         break;
            //     }
            // }
            if(take_target == ""){
                take_target = creep.room.storage;
            }

            if(creep.withdraw(take_target, RESOURCE_ENERGY,800) == ERR_NOT_IN_RANGE) {
                creep.moveTo(take_target,{visualizePathStyle: {stroke: '#ffffff'}});
                return 1;
            }
        }
        return 0;
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