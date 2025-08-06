import Image from 'next/image'

type MiddleProps = {
  title: string
  image: string
  onClick?: () => void
}

const MiddleAltCard = ({ title, image, onClick }: MiddleProps) => {
  return (
    <>
      <div
        onClick={onClick}
        className="relative w-[140px] h-[140px] px-2 pt-5 pb-2 text-center border-1 border-dark-hover bg-dark-hover rounded-md cursor-pointer  overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 120px"
          className="object-cover z-10 hover:scale-125 transition-all duration-300 pt-6"
        />
        <p className="text-white z-20 text-md absolute top-0 left-0 bg-accent-hover w-full px-1">
          {title}
        </p>
      </div>
    </>
  )
}

export default MiddleAltCard
