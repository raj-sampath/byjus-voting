var votes = new Vue({
    router,
    store,
    el: "#allVotesData",
    data: {
        pollTitle: "",
        options: [],
        selectedOption: "",
        otherOption: "",
        visibility: {visibility: "hidden"},
        authorized: {visibility: "hidden"},
        showTwitter: {visibility: "hidden"}
    },
    beforeCreate: function(){
        if (!this.$session.exists()) {
            alert("Unauthorized Please Log In");
            window.location.href = "/login.html";
          }
          else{
              var pollId = window.location.search.replace("?", "");
              this.thisPollId = pollId;
              this.$http.get("api/poll/" + pollId, {headers: {"x-auth": this.$session.get("token")}})
                .then((response) => {
                    this.pollTitle = response.body.data.pollName;
                    this.options = response.body.data.options;
                    this.options.push("Other");

                    if(response.body.data.thisUser)
                        this.showTwitter = {visibility: "visible"}
                    else
                        this.showTwitter = {visibility: "hidden"}
                    
                    alert(this.showTwitter);

                    this.$http.get("api/vote/" + pollId, {headers: {"x-auth": this.$session.get("token")}})
                        .then((response) => {
                            var ctx = document.getElementById("myChart").getContext('2d');
                            var myPieChart = new Chart(ctx,{
                                type: 'pie',
                                data: response.body.data.data
                            });
                        })
                        .catch((error) => alert(error.body.message))
                }, (error) => alert(error.body.message))
          }
    },
    methods: {
        vote: function(){
            var voteCanditate = "";
            if(this.selectedOption === "Other"){
                if(this.otherOption === ""){
                    alert("Please enter a candidate");
                }
                else{
                    voteCanditate = this.otherOption;
                }
            }
            else{
                if(this.selectedOption === ""){
                    alert("Please a candidate from the Drop Down");
                }
                else{
                    voteCanditate = this.selectedOption;
                }
            }

            if(voteCanditate != ""){

                var thisPollId = window.location.search.replace("?", "");

                var json = {
                    pollId: thisPollId,
                    option: voteCanditate
                };

                this.$http.post("api/vote", json, {headers: {"x-auth": this.$session.get("token")}})
                    .then((response) => {
                        if(response.body.status === "SUCCESS"){
                            alert("Your vote was cast successfully !!!");
                            window.location.href = "/votes.html?" + thisPollId;
                        }
                        else{
                            alert(response.body.message);
                        }
                    }, (error) => {
                        alert(response.body.message);
                    })
            }
                

            
        },
        valueChanged: function(){
            if(this.selectedOption === "Other"){
                this.visibility = {visibility: "visible"};
            }
            else{
                this.visibility = {visibility: "hidden"};
            }
        },
        logout: function() {
            this.$session.destroy();
            alert("Logout Successful !!!");
            window.location.href = "/login.html";
        },
        back: function() {
            window.location.href = "/dashboard.html";
        }
    }
});