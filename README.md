# Cloudflare ShareX Workers

A system of Cloudflare Workers that uses R2 buckets to host ShareX
content completely on Cloudflare! Go from domain to ShareX server in
just a few seconds :fire:.

## Features

- Centralized ShareX Custom Uploader server and custom uploaders **for
  your domain**.
- All **four uploaders** ShareX has to offer, including:
	- **Images** (`https://images.example.com/[slug]`)
  - **URLs** (URL Shortener) (`https://urls.example.com/[slug]`)
  - **Text** (Pastebin) (`https://text.example.com/[slug]`)
  - **File** (CDN) (`https://files.example.com/[slug]`)
- Metadata available for each request for **full transparency**
  (`https://*.example.com/[slug]+`)
- With 0ms cold starts and served on the edge, its **blazing fast**
- **Easy to setup** using an easy-peasy install script.

## Install

This is a fun little monorepo, however I did go ahead and include an
install script that you can run [from Replit](https://replit.com/github/rayhanadev/sharex-cloudflare)
or wherever you please!

Make sure that you have R2 buckets enabled in your account (requires a
credit card). The plan starts with a really high amount of credit
to you renewed monthly so you should be able run your R2 buckets at
no-cost!

**on Linux**:

```bash
$ bash install.sh
```

(note: feel free to submit a PR for a Windows version!)
