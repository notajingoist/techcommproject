var App = function(){
    this.setUp();
    // initalize();
}    

App.prototype.setUp = function(){
    this.ajaxSetUp();
    this.initPages();

    // this.editMode = false;
    // this.linkMode = false; 
}

App.prototype.ajaxSetUp = function() {
    this.deleteAllDiagrams = function() {
        var deleteAllReq = $.ajax({
                        url: 'http://'+window.location.host+'/diagrams',
                        type: 'DELETE',
                        // data: {"desc": ""},
                        success: function(data) {
                            console.log("successfully deleted all diagrams");
                            return data;
                        }
        });
        return deleteAllReq;
    }

    this.deleteDiagram = function(givenId) {
        var deleteReq = $.ajax({
                        url: 'http://'+window.location.host+'/diagrams/'+givenId,
                        type: 'DELETE',
                        // data: {"state": "deleted"},
                        success: function(data) {
                            console.log("successfully deleted given diagram");
                            return data;
                        }

        });
        return deleteReq;
    }

    this.getDiagram = function(givenId) {
        var getReq = $.ajax({
                        url: 'http://'+window.location.host+'/diagrams/'+givenId,
                        type: 'GET',
                        success: function(data) {
                            console.log("successfully retrieved given diagrams");
                            return data; 
                        }
        });
        return getReq;
    }


    this.getAllDiagrams = function() {
        var getAllReq = $.ajax({
                        url: 'http://'+window.location.host+'/diagrams',
                        type: 'GET',
                        success: function(data) {
                            console.log("successfully retrieved all diagrams");
                            return data;
                        }
        });
        return getAllReq;
    }


    this.postDiagram = function(code) {
       
        var postReq = $.ajax({
                        url: 'http://'+window.location.host+'/diagrams',
                        type: 'POST',
                        data: {"code": code},
                        success: function(data) {
                            // console.log(data[0].desc);
                            console.log("successfully posted new diagram");
                            return data;
                        }
        });
        return postReq;
    }

    this.putDiagram = function(givenId,code) {
        var putReq = $.ajax({
                        url: 'http://'+window.location.host+'/diagrams/'+givenId,
                        type: 'PUT',
                        data: {"code": code},
                        success: function(data) {
                            console.log("successfully edited existing diagram");
                            return data;
                        }
        })
        return putReq;
    }
}

App.prototype.initPages = function() {
    window.App = this;
    var app = window.App;

    console.log("hi");
    $("#map_button").click(function() {
        if ($("#mapview").css("display") == "none") {
            $("#listview").css("display","none");
            $("#mapview").css("display","block");
        }
    });

    $("#list_button").click(function() {
        if ($("#listview").css("display") == "none") {
            $("#mapview").css("display","none");
            $("#listview").css("display","block");
        }
    });

    

    // $("#show_div1").click(function() {
    //         if($("#div1").hasClass("hidden")) {
    //             $("#div1").show();
    //             $("#div1").removeClass("hidden");
    //         } else {
    //             $("#div1").hide();
    //             $("#div1").addClass("hidden");
    //         }
    //     });

    //     $("#show_div2").click(function() {
    //         if($("#div2").hasClass("hidden")) {
    //             $("#div2").show();
    //             $("#div2").removeClass("hidden");
    //         } else {
    //             $("#div2").hide();
    //             $("#div2").addClass("hidden");
    //         }
    //     });       

    // window.AbstractorApp = this;
    // var otherThis = window.AbstractorApp;

    // this.initTrees();
    // this.initStage();
    // this.initEditMode();


    // $(".modes").hide();
    // $("#splash").show();
    // this.currentMode = "splash";

    // $("#edit_mode_button");

    // $("#edit_mode_button").click(function() {
    //     $(".modes").hide();
    //     $("#edit").show();
    //     this.currentMode = "edit";
    // });

    // $("#view_mode_button").click(function() {
    //     $(".modes").hide();
    //     $("#view").show();
    //     this.currentMode = "view";
    // });

}


App.prototype.initEditMode = function() {
    this.EditMode = new EditMode ({
                                'deleteAllDiagrams': this.deleteAllDiagrams,
                                'deleteDiagram': this.deleteDiagrams,
                                'getAllDiagrams': this.getAllDiagrams,
                                'getDiagram': this.getDiagram,
                                'postDiagram': this.postDiagram,
                                'putDiagram': this.putDiagram,
                            });
    this.EditMode.init();
}










