// const { default: axios } = require("axios");
const app = require("./app")


app.listen(process.env.PORT || 5000,function(){
    console.log('Server started on http://localhost:5000 ')
});
