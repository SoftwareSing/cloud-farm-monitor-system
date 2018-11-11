import { go } from "~/control/go";

const url = require("url");

const backToGoPage = `
<html>
    <body>
        <script language="javascript">
            window.location.href = "/go";
        </script>
    </body>
</html>
`;

export function methodGo(req, res) {
    const { query } = url.parse(req.url, true);
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
}
