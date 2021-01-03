/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('decision.Defense');
 * mod.thing == 'a thing'; // true
 */

module.exports = class Defense{

    constructor(){
        // this.Defense_Level = 0;
        // this.war_room = new Array();

        // if(Game.time % 10 == 0){
        //     var i = 0;
        //     for(var name in Game.rooms){
        //         var room = Game.rooms[name];
        //         var nomine_creeps = room.find(FIND_HOSTILE_CREEPS, {
        //             filter: function(object) {
        //                 return !(object.owner.username == 'Invader' && object.room.controller && object.room.controller.my);
        //                 // return object.getActiveBodyparts(ATTACK) > 0;
        //             }
        //         });
        //         if(nomine_creeps.length > 0){
        //             this.war_room[i++] = room.name;
        //             // this.Defense_Level += nomine_creeps.length;
        //             if(room.controller && room.controller.my){
        //                 room.memory.defense_level = nomine_creeps.length;
        //                 if((room.name == 'W1S22' || room.name == 'W2S22' || room.name == 'W47S16') && room.towers.length < 6){
        //                     room.controller.activateSafeMode();
        //                 }
        //                 if((room.name == 'E1S15') && room.memory.defense_level >= 2){
        //                     room.controller.activateSafeMode();
        //                 }
        //             }
        //         }
        //     }
        //     Memory.Defense = {war_room: this.war_room};
        // }
        
        // delete Memory.Defense;
        // console.log(this.war_room);
    }
};