# Notes

## Creation and configuration of node.js project with TypeScript

### Installation of TypeScript of global way Admin
```
    npm i -g typescript
```

### Initialize the Node.js project
```
    npm init -y
```

### Initialize typeScript in Node.js project
```
    tsc --init
```
This create a new file call **tsconfig.json**

### Configuration tsconfig.json
The following aspects must be configured:
1. "target": "es6" 
2. "module": "commonjs"
3. "moduleResolution": "node"
4. "sourceMap": true
5. "outDir": "./dist"
6. "esModuleInterop": true
7. "forceConsistentCasingInFileNames": true
8. "strict": true
9. "skipLibCheck": true

### Execute the command **tsc**
This create a new folder call **dist** where is javaScript files

### Installation the tslint
```
    npm i tslint --save-dev
```

### Installation of TypeScript in Node project
```
    npm i typescript --save-dev
```

### Initialize of tslint file
```
    ./node_modules/.bin/tslint --init
```

### Configuration of tslint file
In the file add a new rule ** no-console ** with a value of **false**
```
    "rules": {
        "no-console" : false
    },
```