/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('decision.Incubator');
 * mod.thing == 'a thing'; // true
 */

module.exports = class Incubator{
    
    //#region CREEP工种计数
    constructor() {
        this.clearMemory();
        //调度
        this.Dispatchers_W1S22 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Dispatcher' && creep.memory.workshop == 'W1S22' );
        this.Dispatchers_W2S22 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Dispatcher' && creep.memory.workshop == 'W2S22' );
        //采矿
        this.Miners_W1S22_G1   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W1S22' && creep.memory.group == 1  && (creep.ticksToLive > 30 || creep.spawning));
        this.Miners_W1S22_G0   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W1S22' && creep.memory.group == 0  && (creep.ticksToLive > 80 || creep.spawning));
        this.Miners_W1S23_G1   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W1S23' && creep.memory.group == 1  && (creep.ticksToLive > 50 || creep.spawning));
        this.Miners_W1S23_G2   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W1S23' && creep.memory.group == 2  && (creep.ticksToLive > 50 || creep.spawning));
        this.Miners_W2S22_G1   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W2S22' && creep.memory.group == 1  && (creep.ticksToLive > 50 || creep.spawning));
        this.Miners_W2S22_G0   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W2S22' && creep.memory.group == 0  && (creep.ticksToLive > 80 || creep.spawning));
        this.Miners_W2S23_G1   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W2S23' && creep.memory.group == 1  && (creep.ticksToLive > 50 || creep.spawning));
        this.Miners_W3S23_G1   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W3S23' && creep.memory.group == 1  && (creep.ticksToLive > 90 || creep.spawning));
        this.Miners_W3S23_G2   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W3S23' && creep.memory.group == 2  && (creep.ticksToLive > 90 || creep.spawning));
        this.Miners_W3S22_G1   = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner'      && creep.memory.workshop == 'W3S22' && creep.memory.group == 1  && (creep.ticksToLive > 100 || creep.spawning));
        //运输   
        this.Carriers_W1S22    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S22' && creep.memory.group == 1);
        this.Carriers_W1S22_G2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S22' && creep.memory.group == 2);
        this.Carriers_W1S23_G1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S23' && creep.memory.group == 1);
        this.Carriers_W1S23_G2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S23' && creep.memory.group == 2);
        this.Carriers_W2S22_G1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W2S22' && creep.memory.group == 1);
        this.Carriers_W2S22_G2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W2S22' && creep.memory.group == 2);
        this.Carriers_W2S23_G1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W2S23' && creep.memory.group == 1);
        this.Carriers_W3S23_G1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W3S23' && creep.memory.group == 1);
        this.Carriers_W3S23_G2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W3S23' && creep.memory.group == 2);
        this.Carriers_W3S22_G1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W3S22' && creep.memory.group == 1);
        this.Carriers_power    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Carrier_p'  && creep.memory.workshop == 'W2S20' && creep.memory.group == 0);
        //综合   
        this.upgraders_W2S22   = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'   && creep.memory.workshop == 'W2S22');
        this.upgraders         = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'   && creep.memory.workshop == 'W1S22');
        this.Builders_W1S23    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder'    && creep.memory.workshop == 'W1S23');
        this.Builders_W1S22    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder'    && creep.memory.workshop == 'W1S22');
        this.Builders_W2S22    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder'    && creep.memory.workshop == 'W2S22');
        this.Builders_W2S23    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder'    && creep.memory.workshop == 'W2S23');
        this.Builders_W3S23    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder'    && creep.memory.workshop == 'W3S23');
        this.Builders_W3S22    = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder'    && creep.memory.workshop == 'W3S22');
        //声明   
        this.reservers_W1S23   = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver'   && creep.memory.workshop == 'W1S23');
        this.reservers_W2S23   = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver'   && creep.memory.workshop == 'W2S23');
        this.reservers_W3S23   = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver'   && creep.memory.workshop == 'W3S23');
        this.reservers_W3S22   = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver'   && creep.memory.workshop == 'W3S22');
        //战斗
        this.Attackers         = _.filter(Game.creeps, (creep) => creep.memory.role == 'Attacker'   );
        this.RangAttackers     = _.filter(Game.creeps, (creep) => creep.memory.role == 'RangAttacker'   );
        this.RangAttackers_0   = _.filter(Game.creeps, (creep) => creep.memory.role == 'RangAttacker' && creep.memory.workshop == 'E0S21');
        this.Attackers_0       = _.filter(Game.creeps, (creep) => creep.memory.role == 'Attacker'   && creep.memory.workshop == 'E0S21'  );
        
    }
    //#endregion

    clearMemory(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('清除不存在的 creep memory:', name);
            }
        }
    }    

    incubatorLevel(spawn){
        this.Incubator_Level = 2;
        if(this.Miners_W1S22_G1.length + this.Miners_W1S23_G1.length + this.Miners_W1S23_G2.length >= 3){
            this.Incubator_Level--;
            if(this.Carriers_W1S22.length + this.Carriers_W1S23_G1.length + this.Carriers_W1S23_G2.length >= 3){
                this.Incubator_Level--;
            }
        }
        // spawn.memory.Incubator_Level = this.Incubator_Level;
        return this.Incubator_Level;
    }

    //#region 栈顺序孵化 Spawn1
    w1S22Spawn1Incubator(spawn){
        if(this.Incubator_Level < 1 ){
            
            //调度员
            if(this.Dispatchers_W1S22.length < 1 ) {
                var newName = 'Dispatcher_W1S22_' + Game.time;
                console.log('孵化新的 Dispatcher: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: 'Dispatcher',workshop: 'W1S22'}});
            }
            //声明者
            if(this.reservers_W1S23.length < 1 && Game.rooms['W1S23'].controller.reservation.ticksToEnd < 4000) {
                var newName = 'Reserver_W1S23_' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawn.spawnCreep([CLAIM,CLAIM,MOVE], newName, {memory: {role: 'reserver',workshop: 'W1S23'}});
            }
            //全能者
            if(this.upgraders.length < 4 ) {
                var newName = 'Upgrader_' + Game.time;
                console.log('孵化新的 Upgrader: ' + newName);
                // spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W1S22'}});
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W1S22'}});
            }
            if(this.Builders_W1S23.length < 1 ) {
                var newName = 'Builder_W1S23_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W1S23',birthroom:'W1S22', group: 0}});
            }
            if(this.Builders_W1S22.length < 1 ) {
                var newName = 'Builder_W1S22_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W1S22',birthroom:'W1S22', group: 0}});
            }
        }
        if(this.Incubator_Level < 2 ) {
            // 运输者
            if(this.Carriers_W1S22_G2.length < 1 && Game.getObjectById('5bbcb2cd40062e4259e93dc0').mineralAmount > 0){
                var newName = 'Carriers_W1S22_G2_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier', workshop: 'W1S22', birthroom:'W1S22',group :2, taking: true}});
            }
            if(this.Carriers_W1S22.length < 1){
                var newName = 'Carrier_W1S22_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier', workshop: 'W1S22', birthroom:'W1S22',group :1, taking: true}});
            }
            if(this.Carriers_W1S23_G1.length < 1){
                var newName = 'Carrier_W1S23_G1_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W1S23', birthroom:'W1S22',group :1, taking: true}});
            }
            if(this.Carriers_W1S23_G2.length < 1){
                var newName = 'Carrier_W1S23_G2_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W1S23', birthroom:'W1S22',group :2, taking: true}});
            }
        }
        {
            // 采矿者
            if(this.Miners_W1S22_G0.length < 1 && Game.getObjectById('5bbcb2cd40062e4259e93dc0').mineralAmount > 0) {
                var newName = 'Miner_W1S22_G0_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S22',group:0}});
            }
            if(this.Miners_W1S22_G1.length < 1) {
                var newName = 'Miner_W1S22_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S22',group:1}});
            }
            if(this.Miners_W1S23_G1.length < 1) {
                var newName = 'Miner_W1S23_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S23',group:1}});
            }
            if(this.Miners_W1S23_G2.length < 1) {
                var newName = 'Miner_W1S23_G2_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S23',group:2}});
            }
        }
        {
            
            // if(this.RangAttackers_0.length < 2 ) {
            //     var newName = 'RangAttacker_' + Game.time;
            //     console.log('孵化新的 RangAttacker: ' + newName);
            //     spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], newName, {memory: {role: 'RangAttacker',workshop: 'E0S21'}});
            // }
            // if(this.Attackers_0.length < 3 ) {
            //     var newName = 'Attacker_' + Game.time;
            //     console.log('孵化新的 Attacker: ' + newName);
            //     spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], newName, {memory: {role: 'Attacker',workshop: 'E0S21'}});
            //     // spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Attacker',workshop: 'W1S22'}});
            // }
            // if(this.Attackers.length < 0 ) {
            //     var newName = 'Attacker_' + Game.time;
            //     console.log('孵化新的 Attacker: ' + newName);
            //     spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], newName, {memory: {role: 'Attacker',workshop: 'W1S22'}});
            //     // spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Attacker',workshop: 'W1S22'}});
            // }
            // if(this.RangAttackers.length < 4 ) {
            //     var newName = 'RangAttacker_' + Game.time;
            //     console.log('孵化新的 RangAttacker: ' + newName);
            //     spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], newName, {memory: {role: 'RangAttacker',workshop: 'W3S23'}});
            // }
            
        }
        this.printSpawning(spawn);
    }

    w2S22Spawn1Incubator(spawn){
        if(Memory.Defense.war_room.indexOf('W3S22') == -1)
        {
            if(this.reservers_W3S22.length < 1) {
                var newName = 'Reserver_W3S22_' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawn.spawnCreep([CLAIM,CLAIM,MOVE], newName, {memory: {role: 'reserver',workshop: 'W3S22'}});
            }
            if(this.Carriers_W3S22_G1.length < 2){
                var newName = 'Carrier_W3S22_G1_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W3S22',birthroom:'W2S22', group :1, taking: true}});
            }
            if(this.Miners_W3S22_G1.length < 1){
                var newName = 'Miner_W3S22_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W3S22',group:1}});
            }
            if(this.Builders_W3S22.length < 1 ) {
                var newName = 'Builder_W3S22_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W3S22',birthroom:'W2S22', group: 0}});
            }
        }
        if(Memory.Defense.war_room.indexOf('W3S23') == -1)
        {
            if(this.reservers_W3S23.length < 1 && Game.rooms['W3S23'].controller.reservation.ticksToEnd < 4000) {
                var newName = 'Reserver_W3S23_' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawn.spawnCreep([CLAIM,CLAIM,MOVE], newName, {memory: {role: 'reserver',workshop: 'W3S23'}});
            }
            if(this.Carriers_W3S23_G1.length < 1){
                var newName = 'Carrier_W3S23_G1_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W3S23',birthroom:'W2S22', group :1, taking: true}});
            }
            if(this.Carriers_W3S23_G2.length < 2){
                var newName = 'Carrier_W3S23_G2_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W3S23',birthroom:'W2S22', group :2, taking: true}});
            }
            if(this.Miners_W3S23_G2.length < 1){
                var newName = 'Miner_W3S23_G2_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W3S23',group:2}});
            } 
            if(this.Miners_W3S23_G1.length < 1){
                var newName = 'Miner_W3S23_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W3S23',group:1}});
            }
            if(this.Builders_W3S23.length < 1 ) {
                var newName = 'Builder_W3S23_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W3S23',birthroom:'W2S22', group: 0}});
            }
        }
            if(this.RangAttackers.length < 0 ) {
                var newName = 'RangAttacker_' + Game.time;
                console.log('孵化新的 RangAttacker: ' + newName);
                spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL], newName, {memory: {role: 'RangAttacker',workshop: 'W3S22'}});
            }
        {   
            if(this.reservers_W2S23.length < 1 ) {
                var newName = 'Reserver_W2S23_' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawn.spawnCreep([CLAIM,CLAIM,MOVE], newName, {memory: {role: 'reserver',workshop: 'W2S23'}});
            }
            if(this.Carriers_W2S23_G1.length < 1){
                var newName = 'Carrier_W2S23_G1_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W2S23',birthroom:'W2S22', group :1, taking: true}});
            }
            if(this.Miners_W2S23_G1.length < 1){
                var newName = 'Miner_W2S23_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W2S23',group:1}});
            } 
            if(this.Builders_W2S23.length < 1 ) {
                var newName = 'Builder_W2S23_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W2S23',birthroom:'W2S22', group: 0}});
            }
        }

        if(this.Dispatchers_W2S22.length < 1 ) {
            var newName = 'Dispatcher_W2S22_' + Game.time;
            console.log('孵化新的 Dispatcher: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: 'Dispatcher',workshop: 'W2S22'}});
        }
        if(this.Carriers_W2S22_G2.length < 1 && Game.getObjectById('5bbcb2c240062e4259e93d54').mineralAmount > 0){
            var newName = 'Carrier_W2S22_G2_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W2S22',birthroom:'W2S22', group :2, taking: true}});
        }
        if(this.Miners_W2S22_G0.length < 1 && Game.getObjectById('5bbcb2c240062e4259e93d54').mineralAmount > 0){
            var newName = 'Miner_W2S22_G0_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W2S22',group:0}});
        }
        if(this.upgraders_W2S22.length < 3 ) {
            var newName = 'Upgrader_W2S22' + Game.time;
            console.log('孵化新的 Upgrader: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W2S22'}});
        }
        if(this.Carriers_W2S22_G1.length < 1){
            var newName = 'Carrier_W2S22_G1_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W2S22',birthroom:'W2S22', group :1, taking: true}});
        }
        if(this.Miners_W2S22_G1.length < 1){
            var newName = 'Miner_W2S22_G1_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W2S22',group:1}});
        }
        if(this.Builders_W2S22.length < 2 ) {
            var newName = 'Builder_W2S22_' + Game.time;
            console.log('孵化新的 Builder: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W2S22',birthroom:'W2S22', group: 0}});
        }
        if(this.Carriers_power.length < 0){
            var newName = 'Carriers_power_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier_p',workshop: 'W2S20', birthroom:'W1S22',group :0, taking: true}});
        }
        this.printSpawning(spawn);
    }

    //#endregion

    printSpawning(spawn){
        if(spawn.spawning) { 
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1, 
                spawn.pos.y, 
                {align: 'left', opacity: 0.8});
        }
    }
};