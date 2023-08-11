# @koorie/activity

___

###### Wraps extends [stdout,stderr].write, node:util/inspect and, process.exit. ESModule.

___

## Index of Contents

___

- [Description](#description)
- [Installation](#installation)
- [@koorie/activity API](#koorieactivity---api)
  - [.trace](#tracedata)
  - [.traceOptions](#traceoptions--mute-boolean-)
  - [.exit](#exitmessage-error-code-options)
  - [.stderr](#stderrmute-message)
  - [.stdout](#stdoutmute-message)
- [JetBrains OSS Licence](#jetbrains-oss-license)

___

## Description

___

**_@koorie/activity_** wraps and extends the following:

- `process.stdout.write()`
- `process.stderr.write()`
- `process.exit()`
- `node:util/inspect()`

___

## Installation

___

```shell
npm install @koorie/activity
```

___

## @koorie/activity - API

___

### .trace(...data)

```javascript
import { trace } from '@koorie/activity'

await trace([data, {...'string'}])
```

### .traceOptions { mute?: boolean }

```javascript
import { traceOptions, trace } from '@koorie/activity'
/* we mute the stdout and we return a node:util.inspect Object */

traceOptions.mute = true
console.log(await trace([data, {...'string'}]))
```

___

### .exit(message, [error], [code], [options])

```javascript
import { exit } from '@koorie/activity'

await exit('process will now exit')
// prints to stderr the message and exit the process with code 1
```

___

### .stderr([mute], ...message)

```javascript
import { stderr } from '@koorie/activity'

await stderr('process had errors')
// prints to stderr the message
```

___

### .stdout([mute], ...message)

```javascript
import { stdout } from '@koorie/activity'

await stdout('process had no errors')
// prints to stdout the message
```

______

# Donate

- [github-sponsor](https://github.com/sponsors/simonedelpopolo)
- [twitter](https://twitter.com/ominesledlooopp)
- [patreon](https://www.patreon.com/ominesledlooopp)
- [open-collective](https://opencollective.com/simonedelpopolo/projects/koorie)

___

## JetBrains OSS License

___

I want to thank JetBrains to grant me the Open Source Software licence for all their products. This opportunity gives me
strength to keep on going with my studies and personal project.  
To learn more about this opportunity, have a look
at [Licences for Open Source Development - Community Support](https://www.jetbrains.com/community/opensource/).

_Thank you_
