Component({
  mixins: [],
  data: {
    x:1,
    animationInfo:{},
    arr:[1,2,3,4,5,6],
    num:-1,
    rotate:0,
    rotateNum:-3,
    isShow:false
  },
  props: {y:2},
  onInit(){
    this.setData({is:this.is})
  },
  didMount() {//组件创建完毕时触发
    console.log("组件创建完毕时触发");
  },
  didUpdate() {//组件更新完毕时触发
    console.log("组件更新完毕时触发");
    console.log(this.is);
     this.setData({is:this.is})
  },
  didUnmount() {//组件删除时触发
    console.log("组件删除时触发");
  },
  methods: {
     handleTap() {
  	   this.setData({ x: this.data.x + 8}); // 可使用 setData 改变内部属性
     }, 
     luckDraw(){
       if(this.data.num!=-1)
       return;
       let that = this;
       let flag = this.data.num;
       const animation = my.createAnimation({
              transformOrigin: "center center",
              duration: 200,
              timingFunction: "linear",
            })
        animation.scale(1.2,1.2).step();
        animation.scale(1,1).step();
        let time = setInterval(function(){
            if (flag==5){
               let randomNum = Math.floor(Math.random()*6+1);
               console.log("随机牌",randomNum);
               that.setData({rotateNum:randomNum,rotate:0+"deg",isShow:true});
               clearInterval(time);
            } 
            console.log(flag);
            flag++;
            that.setData({num:flag});
        },300)
         that.setData({animationInfo:animation.export()})
        
     },
     closeDraw(){
       this.setData({isShow:false,rotateNum:-3})
     }
  },
});
