/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structure.Link');
 * mod.thing == 'a thing'; // true
 */

module.exports = class Link{
    constructor(room){
        this.receiveLinkWork(room.memory.receive_link);
    }

    receiveLinkWork(id){
        try{
            var receive_link = Game.getObjectById(id);
            console.log(receive_link);
        }catch{

        }
    }
};