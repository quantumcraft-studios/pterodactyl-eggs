{
    "_comment": "DO NOT EDIT: FILE GENERATED AUTOMATICALLY BY PTERODACTYL PANEL - PTERODACTYL.IO",
    "meta": {
        "version": "PTDL_v2",
        "update_url": null
    },
    "exported_at": "2024-01-06T19:45:31+01:00",
    "name": "Nodejs 20x (QuantumCraft Studios)",
    "author": "contact@quantumcraft-studios.com",
    "description": "Ultra-fast, lightweight and versatile Node.js server, powering web applications with maximum efficiency. Version 19x",
    "features": null,
    "docker_images": {
        "Nodejs 19": "ghcr.io\/quantumcraft-studios\/quantumcraftstudios:nodejs_19x"
    },
    "file_denylist": [],
    "startup": "if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == \"1\" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then \/usr\/local\/bin\/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then \/usr\/local\/bin\/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f \/home\/container\/package.json ]; then \/usr\/local\/bin\/npm install; fi; if [[ \"${MAIN_FILE}\" == \"*.js\" ]]; then \/usr\/local\/bin\/node \"\/home\/container\/${MAIN_FILE}\" ${NODE_ARGS}; else \/usr\/local\/bin\/ts-node --esm \"\/home\/container\/${MAIN_FILE}\" ${NODE_ARGS}; fi",
    "config": {
        "files": "{}",
        "startup": "{\r\n    \"done\": [\r\n        \"change this text 1\",\r\n        \"change this text 2\"\r\n    ]\r\n}",
        "logs": "{}",
        "stop": "^^C"
    },
    "scripts": {
        "installation": {
            "script": "#!\/bin\/bash\r\n# NodeJS App Installation Script\r\n#\r\n# Server Files: \/mnt\/server\r\napt update\r\napt install -y git curl jq file unzip make gcc g++ python python-dev libtool\r\n\r\necho -e \"updating npm. please wait...\"\r\nnpm install npm@latest -g\r\n\r\nmkdir -p \/mnt\/server\r\ncd \/mnt\/server\r\n\r\nif [ \"${USER_UPLOAD}\" == \"true\" ] || [ \"${USER_UPLOAD}\" == \"1\" ]; then\r\n    echo -e \"assuming user knows what they are doing have a good day.\"\r\n    exit 0\r\nfi\r\n\r\n## add git ending if it's not on the address\r\nif [[ ${GIT_ADDRESS} != *.git ]]; then\r\n    GIT_ADDRESS=${GIT_ADDRESS}.git\r\nfi\r\n\r\nif [ -z \"${USERNAME}\" ] && [ -z \"${ACCESS_TOKEN}\" ]; then\r\n    echo -e \"using anon api call\"\r\nelse\r\n    GIT_ADDRESS=\"https:\/\/${USERNAME}:${ACCESS_TOKEN}@$(echo -e ${GIT_ADDRESS} | cut -d\/ -f3-)\"\r\nfi\r\n\r\n## pull git js repo\r\nif [ \"$(ls -A \/mnt\/server)\" ]; then\r\n    echo -e \"\/mnt\/server directory is not empty.\"\r\n    if [ -d .git ]; then\r\n        echo -e \".git directory exists\"\r\n        if [ -f .git\/config ]; then\r\n            echo -e \"loading info from git config\"\r\n            ORIGIN=$(git config --get remote.origin.url)\r\n        else\r\n            echo -e \"files found with no git config\"\r\n            echo -e \"closing out without touching things to not break anything\"\r\n            exit 10\r\n        fi\r\n    fi\r\n\r\n    if [ \"${ORIGIN}\" == \"${GIT_ADDRESS}\" ]; then\r\n        echo \"pulling latest from github\"\r\n        git pull\r\n    fi\r\nelse\r\n    echo -e \"\/mnt\/server is empty.\\ncloning files into repo\"\r\n    if [ -z ${BRANCH} ]; then\r\n        echo -e \"cloning default branch\"\r\n        git clone ${GIT_ADDRESS} .\r\n    else\r\n        echo -e \"cloning ${BRANCH}'\"\r\n        git clone --single-branch --branch ${BRANCH} ${GIT_ADDRESS} .\r\n    fi\r\n\r\nfi\r\n\r\necho \"Installing nodejs packages\"\r\nif [[ ! -z ${NODE_PACKAGES} ]]; then\r\n    \/usr\/local\/bin\/npm install ${NODE_PACKAGES}\r\nfi\r\n\r\nif [ -f \/mnt\/server\/package.json ]; then\r\n    \/usr\/local\/bin\/npm install --production\r\nfi\r\n\r\necho -e \"install complete\"\r\nexit 0",
            "container": "node:18-bullseye-slim",
            "entrypoint": "bash"
        }
    },
    "variables": [
        {
            "name": "Git Repo Address",
            "description": "GitHub Repo to clone\r\n\r\nI.E. https:\/\/github.com\/parkervcp\/repo_name",
            "env_variable": "GIT_ADDRESS",
            "default_value": "",
            "user_viewable": true,
            "user_editable": true,
            "rules": "nullable|string",
            "field_type": "text"
        },
        {
            "name": "Install Branch",
            "description": "The branch to install.",
            "env_variable": "BRANCH",
            "default_value": "",
            "user_viewable": true,
            "user_editable": true,
            "rules": "nullable|string",
            "field_type": "text"
        },
        {
            "name": "User Uploaded Files",
            "description": "Skip all the install stuff if you are letting a user upload files.\r\n\r\n0 = false (default)\r\n1 = true",
            "env_variable": "USER_UPLOAD",
            "default_value": "0",
            "user_viewable": true,
            "user_editable": true,
            "rules": "required|boolean",
            "field_type": "text"
        },
        {
            "name": "Auto Update",
            "description": "Pull the latest files on startup when using a GitHub repo.",
            "env_variable": "AUTO_UPDATE",
            "default_value": "0",
            "user_viewable": true,
            "user_editable": true,
            "rules": "required|boolean",
            "field_type": "text"
        },
        {
            "name": "Additional Node packages",
            "description": "Install additional node packages.\r\n\r\nUse spaces to separate.",
            "env_variable": "NODE_PACKAGES",
            "default_value": "",
            "user_viewable": true,
            "user_editable": true,
            "rules": "nullable|string",
            "field_type": "text"
        },
        {
            "name": "Git Username",
            "description": "Username to auth with git.",
            "env_variable": "USERNAME",
            "default_value": "",
            "user_viewable": true,
            "user_editable": true,
            "rules": "nullable|string",
            "field_type": "text"
        },
        {
            "name": "Git Access Token",
            "description": "Password to use with git.\r\n\r\nIt's best practice to use a Personal Access Token.\r\nhttps:\/\/github.com\/settings\/tokens\r\nhttps:\/\/gitlab.com\/-\/profile\/personal_access_tokens",
            "env_variable": "ACCESS_TOKEN",
            "default_value": "",
            "user_viewable": true,
            "user_editable": true,
            "rules": "nullable|string",
            "field_type": "text"
        },
        {
            "name": "Uninstall Node packages",
            "description": "Uninstall node packages.\r\n\r\nUse spaces to separate.",
            "env_variable": "UNNODE_PACKAGES",
            "default_value": "",
            "user_viewable": true,
            "user_editable": true,
            "rules": "nullable|string",
            "field_type": "text"
        },
        {
            "name": "Main file",
            "description": "The file that starts the app.\r\nCan be .js and .ts",
            "env_variable": "MAIN_FILE",
            "default_value": "index.js",
            "user_viewable": true,
            "user_editable": true,
            "rules": "required|string|max:16",
            "field_type": "text"
        },
        {
            "name": "Additional Arguments.",
            "description": "Any extra arguments for nodejs or ts-node",
            "env_variable": "NODE_ARGS",
            "default_value": "",
            "user_viewable": true,
            "user_editable": true,
            "rules": "nullable|string|max:64",
            "field_type": "text"
        }
    ]
  }
