---
name: ponytail-debt
description: List every `shortcut:` comment (and older `ponytail:` ones) as a debt ledger. One-shot report, changes nothing. Use for "ponytail debt", "what did ponytail defer", "list the shortcuts", /ponytail-debt.
---

Grep the repo for `shortcut:` and `ponytail:` comments. Print each as one row: file:line, the known limit, when to upgrade. Group by file, most deferred file first. Change nothing.
