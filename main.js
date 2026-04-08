 // Floating background hearts
  const bgHearts = document.getElementById('bgHearts');
  const heartEmojis = ['🌸','💕','💗','💖','🌷','✨'];
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('span');
    h.className = 'fh';
    h.textContent = heartEmojis[i % heartEmojis.length];
    h.style.left = (Math.random() * 100) + '%';
    h.style.animationDuration = (6 + Math.random() * 8) + 's';
    h.style.animationDelay = (Math.random() * 8) + 's';
    h.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    bgHearts.appendChild(h);
  }

  let noScale = 1;
  const noMessages = [
    "You sure? ",
    "Are you absolutely sure? ",
    "Think carefully now... ",
    "Last warning! ",
    "Fuck you !",
  ];
  let noCount = 0;
  const noBtn = document.getElementById('noBtn');
  const noResult = document.getElementById('noResult');
  const noMsg = document.getElementById('noMsg');
  const bearEmoji = document.getElementById('bearEmoji');
  const sadBears = ['😤','😠','😡','🔪','💀'];

  function handleNo() {
    noScale = Math.max(0, noScale - 0.18);
    noBtn.style.transform = `scale(${noScale})`;
    if (noScale <= 0) {
      noBtn.style.pointerEvents = 'none';
      noBtn.style.opacity = '0';
    }
    noResult.classList.add('active');
    noMsg.textContent = noCount < noMessages.length
      ? noMessages[noCount] + " Stop messing with me and say yes 🔪"
      : "Fuck you again ! ";
    bearEmoji.textContent = sadBears[Math.min(noCount, sadBears.length - 1)];
    noCount++;
  }

  function handleYes() {
    document.getElementById('btnArea').style.display = 'none';
    noResult.classList.remove('active');
    bearEmoji.textContent = '🥰';
    bearEmoji.style.animation = 'none';
    bearEmoji.style.fontSize = 'clamp(5rem, 20vw, 8rem)';
    document.getElementById('yesResult').classList.add('active');
    launchConfetti();
  }

  // Confetti
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#e8397a','#f8a4c4','#c0185a','#ffb3d1','#ff6eb4','#ff9ed2','#ffd6e7','#ffffff','#ff4d94'];
    const pieces = [];

    for (let i = 0; i < 160; i++) {
      pieces.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 60,
        y: canvas.height * 0.55,
        vx: (Math.random() - 0.5) * 14,
        vy: -(Math.random() * 18 + 8),
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        w: 8 + Math.random() * 10,
        h: 5 + Math.random() * 6,
        gravity: 0.45 + Math.random() * 0.2,
        alive: true,
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let any = false;
      for (const p of pieces) {
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        if (p.y < canvas.height + 40) {
          any = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot * Math.PI / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, 1 - frame / 140);
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }
      frame++;
      if (any && frame < 160) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
  }