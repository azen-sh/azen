# Azen

This repository contains the core codebase for **Azen** — a developer-first AI memory layer.

Azen provides a secure, scalable way to store, retrieve, and reason over long-term user memory for AI applications.

---

## What is Azen?

Azen is an **AI memory infrastructure** that helps developers:

* Store meaningful user memory (preferences, facts, context)
* Retrieve relevant memory using semantic search
* Keep memory **encrypted at rest** by default
* Build stateful AI systems without reinventing memory logic

Azen is designed as backend infrastructure — simple APIs, strong defaults, and security-first architecture.

---

## Repository Structure

This is a **Turborepo-powered monorepo**.

### Apps

* `apps/api` – Core Azen API (memory, search, auth, usage tracking)
* `apps/web` – Marketing website (landing, public pages)
* `apps/console` – User dashboard (API keys, usage, memory management)

### Packages

* `packages/db` – Database schema, migrations, and shared DB utilities
* `packages/auth` – Shared authentication configuration (Better Auth) used by API and Console

All packages and apps are written in **TypeScript**.

---

## Architecture Notes

* Memory text is **encrypted at rest** in Postgres
* Embeddings are stored separately in a vector database
* Plaintext memory exists only in-memory during requests
* Workers operate on ephemeral payloads, never DB plaintext

Security is treated as a baseline, not an add-on.

---

## Status

Azen is under active development.

* APIs and SDKs are evolving
* Internal architecture is stabilizing
* Features may change rapidly

This repository reflects real infrastructure work in progress.

---

## Links

* Documentation: [https://docs.azen.sh](https://docs.azen.sh) (separate repository)
* Website: [https://azen.sh](https://azen.sh)

---

Built with Turborepo.
