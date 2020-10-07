let structureLink = require('structure.Link');

module.exports = class Logistics{
    constructor(){
        for(var name in Game.rooms){
            var room = Game.rooms[name];
            //所有房间
            room.sources = room.find(FIND_SOURCES);
            room.mineral = room.find(FIND_MINERALS);
            room.fill_targets = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            //自己房间
            if(room.controller.my){
                // console.log(room.controller.owner);
                this.myRoomWork(room);
            }
        }
        // delete Memory.rooms;
        // console.log(Game.rooms['W1S22'].mineral);
    }

    myRoomWork(room){
        try{
            let receive_link = new Array();
            receive_link[0] = Game.getObjectById(room.memory.receive_link[0]);
            let central_link = new Array();
            central_link[0] = Game.getObjectById(room.memory.central_link[0]);
            room.receive_link = receive_link;
            room.central_link = central_link;

            this.receiveLinkWork(room.receive_link[0],room);
        }catch{
            console.log(room + '事件执行失败');
        }
        // var linkwork = new structureLink(room);
    }

    receiveLinkWork(linkFrom,room){
        let linkTo = room.central_link[0];
        if(linkFrom.store.getFreeCapacity(RESOURCE_ENERGY) < 100){
            linkFrom.transferEnergy(linkTo);
        }
    }
};