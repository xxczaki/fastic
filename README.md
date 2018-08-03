# Fastic 🚀 [![Build Status](https://travis-ci.org/xxczaki/fastic.svg?branch=master)](https://travis-ci.org/xxczaki/fastic) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo) [![install size](https://packagephobia.now.sh/badge?p=fastic@1.0.2)](https://packagephobia.now.sh/result?p=fastic@1.0.2)

> Fast & Lightweight HTTP server, that just works. Accessible through CLI.

![](screenshot.png)

# Highlights
- Beautiful output
- Zero-config (unless you want to specify a custom port or directory).
- Easy access through CLI.
- Automatically guesses the content type, using file extension.
- Logs HTTP requests, response status codes.

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
