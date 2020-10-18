//日常后勤模块,包含3部分 
//1、房间内可收集资源的统一查找 
//2、房间内后勤目标的统一查找 
//3、房间内固定建筑的事件执行
//(统一查找的结果，均生成room下的成员变量)

// let structureLink = require('structure.Link');

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
            if(room.controller && room.controller.my){
                // console.log(room.controller.owner);
                this.myRoomWork(room);
            }
        }
        // delete Memory.rooms;
        // console.log(Game.rooms['W1S22'].mineral);
    }

    myRoomWork(room){
        try{
            //link部分
            {
                //从room的memory识别接收link(多个)，并给与room对象的成员变量
                let receive_link = new Array();
                for(var i = 0;room.memory.receive_link.length > i;i++){
                    receive_link[i] = Game.getObjectById(room.memory.receive_link[i]);
                }
                //中央link(一个)
                let central_link = new Array();
                central_link[0] = Game.getObjectById(room.memory.central_link[0]);
                room.receive_link = receive_link;
                room.central_link = central_link;

                //接收link工作
                for(var j = 0;room.receive_link.length > j;j++){
                    this.receiveLinkWork(room.receive_link[j],room);
                }
            }
            //工厂部分
            {
                room.factory = room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_FACTORY;}})[0];
                room.factory.produce( RESOURCE_CELL);
                
                room.factory.produce(RESOURCE_OXIDANT);
                room.factory.produce( RESOURCE_LEMERGIUM_BAR);
                
                if(room.factory.getFreeCapacity > 10000){
                    room.factory.produce(RESOURCE_ENERGY);
                }
            }
            //终端部分
            {

            }
            //lab部分
            {

            }
            //超能提炼部分
            {

            }
            //视野部分
            {
                
            }
            //核弹部分
            {

            }
        }catch{
            console.log(room + '事件执行失败');
        }
    }

    receiveLinkWork(linkFrom,room){
        let linkTo = room.central_link[0];
        if(linkFrom.store.getFreeCapacity(RESOURCE_ENERGY) <= 500 && linkTo.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            linkFrom.transferEnergy(linkTo);
        }
    }
};