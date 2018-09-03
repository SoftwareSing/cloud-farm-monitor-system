import { go } from "~/control/go";

const http = require("http");
const url = require("url");

const goPage = `
    <html>
        <body>
            <script language="javascript">
                function sentGo() {
                    const x = document.querySelector(\`input[name="x"]\`).value;
                    const y = document.querySelector(\`input[name="y"]\`).value;
                    const z = document.querySelector(\`input[name="z"]\`).value;
                    alert(\`go x=\${x}&y=\${y}&z=\${z}\`);
                    window.location.href = \`/methodGo?x=\${x}&y=\${y}&z=\${z}\`;
                }
            </script>
            x <input type="text" name="x"><br />
            y <input type="text" name="y"><br />
            z <input type="text" name="z"><br />
            <button type="button" name="go" onclick="sentGo()">GO</button>
        </body>
    </html>
`;

const backToGoPage = `
<html>
    <body>
        <script language="javascript">
            window.location.href = "/go";
        </script>
    </body>
</html>
`;

const server = http.createServer(function(req, res) {
    const parseObj = url.parse(req.url, true);
    console.log(parseObj);
    const pathname = parseObj.pathname;
    const query = parseObj.query;
    console.log(pathname);
    console.log(query);
    if (pathname === "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<html><body>This is Home Page.</body></html>");
        res.end();
    } else if (pathname === "/go") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(goPage);
        res.end();
    } else if (pathname === "/methodGo") {
        const { x, y, z } = query;
        const defaultState = { state: false, time: 0 };
        go(
            {x, y, z},
            defaultState,
            defaultState,
            { red: false, green: false, blue: false}
        );
        console.log(`method go: ${x} ${y} ${z}`);
        res.write(backToGoPage);
        res.end();
    } else {
        res.end("Invalid Request!");
    }
});

server.listen(10423);
