class GBAIntro {
  private frame: number;
  animating: boolean;
  title: string;
  subtitle: string;
  onAnimationComplete?: () => void;
  constructor(
    title: string,
    subtitle: string,
    onAnimationComplete?: () => void
  ) {
    this.frame = 0;
    this.animating = false;
    this.title = title;
    this.subtitle = subtitle;
    this.onAnimationComplete = onAnimationComplete;
  }

  start(ctx: CanvasRenderingContext2D) {
    if (!ctx) return;
    // Initialize
    this.frame = 0;
    this.animating = true;
    this.animate(ctx);
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 2;
  }

  easeOutBounce(t: number) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }

  drawGameBoy(ctx: CanvasRenderingContext2D) {
    const letters = this.title.split("");
    const centerY = 70;
    const letterSpacing = 1;
    const startX = 52;

    const letterWidths: number[] = [];
    letters.forEach((letter) => {
      const width = ctx.measureText(letter).width;
      letterWidths.push(width);
    });
    letters.forEach((letter, i) => {
      const letterStartFrame = i * 3;
      const letterFrame = this.frame - letterStartFrame;

      if (letterFrame < 0) return;

      const animDuration = 75; // Slower animation
      let progress = Math.min(1, letterFrame / animDuration);

      // Bounce easing
      const bounceProgress = this.easeOutBounce(progress);

      // Each letter flies in from different angle at bottom
      const totalLetters = letters.length;
      const letterIndex = i / totalLetters;

      const startPosX = 30 + letterIndex * 180; // Spread across bottom
      const startPosY = 200; // Below screen

      // Calculate endX based on cumulative width with uniform spacing
      let endX = startX;
      for (let j = 0; j < i; j++) {
        endX += letterWidths[j] + letterSpacing;
      }
      const endY = centerY;

      const x = startPosX + (endX - startPosX) * progress;
      const y = startPosY + (endY - startPosY) * bounceProgress;

      // Color cycling during animation
      let color;
      if (progress < 1) {
        const colorProgress = progress;
        if (colorProgress < 0.2) color = "#ff0000";
        else if (colorProgress < 0.35) color = "#ff8800";
        else if (colorProgress < 0.5) color = "#ffff00";
        else if (colorProgress < 0.65) color = "#00ff00";
        else if (colorProgress < 0.8) color = "#00aaff";
        else if (colorProgress < 0.95) color = "#0055ff";
        else color = "#0033cc";
      } else {
        color = "#0033cc";
      }

      // Draw with slight italic slant (less than before)
      ctx.save();
      ctx.translate(x, y);

      ctx.fillStyle = color;
      ctx.fillText(letter, 0, 0);

      // Add stroke for thickness
      ctx.strokeStyle = color;
      ctx.strokeText(letter, 0, 0);

      ctx.restore();
    });
  }

  drawSparkle(ctx: CanvasRenderingContext2D) {
    // Sparkle starts after letters finish bouncing
    const sparkleStart = 100;
    const sparkleDuration = 20;

    if (
      this.frame < sparkleStart ||
      this.frame > sparkleStart + sparkleDuration
    )
      return;

    const progress = (this.frame - sparkleStart) / sparkleDuration;

    const sparkleX = 30 + progress * 190;
    const sparkleY = 70;

    const brightness = Math.sin(progress * Math.PI);

    ctx.save();
    ctx.globalAlpha = brightness;
    ctx.fillStyle = "#ffffff";

    ctx.beginPath();
    ctx.arc(sparkleX, sparkleY, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = brightness * 0.8;
    ctx.beginPath();
    ctx.arc(sparkleX + 14, sparkleY - 6, 6, 0, Math.PI * 2);
    ctx.fill();

    // Add soft glow to both circles
    ctx.globalAlpha = brightness * 0.25;
    ctx.beginPath();
    ctx.arc(sparkleX, sparkleY, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(sparkleX + 14, sparkleY - 6, 13, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawSubtitle(ctx: CanvasRenderingContext2D) {
    // Nintendo logo appears after sparkle
    if (this.frame < 60) return;

    const fadeProgress = Math.min(1, (this.frame - 60) / 10);

    ctx.save();
    ctx.globalAlpha = fadeProgress;

    // Draw Nintendo in pink/magenta
    ctx.font = "bold 10px Arial";
    ctx.fillStyle = "#ff0066";

    ctx.fillText(this.subtitle, 120, 105);

    ctx.restore();
  }

  animate(ctx: CanvasRenderingContext2D) {
    if (!this.animating) return;

    ctx.fillStyle = "#f6f9f7";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.drawGameBoy(ctx);
    this.drawSparkle(ctx);
    this.drawSubtitle(ctx);

    this.frame++;

    // Hold on final frame
    if (this.frame < 140) {
      requestAnimationFrame(() => this.animate(ctx));
    } else {
      this.animating = false;
      if (this.onAnimationComplete) {
        this.onAnimationComplete();
      }
    }
  }
}
export default GBAIntro;
