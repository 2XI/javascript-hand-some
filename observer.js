class Notifier { //通知者
    constructor(){
        this.observerList = [] //观察者列表
    }
    add(obj){
        this.observerList.push(obj) //添加观察者
    }
    remove(obj){
       let index = this.observerList.findIndex( (o) => {
           return o === obj
        })//找到 删除对象的索引
        if(index >= 0) {
            this.observerList.splice(index,1)
        }
    }
    notify(){ //通知每个观察者
        this.observerList.forEach( (obj) => {
            obj.update();
        })
    }
}

class Observer {//观察者
    constructor(name){
        this.name = name
    }
    update(){
        console.log(this.name,"收到通知")
    }
}