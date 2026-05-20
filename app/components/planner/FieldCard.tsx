import TooltipLabel from "./TooltipLabel"

type Props = {
  title: string
  tooltip?: string
  children: React.ReactNode
}

export default function FieldCard({
  title,
  tooltip,
  children,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
      <TooltipLabel label={title} tooltip={tooltip} />
      {children}
    </div>
  )
}