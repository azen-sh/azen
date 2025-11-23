"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Copy, Loader2, Plus, Trash2 } from "lucide-react";
import { authClient } from "../../lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ApiKey = {
  id: string;
  name: string;
  start: string;
  createdAt: string;
  expiresAt: string | null;
};

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<ApiKey | null>(null);

  async function loadKeys() {
    try {
      setListLoading(true);
      const res = await authClient.apiKey.list();
      const formatted = (res.data ?? []).map((key: any) => ({
        id: key.id,
        name: key.name,
        start: key.start,
        createdAt: new Date(key.createdAt).toLocaleDateString(),
        expiresAt: key.expiresAt
          ? new Date(key.expiresAt).toLocaleDateString()
          : "No expiry",
      }));
      setApiKeys(formatted);
    } catch (e) {
      console.error("Error loading keys:", e);
    } finally {
      setListLoading(false);
    }
  }

  function openCreateConfirm() {
    setConfirmOpen(true);
  }

  async function handleConfirmCreate() {
    setActionLoading(true);
    try {
      const res = await authClient.apiKey.create({
        name: `console-${Date.now()}`,
        expiresIn: 60 * 60 * 24 * 365,
        prefix: "az_",
        metadata: { createdFrom: "azen-console" },
      });

      setCreatedKey(res.data?.key ?? null);
      setConfirmOpen(false);
      setCreateOpen(true);

      await loadKeys();
    } catch (err) {
      console.error("Create key failed:", err);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCopy() {
    if (!createdKey) return;
    await navigator.clipboard.writeText(createdKey);
  }

  function confirmDelete(key: ApiKey) {
    setKeyToDelete(key);
    setDeleteOpen(true);
  }

  async function handleDelete() {
    if (!keyToDelete) return;
    try {
      await authClient.apiKey.delete({ keyId: keyToDelete.id });
      await loadKeys();
    } catch (e) {
      console.error("Delete failed:", e);
    } finally {
      setDeleteOpen(false);
      setKeyToDelete(null);
    }
  }

  useEffect(() => {
    loadKeys();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 pt-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-2">
        <div>
          <h1 className="text-xl font text-white">API Keys</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Manage keys used to access the Azen API securely.
          </p>
        </div>

        <Button
          size="sm"
          disabled={actionLoading || listLoading}
          onClick={openCreateConfirm}
          className="flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {actionLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin cursor-pointer" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 cursor-pointer" />
              Create API key
            </>
          )}
        </Button>
      </div>

      {/* Table */}
      <section className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-950/95 p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-white">Your keys</h2>
          <p className="text-xs text-neutral-500">
            Full secrets are only shown once on creation.
          </p>
        </div>

        <div className="mt-3 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-800">
                <TableHead className="text-xs text-neutral-500">Name</TableHead>
                <TableHead className="text-xs text-neutral-500">Key</TableHead>
                <TableHead className="text-xs text-neutral-500">Created</TableHead>
                <TableHead className="text-xs text-neutral-500">Expires</TableHead>
                <TableHead className="text-right text-xs text-neutral-500" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {listLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-xs text-neutral-500"
                  >
                    <div className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading API keys…
                    </div>
                  </TableCell>
                </TableRow>
              ) : apiKeys.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-xs text-neutral-500"
                  >
                    No API keys yet.
                  </TableCell>
                </TableRow>
              ) : (
                apiKeys.map((key) => (
                  <TableRow
                    key={key.id}
                    className="border-neutral-800 hover:bg-black/40"
                  >
                    <TableCell className="text-sm text-neutral-100">
                      {key.name}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-neutral-400">
                      {key.start ?? "az_****"}
                    </TableCell>
                    <TableCell className="text-xs text-neutral-400">
                      {key.createdAt}
                    </TableCell>
                    <TableCell className="text-xs text-neutral-400">
                      {key.expiresAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => confirmDelete(key)}
                        className="rounded-md p-1 text-red-400 hover:bg-red-950/70 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        disabled={actionLoading}
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

      {/* 1) Confirm create */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md border-neutral-800 bg-neutral-950 text-white">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">
              Create new API key?
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400">
              This will generate a new secret key for this workspace. You
              can revoke it at any time, but you&apos;ll only see the full
              secret once.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-3 text-xs text-neutral-400">
            Use separate keys for production and development, and rotate
            them regularly.
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-neutral-700 bg-transparent text-xs text-neutral-200 hover:bg-neutral-900 cursor-pointer"
              onClick={() => setConfirmOpen(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-blue-700 text-xs font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              onClick={handleConfirmCreate}
              disabled={actionLoading}
            >
              {actionLoading ? "Creating..." : "Create key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2) New key dialog – with non-overflow layout */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-xl border-neutral-800 bg-neutral-950 text-white">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">New API key</DialogTitle>
            <DialogDescription className="text-xs text-neutral-400">
              Copy this key now. For security reasons, you won&apos;t be able
              to see it again after closing this window.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-2">
            <div className="rounded-xl border border-neutral-800 bg-black px-3 py-3">
              <div className="flex items-start gap-2">
                {/* Text column */}
                <div className="flex-1 max-h-24 overflow-y-auto">
                  <code className="block break-all text-xs font-mono text-neutral-100">
                    {createdKey}
                  </code>
                </div>
                {/* Copy button */}
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="mt-0.5 shrink-0 text-neutral-300 hover:bg-neutral-800 hover:text-white cursor-pointer"
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500">
              Store this key in a secure secret manager. Anyone with this
              key can access the Azen API on behalf of this workspace.
            </p>
          </div>

          <DialogFooter className="mt-4 flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-neutral-700 bg-transparent text-xs text-neutral-200 hover:bg-neutral-900 cursor-pointer"
              onClick={() => setCreateOpen(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3) Delete dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm border-neutral-800 bg-neutral-950 text-white">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold text-red-400">
              Delete API key
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400">
              This will immediately revoke the key. Any clients using it
              will stop working.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-3 rounded-lg border border-red-900/50 bg-red-950/40 p-3 text-[11px] text-red-200">
            Are you sure you want to delete{" "}
            <span className="font-medium">{keyToDelete?.name}</span>?
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-neutral-700 bg-transparent text-xs text-neutral-200 hover:bg-neutral-900"
              onClick={() => setDeleteOpen(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-red-600 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              onClick={handleDelete}
              disabled={actionLoading}
            >
              Delete key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
