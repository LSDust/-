// var roleHarvester = require('role.Harvester');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
var structureIncubator = require('structure.Incubator');
var roleClaimer = require('role.Claimer');
var roleCarrier = require('role.Carrier');
var roleMiner = require('role.Miner');
var roleReserver = require('role.Reserver');

module.exports.loop = function () {
    
    structureIncubator.run(Game.spawns['Spawn1']);

    var tower = Game.getObjectById('5f5c4d1a73fd055335fb00f9');
    if(tower.store.getFreeCapacity(RESOURCE_ENERGY) < 800) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    
    
    var MinerCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner').length;
    var claimerCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer').length;
    var claimerNo = 0;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // if(creep.memory.role == 'harvester') {
        //     roleHarvester.run(creep);
        // }
        if(creep.memory.role == 'claimer'){
            roleClaimer.run(creep,claimerNo++);
        }
        if(creep.memory.role == 'Miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'Carrier'){
            roleCarrier.run(creep);
        }
        if(creep.memory.role == 'reserver'){
            roleReserver.run(creep);
        }
        if(MinerCount >= 1 && claimerCount >= 4){
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
        }
    }
}