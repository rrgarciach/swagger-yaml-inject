# Swagger YAML inject

## Usage:

- Create a template YAML file called "template.yaml" in specifications' root path.
- Write %paths% and %definitions% in the respective places inside template.yaml file.
- Import and call main method providing specifications' root path as a string.

### Example of usage:

```const yamlInject = require('swagger-yaml-inject'); // import package

// call method providing path as parameter:
yamlInject('build/api');
```

### template.yaml file example:

swagger: '2.0'

# This is your document metadata
info:
  version: "0.0.1"
  title: Your API title

schemes:
  - http

basePath: /
# Describe your paths here

paths:
%paths%
definitions:
%definitions%
