// require('lib.SuperMove');
module.exports = {

    run: function(creep) {
        if(creep.memory.workshop != creep.room.name){
            creep.moveTo(new RoomPosition(25, 25, creep.memory.workshop),{stroke: '#ffffff'});
        }else{
            // var mineral = creep.room.mineral;
            // var sources = creep.room.sources;
            let targets = creep.room.pits;
            let ret_val = creep.harvest(targets[creep.memory.group]);
            if(ret_val == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[creep.memory.group]);
            }else if(ret_val == 0){
                if(Game.time % 10 == 0){
                    let container = creep.pos.findInRange(creep.room.container, 2);
                    if(container.length > 0 && !creep.pos.isEqualTo(container[0])) {
                        creep.moveTo(container[0]);
                        // creep.moveTo(targets[creep.memory.group],{stroke: '#ffffff',range:1});
                    }
                }
            }
            // console.log(creep.body[0].type == 'work');
            // {
            //     if(creep.memory.workshop == 'W1S22' && creep.memory.group == 1){
            //         creep.moveTo(new RoomPosition(34, 21, 'W1S22'));
            //     }else if(creep.memory.workshop == 'W1S23'){
            //         if(creep.memory.group == 1){
            //             creep.moveTo(new RoomPosition(15, 2, 'W1S23'));
            //         }else if(creep.memory.group == 2){
            //             creep.moveTo(new RoomPosition(20, 4, 'W1S23'));
            //         }
            //     }else if(creep.memory.workshop == 'W2S22' && creep.memory.group == 1){
            //         creep.moveTo(new RoomPosition(29, 34, 'W2S22'));
            //     }else if(creep.memory.workshop == 'W3S23' && creep.memory.group == 1){
            //         creep.moveTo(new RoomPosition(36, 8, 'W3S23'));
            //     }else if(creep.memory.workshop == 'W3S23' && creep.memory.group == 2){
            //         creep.moveTo(new RoomPosition(39, 17, 'W3S23'));
            //     }else if(creep.memory.workshop == 'W1S25' && creep.memory.group == 1){
            //         creep.moveTo(new RoomPosition(13, 10, 'W1S25'));
            //     }else{
            //         creep.moveTo(targets[creep.memory.group],{stroke: '#ffffff'});
            //     }
            // }

            if(creep.store.getUsedCapacity() >= 40 && creep.room.controller && creep.room.controller.my){
                let receive_link = creep.pos.findInRange(creep.room.receive_link, 2)[0];
                if(receive_link) {
                    if(creep.transfer(receive_link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[creep.memory.group],{range:1});
                        creep.moveTo(receive_link,{range:1});
                    }
                }
            }

            // let build_targets = creep.pos.findInRange(creep.room.repair_targets, 3);
            // if(build_targets.length > 0) {
            //     creep.build(build_targets[0]);
            // }

            let repair_targets = creep.pos.findInRange(creep.room.repair_targets, 3);
            if(repair_targets.length > 0) {
                creep.repair(repair_targets[0]);
            }

            // if(creep.store.getUsedCapacity() >= 25){
            //     let builde_targets = creep.pos.findInRange(FIND_CONSTRUCTION_SITES,3);
            //     if(builde_targets.length > 0) {
            //         creep.build(builde_targets[0]);
            //         creep.moveTo(builde_targets[0]);
            //     }
            // }
        }
	}
};