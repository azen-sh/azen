"use client"

import * as React from "react"
import { useState } from "react"
import { Copy, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type ApiKey = {
  id: string
  name: string
  secret: string
  createdAt: string
  expiresAt: string | null
}

const initialKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production backend",
    secret: "azen_sk_************************",
    createdAt: "Nov 21, 2025",
    expiresAt: "No expiry",
  },
  {
    id: "2",
    name: "Local dev",
    secret: "azen_sk_************************",
    createdAt: "Nov 18, 2025",
    expiresAt: "Dec 31, 2025",
  },
]

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialKeys)
  const [createOpen, setCreateOpen] = useState(false)
  const [createdSecret, setCreatedSecret] = useState<string | null>(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [keyToDelete, setKeyToDelete] = useState<ApiKey | null>(null)

  function generateSecret() {
    // TODO: replace with real secret from backend
    const random = Math.random().toString(36).slice(2, 10)
    return `azen_sk_${random}${Date.now().toString(36)}`
  }

  function handleCreateKey() {
    const secret = generateSecret()

    // You’ll actually POST to your backend here and get back id/name/created/etc.
    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      name: "New API key",
      secret: "azen_sk_************************", // redacted in table
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      expiresAt: "No expiry",
    }

    setApiKeys((prev) => [newKey, ...prev])
    setCreatedSecret(secret)
    setCreateOpen(true)
  }

  async function handleCopy() {
    if (!createdSecret) return
    try {
      await navigator.clipboard.writeText(createdSecret)
    } catch {
      // ignore – not critical
    }
  }

  function confirmDelete(key: ApiKey) {
    setKeyToDelete(key)
    setDeleteOpen(true)
  }

  function handleDelete() {
    if (!keyToDelete) return
    // TODO: call your delete endpoint here
    setApiKeys((prev) => prev.filter((k) => k.id !== keyToDelete.id))
    setKeyToDelete(null)
    setDeleteOpen(false)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 pt-5">
      {/* Page heading */}
      <div className="flex items-start justify-between gap-4 p-2">
        <div>
          <h1 className="text-xl font-roboto text-white">API keys</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Create and manage keys used to access the Azen API
          </p>
        </div>

        <Button
          size="sm"
          className="flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800 cursor-pointer"
          onClick={handleCreateKey}
        >
          <Plus className="h-4 w-4" />
          Create API key
        </Button>
      </div>

      {/* Keys table card */}
      <section className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-950/95 p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-white">Keys</h2>
          <p className="text-xs text-neutral-500">
            Store keys securely. You can&apos;t view full secrets after
            creation.
          </p>
        </div>

        <div className="mt-2 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-800">
                <TableHead className="w-[24%] text-xs uppercase tracking-wide text-neutral-500">
                  Name
                </TableHead>
                <TableHead className="w-[32%] text-xs uppercase tracking-wide text-neutral-500">
                  Secret key
                </TableHead>
                <TableHead className="w-[18%] text-xs uppercase tracking-wide text-neutral-500">
                  Created
                </TableHead>
                <TableHead className="w-[18%] text-xs uppercase tracking-wide text-neutral-500">
                  Expires
                </TableHead>
                <TableHead className="w-[8%] text-right text-xs uppercase tracking-wide text-neutral-500" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-xs text-neutral-500"
                  >
                    No API keys yet. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                apiKeys.map((key) => (
                  <TableRow
                    key={key.id}
                    className="border-neutral-800 hover:bg-black/40"
                  >
                    <TableCell className="align-middle text-sm text-neutral-100">
                      {key.name}
                    </TableCell>
                    <TableCell className="align-middle font-mono text-xs text-neutral-400">
                      {key.secret}
                    </TableCell>
                    <TableCell className="align-middle text-xs text-neutral-400">
                      {key.createdAt}
                    </TableCell>
                    <TableCell className="align-middle text-xs text-neutral-400">
                      {key.expiresAt ?? "No expiry"}
                    </TableCell>
                    <TableCell className="align-middle text-right">
                      <button
                        type="button"
                        onClick={() => confirmDelete(key)}
                        className="inline-flex items-center justify-center rounded-md p-1 text-xs text-red-400 hover:bg-red-950/70 cursor-pointer"
                        aria-label="Delete API key"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Create API key dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md border-neutral-800 bg-neutral-950 text-white">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">
              New API key
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400">
              Copy your secret key now. For security reasons, you&apos;ll
              only be able to see it this one time.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            <label className="text-xs text-neutral-300">
              Secret key
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-black/60 px-3 py-2">
              <code className="flex-1 overflow-x-auto whitespace-nowrap text-xs font-mono text-neutral-100">
                {createdSecret ?? "Generating key..."}
              </code>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-7 w-7 shrink-0 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                onClick={handleCopy}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="text-[11px] text-neutral-500">
              Store this key in a secure secret manager. Azen will not
              show it again after you close this dialog.
            </p>
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-neutral-700 bg-transparent text-xs text-neutral-200 hover:bg-neutral-900"
              onClick={() => setCreateOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm border-neutral-800 bg-neutral-950 text-white">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold text-red-400">
              Delete API key
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400">
              This will immediately revoke the selected key. Any
              clients using it will stop working.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3 rounded-lg border border-red-900/50 bg-red-950/40 p-3 text-[11px] text-red-200">
            {keyToDelete ? (
              <>
                <div className="font-medium">
                  {keyToDelete.name}
                </div>
                <div className="mt-1 text-red-300/80">
                  Are you sure you want to delete this key?
                </div>
              </>
            ) : (
              "No key selected."
            )}
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-neutral-700 bg-transparent text-xs text-neutral-200 hover:bg-neutral-900"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-red-600 text-xs font-medium text-white hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
