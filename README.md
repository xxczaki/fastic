# Fastic 🚀

> Fast & Lightweight HTTP server, that just works. Accessible through CLI.

[![Build Status](https://travis-ci.org/xxczaki/fastic.svg?branch=master)](https://travis-ci.org/xxczaki/fastic) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo) [![install size](https://packagephobia.now.sh/badge?p=fastic)](https://packagephobia.now.sh/result?p=fastic)

<img src="https://cdn.rawgit.com/xxczaki/fastic/c538d63c/gif.svg" alt="SVG">

# Highlights
- Beautiful output
- Zero-config (unless you want to specify a custom port or directory).
- Uses async/await
- Easy access through CLI.
- Automatically detects the content type, using file extension.
- Uses blazing fast [turbo-http](https://github.com/mafintosh/turbo-http) library.
- Logs HTTP requests & response status codes.
- Single source file (containing ~160 lines of code)
- 3 dependencies
- Lightweight (only ~1.6 MB).

# Install
```bash
npm install --global fastic
```
You can also use `npx`:
```bash
npx fastic
```

# Usage

```bash
Usage
 $ fastic [port] [directory]

Examples
 $ fastic
 $ fastic 8250 ~/DEV/website
```

**port**

Custom port of choice, defaults to `5050`.

**directory**

Directory, from which the server is going to start, default is current path.

## License

MIT
