var loginApp = new Vue({
    router,
    store,
    el: "#login-reg-from",
    data: {
        appHeading: "Byjus App",
        email: "",
        password: "",
    },
    beforeCreate: function(){
        if (this.$session.exists()) {
            window.location.href = "/dashboard.html";
          }
    },
    methods: {
        isValidEmail:function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          },
        login: function(){
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

            this.$http.patch("api/misc/login", json)
                .then((response) => {
                    alert("Welcome to Byjus Polling App !!!");
                    this.$session.start()
                    this.$session.set("token", response.headers.get("x-auth"));
                    window.location.href = "/dashboard.html";
                }, (error) => {
                    alert(error.body.message);
                })
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
                    alert("Welcome to Byjus Polling App !!!");
                    this.$session.start()
                    this.$session.set("token", response.headers.get("x-auth"));
                    window.location.href = "/dashboard.html";
                }, (error) => {
                    alert(error.body.message);
                })
            
        }
    }
});