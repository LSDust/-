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
                
                if(creep.room.name == 'W1S22')
                {
                    if(true){
                        conventional(creep,terminal,factory,storage);
                    }else{
                        creep.withdraw(storage, RESOURCE_ENERGY);
                        creep.transfer(terminal, RESOURCE_ENERGY);
                    }

                    // Z_storageflow(creep,terminal,factory,storage);
                    K_storageflow(creep,terminal,factory,storage);
                    // Kbar_Unzipflow(creep,terminal,factory,storage);
                    // Lbar_Unzipflow(creep,terminal,factory,storage);
                    // Biomass_sendflow(creep,terminal,factory,storage);
                    // Obar_produceflow(creep,terminal,factory,storage);
                    flowOps(creep,terminal,factory,storage);
                    flowPower(creep,terminal,factory,storage);
                }
                if(creep.room.name == 'W2S22')
                {
                    if(true){
                        conventional(creep,terminal,factory,storage);
                    }else{
                        creep.withdraw(storage, RESOURCE_ENERGY);
                        creep.transfer(terminal, RESOURCE_ENERGY);
                    }
                    switch(creep.room.memory.produce) {
                        case 'RESOURCE_BIOMASS':
                            Biomass_produceflow(creep,terminal,factory,storage);
                            Cell_produceflow(creep,terminal,factory,storage);
                            break;
                        default:
                            Lbar_produceflow(creep,terminal,factory,storage);
                    } 
                    // if(false){
                    //     Lbar_produceflow(creep,terminal,factory,storage);
                    // }else{
                    //     Biomass_produceflow(creep,terminal,factory,storage);
                    // }
                    // Cell_sendflow(creep,terminal,factory,storage);
                    // Lbar_produceflow(creep,terminal,factory,storage);
                }

                creep.withdraw(creep.room.central_link[0], RESOURCE_ENERGY);
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
            }


        }catch(err){
            console.log('Dispatcher:' + creep + '方法执行失败'+err);
        }
        
    }
};

function conventional(creep,terminal,factory,storage){
    if(terminal.store[RESOURCE_ENERGY] > 50000){
        creep.withdraw(terminal, RESOURCE_ENERGY);
    }

    //正常调度、待完善
    if(factory.store[RESOURCE_ENERGY] <= 5000){
        creep.transfer(factory, RESOURCE_ENERGY);
    }else if(terminal.store[RESOURCE_ENERGY] <= 20000){
        creep.transfer(terminal, RESOURCE_ENERGY);
    }else{
        creep.transfer(storage, RESOURCE_ENERGY);
    }
}

//加工Lbar物流
function Lbar_produceflow(creep,terminal,factory,storage){
    if(factory.store['L'] < 50000){
        creep.withdraw(storage, 'L');
        creep.transfer(factory, 'L');
    }
    creep.withdraw(factory, RESOURCE_LEMERGIUM_BAR);
    creep.transfer(terminal, RESOURCE_LEMERGIUM_BAR);
}

//加工Obar物流
function Obar_produceflow(creep,terminal,factory,storage){
    if(factory.store['O'] < 50000){
        creep.withdraw(storage, 'O');
        creep.transfer(factory, 'O');
    }
    creep.withdraw(factory, RESOURCE_OXIDANT);
    creep.transfer(terminal, RESOURCE_OXIDANT);
}

function flowOps(creep,terminal,factory,storage){
    creep.withdraw(terminal, 'ops');
    creep.transfer(storage, 'ops');
}

function flowPower(creep,terminal,factory,storage){
    creep.withdraw(terminal, 'power');
    creep.transfer(storage, 'power');
}

function Biomass_sendflow(creep,terminal,factory,storage){
    creep.withdraw(storage, RESOURCE_BIOMASS);
    creep.transfer(terminal, RESOURCE_BIOMASS);
}

function Biomass_produceflow(creep,terminal,factory,storage){
    if(factory.store[RESOURCE_LEMERGIUM_BAR] < 500){
        creep.withdraw(terminal, RESOURCE_LEMERGIUM_BAR);
        creep.withdraw(storage, RESOURCE_LEMERGIUM_BAR);
    }
    creep.transfer(factory, RESOURCE_LEMERGIUM_BAR);
    creep.withdraw(terminal, RESOURCE_BIOMASS);
    creep.withdraw(storage, RESOURCE_BIOMASS);
    creep.transfer(factory, RESOURCE_BIOMASS);
}

function Cell_produceflow(creep,terminal,factory,storage){
    if(factory.store[RESOURCE_LEMERGIUM_BAR] < 500){
        creep.withdraw(terminal, RESOURCE_LEMERGIUM_BAR);
        creep.withdraw(storage, RESOURCE_LEMERGIUM_BAR);
    }
    if(factory.store[RESOURCE_OXIDANT] < 500){
        creep.withdraw(terminal, RESOURCE_OXIDANT);
        creep.withdraw(storage, RESOURCE_OXIDANT);
    }
    creep.transfer(factory, RESOURCE_LEMERGIUM_BAR);
    creep.transfer(factory, RESOURCE_OXIDANT);
    creep.withdraw(terminal, RESOURCE_CELL);
    creep.withdraw(storage, RESOURCE_CELL);
    creep.transfer(factory, RESOURCE_CELL);
}

function Cell_sendflow(creep,terminal,factory,storage){
    creep.withdraw(factory, 'cell');
    creep.transfer(terminal, 'cell');
}

function Kbar_Unzipflow(creep,terminal,factory,storage){
    creep.withdraw(storage, RESOURCE_KEANIUM_BAR);
    creep.withdraw(terminal, RESOURCE_KEANIUM_BAR);
    creep.transfer(factory, RESOURCE_KEANIUM_BAR);
}

function Lbar_Unzipflow(creep,terminal,factory,storage){
    creep.withdraw(storage, RESOURCE_LEMERGIUM_BAR);
    creep.withdraw(terminal, RESOURCE_LEMERGIUM_BAR);
    creep.transfer(factory, RESOURCE_LEMERGIUM_BAR);
}

function Z_storageflow(creep,terminal,factory,storage){
    creep.withdraw(factory, 'Z');
    creep.withdraw(terminal, 'Z');
    creep.transfer(storage, 'Z');
}

function K_storageflow(creep,terminal,factory,storage){
    creep.withdraw(factory, 'K');
    creep.withdraw(terminal, 'K');
    creep.transfer(storage, 'K');
}