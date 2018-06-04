var dashboard = new Vue({
    router,
    store,
    el: "#allPollContent",
    data: {
        pollname: "",
        polloptions: "",
        pollList: []
    },
    beforeCreate: function(){
        if (!this.$session.exists()) {
            alert("Unauthorized Please Log In");
            window.location.href = "/login.html";
          }
          else{
            this.$http.get("api/poll", {headers: {"x-auth": this.$session.get("token")}})
            .then((response) => {
                this.pollList = response.body.data;
            }, (error) => {
                alert(error);
            })
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
                        if(response.body.status === "SUCCESS"){
                            alert("Poll created Successfully !!!");
                            window.location.href = "/dashboard.html";
                        }
                        else{
                            alert(response.body.message);
                        }
                        
                    }, (error) => {
                        alert(error.body.message);
                    })
            }
            
        },
        logout: function(){
            this.$session.destroy();
            alert("Logout Successful !!!");
            window.location.href = "/login.html";
        },
        view: function(poll){
            window.location.href = "/votes.html?" + poll._id;
        },
        remove: function(poll){
            this.$http.delete("api/poll/" + poll._id, {headers: {"x-auth": this.$session.get("token")}})
            .then((response) => {
                if(response.body.status === "SUCCESS"){
                    alert("Poll Deleted Successfully !!!");
                    window.location.href = "/dashboard.html";
                }
                else{
                    alert("Some Error Occured " + response.body.message);
                }
            }, (error) => {
                alert(error.body.message);
            })
        }
    }
});