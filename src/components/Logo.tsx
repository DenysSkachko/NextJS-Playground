export default function Logo() {
  return (
    <h1
      style={{ letterSpacing: '0.13em' }}
      className="absolute -top-12 left-1/2 transform -translate-x-1/2 sm:translate-x-0 sm:-left-5 flex flex-col cursor-pointer font-mickey text-8xl font-extrabold uppercase text-accent"
    >
      <span className="transition-all duration-300 hover:scale-110 hover:text-accent-hover">
        Denys
      </span>
      <span className="-mt-8 text-7xl text-light transition-all duration-300 hover:scale-110 hover:text-light-hover">
        Skachko
      </span>
    </h1>
  );
}
