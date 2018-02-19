$(document).ready(function () {


    $(".character").click(function () {
        var $this = this;
        $($this).appendTo("#user-character");
        var yourPick = $(this).attr("id");
        if (yourPick === "obiwan-card") {
            $("#vader-card").appendTo("#enemies");
            $("#mace-card").appendTo("#enemies");
            $("#boba-card").appendTo("#enemies");
        }
    });







    // // Annimated movement of defenders when chosen
    // $.fn.animateAppendTo = function(sel, speed) {
    //     var $this = this,
    //         newEle = $this.clone(true).appendTo(sel),
    //         newPos = newEle.position();
    //     newEle.hide();
    //     $this.css("position", "absolute").animate(newPos, speed, function () {
    //         newEle.show();
    //         $this.remove();
    //     });
    //     return newEle;
    // };

    // $(".character").click(function () {
    //     $(this).animateAppendTo("#chosen-defender", 1000);
    // });
});