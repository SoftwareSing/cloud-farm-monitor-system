const body = `
    <html>
        <body>
            <script language="javascript">
                function sentGo() {
                    const x = document.querySelector(\`input[name="x"]\`).value;
                    const y = document.querySelector(\`input[name="y"]\`).value;
                    const z = document.querySelector(\`input[name="z"]\`).value;
                    alert(\`go x=\${x}&y=\${y}&z=\${z}\`);
                    window.location.href = \`/method/Go?x=\${x}&y=\${y}&z=\${z}\`;
                }
            </script>
            x <input type="text" name="x"><br />
            y <input type="text" name="y"><br />
            z <input type="text" name="z"><br />
            <button type="button" name="go" onclick="sentGo()">GO</button>
        </body>
    </html>
`;

export function goPage(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
}
