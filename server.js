var http = require("http");
var url = require("url");
var qs = require("querystring");

var server = http.createServer(function(request, response){
    var content="";
    console.log("클라이언트의 요청 방식",  request.method);

    if(request.method=="GET"){
        //parse 메서드의 두번째 인수에 true값을 부여하면, 
        //파라미터를 json 형식으로 구성함
        const urlObj = url.parse(request.url, true);
        console.log("Get방식 요청: ",urlObj.query);
        
        content = "당신의 아이디는 "+urlObj.query.id+", 패스워드는 "+urlObj.query.pass;

        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        response.end(content);
    
    }else if(request.method == "POST"){
        //curl을 사용할 경우 명령어 
        //curl -d "id=batman&pass=1234" -X POST  http://localhost:8888

        request.on("data", function(data){
            content += data; //여기가 핵심임, 대입만 하면 안되며 누적시켜야 한다 
            console.log(qs.parse(content));
            var str = qs.parse(content);
            content = "당신의 아이디는 "+str.id+", 패스워드는 "+str.pass;
            response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
            response.end(content);
        
        });
    }

});

server.listen(8888, function(){
    console.log("The server is running at 8888 port...");
});