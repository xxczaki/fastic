# Fastic 🚀

> Fast & Lightweight HTTP server, that just works. Accessible through CLI.

[![Build Status](https://travis-ci.org/xxczaki/fastic.svg?branch=master)](https://travis-ci.org/xxczaki/fastic) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

<img src="https://rawcdn.githack.com/xxczaki/fastic/master/gif.svg" alt="SVG">

# Highlights
- Beautiful output
- Zero-config (unless you want to specify a custom port or directory).
- Uses async/await
- Easy access through CLI.
- Automatically detects the content type, using file extension.
- Uses blazing fast [turbo-http](https://github.com/mafintosh/turbo-http) library.
- Logs HTTP requests & response status codes.
- Single source file (containing ~200 lines of code)

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
	 	$ fastic <options>
	Options
	  	--port, -p    		Port on which the server will be running (default: 5050)
    	--directory, -d   	Directory from which the server will be running (default: current path)
		--open, -o        	Open server address in browser? (default: false)
		--log, -l    		Log HTTP requests & response status codes (default: false)
	Examples
	  	$ fastic
		$ fastic -p 8080 -d dist --open
		$ fastic --port 3000 --log
```

## License

MIT

