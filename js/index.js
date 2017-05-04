
curr_color = "#c75136";


var mel = new Image();
mel.src = "mel_red_big.png";




var canvas, ctx;
var pimg, pattern;
var curr_color, dctrl;
var layer_2, layer_2_ctx;
function init() {
    dctrl = {drawing: false};

    canvas = document.getElementById("blackboard");
    layer_2 = document.getElementById("mel");
    layer_2_ctx = layer_2.getContext("2d");
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 6;
    ctx.lineCap = "round";

    pattern = ctx.createPattern(pimg, "repeat");


    curr_color = "#c75136";


    var mel = new Image();
    mel.src = "mel_red_big.png";

    mel.onload = function () {

        canvas_logo(mel, layer_2_ctx);
    }




}


function draw(x1, y1, x2, y2, mel, what, callback) {


    var h1 = x2 - x1;
    var h2 = y2 - y1;
    var foo, rx, ry;

    if (h2 == 0) {
        ry = 0;
        rx = h1 == 0 ? 0 : x2 > x1 ? 1 : -1;
    } else if (h1 == 0) {
        ry = h2 == 0 ? 0 : y2 > y1 ? 1 : -1;
        rx = 0;
    } else if (h2 > h1) {
        foo = h1 != 0 && h2 != 0 ? Math.abs((Math.abs(h1) / Math.abs(h2))) : '';
        ry = h2 == 0 ? 0 : y2 > y1 ? 1 : -1;
        rx = h1 == 0 ? 0 : h2 >= h1 ? foo : foo;
        rx = rx == 0 ? 0 : x2 > x1 ? rx : -rx;
    } else if (h1 > h2) {
        foo = h1 != 0 && h2 != 0 ? Math.abs((Math.abs(h2) / Math.abs(h1))) : '';
        rx = h1 == 0 ? 0 : x2 > x1 ? 1 : -1;
        ry = h2 == 0 ? 0 : h1 >= h2 ? foo : foo;
        ry = ry == 0 ? 0 : y2 > y1 ? ry : -ry;
    } else {
        ry = 1;
        rx = 1;
    }







    if (what == 'both') {
        var interval = setInterval(function () {
            action();
            draw_mel()

        }, 10);
    } else if (what == 'mel') {
        var interval = setInterval(function () {
            action('mel');
            draw_mel()
        }, 10);

    }


    function action(mel) {
        ctx.beginPath();

        if (Math.round(x1) == Math.round(x2) && Math.round(y1) == Math.round(y2)) {
            clearInterval(interval);
            callback ? callback() : null
        }
        if (!mel) {
            draw_line(x1 - rx, y1 - ry, x1, y1)
        }

        ctx.closePath();
        ctx.fill();
        y1 += ry;
        x1 += rx;
    }



    function draw_mel() {
        var mel_x1 = x1 + 2, mel_y1 = y1 -20;
        layer_2_ctx.clearRect(0, 0, 1000, 1000)
        layer_2_ctx.drawImage(mel, mel_x1, mel_y1);


    }


}


function canvas_logo(mel, layer_2_ctx) {
    ctx.clearRect(0, 0, 1000, 1000)
    draw_line(3, 23, 3, 40);
    draw_line(3, 40, 20, 40);
    draw_line(20, 40, 20, 23);
    draw_line(20, 23, 3, 23);
    layer_2_ctx.drawImage(mel, 20, 4);
    var elem = document.getElementById("mel");
    var count;

    function draw_logo(){
        if(count == 0){
            return
        }
        count = 0;
        ctx.clearRect(0, 0, 1000, 1000)
        draw_line(3, 23, 3, 40);
        draw_line(3, 40, 20, 40);
        draw_line(20, 40, 20, 23);
        draw_line(20, 23, 3, 23);
        layer_2_ctx.drawImage(mel, 20, 4);

        draw(3, 57, 3, 90, mel, 'both', function () {
            draw(3, 90, 36, 90, mel, 'both', function () {
                draw(36, 90, 36, 57, mel, 'both', function () {
                    draw( 36, 57, 3, 57, mel, 'both', function () {
                        draw( 36, 23, 36, 23, mel, 'mel', function () {
                            draw( 36, 23, 70, 23, mel, 'both', function () {
                                draw(70, 23, 70, 90, mel, 'both', function () {
                                    draw(70, 90, 36, 90, mel, 'both', function () {
                                        draw(36, 90, 70, 57, mel, 'mel', function () {
                                            draw(70, 57, 36, 57, mel, 'both', function () {
                                                draw(36, 57, 36, 23, mel, 'both', function(){
                                                    count = 1;
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })

                    })
                })
            });
        });

    }



    elem.addEventListener("mouseenter", function(){

        draw_logo(count)
    }, false);



}


function draw_line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = curr_color;
    ctx.stroke();

    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = pattern;
    ctx.stroke();
}


pimg = new Image();
pimg.onload = init;
pimg.src = "data:image/png;base64,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"
