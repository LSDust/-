var roleHarvester = require('role.Harvester');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
var spawnAction = require('structure.Spawn');
var roleclaimer = require('role.Claimer');

module.exports.loop = function () {
    
    spawnAction.run(Game.spawns['Spawn1']);

    // var tower = Game.getObjectById('56d74ab2e7a181cca11ca6db');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }

    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }
    
    
    
    var harvesterCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
    // var harvesterNo = 0;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(harvesterCount >= 5){
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'Claimer'){
                roleclaimer.run(creep);
            }
        }
    }
}