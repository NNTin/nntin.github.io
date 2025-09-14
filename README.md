# 🌐 Custom Domain Setup for nntin.github.io

This GitHub Pages site is configured to use a custom domain via Cloudflare, with redirection to `/blog`.

---

## 📛 CNAME Configuration

This repository contains a `CNAME` file pointing to:
```
nntin.xyz
```

> This tells GitHub Pages to serve the site at `https://nntin.xyz`.

---

## ☁️ Cloudflare DNS Settings

Cloudflare is used as a proxy for DNS and to manage redirects.

### 🔧 DNS Records

| Type | Name | Value                    | Proxy Status |
|------|------|--------------------------|--------------|
| A    | @    | 185.199.108.153          | Proxied (☁️) |
| A    | @    | 185.199.109.153          | Proxied (☁️) |
| A    | @    | 185.199.110.153          | Proxied (☁️) |
| A    | @    | 185.199.111.153          | Proxied (☁️) |
| CNAME | www | nntin.github.io          | Proxied (☁️) |

> GitHub Pages requires `A` records for the root domain and a `CNAME` for the `www` subdomain.

---

## 🔁 Redirect Configuration (via Cloudflare)

Using **Cloudflare Redirect Rules**, both the `www` and non-`www` versions of the root domain are redirected to:

https://nntin.xyz/me


### Example Redirect Rules:

#### Rule 1 – Redirect root domain (`nntin.xyz`) to `/me`:
- **IF:**
  - URI Path equals `/`
  - Hostname equals `nntin.xyz`
- **THEN:**
  - 301 Redirect to `https://nntin.xyz/blog`

#### Rule 2 – Redirect www domain (`www.nntin.xyz`) to `/me`:
- **IF:**
  - URI Path equals `/`
  - Hostname equals `www.nntin.xyz`
- **THEN:**
  - 301 Redirect to `https://nntin.xyz/me`

---

## ✅ Status

- [x] Custom domain (`nntin.xyz`) is active
- [x] DNS is proxied through Cloudflare
- [x] Redirects from `/` to `/me` are working for both `www` and non-`www`

---

## 📌 Notes

- Cloudflare's proxy (orange cloud ☁️) **must be enabled** for redirects to function.
- GitHub Pages settings should:
  - Contain a `CNAME` file with `nntin.xyz`
  - Have **"Enforce HTTPS"** enabled in repository → Settings → Pages

---
