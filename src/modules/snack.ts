class Snake{
  head: HTMLElement
  //包括蛇头
  bodies: HTMLCollection
  element: HTMLElement
  constructor(){
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = this.element.getElementsByTagName('div')
  }
  get X(){
    return this.head.offsetLeft
  }
  get Y(){
    return this.head.offsetTop
  }

  set X(value){
    if(this.X === value){
      return
    }
    if(value < 0 || value > 290){
      throw new Error('蛇撞墙了！')
    }
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
      if(value > this.X){
        value = this.X - 10
      }else{
        value = this.X + 10
      }
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }
  set Y(value){
    if(this.Y === value){
      return
    }
    if(value < 0 || value > 290){
      throw new Error('蛇撞墙了！')
    }
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
      if(value > this.Y){
        value = this.Y - 10
      }else{
        value = this.Y + 10
      }
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()
  }
  addBody(){
    this.element.insertAdjacentHTML("beforeend",'<div></div>')
  }
  moveBody(){
    // 如果下一句代码， 是 [] 或者 （） 或者 `` 开头， 前面必须 ; 结尾， 否则会连成一句话
    for(let i = this.bodies.length-1; i > 0; i--){
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }
  checkHeadBody(){
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
        throw new Error('撞到自己了！')
      }
      
    }
  }
}

export default Snake