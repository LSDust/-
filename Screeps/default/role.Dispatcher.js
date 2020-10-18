/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Dispatcher');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep){
        try{
            let terminal = creep.room.terminal;
            let factory = creep.room.factory;
            let storage = creep.room.storage;

            if(!creep.pos.isEqualTo(creep.memory.X,creep.memory.Y)) {
                creep.moveTo(creep.memory.X,creep.memory.Y);
            }else{
                //加工Lbar
                {
                    if(creep.room.name == 'W2S22'){
                        if(factory.store['L'] < 50000){
                            creep.withdraw(storage, 'L');
                            creep.transfer(factory, 'L');
                        }
                        creep.withdraw(factory, RESOURCE_LEMERGIUM_BAR);
                        creep.transfer(terminal, RESOURCE_LEMERGIUM_BAR);
                    }
                }

                {   //能量调度待完善
                    if(factory.store[RESOURCE_ENERGY] >= 5000){
                        creep.transfer(storage, RESOURCE_ENERGY);
                    }else{
                        creep.transfer(factory, RESOURCE_ENERGY);
                    }
                }
                {
                    creep.withdraw(creep.room.central_link[0], RESOURCE_ENERGY);
                }
            }
            // if(creep.store.getUsedCapacity() == 0){
            //     //加工
            //     if(factory.store.getUsedCapacity() < 20000){
            //         if(factory.store[RESOURCE_ENERGY] < 5000){
            //             creep.withdraw(terminal, RESOURCE_BATTERY);
            //         }
            //         if(storage.store['L'] > 50000 || true){
            //             creep.withdraw(terminal, 'L');
            //         }
            //         if(storage.store['O'] > 50000 || true){
            //             creep.withdraw(storage, 'O');
            //         }
            //     }
            //     creep.withdraw(terminal, RESOURCE_BIOMASS);
            //     //成品
            //     if(factory.store[RESOURCE_ENERGY] > 10000){
            //         creep.withdraw(factory,RESOURCE_ENERGY);
            //     }
            //     creep.withdraw(factory, RESOURCE_OXIDANT);
            //     //存储调度
            //     //移动到link、terminal
            //     // if(creep.memory.workshop == 'W2S22'){
            //         if(creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //             creep.moveTo(terminal);
            //         }
            //     // }else{
            //     //     if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //     //         creep.moveTo(storage);
            //     //     }
            //     // }
            // }
            
            {
                // //工厂加工
                // creep.transfer(factory, RESOURCE_BATTERY);
                // creep.transfer(factory, 'O');
                // creep.transfer(factory, RESOURCE_BIOMASS);
                // //交易
                // creep.transfer(terminal, RESOURCE_METAL);
                // creep.transfer(terminal, RESOURCE_OXIDANT);
                // creep.transfer(terminal, 'L');
                // // 能量调度
                // if(factory.store[RESOURCE_ENERGY] < 5000){
                //     if(creep.transfer(factory, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(factory);
                //     }
                // }else{
                //     // if(creep.memory.workshop == 'W2S22'){
                //         if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //             creep.moveTo(storage);
                //         }
                //     // }else{
                //     //     if(creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //     //         creep.moveTo(terminal,{range: 1});
                //     //     }
                //     // }
                // }
                
                // creep.moveTo(factory,{range: 1});
                // creep.transfer(storage, RESOURCE_ENERGY);
            }

            {
                //日常任务
                // creep.withdraw(creep.room.central_link[0], RESOURCE_ENERGY);
                // if(creep.withdraw(creep.room.central_link[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(creep.room.central_link[0],{range: 1});
                // }
            }
        }catch{
            console.log('Dispatcher:' + creep + '方法执行失败');
        }
        
    }
};

function conventional(creep){

}