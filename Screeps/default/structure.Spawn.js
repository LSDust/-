module.exports = {
    
    run: function(spawnIncubator) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        
        // console.log('Harvesters: ' + harvesters.length);
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'Claimer');

        //栈顺序
        if(harvesters.length >= 5){
            if(claimers.length < 2){
                var newName = 'Claimer' + Game.time;
                console.log('Spawning new Claimer: ' + newName);
                spawnIncubator.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'claimer'}});
            }
            if(upgraders.length < 2 ) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newName);
            spawnIncubator.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
            }
            if(builders.length < 2 ) {
                var newName = 'Builder' + Game.time;
                console.log('Spawning new Upgrader: ' + newName);
                spawnIncubator.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: 'builder'}});
            }
        }
        if(harvesters.length < 5) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            spawnIncubator.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE], newName, {memory: {role: 'harvester'}});
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