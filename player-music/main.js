


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd')
const heading=$('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')

const playBtn = $('.btn-toggle-play')
const player = $('.player')

const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const ramdomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')
// console.log(ramdomBtn)
const PLAYER_SRORAGE_KEY="MUSIC_PLAYER"


const app = {
  isPlaying:false,
  isRandom :false,
  isRepeat:false,
  config:JSON.parse(localStorage.getItem(PLAYER_SRORAGE_KEY)) || {},
  curenIndex:0,
  songs: [
    {
      name: "Hãy trao cho anh",
      singer: "Sơn Tùng MTP",
      path: "./music/hãytraochoanh.mp3.mp3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV_Cbf2Sm9WVrnwmByun6XG3BaCSz-aX8HDEzTAVuDQwZ6RCMNj4_8dHWkfKojjRChWvM&usqp=CAU"
    },
    {
      name: "Nếu ngày ấy",
      singer: "Soobin",
      path: "/music/nếungàyấy.mp3.mp3",
      image:
        "https://afamilycdn.com/150157425591193600/2021/4/15/8482497914372047564540643748203334855557120o-16184585594731628749804.jpeg"
    },
    {
      name: "Đi về nhà",
      singer: "Đen vâu & Justatee",
      path:"./music/đivềnhà.mp3.mp3",
      image: "https://cdn.baogiaothong.vn/upload/images/2020-4/article_img/2020-12-20/den-1608473761-width700height388.jpg"
    },
    {
      name: "Remember Me",
      singer: "MTP",
      path: "./music/rememberme.mp3.mp3",
      image:
        "https://2sao.vietnamnetjsc.vn/images/2021/10/04/18/18/st2.jpg"
    },
    {
      name: "Đưa nhau đi trốn",
      singer: "Đen & MIN",
      path: "./music/đưanhauđitrốn.mp3.mp3",
      image:
        "https://2sao.vietnamnetjsc.vn/images/2019/06/20/17/15/r-den-vau-min-7.jpg"
    },
    
  ],

  setConfig: function(key,value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_SRORAGE_KEY ,JSON.stringify(this.config))
  },
  //render ra các bài hát
  render: function () {
    const htmls = this.songs.map((song,index )=> {
      return `
        <div class="song ${index ===this.curenIndex?'active':''}" data-index="${index}">
            <div class="thumb" 
              style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
         </div>
        `
    })
    playList.innerHTML=htmls.join('')
  },

  definePeoperties:function(){
    Object.defineProperty(this,'currentSong',{
      
      get:function(){
        return this.songs[this.curenIndex]
      }
    })
  },
  handleEvents:function () {
      const _this = this
      const cdWidth = cd.offsetWidth

      //xử lý cd quay /dừng
      //animate là thuộc tính của js hiệu ứng giống animation của css
       
      const cdthumbAnimate = cdThumb.animate([
        {
          transform: 'rotate(360deg)'
        }
      ],{
        duration:15000, 
        iterations: Infinity
      })
      cdthumbAnimate.pause()


    //xử lý phóng to thu nhỏ cd
      document.onscroll=function (){
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const newCdWidth = cdWidth-scrollTop 
    
      //cách viết 1 dùng câu lênh if else
      // if (newCdWidth > 0) {  nếu newCdWidth > 0 thì lấy giá trị px
      //   cd.style.width = newCdWidth + "px"
      // } else { còn lại thì lấy giá trị =0 để không lấy giá trị âm nếu kéo nhanh quá 
      //   cd.style.width = 0
      // }
  
      // cách viết toán tử 3 ngôi
      cd.style.width = newCdWidth> 68 ? newCdWidth+'px' : 0
      cd.style.opacity = newCdWidth/cdWidth
      // console.log(newCdWidth)
      }

     //xử lý khi click play
      playBtn.onclick = function(){
        if (_this.isPlaying) {
          audio.pause()
        } else {
          audio.play()
        }
      }
       
      console.log(cdthumbAnimate)
        //khi song play
        audio.onplay = function () {
          _this.isPlaying = true
          player.classList.add("playing")
          cdthumbAnimate.play()
        }

        //khi song bị pause

        audio.onpause = function () {
          _this.isPlaying = false
          player.classList.remove("playing")
          cdthumbAnimate.pause()
        }

        //khi tiến độ bài hát thay đổi
        //timeupdate là số thời gian audio thay đổi 
        //currentTime là số thời gian đã thay đổi
        audio.ontimeupdate =function () {
          //audio.duration là tổng thời gian bài hát
          if(audio.duration){
            
            // progerssPersent là từ số giây quy đổi ra phần trăm(%)
            const progerssPersent=Math.floor(audio.currentTime / audio.duration *100) 
            progress.value = progerssPersent
          }
         
        }

        //xử lí khi tua song
        // onchange là sự thay đổi diễn ra
        progress.onchange = function(e){
          // audio.duration là tổng số giây chia cho 100 là tìm ra đc 1 % rồi nhân với số phần trăm đã thay đổi
          const seekTime=(audio.duration/100 * e.target.value)
          // target được hiểu là event onchange 
          //audio.currentTime là số thời gian đã thay đổi
           
          audio.currentTime = seekTime
        }

        // khi next song
        nextBtn.onclick = function(){
          if(_this.isRandom){
            _this.playRandomSong()
          }else{
            _this.nextSong()
          }
          audio.play()
          _this.render()
          _this.scrollToActiveSong()
        }

        //khi prev song
        prevBtn.onclick = function(){
          if(_this.isRandom){
            _this.playRandomSong()
          }else{
            _this.prevSong()
          }
          audio.play()
          _this.render()
          _this.scrollToActiveSong()

        }

        // Xử lý ramdom bài hát 
        ramdomBtn.onclick = function(e){
          _this.isRandom = !_this.isRandom
          _this.setConfig('isRandom', !_this.isRandom)
          ramdomBtn.classList.toggle('active',_this.isRandom)
        }

        //Xử lý lặp lại bài hát 
        repeatBtn.onclick = function(e){
          _this.isRepeat = !_this.isRepeat
          _this.setConfig('isRepeat',_this.isRepeat)
         
          repeatBtn.classList.toggle('active',_this.isRepeat)
          
        }

        //xử lý next bài hát khi audio kết thúc

        audio.onended = function(){
          if(_this.isRepeat){
            audio.play()
          }else{
            nextBtn.click()
          }
        }

        //lắng nghe click vào playlist
        playList.onclick = function(e){
          const songEle = e.target.closest('.song:not(.active)')
          if(
            songEle|| e.target.closest('.option')){
              
              //xử lý khi click vào song
              if(songEle){
                _this.curenIndex =Number(songEle.dataset.index) 
                _this.loadCurrentSong()
                _this.render()
                audio.play()
              }

              //xử lý khi click vào option 

              if(e.target.closest('.option')){

              }

          }
        }
  },
  scrollToActiveSong:function () {
    setTimeout(()=>{
      $('.song.active').scrollIntoView({
        behavior:'smooth',
        block:'start',
      })
    },300)
  },
  loadCurrentSong:function(){
  
    heading.textContent=this.currentSong.name
    cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
    audio.src = this.currentSong.path

  },
  loadConfig:function(){
    this.isRandom = this.config.isRandom
    this.isRepeat = this.config.isRepeat

  },
  nextSong:function(){
    this.curenIndex++
    // console.log(this.curenIndex,this.songs.length)
    if (this.curenIndex >= this.songs.length) {
      this.curenIndex = 0
    }

    this.loadCurrentSong()
  },  

  prevSong:function(){
    this.curenIndex--
    if (this.curenIndex < 0) {
      this.curenIndex = this.songs.length - 1
    }
  
  this.loadCurrentSong()
  },  

  playRandomSong : function(){
    let newIndex
    do{
      newIndex = Math.floor(Math.random() * this.songs.length)
    }while(newIndex === this.curenIndex)

    this.curenIndex =newIndex

    this.loadCurrentSong()
  },






  start: function () {

    //Gán cấu hình từ config
    this.loadConfig()
    //định nghĩa các thuộc tính cho object
    this.definePeoperties()

    //lắng nghe xử lý các sự kiện (DOM)
    this.handleEvents()

    //tải thông tin bài hát đầu tiên vòa ui khi chạy ứng dụng
    this.loadCurrentSong()

    //tải ra danh sách bài hát
    this.render()

    // hiển thị trạng thái ban đầu của button repear & random
    ramdomBtn.classList.toggle('active', this.isRandom)
    repeatBtn.classList.toggle('active', this.isRepeat)
  } 
}
app.start()