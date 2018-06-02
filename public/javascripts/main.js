const router = new VueRouter();
const store = new Vuex.Store({
    state: {
        token: undefined
    }
});

Vue.use(VueResource);
Vue.use(Vuex)

var loginApp = new Vue({
    router,
    store,
    el: "#login-reg-from",
    data: {
        appHeading: "Byjus App",
        email: "",
        password: "",
    },
    methods: {
        isValidEmail:function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          },
        login: function(){
            if(this.$Store == undefined){
                this.$Store = {token : "Hello Moto" };
                alert("Added Now : " + this.$Store.token);
            }
            else{
                alert("Existing : " + this.$Store.token);
            }
        },
        register: function(){

            if(this.email == "" || !this.isValidEmail(this.email)){
                return alert("Invalid Email !!!");
            }

            if(this.password == "" ){
                return alert("Invalid Password !!!");
            }

            var json = {
                email: this.email,
                password: this.password
            };

            this.$http.patch("api/misc/register", json)
                .then((response) => {
                    alert(response.body.message);
                    window.location.href = "/dashboard.html";
                }, (error) => {
                    alert(error.body.message);
                })
            
        }
    }
});

var dashboard = new Vue({
    router,
    store,
    el: "#createNewPoll",
    data: {
        pollname: "",
        polloptions: ""
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

                this.$http.post("api/poll", json)
                    .then((response) => {
                        alert(response);
                    }, (error) => {
                        alert(error);
                    })
            }
            
        }
    }
});