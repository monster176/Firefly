(function() {
    // 防抖函数优化窗口resize事件[7](@ref)
    function debounce(func, wait = 250) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }
  
    // 离屏Canvas预渲染
    class SeasonalCache {
      constructor(char, color, maxSize) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.generateCache(char, color, maxSize);
      }
        
      generateCache(char, color, maxSize) {
        const size = maxSize * 2;
        this.canvas.width = this.canvas.height = size;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `${maxSize}px Arial`;
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillText(char, size/2, size/2);
      }
    }
  
    document.addEventListener('DOMContentLoaded', function() {
      const getSeason = () => ['spring','summer','fall','winter'][Math.floor((new Date().getMonth())/3)];
  
      const config = {
        maxFlakes: 60,
        minSize: 24,
        maxSize: 36,
        minSpeed: 0.8,
        maxSpeed: 2.5,
        rotationSpeed: 0.03,
        cacheMap: new Map()
      };
  
      const seasonConfig = {
        spring: { colors: ['#FFC0CB','#FFB6C1'], char: '🌸' },
        summer: { colors: ['#FFD700','#FFA500'], char: '☀' },
        fall:   { colors: ['#FF4500','#FF8C00'], char: '🍁' },
        winter: { colors: ['#FFFFFF','#F0F0F0'], char: '❄' }
      }[getSeason()];
  
      function setupCanvas(canvas) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        canvas.getContext('2d').scale(dpr, dpr);
      }
  
      class SeasonalElement {
        constructor(canvas, ctx) {
          this.canvas = canvas;
          this.ctx = ctx;
          this.reset(true);
  
          if (!config.cacheMap.has(this.char)) {
            config.cacheMap.set(this.char, new SeasonalCache(this.char, this.color, this.size));
          }
          this.cache = config.cacheMap.get(this.char);
        }
  
        reset(init = false) {
          this.char = seasonConfig.char;
          this.color = seasonConfig.colors[Math.random() * 2 | 0];
          this.size = config.minSize + Math.random() * (config.maxSize - config.minSize);
          this.x = Math.random() * this.canvas.width;
          this.y = init ? Math.random() * this.canvas.height : -this.size;
          this.speedX = Math.random() * 2 - 1;
          this.speedY = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
          this.rotation = Math.random() * Math.PI * 2;
        }
  
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.rotation += config.rotationSpeed;
          if (this.y > this.canvas.height + this.size) this.reset();
        }
  
        draw() {
          this.ctx.save();
          this.ctx.translate(this.x, this.y);
          this.ctx.rotate(this.rotation);
          this.ctx.drawImage(this.cache.canvas, -this.size/2, -this.size/2, this.size, this.size);
          this.ctx.restore();
        }
      }
  
      function initSeasonalEffect() {
        const canvas = document.getElementById('season-canvas');
        const ctx = canvas.getContext('2d');
        setupCanvas(canvas);
  
        const elements = Array.from({ length: config.maxFlakes }, 
          () => new SeasonalElement(canvas, ctx));
  
        let lastTime = 0;
        const animate = (timestamp) => {
          const deltaTime = timestamp - lastTime;
          if (deltaTime > 16) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            elements.forEach(e => {
              e.update();
              e.draw();
            });
            lastTime = timestamp;
          }
          requestAnimationFrame(animate);
        };
        animate(0);
  
        window.addEventListener('resize', debounce(() => {
          setupCanvas(canvas);
          elements.forEach(e => e.reset(true));
        }));
      }
  
      const canvas = document.createElement('canvas');
      canvas.id = 'season-canvas';
      document.body.appendChild(canvas);
      initSeasonalEffect();
    });
  })();
  if (window.console && window.console.log) {
    console.log("%c ShiDai %c https://blog.elsworld.cn:8443/ ", "color: #fff; margin: 1em 0; padding: 5px 0; background: #673ab7;", "margin: 1em 0; padding: 5px 0; background: #efefef;");
  }
  