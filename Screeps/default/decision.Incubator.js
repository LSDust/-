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
        //调度
        this.Dispatchers_W1S22_count = 0;
        this.Dispatchers_W2S22_count = 0;
        this.Dispatchers_W2S21_count = 0;
        this.Dispatchers_E1S15_count = 0;
        this.Dispatchers_W47S16_count = 0;
        //采矿
        this.Miners_W1S22_G1_count = 0;
        this.Miners_W1S22_G0_count = 0;
        this.Miners_W1S23_G1_count = 0;
        this.Miners_W1S23_G2_count = 0;
        this.Miners_W2S22_G1_count = 0;
        this.Miners_W2S22_G0_count = 0;
        this.Miners_W2S23_G1_count = 0;
        this.Miners_W3S23_G1_count = 0;
        this.Miners_W3S23_G2_count = 0;
        this.Miners_W3S22_G1_count = 0;
        this.Miners_W2S21_G1_count = 0;
        this.Miners_E1S15_G1_count = 0;
        this.Miners_E1S15_G2_count = 0;
        this.Miners_W47S16_G2_count = 0;
        this.Miners_W47S16_G1_count = 0;
        // this.Miners_W3S21_G1_count = 0;
        // this.Miners_W3S21_G2_count = 0;
        this.Miners_E3S19_G1_count = 0;
        this.Miners_E3S19_G2_count = 0;
        //运输   
        this.Carriers_W1S22_count = 0;
        this.Carriers_W1S22_G2_count = 0;
        this.Carriers_W1S23_G1_count = 0;
        this.Carriers_W1S23_G2_count = 0;
        this.Carriers_W2S22_G1_count = 0;
        this.Carriers_W2S22_G2_count = 0;
        this.Carriers_W2S23_G1_count = 0;
        this.Carriers_W3S23_G1_count = 0;
        this.Carriers_W3S23_G2_count = 0;
        this.Carriers_W3S22_G1_count = 0;
        this.Carriers_power_count = 0;
        this.Carriers_P_W2S22_count = 0;
        this.Carriers_W1S25_G1_count = 0;
        this.Carriers_W1S25_G2_count = 0;
        this.Carriers_W1S25_G3_count = 0;
        this.Carriers_W2S21_G1_count = 0;
        this.Carriers_W2S21_G2_count = 0;
        this.Carriers_W1S22_lab_count = 0;
        this.Carriers_E1S15_G2_count = 0;
        this.Carriers_E1S15_G1_count = 0;
        this.Carriers_W47S16_G1_count = 0;
        this.Carriers_W47S16_G2_count = 0;
        this.Carriers_W3S21_G1_count = 0;
        this.Carriers_E3S19_G1_count = 0;
        //综合   
        this.upgraders_W2S22_count = 0;
        this.upgraders_count = 0;
        this.Builders_W1S23_count = 0;
        this.Builders_W1S22_count = 0;
        this.Builders_W2S22_count = 0;
        this.Builders_W2S23_count = 0;
        this.Builders_W3S23_count = 0;
        this.Builders_W3S22_count = 0;
        this.Builders_E1S15_count = 0;
        this.upgraders_E1S15_count = 0;
        this.upgraders_W47S16_count = 0;
        this.Builders_W47S16_count = 0;
        this.upgraders_E3S19_count = 0;
        //援建
        this.Builders_W1S25_count = 0;
        this.Harvester_W1S25_G0_count = 0;
        this.Harvester_W1S25_G1_count = 0;
        this.Recyclers_count = 0;
        this.Harvester_W2S21_G1_count = 0;
        this.Recyclers_W2S21_count = 0;
        this.Builders_W2S21_count = 0;
        this.Harvester_E1S15_G1_count = 0;
        this.Harvester_E1S15_G2_count = 0;
        this.Harvester_W47S16_G2_count = 0;
        this.Harvester_W47S16_G1_count = 0;
        //声明   
        this.reservers_W1S23_count = 0;
        this.reservers_W2S23_count = 0;
        this.reservers_W3S23_count = 0;
        this.reservers_W3S22_count = 0;
        this.reservers_W3S21_count = 0;
        //战斗
        this.Attackers_count = 0;
        this.RangAttackers_count = 0;
        this.RangAttackers_0_count = 0;
        this.Attackers_0_count = 0;
        //过道
        this.Dpo_Harvesters1_count = 0;
        this.Dpo_Harvesters2_count = 0;
        this.Dpo_Harvesters3_count = 0;
        this.Dpo_Harvesters4_count = 0;
        this.Dpo_Harvesters5_count = 0;
        this.clearMemory();
    }
    //#endregion

    //附加了creep计数
    clearMemory(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('清除不存在的 creep memory:', name);
            }else{
                let creep = Game.creeps[name];
                
                //调度
                if(creep.memory.role == 'Dispatcher' && creep.memory.workshop == 'W1S22'  && (creep.ticksToLive > 50 || creep.spawning)) { this.Dispatchers_W1S22_count += 1; }
                else if(creep.memory.role == 'Dispatcher' && creep.memory.workshop == 'W2S22'  && (creep.ticksToLive > 50 || creep.spawning)) { this.Dispatchers_W2S22_count += 1; }
                else if(creep.memory.role == 'Dispatcher' && creep.memory.workshop == 'W2S21'  && (creep.ticksToLive > 50 || creep.spawning)) { this.Dispatchers_W2S21_count += 1; }
                else if(creep.memory.role == 'Dispatcher' && creep.memory.workshop == 'E1S15'  && (creep.ticksToLive > 50 || creep.spawning)) { this.Dispatchers_E1S15_count += 1; }
                else if(creep.memory.role == 'Dispatcher' && creep.memory.workshop == 'W47S16' && (creep.ticksToLive > 50 || creep.spawning)) { this.Dispatchers_W47S16_count += 1; }
                //采矿
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W1S22'  && creep.memory.group == 1  && (creep.ticksToLive > 75 || creep.spawning)) { this.Miners_W1S22_G1_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W1S22'  && creep.memory.group == 0  && (creep.ticksToLive > 80 || creep.spawning)) { this.Miners_W1S22_G0_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W1S23'  && creep.memory.group == 1  && (creep.ticksToLive > 135 || creep.spawning)) { this.Miners_W1S23_G1_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W1S23'  && creep.memory.group == 2  && (creep.ticksToLive > 135 || creep.spawning)) { this.Miners_W1S23_G2_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W2S22'  && creep.memory.group == 1  && (creep.ticksToLive > 50 || creep.spawning)) { this.Miners_W2S22_G1_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W2S22'  && creep.memory.group == 0  && (creep.ticksToLive > 80 || creep.spawning)) { this.Miners_W2S22_G0_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W2S23'  && creep.memory.group == 1  && (creep.ticksToLive > 50 || creep.spawning)) { this.Miners_W2S23_G1_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W3S23'  && creep.memory.group == 1  && (creep.ticksToLive > 85 || creep.spawning)) { this.Miners_W3S23_G1_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W3S23'  && creep.memory.group == 2  && (creep.ticksToLive > 80 || creep.spawning)) { this.Miners_W3S23_G2_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W3S22'  && creep.memory.group == 1  && (creep.ticksToLive > 95 || creep.spawning)) { this.Miners_W3S22_G1_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W2S21'  && creep.memory.group == 1  && (creep.ticksToLive > 30 || creep.spawning)) { this.Miners_W2S21_G1_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'E1S15'  && creep.memory.group == 1  && (creep.ticksToLive > 50 || creep.spawning)) { this.Miners_E1S15_G1_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'E1S15'  && creep.memory.group == 2  && (creep.ticksToLive > 50 || creep.spawning)) { this.Miners_E1S15_G2_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W47S16' && creep.memory.group == 2  && (creep.ticksToLive > 50 || creep.spawning)) { this.Miners_W47S16_G2_count += 1; }
                else if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W47S16' && creep.memory.group == 1  && (creep.ticksToLive > 50 || creep.spawning)) { this.Miners_W47S16_G1_count += 1; }
                // if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W3S21' && creep.memory.group == 1  && (creep.ticksToLive > 90 || creep.spawning)) { this.Miners_W3S21_G1_count += 1; }
                // if(creep.memory.role == 'Miner' && creep.memory.workshop == 'W3S21' && creep.memory.group == 2  && (creep.ticksToLive > 90 || creep.spawning)) { this.Miners_W3S21_G2_count += 1; }
                if(creep.memory.role == 'Miner' && creep.memory.workshop == 'E3S19' && creep.memory.group == 1  && (creep.ticksToLive > 60 || creep.spawning)) { this.Miners_E3S19_G1_count += 1; }
                if(creep.memory.role == 'Miner' && creep.memory.workshop == 'E3S19' && creep.memory.group == 2  && (creep.ticksToLive > 40 || creep.spawning)) { this.Miners_E3S19_G2_count += 1; }
                //搬运工
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S22'  && creep.memory.group == 1  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W1S22_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S22'  && creep.memory.group == 2  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W1S22_G2_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S23'  && creep.memory.group == 1  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W1S23_G1_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S23'  && creep.memory.group == 2  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W1S23_G2_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W2S22'  && creep.memory.group == 1  && (creep.ticksToLive > 50 || creep.spawning)) { this.Carriers_W2S22_G1_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W2S22'  && creep.memory.group == 2  && (creep.ticksToLive > 50 || creep.spawning)) { this.Carriers_W2S22_G2_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W2S23'  && creep.memory.group == 1  && (creep.ticksToLive > 100 || creep.spawning)) { this.Carriers_W2S23_G1_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W3S23'  && creep.memory.group == 1  && (creep.ticksToLive > 180 || creep.spawning)) { this.Carriers_W3S23_G1_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W3S23'  && creep.memory.group == 2  && (creep.ticksToLive > 180 || creep.spawning)) { this.Carriers_W3S23_G2_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W3S22'  && creep.memory.group == 1  && (creep.ticksToLive > 250 || creep.spawning)) { this.Carriers_W3S22_G1_count += 1; }
                else if(creep.memory.role == 'Carrier_p'  && creep.memory.workshop == 'W1S22'  && creep.memory.group == 0  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_power_count += 1; }
                else if(creep.memory.role == 'Carrier_p'  && creep.memory.workshop == 'W2S22'  && creep.memory.group == 0  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_P_W2S22_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S25'  && creep.memory.group == 1  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W1S25_G1_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S25'  && creep.memory.group == 2  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W1S25_G2_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W1S25'  && creep.memory.group == 3  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W1S25_G3_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W2S21'  && creep.memory.group == 1  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W2S21_G1_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W2S21'  && creep.memory.group == 2  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W2S21_G2_count += 1; }
                else if(creep.memory.role == 'Carrier_lab'&& creep.memory.workshop == 'W1S22'  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W1S22_lab_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'E1S15'  && creep.memory.group == 2  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_E1S15_G2_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'E1S15'  && creep.memory.group == 1  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_E1S15_G1_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W47S16' && creep.memory.group == 1  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W47S16_G1_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W47S16' && creep.memory.group == 2  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W47S16_G2_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'W3S21'  && creep.memory.group == 1  && (creep.ticksToLive > 30 || creep.spawning)) { this.Carriers_W3S21_G1_count += 1; }
                else if(creep.memory.role == 'Carrier'    && creep.memory.workshop == 'E3S19'  && creep.memory.group == 1  && (creep.ticksToLive > 600 || creep.spawning)) { this.Carriers_E3S19_G1_count += 1; }
                //综合
                else if(creep.memory.role == 'upgrader'   && creep.memory.workshop == 'W2S22')  { this.upgraders_W2S22_count += 1; }
                else if(creep.memory.role == 'upgrader'   && creep.memory.workshop == 'W1S22')  { this.upgraders_count += 1; }
                else if(creep.memory.role == 'Builder'    && creep.memory.workshop == 'W1S23')  { this.Builders_W1S23_count += 1; }
                else if(creep.memory.role == 'Builder'    && creep.memory.workshop == 'W1S22')  { this.Builders_W1S22_count += 1; }
                else if(creep.memory.role == 'Builder'    && creep.memory.workshop == 'W2S22')  { this.Builders_W2S22_count += 1; }
                else if(creep.memory.role == 'Builder'    && creep.memory.workshop == 'W2S23')  { this.Builders_W2S23_count += 1; }
                else if(creep.memory.role == 'Builder'    && creep.memory.workshop == 'W3S23')  { this.Builders_W3S23_count += 1; }
                else if(creep.memory.role == 'Builder'    && creep.memory.workshop == 'W3S22')  { this.Builders_W3S22_count += 1; }
                else if(creep.memory.role == 'Builder'    && creep.memory.workshop == 'E1S15')  { this.Builders_E1S15_count += 1; }
                else if(creep.memory.role == 'upgrader'   && creep.memory.workshop == 'E1S15')  { this.upgraders_E1S15_count += 1; }
                else if(creep.memory.role == 'upgrader'   && creep.memory.workshop == 'W47S16') { this.upgraders_W47S16_count += 1; }
                else if(creep.memory.role == 'Builder'    && creep.memory.workshop == 'W47S16') { this.Builders_W47S16_count += 1; }
                else if(creep.memory.role == 'upgrader'   && creep.memory.workshop == 'E3S19') { this.upgraders_E3S19_count += 1; }
                //援建
                else if(creep.memory.role == 'Builder'    && creep.memory.workshop == 'E1S15') { this.Builders_W1S25_count += 1; }
                else if(creep.memory.role == 'Harvester'  && creep.memory.workshop == 'E3S19' && creep.memory.group == 2) { this.Harvester_W1S25_G0_count += 1; }
                else if(creep.memory.role == 'Harvester'  && creep.memory.workshop == 'E3S19' && creep.memory.group == 1) { this.Harvester_W1S25_G1_count += 1; }
                else if(creep.memory.role == 'Recycler'   && creep.memory.workshop == 'E3S19' ) { this.Recyclers_count += 1; }
                else if(creep.memory.role == 'Harvester'  && creep.memory.workshop == 'W2S21' && creep.memory.group == 1 && (creep.ticksToLive > 50 || creep.spawning)) { this.Harvester_W2S21_G1_count += 1; }
                else if(creep.memory.role == 'Recycler'   && creep.memory.workshop == 'W2S21' ) { this.Recyclers_W2S21_count += 1; }
                else if(creep.memory.role == 'Builder'    && creep.memory.workshop == 'W2S21' && (creep.ticksToLive > 10 || creep.spawning)) { this.Builders_W2S21_count += 1; }
                else if(creep.memory.role == 'Harvester'  && creep.memory.workshop == 'E1S15' && creep.memory.group == 1) { this.Harvester_E1S15_G1_count += 1; }
                else if(creep.memory.role == 'Harvester'  && creep.memory.workshop == 'E1S15' && creep.memory.group == 2) { this.Harvester_E1S15_G2_count += 1; }
                else if(creep.memory.role == 'Harvester'  && creep.memory.workshop == 'W47S16' && creep.memory.group == 2) { this.Harvester_W47S16_G2_count += 1; }
                else if(creep.memory.role == 'Harvester'  && creep.memory.workshop == 'W47S16' && creep.memory.group == 1) { this.Harvester_W47S16_G1_count += 1; }
                //预约
                else if(creep.memory.role == 'reserver'   && creep.memory.workshop == 'W1S23') { this.reservers_W1S23_count += 1; }
                else if(creep.memory.role == 'reserver'   && creep.memory.workshop == 'W2S23') { this.reservers_W2S23_count += 1; }
                else if(creep.memory.role == 'reserver'   && creep.memory.workshop == 'W3S23') { this.reservers_W3S23_count += 1; }
                else if(creep.memory.role == 'reserver'   && creep.memory.workshop == 'W3S22') { this.reservers_W3S22_count += 1; }
                else if(creep.memory.role == 'reserver'   && creep.memory.workshop == 'W3S21') { this.reservers_W3S21_count += 1; }
                //攻击
                else if(creep.memory.role == 'Attacker'   ) { this.Attackers_count += 1; }
                else if(creep.memory.role == 'RangAttacker'   ) { this.RangAttackers_count += 1; }
                else if(creep.memory.role == 'RangAttacker' && creep.memory.workshop == 'E0S21') { this.RangAttackers_0_count += 1; }
                else if(creep.memory.role == 'Attacker'   && creep.memory.workshop == 'E0S21'  ) { this.Attackers_0_count += 1; }
                //过道
                else if(creep.memory.role == 'DepositsHarvester' && creep.memory.workshop == 'W0S21'  && (creep.ticksToLive > 150 || creep.spawning)) { this.Dpo_Harvesters1_count +=1; }
                else if(creep.memory.role == 'DepositsHarvester' && creep.memory.workshop == 'E0S20'  && (creep.ticksToLive > 150 || creep.spawning)) { this.Dpo_Harvesters2_count +=1; }
                else if(creep.memory.role == 'DepositsHarvester' && creep.memory.workshop == 'W1S20'  && (creep.ticksToLive > 150 || creep.spawning)) { this.Dpo_Harvesters3_count +=1; }
                else if(creep.memory.role == 'DepositsHarvester' && creep.memory.workshop == 'W3S20'  && (creep.ticksToLive > 150 || creep.spawning)) { this.Dpo_Harvesters4_count +=1; }
                else if(creep.memory.role == 'DepositsHarvester' && creep.memory.workshop == 'W4S20'  && (creep.ticksToLive > 150 || creep.spawning)) { this.Dpo_Harvesters5_count +=1; }
            }
        }
    }    

    incubatorLevel(spawn){
        this.Incubator_Level = 2;
        if(this.Miners_W1S22_G1_count + this.Miners_W1S23_G1_count + this.Miners_W1S23_G2_count >= 0){
            this.Incubator_Level--;
            if(this.Carriers_W1S22_count + this.Carriers_W1S23_G1_count + this.Carriers_W1S23_G2_count >= 0){
                this.Incubator_Level--;
            }
        }
        // spawn.memory.Incubator_Level = this.Incubator_Level;
        return this.Incubator_Level;
    }

    //#region 栈顺序孵化 Spawn1
    w1S22Spawn1Incubator(spawn){
        if(this.Incubator_Level < 2 ){
            //援建
            if(this.Recyclers_count < 0){
                var newName = 'Recycler' + Game.time;
                console.log('孵化新的 Recycler: ' + newName);
                spawn.spawnCreep([CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE], newName, {memory: {role: 'Recycler', workshop: 'E3S19',birthroom:'W1S22',building: false, group: 0}});
            }
            if(this.Builders_W1S25_count < 0 ) {
                var newName = 'Builder_W1S25_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE], newName, {memory: {role: 'Builder', workshop: 'W1S25',birthroom:'W1S22', group: 0}});
            }
            if(this.Harvester_W1S25_G1_count < 0){
                var newName = 'Harvester1_W1S25_' + Game.time;
                console.log('孵化新的 Harvester: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Harvester', workshop: 'E3S19',birthroom:'W1S25',building: false, group: 1}});
            }
            if(this.Harvester_W1S25_G0_count < 0){
                var newName = 'Harvester1_W1S25_' + Game.time;
                console.log('孵化新的 Harvester: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Harvester', workshop: 'E3S19',birthroom:'W1S25',building: false, group: 2}});
            }
            //过道
            if(this.Dpo_Harvesters1_count < 0 ) {
                var newName = 'DepositsHarvester' + Game.time;
                console.log('孵化新的 DepositsHarvester: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'DepositsHarvester',workshop: 'W0S21',birthroom:'W1S22'}});
            }
            if(this.Dpo_Harvesters2_count < 0 ) {
                var newName = 'DepositsHarvester' + Game.time;
                console.log('孵化新的 DepositsHarvester: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'DepositsHarvester',workshop: 'E0S20',birthroom:'W1S22'}});
            }
            //调度员
            if(this.Dispatchers_W1S22_count < 1 ) {
                var newName = 'Dispatcher_W1S22_' + Game.time;
                console.log('孵化新的 Dispatcher: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: 'Dispatcher',workshop: 'W1S22',X: 37,Y:14}});
            }
            //声明者
            if(this.reservers_W1S23_count < 1 && (!Game.rooms['W1S23'] || !Game.rooms['W1S23'].controller.reservation  || Game.rooms['W1S23'].controller.reservation.ticksToEnd < 1000)) {
                var newName = 'Reserver_W1S23_' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawn.spawnCreep([CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'reserver',workshop: 'W1S23'}});
            }
            //全能者
            if(this.upgraders_count < 1 ) {
                var newName = 'Upgrader_' + Game.time;
                console.log('孵化新的 Upgrader: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W1S22'}});
                // spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W1S22'}});
            }
            if(this.Builders_W1S23_count < 0 ) {
                var newName = 'Builder_W1S23_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W1S23',birthroom:'W1S22', group: 0}});
            }
            if(this.Builders_W1S22_count < 1 ) {
                var newName = 'Builder_W1S22_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W1S22',birthroom:'W1S22', group: 0}});
            }
        }
        if(this.Incubator_Level < 2 ) {
            // 运输者
            if(this.Carriers_W1S22_G2_count < 0 && Game.getObjectById('5bbcb2cd40062e4259e93dc0').mineralAmount > 0){
                var newName = 'Carriers_W1S22_G2_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier', workshop: 'W1S22', birthroom:'W1S22',group :2, taking: true}});
            }
            if(this.Carriers_W1S22_count < 0){
                var newName = 'Carrier_W1S22_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'Carrier', workshop: 'W1S22', birthroom:'W1S22',group :1, taking: true}});
            }
            if(this.Carriers_W1S23_G1_count < 1){
                var newName = 'Carrier_W1S23_G1_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W1S23', birthroom:'W1S22',group :1, taking: true}});
            }
            if(this.Carriers_W1S23_G2_count < 0){
                var newName = 'Carrier_W1S23_G2_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W1S23', birthroom:'W1S22',group :2, taking: true}});
            }
            if(this.Carriers_power_count < 1 && Game.getObjectById('5f89bff59fd160bdfefc0152').store['power'] > 100){
                var newName = 'Carriers_power_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier_p',workshop: 'W1S22', birthroom:'W1S22',group :0, taking: true, taketype: 'power'}});
            }
            if(this.Carriers_W1S22_lab_count < 0){
                var newName = 'Carrier_W1S22_lab_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier_lab', workshop: 'W1S22', birthroom:'W1S22',group :0}});
            }
        }
        {
            // 采矿者
            if(this.Miners_W1S22_G0_count < 0 && Game.getObjectById('5bbcb2cd40062e4259e93dc0').mineralAmount > 0) {
                var newName = 'Miner_W1S22_G0_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S22',group:0}});
            }
            if(this.Miners_W1S22_G1_count < 1) {
                var newName = 'Miner_W1S22_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S22',group:1}});
            }
            if(this.Miners_W1S23_G1_count < 1) {
                var newName = 'Miner_W1S23_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S23',group:1}});
            }
            if(this.Miners_W1S23_G2_count < 1) {
                var newName = 'Miner_W1S23_G2_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S23',group:2}});
            }
        }
        {
            
            // if(this.RangAttackers_0_count < 2 ) {
            //     var newName = 'RangAttacker_' + Game.time;
            //     console.log('孵化新的 RangAttacker: ' + newName);
            //     spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], newName, {memory: {role: 'RangAttacker',workshop: 'E0S21'}});
            // }
            // if(this.Attackers_0_count < 3 ) {
            //     var newName = 'Attacker_' + Game.time;
            //     console.log('孵化新的 Attacker: ' + newName);
            //     spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], newName, {memory: {role: 'Attacker',workshop: 'E0S21'}});
            //     // spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Attacker',workshop: 'W1S22'}});
            // }
            if(this.Attackers_count < 0 ) {
                var newName = 'Attacker_' + Game.time;
                console.log('孵化新的 Attacker: ' + newName);
                spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], newName, {memory: {role: 'Attacker',workshop: 'E3S16'}});
                // spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Attacker',workshop: 'W1S22'}});
            }
            if(this.RangAttackers_count < 0 ) {
                var newName = 'RangAttacker_' + Game.time;
                console.log('孵化新的 RangAttacker: ' + newName);
                spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], newName, {memory: {role: 'RangAttacker',workshop: 'W1S25'}});
            }
            
        }
        this.printSpawning(spawn);
    }

    w2S22Spawn1Incubator(spawn){
        
        if(Memory.Defense.war_room.indexOf('W3S22') == -1)
        {
            if(this.reservers_W3S22_count < 1 && (!Game.rooms['W3S22'] || !Game.rooms['W3S22'].controller.reservation || Game.rooms['W3S22'].controller.reservation.ticksToEnd < 1000)) { 
                var newName = 'Reserver_W3S22_' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawn.spawnCreep([CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'reserver',workshop: 'W3S22'}});
            }
            if(this.Carriers_W3S22_G1_count < 1){
                var newName = 'Carrier_W3S22_G1_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W3S22',birthroom:'W2S22', group :1, taking: true}});
            }
            if(this.Miners_W3S22_G1_count < 1){
                var newName = 'Miner_W3S22_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W3S22',group:1}});
            }
            if(this.Builders_W3S22_count < 0 ) {
                var newName = 'Builder_W3S22_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W3S22',birthroom:'W2S22', group: 0}});
            }
        }
        if(Memory.Defense.war_room.indexOf('W3S23') == -1)
        {
            if(this.reservers_W3S23_count < 1 && (!Game.rooms['W3S23'] || !Game.rooms['W3S23'].controller.reservation || Game.rooms['W3S23'].controller.reservation.ticksToEnd < 1000)) { 
                var newName = 'Reserver_W3S23_' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawn.spawnCreep([CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE], newName, {memory: {role: 'reserver',workshop: 'W3S23'}});
            }
            if(this.Carriers_W3S23_G1_count < 1){
                var newName = 'Carrier_W3S23_G1_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W3S23',birthroom:'W2S22', group :1, taking: true}});
            }
            if(this.Carriers_W3S23_G2_count < 0){
                var newName = 'Carrier_W3S23_G2_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W3S23',birthroom:'W2S22', group :2, taking: true}});
            }
            if(this.Miners_W3S23_G2_count < 1){
                var newName = 'Miner_W3S23_G2_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W3S23',group:2}});
            } 
            if(this.Miners_W3S23_G1_count < 1){
                var newName = 'Miner_W3S23_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W3S23',group:1}});
            }
            if(this.Builders_W3S23_count < 0 ) {
                var newName = 'Builder_W3S23_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W3S23',birthroom:'W2S22', group: 0}});
            }
        }
            if(this.RangAttackers_count < 0 ) {
                var newName = 'RangAttacker_' + Game.time;
                console.log('孵化新的 RangAttacker: ' + newName);
                spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL], newName, {memory: {role: 'RangAttacker',workshop: 'W3S22'}});
            }
        if(Memory.Defense.war_room.indexOf('W2S23') == -1)
        {   
            if(this.reservers_W2S23_count < 1 && (!Game.rooms['W2S23'] || !Game.rooms['W2S23'].controller.reservation || Game.rooms['W2S23'].controller.reservation.ticksToEnd < 1000)) {
                var newName = 'Reserver_W2S23_' + Game.time;
                console.log('孵化新的 Reserver: ' + newName);
                spawn.spawnCreep([CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE], newName, {memory: {role: 'reserver',workshop: 'W2S23'}});
            }
            if(this.Carriers_W2S23_G1_count < 1){
                var newName = 'Carrier_W2S23_G1_' + Game.time;
                console.log('孵化新的 Carrier: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W2S23',birthroom:'W2S22', group :1, taking: true}});
            }
            if(this.Miners_W2S23_G1_count < 1){
                var newName = 'Miner_W2S23_G1_' + Game.time;
                console.log('孵化新的 Miner: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W2S23',group:1}});
            } 
            if(this.Builders_W2S23_count < 0 ) {
                var newName = 'Builder_W2S23_' + Game.time;
                console.log('孵化新的 Builder: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W2S23',birthroom:'W2S22', group: 0}});
            }
        }

        
        if(this.Harvester_W2S21_G1_count < 0){
            var newName = 'Harvester_W2S21_' + Game.time;
            console.log('孵化新的 Harvester: ' + newName);
            spawn.spawnCreep([WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'Harvester', workshop: 'W2S21',birthroom:'W2S21',building: false, group: 1}});
        }
        if(this.Recyclers_W2S21_count < 0){
            var newName = 'Recycler' + Game.time;
            console.log('孵化新的 Recycler: ' + newName);
            spawn.spawnCreep([CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE], newName, {memory: {role: 'Recycler', workshop: 'W2S21',birthroom:'W2S22',building: false, group: 0}});
        }
        if(this.Builders_W2S21_count < 0 ) {
            var newName = 'Builder_W2S21_' + Game.time;
            console.log('孵化新的 Builder: ' + newName);
            spawn.spawnCreep([WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,CARRY,WORK,CARRY,WORK,CARRY,WORK,CARRY,WORK,CARRY,WORK,CARRY,WORK,WORK,WORK,WORK], newName, {memory: {role: 'Builder', workshop: 'W2S21',birthroom:'W2S22', group: 0}});
        }


        if(this.Dispatchers_W2S22_count < 1 ) {
            var newName = 'Dispatcher_W2S22_' + Game.time;
            console.log('孵化新的 Dispatcher: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: 'Dispatcher',workshop: 'W2S22',X: 43,Y: 38}});
        }
        if(this.Carriers_P_W2S22_count < 1 && Game.getObjectById('5f64c062f043f4506b6df3da').store['power'] > 100){
            var newName = 'Carriers_power_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'Carrier_p',workshop: 'W2S22', birthroom:'W2S22',group :0, taking: true, taketype: 'power'}});
        }
        if(this.Carriers_W2S22_G2_count < 0 && Game.getObjectById('5bbcb2c240062e4259e93d54').mineralAmount > 0){
            var newName = 'Carrier_W2S22_G2_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W2S22',birthroom:'W2S22', group :2, taking: true}});
        }
        if(this.Miners_W2S22_G0_count < 0 && Game.getObjectById('5bbcb2c240062e4259e93d54').mineralAmount > 0){
            var newName = 'Miner_W2S22_G0_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W2S22',group:0}});
        }
        if(this.upgraders_W2S22_count < 1 ) {
            var newName = 'Upgrader_W2S22' + Game.time;
            console.log('孵化新的 Upgrader: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W2S22'}});
        }
        if(this.Carriers_W2S22_G1_count < 0){
            var newName = 'Carrier_W2S22_G1_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W2S22',birthroom:'W2S22', group :1, taking: true}});
        }
        if(this.Miners_W2S22_G1_count < 1){
            var newName = 'Miner_W2S22_G1_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W2S22',group:1}});
        }
        if(this.Builders_W2S22_count < 1 ) {
            var newName = 'Builder_W2S22_' + Game.time;
            console.log('孵化新的 Builder: ' + newName);
            spawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W2S22',birthroom:'W2S22', group: 0}});
        }
        this.printSpawning(spawn);
    }

    w1S25Spawn1Incubator(spawn){
        // if(this.Builders_W1S25_count < 6){
        //     var newName = 'Builder_W1S25_' + Game.time;
        //     console.log('孵化新的 Builder: ' + newName);
        //     spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder',building: false, workshop: 'W1S25',birthroom:'W2S22', group: 0}});
        // }
        // if(this.Harvester_W1S25_G0_count < 3){
        //     var newName = 'Harvester0_W1S25_' + Game.time;
        //     console.log('孵化新的 Harvester: ' + newName);
        //     spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'Harvester',building: false, workshop: 'W1S25',birthroom:'W1S25', group: 0}});
        // }
        if(this.Harvester_W1S25_G0_count < 0){
            var newName = 'Harvester1_W1S25_' + Game.time;
            console.log('孵化新的 Harvester: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Harvester', workshop: 'W1S25',birthroom:'W1S25',building: false, group: 0}});
        }
        if(this.Carriers_W1S25_G1_count < 1){
            var newName = 'Carrier_W1S25_G1_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W1S25',birthroom:'W1S25', group :1, taking: true}});
        }
        if(this.Carriers_W1S25_G2_count < 1){
            var newName = 'Carrier_W1S25_G2_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W1S25',birthroom:'W1S25', group :2, taking: true}});
        }
        if(this.Carriers_W1S25_G3_count < 0){
            var newName = 'Carrier_W1S25_G3_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W1S25',birthroom:'W1S25', group :3, taking: true}});
        }
        if(this.Miners_W1S25_G1_count < 1) {
            var newName = 'Miner_W1S25_G1_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S25',group:1}});
        }
        if(this.Miners_W1S25_G2_count < 1) {
            var newName = 'Miner_W1S25_G2_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W1S25',group:2}});
        }
        if(this.Builders_W1S25_count < 1 ) {
            var newName = 'Builder_W1S25_' + Game.time;
            console.log('孵化新的 Builder: ' + newName);
            spawn.spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W1S25',birthroom:'W1S25', group: 0}});
        }
    }

    w2S21Spawn1Incubator(spawn){
        if(this.Dpo_Harvesters3_count < 0 ) {
                var newName = 'DepositsHarvester' + Game.time;
                console.log('孵化新的 DepositsHarvester: ' + newName);
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'DepositsHarvester',workshop: 'W1S20',birthroom:'W2S21'}});
        }
        if(this.Dpo_Harvesters4_count < 0 ) {
            var newName = 'DepositsHarvester' + Game.time;
            console.log('孵化新的 DepositsHarvester: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'DepositsHarvester',workshop: 'W3S20',birthroom:'W2S21'}});
        }
        if(this.Dpo_Harvesters5_count < 0 ) {
            var newName = 'DepositsHarvester' + Game.time;
            console.log('孵化新的 DepositsHarvester: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'DepositsHarvester',workshop: 'W4S20',birthroom:'W2S21'}});
        }
        if(this.Carriers_W3S21_G1_count < 0){
            var newName = 'Carrier_W3S21_G1_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W3S21',birthroom:'W2S21', group :1, taking: true}});
        }
        if(this.reservers_W3S21_count < 0 ) {
            var newName = 'Reserver_W3S21_' + Game.time;
            console.log('孵化新的 Reserver: ' + newName);
            spawn.spawnCreep([CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'reserver',workshop: 'W3S21'}});
        }
        if(this.Miners_W3S21_G1_count < 0) {
            var newName = 'Miner_W3S21_G1_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W3S21',group:1}});
        }
        if(this.Miners_W3S21_G2_count < 0) {
            var newName = 'Miner_W3S21_G2_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W3S21',group:2}});
        }
        if(this.Dispatchers_W2S21_count < 1 ) {
            var newName = 'Dispatchers_W2S21_' + Game.time;
            console.log('孵化新的 Dispatcher: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: 'Dispatcher',workshop: 'W2S21',X: 20,Y:33}});
        }
        if(this.Carriers_W2S21_G2_count < 0){
            var newName = 'Carrier_W2S21_G2_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W2S21',birthroom:'W2S21', group :2, taking: true}});
        }
        if(this.Carriers_W2S21_G1_count < 0){
            var newName = 'Carriers_W2S21_G1_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W2S21',birthroom:'W2S21', group :1, taking: true}});
        }
        if(this.Miners_W2S21_G1_count < 1){
            var newName = 'Miner_W2S21_G1_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W2S21',group:1}});
        }
        if(this.Builders_W2S21_count < 1 ) {
            var newName = 'Builder_W2S21_' + Game.time;
            console.log('孵化新的 Builder: ' + newName);
            spawn.spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W2S21',birthroom:'W2S21', group: 0}});
        }
    }

    E1S15Spawn1Incubator(spawn){
        if(this.upgraders_E1S15_count < 0 ) {
            var newName = 'upgraders_E1S15' + Game.time;
            console.log('孵化新的 Upgrader: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader',workshop: 'E1S15',upgrading :false}});
        }
        if(this.Dispatchers_E1S15_count < 1 ) {
            var newName = 'Dispatcher_E1S15_' + Game.time;
            console.log('孵化新的 Dispatcher: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: 'Dispatcher',workshop: 'E1S15',X: 33,Y:38}});
        }
        if(this.Harvester_E1S15_G2_count < 0){
            var newName = 'Harvester1_W1S25_' + Game.time;
            console.log('孵化新的 Harvester: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Harvester', workshop: 'E1S15',birthroom:'W1S25',building: false, group: 2}});
        }
        if(this.Harvester_E1S15_G1_count < 0){
            var newName = 'Harvester1_W1S25_' + Game.time;
            console.log('孵化新的 Harvester: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Harvester', workshop: 'E1S15',birthroom:'W1S25',building: false, group: 1}});
        }
        if(this.Miners_E1S15_G2_count < 1) {
            var newName = 'Miner_E1S15_G2_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'E1S15',group:2}});
        }
        if(this.Carriers_E1S15_G2_count < 0){
            var newName = 'Carrier_E1S15_G2_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'E1S15',birthroom:'E1S15', group :2, taking: true}});
        }
        if(this.Miners_E1S15_G1_count < 1) {
            var newName = 'Miner_E1S15_G1_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'E1S15',group:1}});
        }
        if(this.Carriers_E1S15_G1_count < 0){
            var newName = 'Carrier_E1S15_G1_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'E1S15',birthroom:'E1S15', group :1, taking: true}});
        }
        if(this.Builders_E1S15_count < 1 ) {
            var newName = 'Builder_E1S15_' + Game.time;
            console.log('孵化新的 Builder: ' + newName);
            spawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'E1S15',birthroom:'E1S15', group: 0}});
        }
    }

    W47S16pawn1Incubator(spawn){
        if(this.upgraders_W47S16_count < 0 ) {
            var newName = 'upgraders_W47S16' + Game.time;
            console.log('孵化新的 Upgrader: ' + newName);
            spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader',workshop: 'W47S16',upgrading :false}});
        }
        if(this.Dispatchers_W47S16_count < 1 ) {
                var newName = 'Dispatchers_W47S16_' + Game.time;
                console.log('孵化新的 Dispatcher: ' + newName);
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: 'Dispatcher',workshop: 'W47S16',X: 23,Y:39}});
        }
        if(this.Harvester_W47S16_G2_count < 0){
            var newName = 'Harvester1_W47S16_G2' + Game.time;
            console.log('孵化新的 Harvester: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Harvester', workshop: 'W47S16',birthroom:'W47S16',building: false, group: 2}});
        }
        if(this.Harvester_W47S16_G1_count < 0){
            var newName = 'Harvester1_W47S16_G1' + Game.time;
            console.log('孵化新的 Harvester: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Harvester', workshop: 'W47S16',birthroom:'W47S16',building: false, group: 1}});
        }
        if(this.Miners_W47S16_G1_count < 1) {
            var newName = 'Miner_W47S16_G1_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W47S16',group:1}});
        }
        if(this.Miners_W47S16_G2_count < 1) {
            var newName = 'Miner_W47S16_G2_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'W47S16',group:2}});
        }
        if(this.Carriers_W47S16_G1_count < 0){
            var newName = 'Carrier_W47S16_G1_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W47S16',birthroom:'W47S16', group :1, taking: true}});
        }
        if(this.Carriers_W47S16_G2_count < 0){
            var newName = 'Carrier_W47S16_G2_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Carrier',workshop: 'W47S16',birthroom:'W47S16', group :2, taking: true}});
        }
        if(this.Builders_W47S16_count < 1 ) {
            var newName = 'Builder_W47S16_' + Game.time;
            console.log('孵化新的 Builder: ' + newName);
            spawn.spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Builder', workshop: 'W47S16',birthroom:'W47S16', group: 0}});
        }
    }

    E3S19Spawn1Incubator(spawn){
        if(this.upgraders_E3S19_count < 0 ) {
            var newName = 'upgraders_E3S19' + Game.time;
            console.log('孵化新的 Upgrader: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader',workshop: 'E3S19',upgrading :false}});
        }
        if(this.Harvester_W1S25_G1_count < 0){
            var newName = 'Harvester1_W1S25_' + Game.time;
            console.log('孵化新的 Harvester: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Harvester', workshop: 'E3S19',birthroom:'E3S19',building: false, group: 1}});
        }
        if(this.Harvester_W1S25_G0_count < 0){
            var newName = 'Harvester1_W1S25_' + Game.time;
            console.log('孵化新的 Harvester: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'Harvester', workshop: 'E3S19',birthroom:'E3S19',building: false, group: 2}});
        }
        if(this.Carriers_E3S19_G1_count < 1){
            var newName = 'Carrier_E3S19_G1_' + Game.time;
            console.log('孵化新的 Carrier: ' + newName);
            spawn.spawnCreep([CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE], newName, {memory: {role: 'Carrier',workshop: 'E3S19', birthroom:'E3S19',group :1, taking: true}});
        }
        if(this.Miners_E3S19_G1_count < 1) {
            var newName = 'Miner_E3S19_G1_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'E3S19',group:1}});
        }
        if(this.Miners_E3S19_G2_count < 1) {
            var newName = 'Miner_E3S19_G2_' + Game.time;
            console.log('孵化新的 Miner: ' + newName);
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'Miner', workshop: 'E3S19',group:2}});
        }
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