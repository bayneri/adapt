# adapt
apiDoc as personal website template.

## What is adapt?

This project is based on [apiDoc](http://apidocjs.com/)'s official template.

It all started with the idea of developing [my personal website](http://halil.cetiner.me) as API documentation. This repo contains a html generator and sample json of user data. And of course the result of the given json.

This is neither a well written nor well documented project. I'll be working on developing it as much as possible but contributors are welcomed too.

## How to use?
You need `node` in order to build the project. If it's not installed, install node from [here](https://nodejs.org/en/download/).

1. Fill the `data.json` file with your info and customize endpoints as you want, here is the sample json with my info:
```
  {

    "user": {
        "firstname": "Halil",
        "lastname": "Cetiner",
        "current_company": {
            "name": "Zeplin",
            "link": "https://zeplin.io"
        },
        "position": "Software Engineer",
        "university": {
            "name": "Bogazici University",
            "link": "https://boun.edu.tr"
        },
        "github": {
            "name": "gh/cetinerhalil",
            "url": "https://github.com/cetinerhalil"
        },
        "linkedin": {
            "name": "li/cetinerhalil",
            "link": "https://linkedin.com/in/cetinerhalil"
        },
        "blog": {
            "name": "md/@cetiner",
            "link": "https://medium.com/@cetiner"
        },
        "twitter": {
            "name": "tw/cetinerhalil",
            "link": "https://twitter.com/cetinerhalil"
        },
        "instagram": {
            "name": "ig/cetinerhalil",
            "link": "https://instagram.com/cetinerhalil"
        },
        "facebook": {
            "name": "fb/cetinerhalil",
            "link": "https://facebook.com/cetinerhalil"
        }
    },
    "endpoints": [{
            "name": "Get User Information",
            "method": "get",
            "path": "/user",
            "success": true,
            "error": {
                "code": "404",
                "errorText": "Not Found",
                "field": "UserNotFound",
                "message": "I'm usually accessible but if you get this error, try halil@cetiner.me."
            }
        },
        {
            "name": "Update User Information",
            "method": "patch",
            "path": "/user",
            "success": false,
            "error": {
                "code": "403",
                "codeText": "Forbidden",
                "field": "UpdateNotAllowed",
                "message": "Don't you dare try to get into my personal space. “I'm a very private person.”."
            }
        }
    ]
}

```
Well, after filling the json, you are almost all set.

2. Run the script `adapt.js`, which will _adapt_ your info to apiDoc structure. 😉
   ```
   node adapt.js
   ```
   or
   
   ```
   npm run-script adapt
   ```
## Result

After editing the json file and running the script, your personal website is ready. From then on, all you need are `index.html` file and `assets` folder.

![ss](https://github.com/cetinerhalil/adapt/blob/master/screenshots/ss.png)

## License

As I said, this project is some sort of a clone of the [template of apiDoc](https://github.com/apidoc/apidoc/tree/master/template).

Hence, no rights reserved by me. Thanks to the creators of [apiDoc](https://github.com/apidoc/apidoc) for great tool which I've been using for years.
