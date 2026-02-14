"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/app/lib/auth-client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateOrgModal({ open, onOpenChange }: Props) {
  const router = useRouter()

  const [orgName, setOrgName] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  }

  async function handleCreateOrg() {
    setError(null)
    setLoading(true)

    try {
      const { data: orgData, error: createError } =
        await authClient.organization.create({
          name: orgName,
          slug,
          description: description || undefined,
          keepCurrentActiveOrganization: false,
        })

      if (createError) {
        setError(createError.message ?? "Failed to create organization")
        return
      }

      if (!orgData?.id) {
        setError("Organization create failed")
        return
      }

      // 🔥 SET ACTIVE
      const { error: setActiveError } =
        await authClient.organization.setActive({
          organizationId: orgData.id,
        })

      if (setActiveError) {
        setError(
          setActiveError.message ?? "Failed to set active organization"
        )
        return
      }

      onOpenChange(false)

      window.location.reload();

    } catch (err: any) {
      console.error(err)
      setError(err?.message ?? "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0F0F11] border border-white/10 text-white max-w-md">

        <DialogHeader>
          <DialogTitle>Create organization</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleCreateOrg()
          }}
          className="space-y-4 mt-2"
        >
          {error && (
            <div className="rounded-md border border-red-500/40 bg-red-500/5 px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* NAME */}
          <div className="space-y-1">
            <label className="text-xs text-neutral-400">
              Organization name
            </label>
            <input
              required
              value={orgName}
              onChange={(e) => {
                setOrgName(e.target.value)
                if (!slug) setSlug(slugify(e.target.value))
              }}
              className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neutral-600"
              placeholder="Acme AI"
            />
          </div>

          {/* SLUG */}
          <div className="space-y-1">
            <label className="text-xs text-neutral-400">
              Workspace slug
            </label>
            <input
              required
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neutral-600"
              placeholder="acme"
            />
            <p className="text-[11px] text-neutral-500">
              azen.sh/{slug || "<slug>"}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-1">
            <label className="text-xs text-neutral-400">
              Description (optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neutral-600"
              placeholder="What is this workspace for?"
            />
          </div>

          {/* CTA */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-neutral-200"
          >
            {loading ? "Creating..." : "Create organization"}
          </Button>
        </form>

      </DialogContent>
    </Dialog>
  )
}
