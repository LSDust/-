var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
// var roleClaimer = require('role.Claimer');
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

module.exports.loop = function () {

    console.log(Game.cpu.bucket);
    if(Game.cpu.bucket > 9900){
        Game.cpu.generatePixel();
    }

    let incubator = new Incubator();
    var Incubator_Level = incubator.incubatorLevel(Game.spawns['Spawn1']);
    if(Game.spawns['Spawn1'].spawning){
	    incubator.w1S22Spawn1Incubator(Game.spawns['Spawn2']);
    }else{
	    incubator.w1S22Spawn1Incubator(Game.spawns['Spawn1']);
    }
	incubator.w2S22Spawn1Incubator(Game.spawns['Spawn_W2S22_1'])

    let defense = new Defense();
    let logistics = new Logistics();
    var factory = Game.getObjectById('5f733b28b3f4cb155d62e2d4');
    factory.produce(RESOURCE_OXIDANT);

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

    {
        const linkFrom = Game.rooms['W1S22'].lookForAt('structure', 40, 35)[0];
        const linkTo   = Game.rooms['W1S22'].lookForAt('structure', 2, 31)[0];
        linkFrom.transferEnergy(linkTo);
    }
    
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
            roleBuilder.run(creep);
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
        // if(creep.memory.role == 'Dispatcher') {
        //     roleDispatcher.run(creep);
        // }
        if(creep.memory.role == 'Carrier_p') {
            roleCarrier_power.run(creep);
        }
        if(Incubator_Level <= 1){
            
        }
    }
}