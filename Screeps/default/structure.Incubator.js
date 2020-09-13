module.exports = {
    
    run: function(spawnIncubator) {

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                console.log(Memory.creeps[name].role);
                // if(Memory.creeps[name].role == 'builder'){
                //     var newName = 'Builder' + Game.time;
                //     console.log('孵化新的 Builder: ' + newName);
                //     spawnIncubator.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'builder', workshop: Memory.creeps[name].workshop, group: Memory.creeps[name].group}});
                // }
                delete Memory.creeps[name];
                console.log('清除不存在的 creep memory:', name);
            }
        }
        
        // console.log('Harvesters: ' + harvesters.length);
        // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders_W1S23 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.workshop == 'W1S23');
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
        var Miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner');
        var Carriers_W1S22 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier' && creep.memory.workshop == 'W1S22');
        var Carriers_W1S23 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier' && creep.memory.workshop == 'W1S23');
        var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver');

        var Incubator_level = 0;
        if(Miners.length < 1){
            Incubator_level = 2;    //孵化采集者最高等级
        }else if(Carriers_W1S22.length < 2){
            Incubator_level = 1;    //孵化运输者一级孵化等级
        }

        //栈顺序
        if(Incubator_level < 1 ){
            if(reservers.length < 1 ) {
                var newName = 'Reserver' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawnIncubator.spawnCreep([CLAIM,MOVE], newName, {memory: {role: 'reserver',workshop: 'W1S23'}});
            }
            if(upgraders.length < 1 ) {
                var newName = 'Upgrader' + Game.time;
                console.log('孵化新的 Upgrader: ' + newName);
                spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W1S22'}});
            }
            if(builders_W1S23.length < 1 ) {
                var newName = 'Builder_W1S23_' + Game.time;
                console.log('孵化新的 Builder_W1S23: ' + newName);
                spawnIncubator.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'builder', workshop: 'W1S23', group: 0}});
                //spawnIncubator.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'builder', workshop: 'W1S22', group: 0}});
            }
        }
        if(Incubator_level < 2 ) {
            if(Carriers_W1S22.length < 2){
                var newName = 'Carrier_W1S22_' + Game.time;
                console.log('孵化新的 Carrier_W1S22: ' + newName);
                spawnIncubator.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier', workshop: 'W1S22', group :1, taking: true}});
            }
            if(Carriers_W1S23.length < 1){
                var newName = 'Carrier_W1S23_' + Game.time;
                console.log('孵化新的 Carrier_W1S23: ' + newName);
                spawnIncubator.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W1S23', group :1, taking: true}});
            }
        }
        // if(harvesters.length < 0) {
        //     var newName = 'Harvester' + Game.time;
        //     console.log('孵化新的 harvester: ' + newName);
        //     spawnIncubator.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
        // }
        
        if(claimers.length < 6){
            var newName = 'Claimer' + Game.time;
            console.log('孵化新的 Claimer: ' + newName);
            spawnIncubator.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'claimer',workshop: 'W1S23',group: 0}});
        }
        if(Miners.length < 1) {
            var newName = 'Miner' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S22',group:1}});
        }
        
        if(spawnIncubator.spawning) { 
            var spawningCreep = Game.creeps[spawnIncubator.spawning.name];
            spawnIncubator.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawnIncubator.pos.x + 1, 
                spawnIncubator.pos.y, 
                {align: 'left', opacity: 0.8});
        }
    }
};