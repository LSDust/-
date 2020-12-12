// require('lib.SuperMove');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
var roleClaimer = require('role.Claimer');
var roleCarrier = require('role.Carrier');
var roleMiner = require('role.Miner');
var roleReserver = require('role.Reserver');
var roleAttacker = require('role.Attacker');
var roleRangAttacker = require('role.RangAttacker');
var roleDispatcher = require('role.Dispatcher');
var structureTower = require('structure.Tower');
var Incubator = require('decision.Incubator');
var Defense = require('decision.Defense');
var Logistics = require('decision.Logistics');
var roleCarrier_power = require('role.Carriers_power');
var roleDepositsHarvester = require('role.DepositsHarvester');
var roleHarvester = require('role.Harvester');
var roleRecycler = require('role.Recycler');
var rolePowerCreep = require('role.PowerCreep');
var roleCarrierlab = require('role.Carrier_lab');

module.exports.loop = function () {

    console.log(Game.cpu.bucket);
    if(Game.cpu.bucket > 9900){
        Game.cpu.generatePixel();
    }

    let incubator = new Incubator();
    var Incubator_Level = incubator.incubatorLevel(Game.spawns['Spawn1']);
    if(Game.spawns['Spawn_W1S22_1'] && !Game.spawns['Spawn_W1S22_1'].spawning){
	    incubator.w1S22Spawn1Incubator(Game.spawns['Spawn_W1S22_1']);
    }else if(Game.spawns['Spawn_W1S22_2'] && !Game.spawns['Spawn_W1S22_2'].spawning){
        incubator.w1S22Spawn1Incubator(Game.spawns['Spawn_W1S22_2']);
    }else if(Game.spawns['Spawn_W1S22_3']){
        incubator.w1S22Spawn1Incubator(Game.spawns['Spawn_W1S22_3']);
    }
    if(!Game.spawns['Spawn_W2S22_1'].spawning){
        incubator.w2S22Spawn1Incubator(Game.spawns['Spawn_W2S22_1']);
    }else if(!Game.spawns['Spawn_W2S22_2'].spawning){
        incubator.w2S22Spawn1Incubator(Game.spawns['Spawn_W2S22_2']);
    }else{
        incubator.w2S22Spawn1Incubator(Game.spawns['Spawn_W2S22_3']);
    }
    incubator.w2S21Spawn1Incubator(Game.spawns['Spawn_W2S21_1']);
    // incubator.w1S25Spawn1Incubator(Game.spawns['Spawn_W1S25_1']);

    let defense = new Defense();
    let logistics = new Logistics();
    // var factory = Game.getObjectById('5f733b28b3f4cb155d62e2d4');
    // var factory2 = Game.getObjectById('5f7b3ceba58ab1ad45b83148');
    // factory.produce(RESOURCE_ENERGY);
    // factory2.produce( RESOURCE_LEMERGIUM_BAR);
    // factory2.produce( RESOURCE_CELL);
    // factory.produce(RESOURCE_OXIDANT);
    // Game.rooms['W1S22'].terminal.send(RESOURCE_ENERGY, 800, 'W2S22', '');

    // var tower = Game.getObjectById('5f5c4d1a73fd055335fb00f9');
    var towers = Game.rooms['W1S22'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for(var i in towers){
        structureTower.run(towers[i]);
    }
    var towers = Game.rooms['W2S22'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for(var i in towers){
        structureTower.run(towers[i]);
    }
    var towers = Game.rooms['W2S21'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for(var i in towers){
        structureTower.run(towers[i]);
    }
    // var towers = Game.rooms['W1S25'].find(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return structure.structureType == STRUCTURE_TOWER;
    //     }
    // });
    // for(var i in towers){
    //     structureTower.run(towers[i]);
    // }

    // Game.rooms['W1S22'].memory.receive_link = '5f663fbac6882b2c62b82699';
    // let A = new Array();
    // A[0] = 'Z'
    // A[1] = 'K'
    // Game.rooms['W1S22'].memory.lab_info = {lab_status:'hc',lab_source:['Z','K'],lab_result:'ZK'};
    // delete Game.rooms['W1S22'].memory.lab_source;
    // Game.rooms['W1S22'].memory.source_lab = A;
    // let B = new Array();
    // B[0] = '5f66fab2df9e7e43f289b41e'
    // Game.rooms['W1S22'].memory.central_link = A;
    // Game.rooms['W1S22'].memory.receive_link = A;
    // Game.rooms['W2S22'].memory.front_link = A;
    // structureLink.run();
    // {
    //     const linkFrom = Game.rooms['W1S22'].lookForAt('structure', 40, 35)[0];
    //     const linkTo   = Game.rooms['W1S22'].lookForAt('structure', 2, 31)[0];
    //     linkFrom.transferEnergy(linkTo);
    // }
    let PowerCreep = new rolePowerCreep();
    PowerCreep.PCWork(Game.powerCreeps['LuoJi']);
    let Builder = new roleBuilder();
    let Carrier_lab = new roleCarrierlab();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'Miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'Carrier'){
            roleCarrier.run(creep);
        }
        if(creep.memory.role == 'reserver'){
            roleReserver.run(creep);
        }
        if(creep.memory.role == 'Builder') {
            Builder.BuilderWork(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'Attacker') {
            roleAttacker.run(creep);
        }
        if(creep.memory.role == 'RangAttacker') {
            roleRangAttacker.run(creep);
        }
        if(creep.memory.role == 'Dispatcher') {
            roleDispatcher.run(creep);
        }
        if(creep.memory.role == 'Carrier_p') {
            roleCarrier_power.run(creep);
        }
        if(creep.memory.role == 'DepositsHarvester') {
            roleDepositsHarvester.run(creep);
        }
        if(creep.memory.role == 'Claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'Harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'Recycler') {
            roleRecycler.run(creep);
        }
        if(creep.memory.role == 'Carrier_lab') {
            Carrier_lab.CarrierWork(creep);
        }
        if(Incubator_Level <= 1){
            
        }
    }
}