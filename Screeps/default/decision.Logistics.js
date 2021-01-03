//日常后勤模块,包含3部分 
//1、房间内可收集资源的统一查找 
//2、房间内后勤(需填充)目标的统一查找 
//3、房间内固定建筑的事件执行
//(统一查找的结果和固定建筑，均生成room下的成员变量)

// let structureLink = require('structure.Link');
let structureTower = require('structure.Tower');

module.exports = class Logistics{
    constructor(){
        for(var name in Game.rooms){
            var room = Game.rooms[name];
            //所有房间
            // room.sources = room.find(FIND_SOURCES);
            // let minerals = room.find(FIND_MINERALS);
            let A = new Array();
            A[0] = room.minerals;
            room.pits = A.concat(room.source);
            
            room.repair_targets = room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax 
                                && (object.structureType != STRUCTURE_WALL || (!!room.storage && room.storage.store.getFreeCapacity() < 200000))
                                && (object.structureType != STRUCTURE_RAMPART || (!!room.storage && room.storage.store.getFreeCapacity() < 200000))
                                && object.hitsMax - object.hits >= 1000
            });
            // room.repair_walls = room.find(FIND_STRUCTURES, {
            //     filter: object => object.hits < object.hitsMax 
            //                     && (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART)
            // });
            // room.towers = room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return structure.structureType == STRUCTURE_TOWER 
            //             || (structure.room.name == 'W2S210' && structure.structureType == STRUCTURE_LAB);
            //     }
            // });
            // room.containers = room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return structure.structureType == STRUCTURE_CONTAINER;
            //     }
            // });
            //自己房间
            if(room.controller && room.controller.my && (room.name == 'W1S22' || room.name == 'W2S22' || room.name == 'E1S15' || room.name == 'W47S16' || room.name == 'W2S21' || room.name == 'E3S19')){
                // console.log(room.controller.owner);
                this.myRoomWork(room);
            }
        }
        // delete Memory.rooms;
        // console.log(Game.rooms['W1S22'].mineral);
    }

    myRoomWork(room){
        // const singleList = new Set([
        //     STRUCTURE_OBSERVER, STRUCTURE_POWER_SPAWN, STRUCTURE_EXTRACTOR, STRUCTURE_NUKER,
        //     STRUCTURE_FACTORY, STRUCTURE_INVADER_CORE, LOOK_MINERALS,
        //     //STRUCTURE_TERMINAL,   STRUCTURE_CONTROLLER,   STRUCTURE_STORAGE,
        // ]);
        try{
            //还缺少哪些塔需要填充，修复目标，攻击目标，容器统一查找
            room.fill_targets = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION      
                            // || structure.structureType == STRUCTURE_POWER_SPAWN
                            || structure.structureType == STRUCTURE_SPAWN) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            // let data = _.groupBy(room.find(FIND_STRUCTURES), (s) => s.structureType);
            // for (let type in data) {
            //     if (singleList.has(type)) {
            //         let id = data[type][0].id;
            //         this[type] = id;
            //     } else {
            //         this[type] = new Set(data[type].map((s) => { return s.id; }));
            //     }
            // }
            //link部分
            if(room.name == 'W1S22' || room.name == 'W2S22' || room.name == 'W47S16' || room.name == 'W2S21' || room.name == 'E1S15'){
                //从room的memory识别link，并给与room对象的成员变量
                //接收link(多个)
                if(room.memory.receive_link != null){
                    let receive_link = new Array();
                    for(var i = 0;room.memory.receive_link.length > i;i++){
                        receive_link[i] = Game.getObjectById(room.memory.receive_link[i]);
                    }
                    room.receive_link = receive_link;
                }
                
                //中央link(一个)
                if(room.memory.central_link != null){
                    let central_link = new Array();
                    central_link[0] = Game.getObjectById(room.memory.central_link[0]);
                    room.central_link = central_link;
                }
                
                //前线link(多个)
                if(room.memory.front_link != null){
                    let front_link = new Array();
                    for(i = 0;room.memory.front_link.length > i;i++){
                        front_link[i] = Game.getObjectById(room.memory.front_link[i]);
                    }
                    room.front_link = front_link;
                }
                //接收link工作
                if(room.memory.receive_link != null && room.memory.central_link != null){
                    for(var j = 0;room.receive_link.length > j;j++){
                        this.receiveLinkWork(room.receive_link[j],room);
                    }
                }
                
                //中央link工作
                if(room.memory.central_link != null && room.memory.front_link != null){
                    this.centralLinkWork(room.central_link[0],room);
                }
            }
            //工厂部分
            // if(room.name == 'W1S22' || room.name == 'W2S22' || room.name == 'W47S16' || room.name == 'W2S21'){
            //     // room.factory = room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_FACTORY;}})[0];
            //     room.factory.produce(RESOURCE_CELL);
            //     room.factory.produce(RESOURCE_PHLEGM);
                
            //     room.factory.produce(RESOURCE_OXIDANT);
            //     // room.factory.produce(RESOURCE_LEMERGIUM_BAR);
            //     room.factory.produce('K');
            //     room.factory.produce('L');
                
            //     if(room.factory.getFreeCapacity > 10000){
            //         room.factory.produce(RESOURCE_ENERGY);
            //     }
            // }
            //终端部分
            if(room.name == 'W1S220' || room.name == 'W2S220' || room.name == 'W2S220')
            {
                if(Game.rooms['W2S22'].terminal.store['energy'] < 80000){
                    room.terminal.send('energy', 10000, 'W2S22');
                } 
            }
            //lab部分
            // if(room.name == 'W0S00'){
            //     let source_lab = new Array();
            //     for(var i = 0;room.memory.source_lab.length > i;i++){
            //         source_lab[i] = Game.getObjectById(room.memory.source_lab[i]);
            //     }
            //     room.source_lab = source_lab;

            //     let result_lab = new Array();
            //     result_lab = room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_LAB && 
            //                                                                structure.id != room.memory.source_lab[0] && 
            //                                                                structure.id != room.memory.source_lab[1];}});
            //     room.result_lab = result_lab;
                
            //     if(room.memory.lab_info.lab_status == 'hc'){
            //         // 0:需要填充 1:反应物充足 2:需要拿取
            //         for(let i = 0;i < 2;i++){
            //             if(Object.keys(room.source_lab[i].store).length == 1){
            //                 if(Object.keys(room.source_lab[i].store)[0] == 'energy' || Object.keys(room.source_lab[i].store)[0] == room.memory.lab_info.lab_source[i]){
            //                     if(room.source_lab[i].store[room.memory.lab_info.lab_source[i]] < 2500){
            //                         room.source_lab[i].status = 0;
            //                         room.source_lab[i].need_source = room.memory.lab_info.lab_source[i];
            //                     }else{
            //                         room.source_lab[i].status = 1;
            //                     }
            //                 }else{
            //                     room.source_lab[i].status = 2;
            //                 }
            //             }else if(Object.keys(room.source_lab[i].store).length == 0){
            //                 room.source_lab[i].status = 0;
            //                 room.source_lab[i].need_source = room.memory.lab_info.lab_source[i];
            //             }else{
            //                 if(Object.keys(room.source_lab[i].store)[1] == room.memory.lab_info.lab_source[i]){
            //                     if(room.source_lab[i].store[room.memory.lab_info.lab_source[i]] < 2500){
            //                         room.source_lab[i].status = 0;
            //                         room.source_lab[i].need_source = room.memory.lab_info.lab_source[i];
            //                     }else{
            //                         room.source_lab[i].status = 1;
            //                     }
            //                 }else{
            //                     room.source_lab[i].status = 2;
            //                 }
            //             }
            //             // console.log(room.source_lab[i].status);
            //         }

            //         for(let j = 0;j < 8;j++){
            //             if(Object.keys(room.result_lab[i].store).length == 1){
            //                 if(Object.keys(room.result_lab[i].store)[0] == 'energy' || Object.keys(room.result_lab[i].store)[0] == room.memory.lab_info.lab_result){
            //                     if(room.result_lab[i].store[room.memory.lab_info.lab_result] < 2500){
            //                         room.result_lab[i].status = 1;
            //                     }else{
            //                         room.result_lab[i].status = 2;
            //                     }
            //                 }else{
            //                     room.result_lab[i].status = 2;
            //                 }
            //             }else if(Object.keys(room.result_lab[i].store).length == 0){
            //                 room.result_lab[i].status = 1;
            //             }else{
            //                 if(Object.keys(room.result_lab[i].store)[1] == room.memory.lab_info.lab_result){
            //                     if(room.result_lab[i].store[room.memory.lab_info.lab_result] < 2500){
            //                         room.result_lab[i].status = 1;
            //                     }else{
            //                         room.result_lab[i].status = 2;
            //                     }
            //                 }else{
            //                     room.result_lab[i].status = 2;
            //                 }
            //             }
            //         }
            //     }
                
            //     // var labs = room.find(FIND_MY_STRUCTURES, 
            //     //     {filter: {structureType: STRUCTURE_LAB}});
                
            //     for(let j = 0;j < result_lab.length;j++){
            //         result_lab[j].runReaction(source_lab[0], source_lab[1]);
            //     }
                
            //     // // 下一 tick ...
                
            //     // console.log(labs[0].mineralType) // -> OH
            //     // console.log(labs[1].mineralType) // -> O
            //     // console.log(labs[2].mineralType) // -> H
            // }
            //超能提炼部分
            if(room.name == 'W1S22' || room.name == 'W2S22')
            {
                // room.powerSpawn = room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_POWER_SPAWN;}})[0];
                room.powerSpawn.processPower();
                // console.log(room.power_spawn.processPower());
            }
            //renew部分
            {

            }
            //视野部分
            // if(room.name == 'W0S00')
            // {
            //     let observer = room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_OBSERVER;}})[0];
            //     if(room.memory.powerbank_status == 0){
            //         let obrooms = new Array();
            //         obrooms = ['W0S21','W0S22','E0S22','W0S23'];
            //         let i = 0;
            //         if(Game.time % 20 < 5){
            //             i = 0;
            //         }else if(Game.time % 20 >= 5 && Game.time % 20 < 10){
            //             i = 1;
            //         }else if(Game.time % 20 >= 10 && Game.time % 20 < 15){
            //             i = 2;
            //         }else{
            //             i = 3;
            //         }
            //         observer.observeRoom(obrooms[i]);
            //         let obroom = Game.rooms[obrooms[i]];
            //         if(obroom){
            //             // STRUCTURE_POWER_BANK
            //             // let deposits = obroom.find(FIND_DEPOSITS);
            //             // if(deposits.length > 0 && deposits[0].lastCooldown < 40){
            //             //     console.log(deposits[0].id);
            //             // }
            //             let power_banks = obroom.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_POWER_BANK &&
            //                                                                                         structure.power > 4000 ;}});
            //             if(power_banks.length > 0 && power_banks[0].ticksToDecay > 3500){
            //                 room.memory.powerbank_room = obroom.name;
            //                 room.memory.powerbank_id = power_banks[0].id;
            //                 room.memory.powerbank_status = 1;
            //             }
            //         }
            //     }else if(room.memory.powerbank_status == 1){
            //         observer.observeRoom(room.memory.powerbank_room);
            //         let obroom = Game.rooms[room.memory.powerbank_room];
            //         if(obroom){
            //             // STRUCTURE_POWER_BANK
            //             // let deposits = obroom.find(FIND_DEPOSITS);
            //             // if(deposits.length > 0 && deposits[0].lastCooldown < 40){
            //             //     console.log(deposits[0].id);
            //             // }
            //             // let power_banks = obroom.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_POWER_BANK &&
            //             //                                                                             structure.power > 4000;}});
            //             // if(power_banks.length == 0){
            //             //     room.memory.powerbank_room = '';
            //             //     room.memory.powerbank_status = 0;
            //             // }

            //             let power_bank = Game.getObjectById(room.memory.powerbank_id);
            //             if(power_bank){
            //                 if(power_bank.hits < 200000){
            //                     room.memory.powerbank_status = 2;
            //                 }
            //             }else{
            //                 room.memory.powerbank_room = '';
            //                 room.memory.powerbank_id = '';
            //                 room.memory.powerbank_status = 0;
            //             }
            //         }
            //     }
            // }
            //核弹部分
            {

            }
            //塔部分
            {
                room.hostileCreeps = room.find(FIND_HOSTILE_CREEPS);
                for(var i in room.tower){
                    structureTower.run(room.tower[i]);
                }
            }
        }catch(err){
            console.log(room + '事件执行失败:' + err);
        }
    }

    receiveLinkWork(linkFrom,room){
        let linkTo = room.central_link[0];
        if(linkFrom.store.getFreeCapacity(RESOURCE_ENERGY) <= 300 && linkTo.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            linkFrom.transferEnergy(linkTo);
        }
    }

    centralLinkWork(linkFrom,room){
        let front_links = room.front_link;
        front_links.sort((a,b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));
        let linkTo = front_links[0];
        if(linkFrom.store.getFreeCapacity(RESOURCE_ENERGY) <= 500 && linkTo.store.getUsedCapacity(RESOURCE_ENERGY) < 400){
            linkFrom.transferEnergy(linkTo);
        }
    }
};