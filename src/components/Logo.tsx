export default function Logo() {
  return (
    <h1
      style={{ letterSpacing: '0.13em' }}
      className="text-8xl text-accent absolute -top-12 -left-5 font-extrabold flex flex-col font-mickey uppercase cursor-pointer"
    >
      <span className="hover:scale-110 hover:text-accent-hover transition-all duration-300">
        Denys
      </span>
      <span className="text-7xl -mt-8 text-light hover:scale-110 hover:text-light-hover transition-all duration-300">
        Skachko
      </span>
    </h1>
  )
}
