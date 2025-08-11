export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="bg-dark-hover w-full text-left text-3xl sm:text-2xl font-semibold tracking-tight text-light uppercase px-4 py-2 rounded-lg my-4 mx-auto lg:mx-0">
      {children}
    </h2>
  )
}
