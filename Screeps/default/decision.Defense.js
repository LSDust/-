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
        this.Defense_Level = 0;
        this.war_room = new Array();

        if(Game.time % 5 == 0){
            var i = 0;
            for(var name in Game.rooms){
                var room = Game.rooms[name];
                var nomine_creeps = room.find(FIND_HOSTILE_CREEPS);
                if(nomine_creeps.length > 0){
                    this.war_room[i++] = room.name;
                    this.Defense_Level += nomine_creeps.length;
                }
            }
            Memory.Defense = {defense_level: this.Defense_Level , war_room: this.war_room};
        }
        
        // delete Memory.Defense;
        // console.log(this.war_room);
    }
};