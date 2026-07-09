# Agent Model Routing

When delegating work to subagents (via the Agent tool) or workflow steps, match the model to the task. Don't default everything to Opus.

## The rule

| Model | Use for | Examples |
|---|---|---|
| Haiku | Lightweight / mechanical work | Rename, typo fix, format, simple lookup, boilerplate, running a command |
| Sonnet (default for edits) | File changes, implementation | Single/multi-file edits, refactors, writing components/tests, most day-to-day work |
| Opus / Fable | Complex reasoning only | Architecture/design, root-cause debugging (races, distributed state), security review, migration design, cross-codebase planning |

## Default

**File changes and implementation → Sonnet.** Escalate to Opus/Fable only when the task needs real thinking. Drop to Haiku for trivial work.

## Big tasks → Workflow

For large multi-file work—broad sweeps, migrations, fan-out with parallel stages, or find-then-adversarially-verify—use the Workflow tool to orchestrate many subagents instead of hand-spawning them one by one.
Within a workflow, still route each `agent()` step's `opts.model` by task weight using the table above.

## How to apply

- Agent tool: pass `model: "haiku" | "sonnet" | "opus" | "fable"` on the call.
- Workflow steps: set `opts.model` per `agent()` call.
- When unsure, pick Sonnet — it's the safe middle default.

## Quick examples

- "Fix a typo across files" -> haiku
- "Port the blog design into Next.js components" -> sonnet
- "Design the caching architecture" / "hunt a race condition" -> opus
- "Explore where X is defined" -> haiku or sonnet
