import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/new-ui/components/ui/button"
import { Input } from "@/new-ui/components/ui/input"
import { Label } from "@/new-ui/components/ui/label"

type SearchFieldProps = {
  value: string
  disabled?: boolean
  onSubmit: (value: string) => void
}

export function SearchField({ value, disabled = false, onSubmit }: SearchFieldProps) {
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    // Server-owned props can change after Inertia back/forward navigation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(value)
  }, [value])

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(draft.trim())
      }}
      className="min-w-0 flex-1"
    >
      <Label htmlFor="journal-search" className="mb-2 block text-sm font-semibold text-brand-teal-deep">Cari jurnal</Label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="journal-search"
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Masukkan judul atau tema jurnal"
            disabled={disabled}
            className="h-14 rounded-lg pl-12 pr-4 text-base focus-visible:border-brand-green-dark disabled:cursor-wait"
          />
        </div>
        <motion.div whileHover={disabled ? undefined : { scale: 1.02 }} whileTap={disabled ? undefined : { scale: 0.97 }}>
          <Button
            type="submit"
            variant="brand"
            size="pill"
            disabled={disabled}
            className="w-full disabled:cursor-wait sm:w-auto"
          >
            <Search className="size-4" aria-hidden="true" />
            Cari
          </Button>
        </motion.div>
      </div>
    </form>
  )
}
