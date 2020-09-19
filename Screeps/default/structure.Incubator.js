module.exports = {
    
    Incubator1: function(spawnIncubator) {

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('清除不存在的 creep memory:', name);
            }
        }

        //#region CREEP工种计数
        //调度
        var Dispatchers_W1S22 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Dispatcher' && creep.memory.workshop == 'W1S22' );
        //采矿
        var Miners_W1S22_G1   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W1S22' && creep.memory.group == 1);
        var Miners_W1S23_G1   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W1S23' && creep.memory.group == 1);
        var Miners_W1S23_G2   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W1S23' && creep.memory.group == 2);
        var Miners_W2S22_G1   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W2S22' && creep.memory.group == 1);
        //运输   
        var Carriers_W1S22    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S22');
        var Carriers_W1S23_G1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S23' && creep.memory.group == 1);
        var Carriers_W1S23_G2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S23' && creep.memory.group == 2);
        var Carriers_W2S22_G1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W2S22' && creep.memory.group == 1);
        //综合   
        var upgraders_W2S22   = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'   && creep.memory.workshop == 'W2S22');
        var upgraders         = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'   && creep.memory.workshop == 'W1S22');
        var Builders_W1S23    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder'    && creep.memory.workshop == 'W1S23');
        var Builders_W1S22    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder'    && creep.memory.workshop == 'W1S22');
        var Builders_W2S22    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder'    && creep.memory.workshop == 'W2S22');
        //声明   
        var reservers_W1S23   = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver'   && creep.memory.workshop == 'W1S23');
        var reservers_W2S22   = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver'   && creep.memory.workshop == 'W2S22');
        var Attackers         = _.filter(Game.creeps, (creep) => creep.memory.role == 'Attacker'   );
        //#endregion

        //应急孵化等级
        var Incubator_level = 2;
        if(Miners_W1S22_G1.length + Miners_W1S23_G1.length + Miners_W1S23_G2.length >= 3){
            Incubator_level--;
            if(Carriers_W1S22.length + Carriers_W1S23_G1.length + Carriers_W1S23_G2.length >= 5){
                Incubator_level--;
            }
        }else{
            console.log("最高应急孵化等级:" + Incubator_level);
        }

        //#region 栈顺序孵化
        if(Incubator_level < 1 ){
            //调度员
            if(Dispatchers_W1S22.length < 1 ) {
                var newName = 'Dispatcher_W1S22_' + Game.time;
                console.log('孵化新的 Dispatcher: ' + newName);
                spawnIncubator.spawnCreep([CARRY,MOVE], newName, {memory: {role: 'Dispatcher',workshop: 'W1S22'}});
            }
            //声明者
            if(reservers_W2S22.length < 0 ) {
                var newName = 'Reserver_W2S22_' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawnIncubator.spawnCreep([CLAIM,CLAIM,MOVE], newName, {memory: {role: 'reserver',workshop: 'W2S22'}});
            }
            if(reservers_W1S23.length < 1 ) {
                var newName = 'Reserver_W1S23_' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawnIncubator.spawnCreep([CLAIM,CLAIM,MOVE], newName, {memory: {role: 'reserver',workshop: 'W1S23'}});
            }
            //全能者
            if(upgraders_W2S22.length < 3 ) {
                var newName = 'Upgrader_W2S22' + Game.time;
                console.log('孵化新的 Upgrader: ' + newName);
                // spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W2S22'}});
                spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W2S22'}});
            }
            if(upgraders.length < 1 ) {
                var newName = 'Upgrader_' + Game.time;
                console.log('孵化新的 Upgrader: ' + newName);
                // spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W1S22'}});
                spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W1S22'}});
            }
            if(Builders_W2S22.length < 3 ) {
                var newName = 'Builder_W2S22_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W2S22', group: 0}});
            }
            if(Builders_W1S23.length < 1 ) {
                var newName = 'Builder_W1S23_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawnIncubator.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W1S23', group: 0}});
            }
            if(Builders_W1S22.length < 2 ) {
                var newName = 'Builder_W1S22_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawnIncubator.spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W1S22', group: 0}});
            }
        }
        if(Incubator_level < 2 ) {
            // 运输者
            if(Carriers_W2S22_G1.length < 0){
                var newName = 'Carrier_W2S22_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawnIncubator.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier', workshop: 'W2S22', group :1, taking: true}});
            }
            if(Carriers_W1S22.length < 1){
                var newName = 'Carrier_W1S22_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawnIncubator.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier', workshop: 'W1S22', group :1, taking: true}});
            }
            if(Carriers_W1S23_G1.length < 2){
                var newName = 'Carrier_W1S23_G1_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawnIncubator.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W1S23', group :1, taking: true}});
            }
            if(Carriers_W1S23_G2.length < 2){
                var newName = 'Carrier_W1S23_G2_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawnIncubator.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W1S23', group :2, taking: true}});
            }
        }
        {
            // 采矿者
            if(Miners_W2S22_G1.length < 1){
                var newName = 'Miner_W2S22_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W2S22',group:1}});
            }
            if(Miners_W1S22_G1.length < 1) {
                var newName = 'Miner_W1S22_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S22',group:1}});
            }
            if(Miners_W1S23_G1.length < 1) {
                var newName = 'Miner_W1S23_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S23',group:1}});
            }
            if(Miners_W1S23_G2.length < 1) {
                var newName = 'Miner_W1S23_G2_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawnIncubator.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S23',group:2}});
            }
        }
        {
            if(Attackers.length < 0 ) {
                var newName = 'Attacker_' + Game.time;
                console.log('孵化新的 Attacker: ' + newName);
                spawnIncubator.spawnCreep([ATTACK,ATTACK,MOVE,MOVE], newName, {memory: {role: 'Attacker',workshop: 'W1S22'}});
                // spawnIncubator.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Attacker',workshop: 'W1S22'}});
            }
        }
        //#endregion
        
        if(spawnIncubator.spawning) { 
            var spawningCreep = Game.creeps[spawnIncubator.spawning.name];
            spawnIncubator.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawnIncubator.pos.x + 1, 
                spawnIncubator.pos.y, 
                {align: 'left', opacity: 0.8});
        }
        return Incubator_level;
    }
};