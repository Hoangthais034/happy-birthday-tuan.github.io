const snowflakes = new Snowflakes({
    color: "#ffd700",
    minSize: 20
});

const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
if (name) {
    document.getElementById("name").textContent = name;
    document.getElementById("nae").textContent = name;
}

$(".main").hide();
$('#play').on('click', function () {
    $(".loader").fadeOut(1500);
    $(".main").fadeIn("slow");
    snowflakes.destroy();
    $('.balloon-border').animate({ top: -500 }, 8000);
    $('.song')[0].volume = 0.25;
    $('.song')[0].play();
});

new Typed("#typed", {
    stringsElement: '#typed-strings',
    typeSpeed: 30,
    backSpeed: 10,
    loop: true
});

(function (w) {
    const _now = Date.now || (() => new Date().getTime());
    let prev = _now();

    w.requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || ((fn) => {
        const curr = _now();
        const delay = Math.max(0, 16 - (curr - prev));
        prev = curr;
        return setTimeout(fn, delay);
    });

    w.cancelAnimationFrame = w.cancelAnimationFrame || w.webkitCancelAnimationFrame || clearTimeout;
})(window);

document.addEventListener("DOMContentLoaded", function () {
    const confettiConfig = {
        speed: 50,
        ribbonCount: 10,
        ribbonPaperCount: 15,
        paperCount: 10,
        DEG_TO_RAD: Math.PI / 180,
        colors: [
            ["#df0049", "#660671"],
            ["#00e857", "#005291"],
            ["#2bebbc", "#05798a"],
            ["#ffd200", "#b06c00"]
        ]
    };

    class Vector2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        add(vec) {
            this.x += vec.x;
            this.y += vec.y;
        }

        sub(vec) {
            this.x -= vec.x;
            this.y -= vec.y;
        }

        mul(factor) {
            this.x *= factor;
            this.y *= factor;
        }

        normalize() {
            const len = this.length();
            if (len !== 0) {
                const factor = 1.0 / len;
                this.x *= factor;
                this.y *= factor;
            }
        }

        static lerp(vec0, vec1, t) {
            return new Vector2(
                (vec1.x - vec0.x) * t + vec0.x,
                (vec1.y - vec0.y) * t + vec0.y
            );
        }

        static distance(vec0, vec1) {
            return Math.sqrt((vec0.x - vec1.x) ** 2 + (vec0.y - vec1.y) ** 2);
        }
    }

    class ConfettiPaper {
        constructor(x, y) {
            this.pos = new Vector2(x, y);
            this.size = 5.0;
            this.time = Math.random();
            this.rotation = confettiConfig.DEG_TO_RAD * Math.random() * 360;
            this.rotationSpeed = Math.random() * 600 + 800;
            this.xSpeed = 40.0;
            this.ySpeed = Math.random() * 60 + 50;
            const ci = Math.round(Math.random() * (confettiConfig.colors.length - 1));
            this.frontColor = confettiConfig.colors[ci][0];
            this.backColor = confettiConfig.colors[ci][1];
        }

        update(dt) {
            this.time += dt;
            this.rotation += this.rotationSpeed * dt;
            this.pos.x += Math.cos(this.time * 1.5) * this.xSpeed * dt;
            this.pos.y += this.ySpeed * dt;
        }
    }


    const canvas = document.getElementById("confetti");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const confettiPapers = Array.from({ length: confettiConfig.paperCount }, () =>
        new ConfettiPaper(Math.random() * canvas.width, Math.random() * canvas.height)
    );

    function animate() {
        confettiPapers.forEach(paper => {
            paper.update(0.01);
        });
        requestAnimationFrame(animate);
    }

    animate();
});
