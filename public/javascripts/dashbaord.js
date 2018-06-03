var dashboard = new Vue({
    router,
    store,
    el: "#createNewPoll",
    data: {
        pollname: "",
        polloptions: ""
    },
    beforeCreate: function(){
        if (!this.$session.exists()) {
            alert("Unauthorized Please Log In");
            window.location.href = "/login.html";
          }
          else{
              alert("Welocme to Dashboard")
          }
    },
    methods: {
        createPoll: function(){
            if(this.pollname == "" || this.pollname == undefined
                || this.polloptions == "" || this.polloptions == undefined){
                alert("Enter Poll Name and the Poll Options");
                alert();
            }
            else{
                var json = {
                    pollName: this.pollname,
                    options: this.polloptions.split("\n")
                };

                this.$http.post("api/poll", json, {headers: {"x-auth": this.$session.get("token")}})
                    .then((response) => {
                        alert(response);
                        this.pollname = "";
                        this.polloptions = "";
                    }, (error) => {
                        alert(error);
                    })
            }
            
        },
        logout: function(){
            this.$session.destroy();
            alert("Logout Successful !!!");
            window.location.href = "/login.html";
        }
    }
});