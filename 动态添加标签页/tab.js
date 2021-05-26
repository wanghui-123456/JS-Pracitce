var that='';
class Tab {
    constructor (id){
        that=this;
        //获取元素
        this.main = document.querySelector(id);
        this.lis = document.querySelectorAll("li");
        this.sections = this.main.querySelectorAll('section');
        this.init();
    }

    //init 初始化操作，让相关元素绑定事件
    init (){
        for (var i=0;i<this.lis.length;i++){
            this.lis[i].index=i;
            this.lis[i].onclick=this.toggleTab;
        }
    }
    //1.切换
    toggleTab (){
        that.clearClass(); //清除样式 排他思想
        this.className='liactive';
        that.sections[this.index].className='content';
    }
    clearClass (){
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].className='';
            this.sections[i].calssName='';
        }
    }
    //2.添加
    addTab (){}
    //3.删除
    removeTab (){}
    //4.修改
    editTab (){}
}

new Tab ('#wrap');
