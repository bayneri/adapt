const fs = require('fs');
fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);

    const head = `
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>${data.user.firstname} ${data.user.lastname}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
      <link href="./assets/bootstrap.min.css" rel="stylesheet" media="screen">
      <link href="./assets/prettify.css" rel="stylesheet" media="screen">
      <link href="./assets/style.css" rel="stylesheet" media="screen, print">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossorigin="anonymous">
      <style type="text/css">
        :root #content>#center>.dose>.dosesingle,
        :root #content>#right>.dose>.dosesingle,
        :root #header+#content>#left>#rlblock_left {
          display: none !important;
        }
      </style>
      <script type="text/javascript" charset="utf-8" data-requirecontext="_" data-requiremodule="jquery" src="./assets/jquery.min.js"></script>
    </head>`;


    let nav = `
    <div id="sidenav" class="span2">
      <nav id="scrollingNav">
        <ul class="sidenav nav nav-list">
          <li class="nav-header active" data-group="User"><a href="#api-User">User</a></li>
          <li data-group="User" data-name="GetUser">`;

    for (let i in data.endpoints) {
        nav += `
        <a href="#endpoint-${i}">${data.endpoints[i].name}</a>`
    }
    nav += `
          </li>
        </ul>
      </nav>
    </div>`

    const header = `
    <div id="header">
      <div class="pull-left">
        <h1>${data.user.firstname} ${data.user.lastname}</h1>
        <h2>apiDoc of myself &#x1F468&zwj;&#x1F4BB</h2>
      </div>
      <div class="clearfix"></div>
    </div>`;

    let sections = `
    <div id="sections">
      <section id="api-User" data-name="User">
        <h1>User</h1>`

    for (let i in data.endpoints) {
        sections += `
        <div id="endpoint-${i}">
          <article>
            <div class="pull-left">
              <h1>User - ${data.endpoints[i].name}</h1>
            </div>
            <div class="clearfix"></div>

            <pre class="prettyprint language-html prettyprinted" data-type="get"><code><span class="pln">${data.endpoints[i].path}</span></code></pre>`;
        if (data.endpoints[i].success) {
            sections += `
            <h2>Success 200</h2>
            <table>
              <thead>
                <tr>
                  <th style="width: 30%">Field</th>
                  <th style="width: 10%">Type</th>
                  <th style="width: 70%">Sample Response</th>
                </tr>
              </thead>
              <tbody>`;

            for (let x in data.user) {
                const sample_response = typeof data.user[x] == 'string' ? data.user[x] : `<a href="${data.user[x].link}" target="_blank">${data.user[x].name}</a>`
                sections += `
                <tr>
                  <td class="code">${x}</td>
                  <td>String</td>
                  <td>
                    <p>${sample_response}</p>
                  </td>
                </tr>`;
            }
            sections += `
            </tbody>
          </table>

          <ul class="nav nav-tabs nav-tabs-examples">
            <li class="active">
              <a href="#success-response">Success-Response:</a>
            </li>
          </ul>

          <div class="tab-content">
            <div class="tab-pane active" id="success-response">
              <pre class="prettyprint language-json prettyprinted" data-type="json"><code><span class="pln">    HTTP</span><span class="pun">/</span><span class="lit">1.1</span><span class="pln"> </span><span class="lit">200</span><span class="pln"> OK
    </span><span class="pun">{</span>`;

            for (let x in data.user) {
                const value = typeof data.user[x] == 'string' ? data.user[x] : data.user[x].name;
                sections += `<span class="pln">
        </span><span class="str">"${x}"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"${value}"</span><span class="pun">,</span>`;
            }

            sections += `<span class="pln">
    </span><span class="pun">}</span></code></pre>
            </div>
          </div>`
        }

        if (data.endpoints[i].error) {
            let error = data.endpoints[i].error;
            sections += `
                <h2>Error 4xx</h2>
                <table>
                  <thead>
                    <tr>
                      <th style="width: 30%">Field</th>
                      <th style="width: 70%">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="code">${error.field}</td>
                      <td>
                        <p>${error.message}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <ul class="nav nav-tabs nav-tabs-examples">
                  <li class="active">
                    <a href="#error-response">Error-Response:</a>
                  </li>
                </ul>

                <div class="tab-content">
                  <div class="tab-pane active" id="error-response">
                    <pre class="prettyprint language-json prettyprinted" data-type="json"><code><span class="pln">    HTTP</span><span class="pun">/</span><span class="lit">1.1</span><span class="pln"> </span><span class="lit">${error.code}</span><span class="pln"> </span><span class="typ">${error.codeText}</span><span class="pln">
    </span><span class="pun">{</span><span class="pln">
      </span><span class="str">"error"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"${error.field}"</span><span class="pln">
    </span><span class="pun">}</span></code></pre>
                  </div>
                </div>`;
        }

    }
    sections += `
    </article>
  </div>
  <div id="generator">
    <div class="content">
      Built with <a href="https://github.com/cetinerhalil/adapt">adapt - apiDoc as personal website template </a> \ • /
      Developed based on <a href="http://apidocjs.com/">apiDoc</a> template
    </div>
  </div>
</div>`;

    const body = `<body>
    <div class="container-fluid">
      <div class="row-fluid">
      ${nav}
      <div id="content">
      ${header}
      ${sections}
      </div>
      </div>
      </div>
    </body>`;

    const html = `
        ${head}
        ${body}

        </html>`

    fs.writeFile("./index.html", html, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});