export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="bg-dark-hover text-3xl sm:text-2xl font-semibold tracking-tight text-light uppercase w-fit px-4 py-2 rounded-lg my-4">
      {children}
    </h2>
  )
}
